/**
 * ModuleViewer - Sistema Interativo de Visualização de Módulos
 * 
 * Funcionalidades:
 * - Carregamento progressivo de conteúdo
 * - Conversão Markdown → HTML com tratativa de erros
 * - Exibição de conteúdo antes dos botões de prova
 * - Erro handling em cada etapa
 */

const ModuleViewer = {
  currentModule: null,
  contentCache: {},

  /**
   * Async: Carrega o conteúdo de um módulo
   * @param {number} moduleNumber - Número do módulo (1-8)
   * @param {Object} moduleData - Dados do módulo (código, título, etc)
   * @returns {Promise<string>} HTML do conteúdo ou mensagem de erro
   */
  async loadModuleContent(moduleNumber, moduleData) {
    try {
      // Validação 1: Verificar se moduleNumber é válido
      if (!moduleNumber || moduleNumber < 1 || moduleNumber > 8) {
        throw new Error(`❌ Número de módulo inválido: ${moduleNumber}. Use 1-8.`);
      }

      // Validação 2: Verificar se os dados do módulo estão presentes
      if (!moduleData || !moduleData.codigo) {
        throw new Error(`❌ Dados do módulo incompletos. Código faltando.`);
      }

      // Cache check: se já foi carregado, retorna do cache
      if (this.contentCache[moduleNumber]) {
        console.log(`✅ Módulo ${moduleNumber} carregado do cache`);
        return this.contentCache[moduleNumber];
      }

      // Tenta carregar do arquivo local
      const contentPath = `data/modules/Modulo ${moduleNumber}/conteudo ${moduleNumber}.md`;
      
      console.log(`⏳ Carregando conteúdo: ${contentPath}`);
      const response = await fetch(contentPath);

      // Tratativa de erro 1: Arquivo não encontrado
      if (!response.ok) {
        console.warn(`⚠️ Arquivo não encontrado (${response.status}): ${contentPath}`);
        return this.buildFallbackContent(moduleData);
      }

      const markdownText = await response.text();

      // Tratativa de erro 2: Arquivo vazio
      if (!markdownText || markdownText.trim().length === 0) {
        console.warn(`⚠️ Arquivo vazio: ${contentPath}`);
        return this.buildFallbackContent(moduleData);
      }

      // Converte Markdown para HTML
      const htmlContent = this.markdownToHtml(markdownText);

      // Armazena em cache
      this.contentCache[moduleNumber] = htmlContent;
      this.currentModule = moduleNumber;

      console.log(`✅ Conteúdo do Módulo ${moduleNumber} carregado com sucesso`);
      return htmlContent;

    } catch (error) {
      console.error('❌ Erro ao carregar conteúdo do módulo:', error);
      
      // Construir conteúdo de fallback
      return this.buildErrorContent(moduleData, error.message);
    }
  },

  /**
   * Converte Markdown simples → HTML
   * Suporta: # headings, **bold**, *italic*, listas, parágrafos
   * 
   * @param {string} markdown - Texto em Markdown
   * @returns {string} HTML formatado
   */
  markdownToHtml(markdown) {
    try {
      if (!markdown || typeof markdown !== 'string') {
        return '<p>⚠️ Conteúdo inválido</p>';
      }

      let html = markdown
        // Escape tags HTML para evitar injeção
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

        // Headings (# ## ###)
        .replace(/^### (.*?)$/gm, '<h3 style="margin-top:16px;margin-bottom:8px;font-weight:700;font-size:1.17em;">$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2 style="margin-top:20px;margin-bottom:12px;font-weight:700;font-size:1.5em;color:#1a1a1a;">$2</h2>')
        .replace(/^# (.*?)$/gm, '<h1 style="margin-top:24px;margin-bottom:16px;font-weight:700;font-size:2em;color:#0066cc;">$1</h1>')

        // Bold e Italic
        .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:700;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em style="font-style:italic;">$1</em>')

        // Listas com hífen
        .replace(/^\* (.*?)$/gm, '<li style="margin-left:20px;">$1</li>')
        .replace(/(<li[\s\S]*?<\/li>)/g, '<ul style="list-style:disc;margin:8px 0;">$1</ul>')

        // Listas numeradas (1. 2. etc)
        .replace(/^\d+\. (.*?)$/gm, '<li style="margin-left:20px;">$1</li>')
        .replace(/(<li[\s\S]*?<\/li>)(?!<\/ul>)/g, '<ol style="list-style:decimal;margin:8px 0;">$1</ol>')

        // Parágrafos (linhas em branco separam)
        .replace(/\n\n+/g, '</p><p>')
        .replace(/^(?!<[h|u|o|l])(.+)$/gm, '<p style="margin:8px 0;line-height:1.6;">$1</p>')

        // Remover tags empty
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(\s*)<\/p>/g, '');

      return html;

    } catch (error) {
      console.error('❌ Erro ao converter Markdown:', error);
      return `<p>❌ Erro ao processar conteúdo: ${error.message}</p>`;
    }
  },

  /**
   * Conteúdo de fallback quando arquivo não encontrado
   * @param {Object} moduleData - Dados do módulo
   * @returns {string} HTML
   */
  buildFallbackContent(moduleData) {
    const moduleNum = this.extractModuleNumber(moduleData.codigo);
    return `
      <div style="padding:20px;background:#fff9c4;border-left:4px solid #f57f17;border-radius:4px;">
        <h2 style="color:#e65100;margin-top:0;">⚠️ Conteúdo não encontrado</h2>
        <p>O arquivo de conteúdo para o <strong>${moduleData.codigo}</strong> não está disponível no momento.</p>
        <p>Você ainda pode:</p>
        <ul style="list-style:disc;margin-left:20px;">
          <li>Fazer o <strong>Simulado completo</strong> do módulo</li>
          <li>Refazer apenas as <strong>questões que errou</strong></li>
        </ul>
        <p style="font-size:0.9em;color:#666;margin-top:16px;">
          💡 Dica: Se você quiser o conteúdo teórico, peça para o administrador carregar os arquivos MD.
        </p>
      </div>
    `;
  },

  /**
   * Conteúdo quando há erro no carregamento
   * @param {Object} moduleData - Dados do módulo
   * @param {string} errorMsg - Mensagem de erro
   * @returns {string} HTML
   */
  buildErrorContent(moduleData, errorMsg) {
    return `
      <div style="padding:20px;background:#ffebee;border-left:4px solid #c62828;border-radius:4px;">
        <h2 style="color:#b71c1c;margin-top:0;">❌ Erro ao carregar conteúdo</h2>
        <p><strong>Módulo:</strong> ${moduleData.codigo}</p>
        <p><strong>Erro:</strong> <code style="background:#f5f5f5;padding:4px;">${this.escapeHtml(errorMsg)}</code></p>
        <p style="font-size:0.9em;color:#666;margin-top:12px;">
          ⚙️ <strong>Sugestões:</strong>
        </p>
        <ul style="list-style:disc;margin-left:20px;font-size:0.9em;">
          <li>Verifique sua conexão de rede</li>
          <li>Recargue a página (Ctrl+R ou F5)</li>
          <li>Limpe o cache do navegador (Ctrl+Shift+Delete)</li>
          <li>Contate o suporte se o problema persistir</li>
        </ul>
      </div>
    `;
  },

  /**
   * Renderizar modal interativo: conteúdo + botões
   * @param {number} moduleNumber - Número do módulo
   * @param {Object} moduleData - Dados do módulo
   */
  async showModuleModal(moduleNumber, moduleData) {
    try {
      // Carrega o conteúdo
      const htmlContent = await this.loadModuleContent(moduleNumber, moduleData);

      // Cria o HTML do modal com conteúdo + botões
      const modalHtml = `
        <div style="max-height:70vh;overflow-y:auto;padding-bottom:16px;">
          <div style="padding:16px;border-bottom:1px solid #eee;margin-bottom:16px;">
            <h2 style="margin:0;color:#0066cc;">${moduleData.codigo}</h2>
            <p style="margin:4px 0;color:#666;font-size:0.9em;">Módulo ${moduleNumber} de 8</p>
          </div>

          <div style="padding:0 16px;line-height:1.6;">
            ${htmlContent}
          </div>
        </div>

        <div style="padding-top:16px;border-top:1px solid #eee;margin-top:16px;display:flex;justify-content:flex-end;gap:12px;">
          <button class="btn btn-secondary" onclick="ModuleViewer.closeModal()">Voltar</button>
          <button class="btn btn-primary" data-demo-action="simulado" data-module="${moduleNumber}" data-erros="false">
            ✓ Fazer Simulado Completo
          </button>
          <button class="btn btn-accent" data-demo-action="simulado" data-module="${moduleNumber}" data-erros="true">
            🔄 Refazer Questões Erradas
          </button>
        </div>
      `;

      // Abre o modal usando a função global
      if (typeof openModal === 'function') {
        openModal(modalHtml);
      } else {
        console.error('❌ Função openModal não encontrada no contexto global');
        alert('Erro: Interface de modal não carregada. Recarregue a página.');
      }

    } catch (error) {
      console.error('❌ Erro ao mostrar modal do módulo:', error);
      alert(`❌ Erro ao abrir módulo: ${error.message}`);
    }
  },

  /**
   * Fechar modal
   */
  closeModal() {
    if (typeof closeModal === 'function') {
      closeModal();
    } else {
      const modal = document.getElementById('exam-modal');
      if (modal) modal.style.display = 'none';
    }
  },

  /**
   * Escape HTML para segurança
   * @param {string} text - Texto a escapar
   * @returns {string} Texto escapado
   */
  escapeHtml(text) {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  },

  /**
   * Extrai o número do módulo a partir do código
   * Ex: "Módulo 1" → 1, "M1" → 1
   * @param {string} codigo - Código do módulo
   * @returns {number} Número do módulo
   */
  extractModuleNumber(codigo) {
    try {
      const match = String(codigo).match(/\d+/);
      return match ? parseInt(match[0], 10) : null;
    } catch (error) {
      console.error('❌ Erro ao extrair número do módulo:', error);
      return null;
    }
  },

  /**
   * Debug: Log de todos os módulos carregados
   */
  printCacheStatus() {
    console.log('📦 Estado do Cache de Módulos:');
    Object.keys(this.contentCache).forEach(moduleNum => {
      const contentLength = this.contentCache[moduleNum].length;
      console.log(`   Módulo ${moduleNum}: ${contentLength} bytes`);
    });
  }
};

// Exportar para uso global
window.ModuleViewer = ModuleViewer;
