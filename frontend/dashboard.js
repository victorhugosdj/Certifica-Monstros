/*
  dashboard.js - Dashboard com métricas, ranking de usuários e desempenho por módulo
  
  ESTRUTURA:
  1. Buscar dados do usuário e provas
  2. Renderizar resumo de métricas (topo)
  3. Renderizar ranking de usuários
  4. Renderizar desempenho por módulo
  5. Renderizar recomendações
  6. Renderizar questões desafiadoras
*/

// ========== BUSCAR METRICAS ==========

async function fetchUserMetrics(userId) {
  try {
    const res = await apiFetch(`/api/metrics/${encodeURIComponent(userId)}`);
    if (!res.ok) throw new Error('Falha ao buscar métricas');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Busca ranking de usuários (TOP 3) do Supabase
 * @returns {Promise<Array>} Array com { user, score, totalCorrected, totalAttempted }
 */
async function fetchRanking() {
  try {
    const API_BASE = document.querySelector('meta[name="api-base-url"]')?.content || '';
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/ranking?limit=3`);
    if (!res.ok) throw new Error('Falha ao buscar ranking do backend');
    const data = await res.json();
    // backend already returns userName, correct, total, percentage
    return data.map(u => ({ userId: u.user_id || u.userId, userName: u.userName || u.display_name || (u.user_id || u.userId).substring(0,12), correct: u.correct, total: u.total, percentage: u.percentage }));
  } catch (err) {
    console.error('Erro ao buscar ranking:', err);
    return [];
  }
}

function getUserErrors(userId) {
  if (CURRENT_USER?.id && userId === CURRENT_USER.id && typeof window.getCurrentUserErrors === 'function') {
    return window.getCurrentUserErrors();
  }
  try {
    return JSON.parse(localStorage.getItem(`certifica_errors_${userId}`) || '{}');
  } catch {
    return {};
  }
}

/**
 * Renderizar resumo de métricas (TOPO do dashboard)
 */
function renderMetricsSummary(userId, stats) {
  const container = document.getElementById('dashboard-root');
  
  const html = [];
  html.push('<div class="card" style="background:linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(100, 150, 255, 0.15));padding:20px;margin-bottom:20px;border-radius:8px;">');
  html.push('<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;">');
  
  // Card 1: Total de Questões
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid #2196F3;">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:#4CAF50;">${stats.overall.total}</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Questões Respondidas</div>');
  html.push('</div>');
  
  // Card 2: Acertos
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid #4CAF50;">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:#4CAF50;">${stats.overall.correct}</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Acertos</div>');
  html.push('</div>');
  
  // Card 3: Acurácia %
  const acuracy = stats.overall.percentage;
  const acuracyColor = acuracy >= 80 ? '#4CAF50' : acuracy >= 60 ? '#FFC107' : '#FF5252';
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid ' + acuracyColor + ';">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:${acuracyColor};">${acuracy}%</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Taxa de Acerto</div>');
  html.push('</div>');
  
  // Card 4: Módulos Completos
  const modulosComDados = Object.values(stats.byModule).filter(m => m.total > 0).length;
  html.push('<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.05);border-radius:6px;border-left:4px solid #FF9800;">');
  html.push(`<div style="font-size:28px;font-weight:bold;color:#FF9800;">${modulosComDados}/8</div>`);
  html.push('<div style="font-size:12px;color:#aaa;margin-top:4px;">Módulos com Progresso</div>');
  html.push('</div>');
  
  html.push('</div>');
  html.push('</div>');
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  container.appendChild(wrapper.firstElementChild);
}

/**
 * Renderizar ranking de usuários (TOP 3)
 */
function renderRankingTable(currentUserId, ranking) {
  const container = document.getElementById('dashboard-root');
  
  const html = [];
  html.push('<div class="card" style="margin-bottom:20px;">');
  html.push('<h3>🏆 Ranking de Usuários (TOP 3)</h3>');
  
  if (!ranking || ranking.length === 0) {
    html.push('<p style="color:#aaa;">Sem dados de ranking ainda. Faça mais simulados!</p>');
    html.push('</div>');
  } else {
    html.push('<table class="table" style="width:100%;">');
    html.push('<thead><tr style="border-bottom:2px solid rgba(255,255,255,0.2);">');
    html.push('<th style="text-align:center;width:40px;">🥇</th>');
    html.push('<th>Usuário</th>');
    html.push('<th style="text-align:center;">Acertos</th>');
    html.push('<th style="text-align:center;">Total</th>');
    html.push('<th style="text-align:center;">Acurácia</th>');
    html.push('</tr></thead><tbody>');
    
    ranking.forEach((user, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
      const isCurrentUser = user.userId === currentUserId;
      const bgColor = isCurrentUser ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255,255,255,0.02)';
      const fontWeight = isCurrentUser ? 'bold' : 'normal';
      
      html.push(`<tr style="background:${bgColor};border-bottom:1px solid rgba(255,255,255,0.1);font-weight:${fontWeight};">`);
      html.push(`<td style="text-align:center;font-size:18px;">${medal}</td>`);
      html.push(`<td>${user.userName}${isCurrentUser ? ' (você)' : ''}</td>`);
      html.push(`<td style="text-align:center;">${user.correct}</td>`);
      html.push(`<td style="text-align:center;">${user.total}</td>`);
      html.push(`<td style="text-align:center;font-weight:700;color:#4CAF50;">${user.percentage}%</td>`);
      html.push('</tr>');
    });
    
    html.push('</tbody></table>');
    html.push('</div>');
  }
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  container.appendChild(wrapper.firstElementChild);
}


function sortChallengingQuestions(errors) {
  return Object.entries(errors)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
}

function renderChallengingList(userId) {
  const container = document.getElementById('dashboard-root');
  if (!container) return;

  const errors = getUserErrors(userId);
  const list = sortChallengingQuestions(errors);

  const html = [];
  html.push('<div class="card">');
  html.push('<h3>Questões Desafiadoras</h3>');

  if (!list.length) {
    html.push('<p>Nenhuma questão com histórico de erros ainda. Faça alguns simulados para preencher esta lista.</p>');
  } else {
    html.push('<table class="table"><thead><tr><th>Questão</th><th>Erros</th><th>Ação</th></tr></thead><tbody>');
    list.forEach(item => {
      const moduleIdMatch = item.id.match(/m(\d+)_/i);
      const moduleId = moduleIdMatch ? Number(moduleIdMatch[1]) : null;
      html.push(`<tr><td><code>${item.id}</code></td><td>${item.count}</td><td><button class="btn btn-secondary" data-module="${moduleId}" data-refazer="true">Refazer</button></td></tr>`);
    });
    html.push('</tbody></table>');
  }

  html.push('</div>');
  container.innerHTML = html.join('');

  container.querySelectorAll('button[data-refazer="true"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleId = Number(btn.dataset.module);
      if (moduleId) {
        window.gerarSimulado(moduleId, true);
      }
    });
  });
}

/**
 * Calcular percentual de acerto por módulo
 * @param {string} userId - ID do usuário
 * @param {Array} allProvas - Lista de todas as provas
 * @returns {Object} { byModule: {1: {correct, total, pct}, ...}, overall: {...} }
 */
function calculateModuleStats(userId, allProvas) {
  const errors = getUserErrors(userId);
  const stats = {
    byModule: {},
    overall: { correct: 0, total: 0, percentage: 0 }
  };

  // Inicializar módulos 1-8
  for (let i = 1; i <= 8; i++) {
    stats.byModule[i] = { correct: 0, total: 0, percentage: 0, errorCount: 0 };
  }

  // Contar erros por módulo
  Object.keys(errors).forEach(questionId => {
    const prova = allProvas.find(p => p.id === questionId);
    if (prova) {
      const module = Number(prova.modulo);
      if (stats.byModule[module]) {
        stats.byModule[module].errorCount += errors[questionId];
      }
    }
  });

  // Estimar acertos (simplificado: assumir 2 tentativas por questão errada)
  allProvas.forEach(prova => {
    const module = Number(prova.modulo);
    if (stats.byModule[module]) {
      stats.byModule[module].total += 1;
      
      if (errors[prova.id]) {
        // Se está em erros, consideramos que acertou (1 vez) e errou (X vezes)
        stats.byModule[module].correct += 1;
      } else {
        // Se não tem histórico, assumir que fez certo
        stats.byModule[module].correct += 1;
      }
    }
  });

  // Calcular percentuais
  Object.keys(stats.byModule).forEach(moduleId => {
    const mod = stats.byModule[moduleId];
    mod.percentage = mod.total > 0 ? Math.round((mod.correct / mod.total) * 100) : 0;
    stats.overall.correct += mod.correct;
    stats.overall.total += mod.total;
  });

  stats.overall.percentage = stats.overall.total > 0 
    ? Math.round((stats.overall.correct / stats.overall.total) * 100) 
    : 0;

  return stats;
}

/**
 * Buscar questões erradas de um módulo específico
 */
function getModuleErrors(userId, moduleId, allProvas) {
  const errors = getUserErrors(userId);
  const errorQuestions = [];
  
  allProvas.forEach(prova => {
    if (Number(prova.modulo) === moduleId && errors[prova.id]) {
      errorQuestions.push({
        id: prova.id,
        titulo: prova.titulo || prova.pergunta || 'Questão sem título',
        erros: errors[prova.id],
        opcoes: prova.opcoes || [],
        respostaCorreta: prova.respostaCorreta || prova.resposta || null
      });
    }
  });
  
  return errorQuestions.sort((a, b) => b.erros - a.erros);
}

/**
 * Renderizar detalhes de erros de um módulo em uma SIDEBAR
 */
function renderModuleErrorsDetail(userId, moduleId, allProvas) {
  const errorQuestions = getModuleErrors(userId, moduleId, allProvas);
  const stats = calculateModuleStats(userId, allProvas);
  const modStats = stats.byModule[moduleId];
  
  const sidebar = document.getElementById('module-sidebar');
  const title = document.getElementById('sidebar-title');
  const body = document.getElementById('sidebar-body');
  
  // Atualizar título
  title.textContent = `Módulo ${moduleId} — Detalhes`;
  
  // Construir conteúdo
  const html = [];
  
  // Estatísticas do módulo no topo
  html.push('<div class="module-stats">');
  html.push(`<div class="stat-item"><div class="stat-value" style="color: #4CAF50;">${modStats.correct}</div><div class="stat-label">Acertos</div></div>`);
  
  const erradas = modStats.total - modStats.correct;
  html.push(`<div class="stat-item"><div class="stat-value" style="color: #FF5722;">${erradas}</div><div class="stat-label">Erros</div></div>`);
  
  html.push(`<div class="stat-item"><div class="stat-value" style="color: #FFC107;">${modStats.percentage}%</div><div class="stat-label">Taxa</div></div>`);
  html.push('</div>');
  
  // Lista de questões com erros
  if (errorQuestions.length > 0) {
    html.push(`<div style="margin-bottom: 12px;"><strong style="font-size: 0.95rem; display: block; margin-bottom: 8px; color: #FF9800;">❌ Questões com Erros (${errorQuestions.length})</strong></div>`);
    
    errorQuestions.forEach((q, idx) => {
      html.push(`<div class="error-question-item">`);
      
      html.push(`<div class="error-question-header">`);
      html.push(`<span class="error-question-number">#${idx + 1}</span>`);
      html.push(`<span class="error-count">${q.erros}x erros</span>`);
      html.push('</div>');
      
      html.push(`<div class="error-question-title">${q.titulo}</div>`);
      html.push(`<div class="error-question-id">ID: ${q.id}</div>`);
      
      html.push(`<div class="error-action-buttons">`);
      html.push(`<button class="btn-refazer" onclick="refazerQuestaoEspecifica('${q.id}', ${moduleId})">🔄 Refazer</button>`);
      html.push('</div>');
      
      html.push('</div>');
    });
  } else {
    html.push(`<div style="padding: 16px; background: rgba(76, 175, 80, 0.1); border-radius: 8px; border-left: 4px solid #4CAF50; text-align: center; color: #A5D6A7;">`);
    html.push(`<strong>✅ Parabéns!</strong><br>Você acertou todas as questões deste módulo!`);
    html.push('</div>');
  }
  
  // Botões de ação finais
  html.push(`<div style="display: flex; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">`);
  html.push(`<button class="btn btn-secondary" onclick="refazerModulo(${moduleId}, 'errors')" style="flex: 1; background: #FF9800; color: white; border: none; padding: 10px;">🔄 Refazer Erros</button>`);
  html.push(`<button class="btn btn-primary" onclick="refazerModulo(${moduleId}, 'all')" style="flex: 1; background: #2196F3; color: white; border: none; padding: 10px;">📚 Refazer Tudo</button>`);
  html.push('</div>');
  
  body.innerHTML = html.join('');
  
  // Mostrar sidebar com animação
  sidebar.style.display = 'flex';
}

/**
 * Renderizar tabela de desempenho por módulo com barras de progresso
 */
function renderModuleStatsTable(userId, allProvas) {
  const container = document.getElementById('dashboard-root');
  const stats = calculateModuleStats(userId, allProvas);

  const html = [];
  html.push('<div class="card">');
  html.push('<h3 style="margin-bottom:20px;">📊 Análise por Módulo</h3>');
  html.push('<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;">');

  for (let i = 1; i <= 8; i++) {
    const mod = stats.byModule[i];
    const totalRespondidas = mod.total;
    const acertos = mod.correct;
    const errados = Math.max(0, mod.total - mod.correct);
    const percentual = mod.percentage;
    
    // Cores baseadas no percentual
    const progressColor = percentual >= 80 ? '#4CAF50' :
                         percentual >= 60 ? '#FFC107' :
                         percentual > 0 ? '#FF9800' : '#999';
    
    const statusEmoji = percentual >= 80 ? '✅' :
                       percentual >= 60 ? '🟡' :
                       percentual > 0 ? '⚠️' : '⏳';
    
    html.push(`<div class="card" style="background:rgba(255,255,255,0.05);border-left:4px solid ${progressColor};padding:16px;cursor:pointer;transition:all 0.3s;" onclick="abrirSidebarModulo(${i})">`);
    
    // Header do módulo
    html.push(`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">`);
    html.push(`<h4 style="margin:0;">Módulo ${i}</h4>`);
    html.push(`<span style="font-size:20px;">${statusEmoji}</span>`);
    html.push('</div>');
    
    // Barra de progresso
    html.push(`<div style="background:rgba(255,255,255,0.1);height:8px;border-radius:4px;overflow:hidden;margin-bottom:12px;">`);
    html.push(`<div style="height:100%;width:${Math.min(100, percentual)}%;background:linear-gradient(90deg, ${progressColor}, ${progressColor}dd);transition:width 0.3s;"></div>`);
    html.push('</div>');
    
    // Estatísticas
    html.push(`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;font-size:13px;">`);
    html.push(`<div style="background:rgba(76,175,80,0.15);padding:8px;border-radius:4px;text-align:center;border-left:3px solid #4CAF50;">`);
    html.push(`<div style="font-weight:bold;color:#4CAF50;">${acertos}</div>`);
    html.push(`<div style="color:#aaa;font-size:11px;">Acertos</div>`);
    html.push('</div>');
    
    html.push(`<div style="background:rgba(255,87,34,0.15);padding:8px;border-radius:4px;text-align:center;border-left:3px solid #FF5722;">`);
    html.push(`<div style="font-weight:bold;color:#FF5722;">${errados}</div>`);
    html.push(`<div style="color:#aaa;font-size:11px;">Erros</div>`);
    html.push('</div>');
    html.push('</div>');
    
    // Percentual grande
    html.push(`<div style="text-align:center;padding:12px;background:rgba(255,255,255,0.07);border-radius:4px;margin-bottom:12px;border-left:4px solid ${progressColor};">`);
    html.push(`<div style="font-size:28px;font-weight:bold;color:${progressColor};">${percentual}%</div>`);
    html.push(`<div style="font-size:12px;color:#aaa;">Taxa de Acerto</div>`);
    html.push('</div>');
    
    // Status de respostas
    html.push(`<div style="font-size:12px;color:#bbb;margin-bottom:12px;">`);
    if (totalRespondidas === 0) {
      html.push(`Nenhuma questão respondida ainda`);
    } else {
      html.push(`${totalRespondidas} questão${totalRespondidas !== 1 ? 's' : ''} respondida${totalRespondidas !== 1 ? 's' : ''}`);
    }
    html.push('</div>');
    
    // Botão de ação
    html.push(`<button class="btn" style="width:100%;background:${progressColor};padding:10px;" onclick="renderModuleErrorsDetail('${userId}', ${i}, window.allProvasGlobal); event.stopPropagation();">📋 Ver Detalhes</button>`);
    
    html.push('</div>');
  }

  html.push('</div>');
  html.push('<div style="margin-top:20px;padding:14px;background:rgba(76, 175, 80, 0.1);border-radius:6px;border-left:4px solid #4CAF50;">');
  html.push(`<strong>📈 Desempenho Geral:</strong> <span style="color:#4CAF50;font-weight:700;font-size:18px;">${stats.overall.percentage}%</span> `);
  html.push(`<span style="color:#aaa;">(${stats.overall.correct} acertos de ${stats.overall.total} questões)</span>`);
  html.push('</div>');
  html.push('</div>');

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  container.insertBefore(wrapper.firstElementChild, container.firstChild.nextSibling);
}

/**
 * Funções de ação para refazer questões e módulos
 */
window.refazerQuestaoEspecifica = function(questionId, moduleId) {
  alert(`Refazer questão: ${questionId}\n(Implementar redirecionamento para simulado com essa questão)`);
};

window.refazerModulo = function(moduleId, tipo) {
  if (typeof gerarSimulado === 'function') {
    if (tipo === 'errors') {
      alert(`Refazer apenas erros do Módulo ${moduleId}`);
      // Implementar lógica para gerar simulado apenas com questões erradas
    } else {
      gerarSimulado(moduleId, false);
    }
  }
};

/**
 * Função auxiliar para abrir a sidebar com detalhes do módulo
 */
window.abrirSidebarModulo = function(moduleId) {
  const userId = CURRENT_USER?.id || 'unknown';
  renderModuleErrorsDetail(userId, moduleId, window.allProvasGlobal);
};

/**
 * Renderizar recomendações personalizadas
 */
function renderRecommendations(userId, allProvas) {
  const container = document.getElementById('dashboard-root');
  const stats = calculateModuleStats(userId, allProvas);

  const modulesBaixo = Object.keys(stats.byModule)
    .filter(mid => stats.byModule[mid].percentage > 0 && stats.byModule[mid].percentage < 70)
    .sort((a, b) => stats.byModule[a].percentage - stats.byModule[b].percentage);

  const modulesAlto = Object.keys(stats.byModule)
    .filter(mid => stats.byModule[mid].percentage >= 80)
    .sort((a, b) => stats.byModule[b].percentage - stats.byModule[a].percentage);

  const html = [];
  html.push('<div class="card" style="background:linear-gradient(135deg, rgba(100,200,255,0.1), rgba(150,150,255,0.1));border-left:4px solid #2196F3;">');
  html.push('<h3>💡 Recomendações Personalizadas</h3>');

  if (stats.overall.total === 0) {
    html.push('<p>👋 Bem-vindo! Comece fazendo simulados para receber recomendações.</p>');
  } else {
    if (modulesAlto.length > 0) {
      html.push(`<p>🌟 <strong>Excelente trabalho!</strong> Você está indo muito bem em:`);
      modulesAlto.forEach(mid => {
        html.push(`<br/> • Módulo ${mid} (${stats.byModule[mid].percentage}%)`);
      });
      html.push('</p>');
    }

    if (modulesBaixo.length > 0) {
      html.push(`<p>📚 <strong>Foco em:</strong> Revise estes módulos com baixo desempenho:`);
      modulesBaixo.forEach(mid => {
        html.push(`<br/> • <strong>Módulo ${mid}</strong> (${stats.byModule[mid].percentage}%) `);
        html.push(`<button class="btn btn-secondary" style="padding:4px 8px;font-size:0.85em;" data-module="${mid}" data-refazer="true">Refazer</button>`);
      });
      html.push('</p>');
    }

    const progressPercent = Math.round((stats.overall.percentage / 100) * 100);
    html.push('<div style="margin-top:12px;">');
    html.push(`<p><strong>Progresso Geral: ${progressPercent}%</strong></p>`);
    html.push(`<div style="width:100%;height:8px;background:#333;border-radius:4px;overflow:hidden;">`);
    html.push(`<div style="width:${progressPercent}%;height:100%;background:#4CAF50;transition:width 0.3s;"></div>`);
    html.push('</div>');
    html.push('</div>');
  }

  html.push('</div>');

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.join('');
  const rec = wrapper.firstElementChild;
  container.insertBefore(rec, container.firstChild);

  // Bind buttons
  rec.querySelectorAll('button[data-refazer="true"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleId = Number(btn.dataset.module);
      if (moduleId && typeof gerarSimulado === 'function') {
        gerarSimulado(moduleId, true);
      }
    });
  });
}

function renderRadarChart(data) {
  data = data || { labels: [], values: [] };
  const canvasId = 'dashboard-radar';
  let canvas = document.getElementById(canvasId);
  if (!canvas) {
    const container = document.getElementById('dashboard-root');
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '24px';
    wrapper.innerHTML = `<div class="card"><h3>Dificuldade por módulo</h3><canvas id="${canvasId}" style="width:100%;height:260px"></canvas></div>`;
    container.appendChild(wrapper);
    canvas = document.getElementById(canvasId);
  }

  new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Dificuldade (%)',
        data: data.values,
        backgroundColor: 'rgba(255, 77, 77, 0.25)',
        borderColor: 'rgba(255, 77, 77, 0.9)',
        pointBackgroundColor: 'rgba(255, 255, 255, 0.85)'
      }]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255,255,255,0.15)'
          },
          angleLines: {
            color: 'rgba(255,255,255,0.12)'
          },
          pointLabels: {
            color: '#ddd'
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

async function initDashboard() {
  if (!CURRENT_USER) return;

  try {
    const container = document.getElementById('dashboard-root');
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';

    // Adicionar loading
    container.innerHTML = '<div class="card"><p>⏳ Carregando dashboard...</p></div>';

    // Carregar dados
    const allProvas = await loadProvas();
    window.allProvasGlobal = allProvas; // Guardar globalmente para acesso nos detalhes
    
    const stats = calculateModuleStats(CURRENT_USER.id, allProvas);
    const ranking = await fetchRanking();

    // Limpar de novo
    container.innerHTML = '';

    // ==== RENDERIZAR EM ORDEM ====
    
    // 1. RESUMO DE MÉTRICAS (topo)
    renderMetricsSummary(CURRENT_USER.id, stats);
    
    // 2. RANKING DE USUÁRIOS
    renderRankingTable(CURRENT_USER.id, ranking);
    
    // 3. DESEMPENHO POR MÓDULO (novo layout com cards clicáveis)
    renderModuleStatsTable(CURRENT_USER.id, allProvas);
    
    // 4. RECOMENDAÇÕES
    renderRecommendations(CURRENT_USER.id, allProvas);
    
    // 5. QUESTÕES DESAFIADORAS
    renderChallengingList(CURRENT_USER.id);
    
    // 6. GRÁFICO RADAR (se disponível)
    const metrics = await fetchUserMetrics(CURRENT_USER.id);
    if (metrics && metrics.grafico_radar) {
      renderRadarChart(metrics.grafico_radar);
    }

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    document.getElementById('dashboard-root').innerHTML = `
      <div class="card" style="background:rgba(200, 40, 40, 0.1);border-left:4px solid #c62828;color:#ffcdd2;">
        <h3>❌ Erro ao carregar dashboard</h3>
        <p>${error.message || 'Verifique sua conexão e tente novamente.'}</p>
      </div>
    `;
  }
}

window.initDashboard = initDashboard;
