/*
  dashboard-v2.js - Dashboard Interativo com Gráficos, Ranking e Análises
  
  COMPONENTS:
  1. Ranking (TOP 3)
  2. Métricas gerais
  3. Gráficos (Pizza, Radar, Barras)
  4. Módulos com bolinhas de progresso
  5. Tabela de análise detalhada
*/

// ========== DADOS AUXILIARES ==========

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

function getUserProgress(userId) {
  if (CURRENT_USER?.id && userId === CURRENT_USER.id && typeof window.getCurrentUserProgress === 'function') {
    return window.getCurrentUserProgress();
  }
  try {
    return JSON.parse(localStorage.getItem(`certifica_progress_${userId}`) || '{}');
  } catch {
    return {};
  }
}

const OFFICIAL_EXAMS_BASE_PATH_SAFE = 'data/modules/conteudos e provas/Hyperautomation/Simulados e Quest\u00f5es';
const OFFICIAL_EXAMS_JSON_PATH = 'data/official-exams/simulados_oficiais.json';
const OFFICIAL_EXAMS = [
  { title: 'Simulado V1', file: 'SimuladoV1.md', version: 'V1', kind: 'Simulado oficial' },
  { title: 'Simulado V2', file: 'Simulado V2.md', version: 'V2', kind: 'Simulado oficial' },
  { title: 'Simulado V3', file: 'Simulado V3.md', version: 'V3', kind: 'Simulado oficial' },
  { title: 'Simulado V4', file: 'Simulado V4.md', version: 'V4', kind: 'Simulado oficial' },
];
let selectedOfficialExamFilter = 'Todas';
const SIMULADO_EXAMS = OFFICIAL_EXAMS.filter(item => /simulado/i.test(item.title) || /simulado/i.test(item.file));
const SIMULADO_EXAM_FILTERS = ['Todas', ...new Set(SIMULADO_EXAMS.map(item => item.version))];
const OFFICIAL_EXAM_CATALOG = {};
let OFFICIAL_EXAM_PROGRESS_REMOTE = null;
let isLoadingOfficialCatalog = false;
let isOfficialCatalogLoaded = false;
const dashboardCharts = {
  acertosErros: null,
  radar: null,
  barras: null
};

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function markdownToHtmlSafe(markdown) {
  if (window.ModuleViewer && typeof window.ModuleViewer.markdownToHtml === 'function') {
    return window.ModuleViewer.markdownToHtml(markdown);
  }
  return `<pre style="white-space:pre-wrap;line-height:1.5;">${escapeHtml(markdown)}</pre>`;
}

function getOfficialExamStatsKey(userId) {
  if (!userId) return null;
  return `certifica_official_exam_stats_${userId}`;
}

function loadOfficialExamStats(userId) {
  const key = getOfficialExamStatsKey(userId);
  if (!key) return {};
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

function saveOfficialExamStats(userId, stats) {
  const key = getOfficialExamStatsKey(userId);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(stats));
}

function formatAttemptDate(isoDate) {
  if (!isoDate) return 'Nunca tentado';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'Nunca tentado';
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function formatLastAccess(isoDate) {
  if (!isoDate) return 'Sem acesso';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'Sem acesso';
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function countOfficialQuestionsInMarkdown(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  let count = 0;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^(?:#{1,6}\s*)?(?:question\s*)?\*{0,2}(\d+)[\.\)]?\*{0,2}\s*(.*)$/i.test(line)) {
      count += 1;
    }
  }
  return count;
}

function resolveOfficialCorrectOption(rawAnswer, options) {
  const answerText = String(rawAnswer || '').replace(/[*`>_]/g, '').trim();
  if (!answerText) return [];

  const letterMatches = answerText.match(/\b([A-E])\b/gi);
  if (letterMatches?.length) {
    const mapped = letterMatches
      .map(letter => {
        const optionIndex = letter.toUpperCase().charCodeAt(0) - 65;
        return options[optionIndex] || null;
      })
      .filter(Boolean);
    return [...new Set(mapped)];
  }

  const exactOption = options.find(opt => String(opt).trim() === answerText);
  if (exactOption) return [exactOption];

  return [answerText];
}

function parseOfficialExamMarkdown(markdown, fileName) {
  const lines = String(markdown || '').split(/\r?\n/);
  const questions = [];
  let current = null;
  let mode = null;

  const flushCurrent = () => {
    if (!current || !current.pergunta || !current.opcoes.length || !current.correta_texto) return;
    const correctOptions = resolveOfficialCorrectOption(current.correta_texto, current.opcoes);
    questions.push({
      id: `official:${fileName}:${current.numero}`,
      modulo: 9,
      pergunta: current.pergunta,
      opcoes: current.opcoes,
      correta_texto: correctOptions[0] || '',
      corretas_texto: correctOptions,
      is_multipla: correctOptions.length > 1,
      justificativa: current.justificativa || '',
    });
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line === '---') continue;

    const qMatch = line.match(/^(?:#{1,6}\s*)?(?:question\s*)?\*{0,2}(\d+)[\.\)]?\*{0,2}\s*(.*)$/i);
    if (qMatch) {
      flushCurrent();
      current = {
        numero: Number(qMatch[1]),
        pergunta: (qMatch[2] || '').trim(),
        opcoes: [],
        correta_texto: '',
        justificativa: ''
      };
      mode = 'question';
      continue;
    }

    if (!current) continue;

    const optionMatch = line.match(/^([A-E])[\.\)]\s+(.+)$/i);
    if (optionMatch) {
      current.opcoes.push(optionMatch[2].trim());
      mode = null;
      continue;
    }

    const answerMatch = line.match(/^(?:>\s*)?\*{0,2}(Correct Answers?|Answers?|Resposta(?:s)?(?:\s+Correta(?:s)?)?)\*{0,2}:\s*(.+)$/i);
    if (answerMatch) {
      current.correta_texto = answerMatch[2].trim();
      mode = null;
      continue;
    }

    const explanationMatch = line.match(/^(?:>\s*)?\*{0,2}(Explanation|Explicaç[ãa]o|Justificativa)\*{0,2}:\s*(.*)$/i);
    if (explanationMatch) {
      current.justificativa = explanationMatch[2].trim();
      mode = 'justification';
      continue;
    }

    if (mode === 'question' && !current.pergunta) {
      current.pergunta = line.replace(/^(\*\*)?/, '').replace(/(\*\*)?$/, '').trim();
      continue;
    }

    if (mode === 'justification') {
      current.justificativa = `${current.justificativa} ${line}`.trim();
    }
  }

  flushCurrent();
  return questions;
}

async function loadOfficialExamCatalog() {
  if (isOfficialCatalogLoaded || isLoadingOfficialCatalog) return;
  isLoadingOfficialCatalog = true;

  try {
    try {
      const jsonResponse = await fetch(OFFICIAL_EXAMS_JSON_PATH);
      if (jsonResponse.ok) {
        const payload = await jsonResponse.json();
        const exams = Array.isArray(payload?.exams) ? payload.exams : [];
        exams.forEach((exam) => {
          const questions = Array.isArray(exam.questions)
            ? exam.questions.map((q, index) => ({
                id: q.id || `official:${exam.file}:${index + 1}`,
                modulo: Number(q.module || 9),
                pergunta: q.question || '',
                opcoes: Array.isArray(q.options) ? q.options : [],
                correta_texto: Array.isArray(q.correctOptions) ? (q.correctOptions[0] || '') : (q.correctText || ''),
                corretas_texto: Array.isArray(q.correctOptions) ? q.correctOptions : (q.correctText ? [q.correctText] : []),
                is_multipla: Array.isArray(q.correctOptions) ? q.correctOptions.length > 1 : false,
                justificativa: q.explanation || '',
              })).filter(q => q.pergunta && q.opcoes.length && q.correta_texto)
            : [];

          OFFICIAL_EXAM_CATALOG[exam.file] = {
            title: exam.title,
            markdown: '',
            questions,
            totalQuestions: Number(exam.totalQuestions || questions.length || 0),
          };
        });

        if (Object.keys(OFFICIAL_EXAM_CATALOG).length > 0) {
          isOfficialCatalogLoaded = true;
          return;
        }
      }
    } catch (jsonError) {
      console.warn('Falha ao carregar JSON dos simulados oficiais. Usando Markdown.', jsonError);
    }

    await Promise.all(SIMULADO_EXAMS.map(async (item) => {
      if (OFFICIAL_EXAM_CATALOG[item.file]) return;

      try {
        const url = encodeURI(`${OFFICIAL_EXAMS_BASE_PATH_SAFE}/${item.file}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const markdown = await response.text();

        const questions = parseOfficialExamMarkdown(markdown, item.file);
        const totalQuestions = questions.length || countOfficialQuestionsInMarkdown(markdown);

        OFFICIAL_EXAM_CATALOG[item.file] = {
          title: item.title,
          markdown,
          questions,
          totalQuestions,
        };
      } catch (error) {
        console.warn(`Falha ao carregar catálogo do simulado ${item.file}:`, error);
        OFFICIAL_EXAM_CATALOG[item.file] = {
          title: item.title,
          markdown: '',
          questions: [],
          totalQuestions: 0,
          error: true,
        };
      }
    }));
  } finally {
    isLoadingOfficialCatalog = false;
    isOfficialCatalogLoaded = true;
  }
}

async function startOfficialExam(file, title) {
  try {
    if (!isOfficialCatalogLoaded) {
      await loadOfficialExamCatalog();
    }

    let questions = OFFICIAL_EXAM_CATALOG[file]?.questions || [];
    if (!questions.length) {
      const url = encodeURI(`${OFFICIAL_EXAMS_BASE_PATH_SAFE}/${file}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      questions = parseOfficialExamMarkdown(markdown, file);
      OFFICIAL_EXAM_CATALOG[file] = {
        title,
        markdown,
        questions,
        totalQuestions: questions.length || countOfficialQuestionsInMarkdown(markdown),
      };
    }
    if (!questions.length) {
      alert(`Não foi possível identificar questões em "${title}".`);
      return;
    }

    if (typeof renderExamModal !== 'function') {
      alert('Motor de simulado indisponível no momento.');
      return;
    }

    renderExamModal(`Oficial • ${title}`, questions, {
      onComplete: (result) => {
        const userId = CURRENT_USER?.id;
        if (!userId) return;
        const stats = loadOfficialExamStats(userId);
        stats[file] = {
          score: Number(result?.score || 0),
          lastAttemptAt: new Date().toISOString(),
          totalQuestions: OFFICIAL_EXAM_CATALOG[file]?.totalQuestions || questions.length,
          title,
        };
        saveOfficialExamStats(userId, stats);
        fetchOfficialExamProgress(userId).then((payload) => {
          OFFICIAL_EXAM_PROGRESS_REMOTE = payload?.progress || OFFICIAL_EXAM_PROGRESS_REMOTE;
          renderOfficialExams();
        });
        renderOfficialExams();
      }
    });
  } catch (error) {
    console.error('Erro ao iniciar simulado oficial:', error);
    alert(`Não foi possível iniciar ${title}.`);
  }
}

async function openOfficialExam(file, title) {
  try {
    const url = encodeURI(`${OFFICIAL_EXAMS_BASE_PATH_SAFE}/${file}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    const htmlContent = markdownToHtmlSafe(markdown);

    if (typeof openModal === 'function') {
      openModal(`
        <div style="max-height:70vh;overflow-y:auto;padding-bottom:16px;">
          <div style="padding:16px;border-bottom:1px solid #eee;margin-bottom:16px;">
            <h2 style="margin:0;color:#0066cc;">SIMULADOS OFICIAIS</h2>
            <p style="margin:4px 0;color:#666;font-size:0.9em;">${escapeHtml(title)}</p>
          </div>
          <div style="padding:0 16px;line-height:1.6;">
            ${htmlContent}
          </div>
        </div>
        <div style="padding-top:16px;border-top:1px solid #eee;margin-top:16px;display:flex;justify-content:flex-end;">
          <button class="btn btn-secondary" onclick="closeModal()">Fechar</button>
        </div>
      `);
    }
  } catch (error) {
    console.error('Erro ao abrir prova oficial:', error);
    alert(`Não foi possível abrir ${title}.`);
  }
}

function renderOfficialExamsLegacy() {
  const container = document.getElementById('official-exams-container');
  if (!container) return;

  const html = OFFICIAL_EXAMS.map(item => `
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:10px;">
      <div style="font-weight:700;color:#fff;">${escapeHtml(item.title)}</div>
      <div style="font-size:0.82rem;color:#bbb;">${escapeHtml(item.kind)} • ${escapeHtml(item.version)}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary" data-official-open="true" data-file="${escapeHtml(item.file)}" data-title="${escapeHtml(item.title)}">Abrir</button>
        <a class="btn btn-secondary" href="${encodeURI(`${OFFICIAL_EXAMS_BASE_PATH_SAFE}/${item.file}`)}" target="_blank" rel="noopener noreferrer">Nova guia</a>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;

  container.querySelectorAll('button[data-official-open="true"]').forEach(btn => {
    btn.addEventListener('click', () => {
      openOfficialExam(btn.dataset.file, btn.dataset.title);
    });
  });
}

/**
 * Busca ranking de usuários (TOP 3) do Supabase
 */
// Override com filtros por versão para melhorar navegação das provas oficiais
function renderOfficialExams() {
  const container = document.getElementById('official-exams-container');
  if (!container) return;
  if (!isOfficialCatalogLoaded && !isLoadingOfficialCatalog) {
    loadOfficialExamCatalog()
      .then(() => renderOfficialExams())
      .catch((error) => console.warn('Falha ao atualizar catálogo de simulados oficiais:', error));
  }
  const userId = CURRENT_USER?.id;
  const officialStats = loadOfficialExamStats(userId);
  const currentName = document.getElementById('user-name')?.textContent || 'Usuario';
  if (!OFFICIAL_EXAM_PROGRESS_REMOTE && userId) {
    fetchOfficialExamProgress(userId).then((payload) => {
      OFFICIAL_EXAM_PROGRESS_REMOTE = payload?.progress || {};
      renderOfficialExams();
    });
  }

  const filtersHtml = SIMULADO_EXAM_FILTERS.map(filter => `
    <button
      type="button"
      data-official-filter="${escapeHtml(filter)}"
      class="btn ${selectedOfficialExamFilter === filter ? 'btn-primary' : 'btn-secondary'}"
      style="padding:6px 12px;font-size:0.82rem;"
    >
      ${escapeHtml(filter)}
    </button>
  `).join('');

  const filteredExams = selectedOfficialExamFilter === 'Todas'
    ? SIMULADO_EXAMS
    : SIMULADO_EXAMS.filter(item => item.version === selectedOfficialExamFilter);

  const cardsHtml = filteredExams.map(item => {
    const catalogQuestions = OFFICIAL_EXAM_CATALOG[item.file]?.totalQuestions;
    const questionsLabel = parseInt(
      (officialStats[item.file]?.totalQuestions || catalogQuestions || item.totalQuestions || 0),
      10
    ) || (isLoadingOfficialCatalog ? 'Carregando...' : '--');
    const remote = OFFICIAL_EXAM_PROGRESS_REMOTE?.[item.file];
    const progressPercent = remote?.percentage ?? (officialStats[item.file]?.score ?? 0);
    const lastAccess = remote?.last_access || officialStats[item.file]?.lastAttemptAt || null;
    return `
    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:10px;">
      <div style="font-weight:700;color:#fff;">${escapeHtml(item.title)}</div>
      <div style="font-size:0.82rem;color:#bbb;">${escapeHtml(item.kind)} • ${escapeHtml(item.version)}</div>
      <div style="font-size:0.78rem;color:#9fb3d7;">
        Nome: <strong style="color:#fff;">${escapeHtml(currentName)}</strong><br>
        Questões: ${questionsLabel}<br>
        Progresso: <strong style="color:#8ef3a1;">${progressPercent}%</strong><br>
        Último acesso: ${escapeHtml(formatAttemptDate(lastAccess))}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary" data-official-start="true" data-file="${escapeHtml(item.file)}" data-title="${escapeHtml(item.title)}">Iniciar</button>
      </div>
    </div>
  `;
  }).join('');

  container.innerHTML = `
    <div style="grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px;">
      ${filtersHtml}
    </div>
    ${cardsHtml || '<p style="color:#aaa;grid-column:1/-1;">Nenhum arquivo encontrado para esta versão.</p>'}
  `;

  container.querySelectorAll('button[data-official-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedOfficialExamFilter = btn.dataset.officialFilter || 'Todas';
      renderOfficialExams();
    });
  });

  container.querySelectorAll('button[data-official-start="true"]').forEach(btn => {
    btn.addEventListener('click', () => {
      startOfficialExam(btn.dataset.file, btn.dataset.title);
    });
  });
}

async function fetchRanking() {
  try {
    const API_BASE = document.querySelector('meta[name="api-base-url"]')?.content || '';
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/ranking?limit=0`);
    if (!res.ok) throw new Error('Falha ao buscar ranking do backend');
    const data = await res.json();
    return data.map(u => ({
      userId: u.user_id || u.userId,
      userName: u.userName || u.display_name || (u.user_id || u.userId).substring(0,12),
      correct: u.correct,
      total: u.total,
      percentage: u.percentage,
      progress: u.progress_percentage ?? 0,
      lastAccess: u.last_access || null
    }));
  } catch (err) {
    console.error('Erro ao buscar ranking:', err);
    return [];
  }
}

async function getAuthHeadersForPublicProgress() {
  try {
    if (typeof window.getSupabaseClient !== 'function') return {};
    const supabase = window.getSupabaseClient();
    if (!supabase) return {};
    const { data } = await supabase.auth.getSession();
    const accessToken = data?.session?.access_token;
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  } catch (err) {
    console.warn('Falha ao obter token para progresso público:', err);
    return {};
  }
}

async function fetchPublicProgress(userId) {
  try {
    const API_BASE = document.querySelector('meta[name="api-base-url"]')?.content || '';
    const headers = await getAuthHeadersForPublicProgress();
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/public-progress/${encodeURIComponent(userId)}`, { headers });
    if (!res.ok) throw new Error('Falha ao buscar progresso público');
    return await res.json();
  } catch (err) {
    console.error('Erro ao buscar progresso público:', err);
    return null;
  }
}

async function fetchOfficialExamProgress(userId) {
  try {
    if (!userId) return null;
    const API_BASE = document.querySelector('meta[name="api-base-url"]')?.content || '';
    const headers = await getAuthHeadersForPublicProgress();
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/official-exams/progress/${encodeURIComponent(userId)}`, { headers });
    if (!res.ok) throw new Error('Falha ao buscar progresso de simulados oficiais');
    return await res.json();
  } catch (err) {
    console.warn('Nao foi possivel buscar progresso remoto dos simulados oficiais:', err);
    return null;
  }
}

async function fetchUserMetrics(userId) {
  try {
    if (!userId) return null;
    const API_BASE = document.querySelector('meta[name="api-base-url"]')?.content || '';
    const headers = await getAuthHeadersForPublicProgress();
    const res = await fetch(`${API_BASE.replace(/\/$/, '')}/api/metrics/${encodeURIComponent(userId)}`, { headers });
    if (!res.ok) throw new Error('Falha ao buscar metricas do usuario');
    return await res.json();
  } catch (err) {
    console.warn('Nao foi possivel buscar metricas remotas:', err);
    return null;
  }
}

function buildStatsFromBackend(metrics, allProvas) {
  const stats = {
    byModule: {},
    overall: { correct: 0, total: 0, attempted: 0, percentage: 0 }
  };

  const totalByModule = {};
  (allProvas || []).forEach(prova => {
    const mod = Number(prova.modulo);
    if (!totalByModule[mod]) totalByModule[mod] = 0;
    totalByModule[mod] += 1;
  });

  const byModuleMap = {};
  (metrics?.per_module || []).forEach(item => {
    const mod = Number(item.module);
    if (!Number.isNaN(mod)) {
      byModuleMap[mod] = {
        total: Number(item.total || 0),
        errors: Number(item.errors || 0)
      };
    }
  });

  for (let i = 1; i <= 8; i++) {
    const totalQuestions = totalByModule[i] || 0;
    const attempted = byModuleMap[i]?.total || 0;
    const errors = byModuleMap[i]?.errors || 0;
    const correct = Math.max(attempted - errors, 0);

    stats.byModule[i] = {
      total: totalQuestions,
      attempted,
      correct,
      wrong: errors,
      notStarted: Math.max(totalQuestions - attempted, 0),
      percentage: totalQuestions > 0 ? Math.min(100, Math.round((correct / totalQuestions) * 100)) : 0,
      errorCount: errors,
      questions: [],
      errorQuestions: []
    };

    stats.overall.correct += correct;
    stats.overall.total += totalQuestions;
    stats.overall.attempted += attempted;
  }

  stats.overall.percentage = stats.overall.total > 0
    ? Math.round((stats.overall.correct / stats.overall.total) * 100)
    : 0;

  return stats;
}
/**
 * Calcular estatísticas por módulo
 */
function calculateModuleStats(userId, allProvas) {
  const errors = getUserErrors(userId);
  const progress = getUserProgress(userId);

  const stats = {
    byModule: {},
    overall: { correct: 0, total: 0, attempted: 0, percentage: 0 }
  };

  for (let i = 1; i <= 8; i++) {
    stats.byModule[i] = {
      total: 0,
      attempted: 0,
      correct: 0,
      wrong: 0,
      notStarted: 0,
      percentage: 0,
      errorCount: 0,
      questions: [],
      errorQuestions: []
    };
  }

  allProvas.forEach(prova => {
    const module = Number(prova.modulo);
    if (!stats.byModule[module]) return;

    const mod = stats.byModule[module];
    mod.total += 1;
    mod.questions.push(prova.id);

    const prog = progress[prova.id];
    if (prog) {
      mod.attempted += 1;
      if (prog.correct) {
        mod.correct += 1;
      } else {
        mod.wrong += 1;
      }
    }

    if (errors[prova.id]) {
      mod.errorCount += errors[prova.id];
      mod.errorQuestions.push({
        id: prova.id,
        titulo: prova.titulo || prova.pergunta || 'Questão sem título',
        erros: errors[prova.id]
      });
    }
  });

  Object.values(stats.byModule).forEach(mod => {
    mod.notStarted = mod.total - mod.attempted;
    mod.percentage = mod.total > 0 ? Math.round((mod.correct / mod.total) * 100) : 0;

    stats.overall.correct += mod.correct;
    stats.overall.total += mod.total;
    stats.overall.attempted += mod.attempted;
  });

  stats.overall.percentage = stats.overall.total > 0
    ? Math.round((stats.overall.correct / stats.overall.total) * 100)
    : 0;

  return stats;
}

// ========== RENDERIZADORES ==========

/**
 * Renderizar ranking no topo
 */
function renderRanking(currentUserId, ranking) {
  const container = document.getElementById('ranking-container');
  if (!container || !ranking || ranking.length === 0) return;

  const html = [];
  
  ranking.forEach((user, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
    const isCurrentUser = user.userId === currentUserId;
    
    html.push(`<div class="ranking-card clickable" data-ranking-user="${escapeHtml(user.userId)}" data-ranking-name="${escapeHtml(user.userName)}" style="${isCurrentUser ? 'background: rgba(76, 175, 80, 0.1); border-color: rgba(76, 175, 80, 0.3);' : ''}">`);
    html.push(`<div class="ranking-medal">${medal}</div>`);
    html.push(`<div class="ranking-info">`);
    html.push(`<div class="ranking-name">${user.userName}${isCurrentUser ? ' (você)' : ''}</div>`);
    html.push(`<div class="ranking-stats">${user.correct}/${user.total} • ${user.percentage}%</div>`);
    html.push(`<div class="ranking-stats">Progresso: ${user.progress}% • Último acesso: ${formatLastAccess(user.lastAccess)}</div>`);
    html.push('</div>');
    html.push('</div>');
  });

  container.innerHTML = html.join('');

  container.querySelectorAll('[data-ranking-user]').forEach(card => {
    card.addEventListener('click', async () => {
      const userId = card.dataset.rankingUser;
      const userName = card.dataset.rankingName || 'Usuário';
      if (!userId) return;
      await openUserProgressModal(userId, userName);
    });
  });
}

async function openUserProgressModal(userId, userName) {
  const modal = document.getElementById('user-progress-modal');
  const title = document.getElementById('user-progress-title');
  const body = document.getElementById('user-progress-body');
  if (!modal || !title || !body) return;

  title.textContent = `Progresso de ${userName}`;
  body.innerHTML = '<p style="color:#aaa;">Carregando progresso...</p>';
  modal.style.display = 'flex';

  const data = await fetchPublicProgress(userId);
  if (!data) {
    body.innerHTML = '<p style="color:#ff9d9d;">Não foi possível carregar o progresso deste usuário.</p>';
    return;
  }

  const overall = data.overall || { correct: 0, total: 0, percentage: 0 };
  const perModule = Array.isArray(data.per_module) ? data.per_module : [];

  const statsHtml = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;">
      <div class="metric-card">
        <div class="metric-value">${overall.total}</div>
        <div class="metric-label">Questões Respondidas</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${overall.correct}</div>
        <div class="metric-label">Acertos</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${overall.percentage}%</div>
        <div class="metric-label">Taxa Geral</div>
      </div>
    </div>
  `;

  const modulesHtml = perModule.map(mod => {
    const percentage = Number(mod.percentage || 0);
    const badgeColor = percentage >= 80 ? '#4CAF50' : (percentage >= 60 ? '#FFC107' : (percentage > 0 ? '#FF9800' : '#888'));
    return `
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
        <div>
          <div style="font-weight:700;">Módulo ${mod.module}</div>
          <div style="color:#aaa;font-size:0.85rem;">${mod.correct}/${mod.total} • ${percentage}%</div>
        </div>
        <div style="min-width:46px;height:46px;border-radius:12px;background:${badgeColor}22;border:1px solid ${badgeColor}55;display:flex;align-items:center;justify-content:center;font-weight:700;color:${badgeColor};">
          ${percentage}%
        </div>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    ${statsHtml}
    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
      ${modulesHtml || '<p style="color:#aaa;">Sem respostas registradas ainda.</p>'}
    </div>
  `;
}

function closeUserProgressModal() {
  const modal = document.getElementById('user-progress-modal');
  if (modal) modal.style.display = 'none';
}

window.closeUserProgressModal = closeUserProgressModal;

/**
 * Renderizar métricas gerais
 */
function renderMetrics(stats) {
  const metricsMap = [
    { selector: '#metrics-grid .metric-card:nth-child(1) .metric-value', value: stats.overall.total },
    { selector: '#metrics-grid .metric-card:nth-child(2) .metric-value', value: stats.overall.correct },
    { selector: '#metrics-grid .metric-card:nth-child(3) .metric-value', value: `${stats.overall.percentage}%` },
    { selector: '#metrics-grid .metric-card:nth-child(4) .metric-value', value: `${Object.values(stats.byModule).filter(m => m.attempted > 0).length}/8` }
  ];

  metricsMap.forEach(item => {
    const el = document.querySelector(item.selector);
    if (el) el.textContent = item.value;
  });
}

/**
 * Renderizar gráfico de pizza (Acertos vs Erros)
 */
function renderChartAcertosErros(stats) {
  const canvas = document.getElementById('chart-acertos-erros');
  if (!canvas) return;

  const acertos = stats.overall.correct;
  const erros = (stats.overall.attempted || 0) - stats.overall.correct;

  if (dashboardCharts.acertosErros) {
    dashboardCharts.acertosErros.destroy();
  }

  dashboardCharts.acertosErros = new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['✅ Acertos', '❌ Erros'],
      datasets: [{
        data: [acertos, erros],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(255, 82, 82, 0.8)'
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(255, 82, 82, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: { color: '#ddd', font: { size: 11 } }
        }
      }
    }
  });
}

/**
 * Renderizar gráfico de radar (Desempenho por módulo)
 */
function renderChartRadar(stats) {
  const canvas = document.getElementById('chart-modulos-radar');
  if (!canvas) return;

  const labels = [];
  const data = [];
  
  for (let i = 1; i <= 8; i++) {
    labels.push(`M${i}`);
    data.push(stats.byModule[i].percentage);
  }

  if (dashboardCharts.radar) {
    dashboardCharts.radar.destroy();
  }

  dashboardCharts.radar = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Taxa de Acerto (%)',
        data,
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: 'rgba(76, 175, 80, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(76, 175, 80, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#aaa', font: { size: 10 } }
        }
      },
      plugins: {
        legend: { labels: { color: '#ddd' } }
      }
    }
  });
}

/**
 * Renderizar gráfico de barras (Progresso por módulo)
 */
function renderProgressCircleHTML(percentage, size = 40) {
  const colors = {
    text: '#ddd',
    stroke: '#999'
  };
  if (percentage >= 80) {
    colors.stroke = '#4CAF50';
  } else if (percentage >= 60) {
    colors.stroke = '#FFC107';
  } else if (percentage > 0) {
    colors.stroke = '#FF9800';
  }

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return `
    <div class="progress-circle progress-circle--small" style="width: ${size}px; height: ${size}px;">
      <svg viewBox="0 0 100 100">
        <circle class="progress-circle-bg" cx="50" cy="50" r="40" />
        <circle class="progress-circle-fill" cx="50" cy="50" r="40" style="stroke: ${colors.stroke}; stroke-dashoffset: ${offset};" />
      </svg>
      <div class="progress-text">${percentage}%</div>
    </div>
  `;
}

function renderChartBarras(stats) {
  const canvas = document.getElementById('chart-modulos-barras');
  if (!canvas) return;

  const labels = [];
  const acertos = [];
  const erros = [];
  
  for (let i = 1; i <= 8; i++) {
    labels.push(`Módulo ${i}`);
    acertos.push(stats.byModule[i].correct);
    erros.push(stats.byModule[i].wrong);
  }

  if (dashboardCharts.barras) {
    dashboardCharts.barras.destroy();
  }

  dashboardCharts.barras = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Acertos',
          data: acertos,
          backgroundColor: 'rgba(76, 175, 80, 0.7)',
          borderColor: 'rgba(76, 175, 80, 1)',
          borderWidth: 1
        },
        {
          label: 'Erros',
          data: erros,
          backgroundColor: 'rgba(255, 82, 82, 0.7)',
          borderColor: 'rgba(255, 82, 82, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { ticks: { color: '#aaa', font: { size: 10 } } },
        y: { ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.1)' } }
      },
      plugins: {
        legend: { labels: { color: '#ddd', font: { size: 11 } } }
      }
    }
  });
}

/**
 * Renderizar módulos com bolinhas de progresso
 */
function renderModulesProgress(userId, stats) {
  const container = document.getElementById('modules-progress');
  if (!container) return;

  const html = [];
  
  for (let i = 1; i <= 8; i++) {
    const mod = stats.byModule[i];
    const percentage = mod.percentage;
    
    const colors = {
      text: '#ddd',
      stroke: '#999'
    };
    
    if (percentage >= 80) {
      colors.stroke = '#4CAF50'; // Verde
    } else if (percentage >= 60) {
      colors.stroke = '#FFC107'; // Amarelo
    } else if (percentage > 0) {
      colors.stroke = '#FF9800'; // Laranja
    }
    
    const circumference = 251.2; // 2 * PI * 40
    const offset = circumference - (percentage / 100) * circumference;
    const statusLabel = mod.attempted > 0 ? 'Iniciado' : 'Novo';
    const wrong = mod.wrong || 0;

    html.push(`<div class="module-progress-item" onclick="abrirSidebarModulo(${i})">`);
    html.push(`<div class="module-header">`);
    html.push(`<span class="module-name">Módulo ${i}</span>`);
    html.push(`<span class="module-status">${statusLabel}</span>`);
    html.push(`</div>`);

    html.push(`<div class="module-progress-main">`);
    html.push(`<div class="progress-circle">`);
    html.push(`<svg viewBox="0 0 100 100">`);
    html.push(`<circle class="progress-circle-bg" cx="50" cy="50" r="40" />`);
    html.push(`<circle class="progress-circle-fill" cx="50" cy="50" r="40" style="stroke: ${colors.stroke}; stroke-dashoffset: ${offset};" />`);
    html.push(`</svg>`);
    html.push(`<div class="progress-text">${percentage}%</div>`);
    html.push(`</div>`);
    html.push(`<div class="module-kpis">`);
    html.push(`<div class="module-kpi"><span class="kpi-label">Total</span><strong>${mod.total}</strong></div>`);
    html.push(`<div class="module-kpi"><span class="kpi-label">Não iniciadas</span><strong>${mod.notStarted}</strong></div>`);
    html.push(`<div class="module-kpi"><span class="kpi-label">Corretas</span><strong style="color:#4CAF50;">${mod.correct}</strong></div>`);
    html.push(`<div class="module-kpi"><span class="kpi-label">Erradas</span><strong style="color:#FF5252;">${wrong}</strong></div>`);
    html.push(`</div>`);
    html.push(`</div>`);

    html.push(`<div class="progress-bar-small"><div class="progress-bar-fill" style="width:${percentage}%;background:${colors.stroke};"></div></div>`);
    html.push(`<div class="module-analysis-hint">Clique para abrir detalhes e revisar erros</div>`);
    html.push(`</div>`);
  }

  container.innerHTML = html.join('');
}

/**
 * Renderizar tabela de análise detalhada
 */
function renderStatsTable(stats) {
  const tbody = document.getElementById('stats-tbody');
  if (!tbody) return;

  const html = [];

  for (let i = 1; i <= 8; i++) {
    const mod = stats.byModule[i];

    const wrong = mod.wrong || 0;
    const wrongHtml = wrong > 0
      ? `<span class="stats-wrong" style="cursor:pointer; text-decoration: underline;" title="Clique para ver detalhes" onclick="abrirSidebarModulo(${i})">${wrong}</span>`
      : `${wrong}`;

    html.push(`<tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">`);
    html.push(`<td style="padding: 12px; display: flex; align-items: center; gap: 10px;">${renderProgressCircleHTML(mod.percentage, 36)}<span style="font-weight: 600;">Módulo ${i}</span></td>`);
    html.push(`<td style="padding: 12px; text-align: center; color: #aaa;">${mod.total}</td>`);
    html.push(`<td style="padding: 12px; text-align: center; color: #bbb;">${mod.notStarted}</td>`);
    html.push(`<td style="padding: 12px; text-align: center; color: #4CAF50; font-weight: 600;">${mod.correct}</td>`);
    html.push(`<td style="padding: 12px; text-align: center; color: #FF5252; font-weight: 600;">${wrongHtml}</td>`);
    html.push(`</tr>`);
  }

  tbody.innerHTML = html.join('');
}

// ========== INICIALIZADOR ==========

async function initDashboard() {
  if (!CURRENT_USER) return;

  try {
    // Carregar dados
    const allProvas = await loadProvas();
    window.allProvasGlobal = allProvas;
    
    const remoteMetrics = await fetchUserMetrics(CURRENT_USER.id);
    const stats = remoteMetrics
      ? buildStatsFromBackend(remoteMetrics, allProvas)
      : calculateModuleStats(CURRENT_USER.id, allProvas);
    const ranking = await fetchRanking();

    // Renderizar todos os componentes
    renderRanking(CURRENT_USER.id, ranking);
    renderMetrics(stats);
    renderChartAcertosErros(stats);
    renderChartRadar(stats);
    renderChartBarras(stats);
    renderModulesProgress(CURRENT_USER.id, stats);
    const statsTable = document.getElementById('stats-table');
    if (statsTable) {
      const detailedSection = statsTable.closest('.dashboard-section');
      if (detailedSection) detailedSection.style.display = 'none';
    }

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
  }
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
  
  const erradas = modStats.wrong || 0;
  html.push(`<div class="stat-item"><div class="stat-value" style="color: #FF5722;">${erradas}</div><div class="stat-label">Erros</div></div>`);
  
  html.push(`<div class="stat-item"><div class="stat-value" style="color: #FFC107;">${modStats.percentage}%</div><div class="stat-label">Taxa</div></div>`);
  html.push('</div>');
  
  // Lista de questões com erros
  if (errorQuestions.length > 0) {
    html.push(`<div style="margin-bottom: 12px;"><strong style="font-size: 0.95rem; display: block; margin-bottom: 8px; color: #FF9800;">❌ Questões com Erros (${errorQuestions.length})</strong></div>`);
    
    errorQuestions.forEach((q, idx) => {
      html.push(`<div class="error-question-item">`);
      html.push(`<div class="error-question-row">`);
      html.push(`<div class="error-badge" title="${q.erros} acerto(s) incorreto(s)">${q.erros}</div>`);
      html.push(`<div class="error-question-content">`);
      html.push(`<div class="error-question-title">${q.titulo}</div>`);
      html.push(`<div class="error-question-id">ID: ${q.id}</div>`);
      html.push('</div>');
      html.push('</div>');

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
  const userId = CURRENT_USER?.id;
  if (!userId) return;
  renderModuleErrorsDetail(userId, moduleId, window.allProvasGlobal);
};









