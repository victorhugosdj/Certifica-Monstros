/*
  app.js - frontend application logic (login, module list, simulado generation)
  Stack: Vanilla JS + Supabase Auth + JSON-based question bank.
*/

// Supabase client (initialized on load)
let SUPABASE = null;
let CURRENT_USER = null;

const STATE = {
  modules: null,
  provas: null,
  userProgress: null,
  userErrors: null,
};

let moduleActionsBound = false;
let navigationBound = false;
let registerInFlight = false;

function getSupabaseClient() {
  if (SUPABASE) return SUPABASE;
  const url = document.querySelector('meta[name="supabase-url"]').content;
  const key = document.querySelector('meta[name="supabase-anon-key"]').content;
  if (!url || !key) return null;
  SUPABASE = supabase.createClient(url, key);
  return SUPABASE;
}

function setView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const view = document.getElementById(`view-${viewId}`);
  if (view) view.classList.add('active');

  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });

  if (viewId === 'dashboard' && typeof initDashboard === 'function') {
    initDashboard();
  }

  if (viewId === 'official-exams' && typeof renderOfficialExams === 'function') {
    renderOfficialExams();
  }

  closeMobileSidebar();
}

function showLogin() {
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('main-app').style.display = 'none';
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('main-app').style.display = 'flex';
}

function openMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;
  sidebar.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;
  sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function getErrorKey(userId) {
  return `certifica_errors_${userId}`;
}

// ========== FUNÇÕES DOS MODAIS ==========

function mostrarFormCriarConta() {
  document.getElementById('modal-criar-conta').style.display = 'flex';
}

function fecharModalCriarConta() {
  document.getElementById('modal-criar-conta').style.display = 'none';
  // Limpar formulário
  document.getElementById('register-name').value = '';
  document.getElementById('register-email').value = '';
  document.getElementById('register-password').value = '';
  document.getElementById('register-password-confirm').value = '';
}

function mostrarFormEsqueceuSenha() {
  document.getElementById('modal-esqueci-senha').style.display = 'flex';
}

function fecharModalEsqueceuSenha() {
  document.getElementById('modal-esqueci-senha').style.display = 'none';
  // Limpar formulário
  document.getElementById('reset-email').value = '';
}

function mostrarModalAtualizarSenha() {
  const modal = document.getElementById('modal-atualizar-senha');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function fecharModalAtualizarSenha() {
  const modal = document.getElementById('modal-atualizar-senha');
  if (!modal) return;

  modal.style.display = 'none';
  const passwordInput = document.getElementById('new-password');
  const confirmInput = document.getElementById('new-password-confirm');
  if (passwordInput) passwordInput.value = '';
  if (confirmInput) confirmInput.value = '';
}

function getApiBaseUrl() {
  const el = document.querySelector('meta[name="api-base-url"]');
  const configured = el?.content?.trim() || "";
  if (!configured) return "";

  try {
    const parsed = new URL(configured, window.location.origin);
    const targetIsLocal = /^(localhost|127\.0\.0\.1)$/i.test(parsed.hostname);
    const currentIsLocal = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
    if (targetIsLocal && !currentIsLocal) {
      return "";
    }
    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return configured.replace(/\/+$/, "");
  }
}

function apiFetch(path, options = {}) {
  const base = getApiBaseUrl();
  const url = base ? `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}` : path;
  return fetch(url, options);
}

async function getAuthHeaders() {
  const supabase = getSupabaseClient();
  if (!supabase) return {};

  const { data } = await supabase.auth.getSession();
  const accessToken = data?.session?.access_token;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

function loadErrors(userId) {
  if (CURRENT_USER?.id && userId === CURRENT_USER.id && STATE.userErrors) {
    return STATE.userErrors;
  }
  try {
    return JSON.parse(localStorage.getItem(getErrorKey(userId)) || '{}');
  } catch {
    return {};
  }
}

function saveErrors(userId, data) {
  if (CURRENT_USER?.id && userId === CURRENT_USER.id) {
    STATE.userErrors = data;
  }
  localStorage.setItem(getErrorKey(userId), JSON.stringify(data));
}

function getProgressKey(userId) {
  return `certifica_progress_${userId}`;
}

function showInfo(message, type = 'info') {
  if (typeof notify === 'function') {
    notify(message, type);
    return;
  }
  alert(message);
}

function getCanonicalAppUrl() {
  return new URL('frontend/index.html', window.location.origin).toString();
}

function getAuthRedirectUrl() {
  const redirectUrl = new URL(getCanonicalAppUrl());
  redirectUrl.searchParams.set('auth_mode', 'login');
  return redirectUrl.toString();
}

function clearAuthUrlState() {
  const cleanUrl = new URL(window.location.href);
  cleanUrl.hash = '';
  cleanUrl.searchParams.delete('auth_mode');
  history.replaceState({}, document.title, cleanUrl.toString());
}

function shouldForceLoginView() {
  const url = new URL(window.location.href);
  return url.searchParams.get('auth_mode') === 'login';
}

function isEmailConfirmationCallback() {
  const url = new URL(window.location.href);
  const hash = url.hash || '';
  return shouldForceLoginView() && hash.includes('access_token=') && !hash.includes('type=recovery');
}

function loadProgress(userId) {
  if (CURRENT_USER?.id && userId === CURRENT_USER.id && STATE.userProgress) {
    return STATE.userProgress;
  }
  try {
    return JSON.parse(localStorage.getItem(getProgressKey(userId)) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(userId, data) {
  if (CURRENT_USER?.id && userId === CURRENT_USER.id) {
    STATE.userProgress = data;
  }
  localStorage.setItem(getProgressKey(userId), JSON.stringify(data));
}

function mergeProgress(localProgress = {}, remoteProgress = {}) {
  const merged = { ...localProgress };

  Object.entries(remoteProgress || {}).forEach(([questionId, remoteEntry]) => {
    const localEntry = merged[questionId];
    const remoteDate = remoteEntry?.lastAnsweredAt || '';
    const localDate = localEntry?.lastAnsweredAt || '';
    const localCorrect = Boolean(localEntry?.correct);
    const remoteCorrect = Boolean(remoteEntry?.correct);
    const mergedCorrect = localCorrect || remoteCorrect;
    const localPoints = Number(localEntry?.points ?? (localCorrect ? 1 : 0));
    const remotePoints = Number(remoteEntry?.points ?? (remoteCorrect ? 1 : 0));
    const mergedPoints = Math.max(localPoints, remotePoints);

    if (!localEntry || remoteDate >= localDate) {
      merged[questionId] = {
        correct: mergedCorrect,
        points: mergedPoints,
        attempts: Number(remoteEntry?.attempts || localEntry?.attempts || 1),
        lastAnsweredAt: remoteDate || localDate || new Date().toISOString(),
      };
      return;
    }

    merged[questionId] = {
      ...localEntry,
      correct: mergedCorrect,
      points: mergedPoints,
      attempts: Math.max(
        Number(localEntry?.attempts || 0),
        Number(remoteEntry?.attempts || 0),
      ),
    };
  });

  return merged;
}

function mergeErrors(localErrors = {}, remoteErrors = {}) {
  const merged = { ...localErrors };

  Object.entries(remoteErrors || {}).forEach(([questionId, remoteCount]) => {
    merged[questionId] = Math.max(
      Number(localErrors?.[questionId] || 0),
      Number(remoteCount || 0),
    );
  });

  return merged;
}

async function fetchRemoteProgress(userId) {
  if (!userId) return null;

  try {
    const headers = await getAuthHeaders();
    const response = await apiFetch(`/api/progress/${encodeURIComponent(userId)}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Nao foi possivel carregar o progresso remoto:', error);
    return null;
  }
}

async function syncUserProgressFromRemote(userId) {
  if (!userId) {
    return { progress: loadProgress(userId), errors: loadErrors(userId) };
  }

  const localProgress = loadProgress(userId);
  const localErrors = loadErrors(userId);
  const remotePayload = await fetchRemoteProgress(userId);
  if (remotePayload?.progress || remotePayload?.errors) {
    const remoteProgress = remotePayload?.progress || {};
    const remoteErrors = remotePayload?.errors || {};
    const mergedProgress = mergeProgress(localProgress, remoteProgress);
    const mergedErrors = mergeErrors(localErrors, remoteErrors);

    STATE.userProgress = mergedProgress;
    STATE.userErrors = mergedErrors;
    localStorage.setItem(getProgressKey(userId), JSON.stringify(mergedProgress));
    localStorage.setItem(getErrorKey(userId), JSON.stringify(mergedErrors));
    return { progress: mergedProgress, errors: mergedErrors };
  }

  STATE.userProgress = localProgress;
  STATE.userErrors = localErrors;
  return { progress: localProgress, errors: localErrors };
}

async function refreshUserDataFromBackend() {
  if (!CURRENT_USER?.id) return;

  await syncUserProgressFromRemote(CURRENT_USER.id);
  if (STATE.modules) {
    renderModulesGrid(STATE.modules);
  }

  const dashboardView = document.getElementById('view-dashboard');
  if (dashboardView?.classList.contains('active') && typeof initDashboard === 'function') {
    initDashboard();
  }
}

async function loadModules() {
  if (STATE.modules) return STATE.modules;
  
  try {
    const res = await fetch('data/modulos.json');
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Falha ao carregar módulos`);
    }
    
    const modules = await res.json();
    
    if (!Array.isArray(modules) || modules.length === 0) {
      throw new Error('Formato de módulos inválido ou vazio');
    }
    
    STATE.modules = modules;
    console.log("✅ Módulos carregados com sucesso:", modules.length);
    return modules;
    
  } catch (error) {
    console.error('❌ Erro ao carregar módulos:', error);
    
    if (typeof notify === 'function') {
      notify(`Erro ao carregar módulos: ${error.message}`, 'error');
    }
    
    return [];
  }
}

async function loadProvas() {
  if (STATE.provas) return STATE.provas;
  
  try {
    const res = await fetch('data/provas.json');
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Falha ao carregar questões`);
    }
    
    const provas = await res.json();
    
    if (!Array.isArray(provas) || provas.length === 0) {
      throw new Error('Formato de questões inválido ou vazio');
    }
    
    STATE.provas = provas;
    console.log("✅ Questões carregadas com sucesso:", provas.length);
    return provas;
    
  } catch (error) {
    console.error('❌ Erro ao carregar questões:', error);
    
    if (typeof notify === 'function') {
      notify(`Erro ao carregar banco de questões: ${error.message}`, 'error');
    }
    
    return [];
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EDITAL_CONTENT_BY_TOPIC = [
  {
    match: ['boas praticas', 'hiperautomacao'],
    description: 'Aplicar boas práticas ao usar hiperautomação',
    weight: '20%',
  },
  {
    match: ['composer'],
    description: 'Usar o Composer para automatizar integrações de dados em um projeto de hiperautomação',
    weight: '12%',
  },
  {
    match: ['rpa'],
    description: 'Projetar, construir e gerenciar processos MuleSoft RPA usados em hiperautomação',
    weight: '17%',
  },
  {
    match: ['salesforce flow'],
    description: 'Usar Salesforce Flow para construir workflows de hiperautomação',
    weight: '13%',
  },
  {
    match: ['anypoint platform e apis', 'entregar e gerenciar apis'],
    description: 'Usar a plataforma Anypoint para entregar e gerenciar APIs em um projeto de hiperautomação',
    weight: '15%',
  },
  {
    match: ['monitoring', 'api manager', 'monitorar endpoints'],
    description: 'Usar Anypoint Platform para monitorar endpoints de APIs de hiperautomação',
    weight: '7%',
  },
  {
    match: ['exchange'],
    description: 'Usar Anypoint Exchange para catalogar (publicar), compartilhar, descobrir e reutilizar assets',
    weight: '8%',
  },
  {
    match: ['orchestration', 'orchestrator'],
    description: 'Usar Salesforce Flow Orchestrator para construir fluxos paralelos, multiusuário e com múltiplas etapas',
    weight: '8%',
  },
];

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function resolveEditalInfo(moduleData, moduleNumber) {
  const byNumber = EDITAL_CONTENT_BY_TOPIC[moduleNumber - 1];
  if (byNumber) {
    return { description: byNumber.description, weight: byNumber.weight };
  }

  const searchable = normalizeText(`${moduleData?.titulo_pt || ''} ${moduleData?.objetivo_pt || ''} ${moduleData?.codigo || ''}`);
  const found = EDITAL_CONTENT_BY_TOPIC.find(item =>
    item.match.every(term => searchable.includes(normalizeText(term)))
  ) || EDITAL_CONTENT_BY_TOPIC.find(item =>
    item.match.some(term => searchable.includes(normalizeText(term)))
  );

  if (found) {
    return { description: found.description, weight: found.weight };
  }

  return {
    description: moduleData?.objetivo_pt || 'Sem descritivo no edital para este módulo.',
    weight: moduleData?.peso_edital || '',
  };
}

function getModuleProgress(moduleNumber) {
  const provas = STATE.provas || [];
  if (!CURRENT_USER?.id) {
    return { percentage: 0, correct: 0, total: 0 };
  }

  const progress = loadProgress(CURRENT_USER.id);

  const moduleQuestions = provas.filter(q => Number(q.modulo) === moduleNumber);
  if (!moduleQuestions.length) {
    return { percentage: 0, correct: 0, total: 0 };
  }

  const total = moduleQuestions.length;
  let correct = 0;

  moduleQuestions.forEach(q => {
    const p = progress[q.id];
    if (p?.correct) correct += 1;
  });

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { percentage, correct, total };
}

function renderModulesGrid(modules) {
  const grid = document.getElementById('modules-grid');
  grid.innerHTML = '';

  try {
    if (!modules || !Array.isArray(modules) || modules.length === 0) {
      throw new Error('Lista de módulos inválida ou vazia');
    }

    modules.slice(0, 8).forEach((m, idx) => {
      try {
        if (!m || !m.codigo) {
          console.warn(`⚠️ Módulo ${idx} sem dados completos`);
          return;
        }

        const card = document.createElement('div');
        card.className = 'module-card';
        card.style.cursor = 'pointer';
        card.dataset.moduleNum = idx + 1;
        card.dataset.moduleCode = m.codigo;
        
        const moduleNumber = idx + 1;
        const moduleSubject = m.titulo_pt || `Módulo ${moduleNumber}`;
        const editalInfo = resolveEditalInfo(m, moduleNumber);
        const moduleWeight = editalInfo.weight || m.peso_edital || '';
        const moduleObjective = editalInfo.description || m.objetivo_pt || 'Sem descritivo no edital para este módulo.';
        const progress = getModuleProgress(moduleNumber);
        card.innerHTML = `
          <div class="module-topline">MÓDULO ${escapeHtml(m.codigo || moduleNumber)}${moduleWeight ? ` (${escapeHtml(moduleWeight)})` : ''}</div>
          <div class="module-title">${escapeHtml(moduleSubject)}</div>
          <div class="module-description-simple">${escapeHtml(moduleObjective)}</div>
          <div class="module-progress-wrap">
            <div class="module-progress-bar">
              <div class="module-progress-fill" style="width: ${progress.percentage}%"></div>
            </div>
            <div class="module-percent">${progress.percentage}%</div>
          </div>
        `;

        // Click handler para abrir conteúdo
        card.addEventListener('click', () => {
          const moduleNum = Number(card.dataset.moduleNum);
          ModuleViewer.showModuleModal(moduleNum, m);
        });

        grid.appendChild(card);
      } catch (error) {
        console.error(`❌ Erro ao renderizar módulo ${idx}:`, error);
      }
    });

  } catch (error) {
    console.error('❌ Erro ao renderizar grid de módulos:', error);
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = `
      <div style="grid-column:1/-1;padding:20px;background:#ffebee;border-radius:4px;">
        <p>❌ Erro ao carregar módulos: ${error.message}</p>
      </div>
    `;
  }
}

function bindModuleActions() {
  if (moduleActionsBound) return;
  moduleActionsBound = true;

  // Delegate: Escuta cliques no modal para botões de simulado
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-demo-action="simulado"]');
    if (!btn) return;
    
    try {
      const mod = Number(btn.dataset.module);
      const apenasErros = btn.dataset.erros === 'true';
      
      if (!mod || mod < 1 || mod > 8) {
        throw new Error(`❌ Número de módulo inválido: ${mod}`);
      }
      
      console.log(`Iniciando simulado: Módulo ${mod}, Apenas erros: ${apenasErros}`);
      gerarSimulado(mod, apenasErros);
    } catch (error) {
      console.error('❌ Erro ao iniciar simulado:', error);
      alert(`Erro: ${error.message}`);
    }
  });
}

function openModal(html) {
  const modal = document.getElementById('exam-modal');
  document.getElementById('exam-content').innerHTML = html;
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('exam-modal').style.display = 'none';
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function toModuleNumber(moduloId) {
  if (!moduloId) return null;
  if (typeof moduloId === 'number') return moduloId;
  const m = Number(moduloId);
  if (!Number.isNaN(m)) return m;
  const match = String(moduloId).match(/\d+/);
  return match ? Number(match[0]) : null;
}

function normalizeAnswerList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return [value];
}

function getQuestionCorrectOptions(question) {
  const fromArray = normalizeAnswerList(question?.corretas_texto);
  if (fromArray.length) return fromArray;
  return normalizeAnswerList(question?.correta_texto);
}

function evaluateQuestionScore(question, userAnswer) {
  const correctOptions = getQuestionCorrectOptions(question);
  const selectedOptions = normalizeAnswerList(userAnswer);
  const uniqueCorrect = [...new Set(correctOptions)];
  const uniqueSelected = [...new Set(selectedOptions)];

  if (!uniqueCorrect.length) return 0;

  const isExactMatch = uniqueCorrect.length === uniqueSelected.length
    && uniqueCorrect.every(opt => uniqueSelected.includes(opt));
  if (isExactMatch) return 1;

  // Regra solicitada: em questões de 2 respostas, 1 certa + 1 errada = 0.5
  if (uniqueCorrect.length === 2 && uniqueSelected.length === 2) {
    const hits = uniqueSelected.filter(opt => uniqueCorrect.includes(opt)).length;
    if (hits === 1) return 0.5;
  }

  return 0;
}

async function gerarSimulado(moduloId, apenasErros = false) {
  if (!CURRENT_USER) return;
  const modNumber = toModuleNumber(moduloId);
  if (!modNumber) return;

  const provas = await loadProvas();
  let pool = provas.filter(q => Number(q.modulo) === modNumber);

  if (apenasErros) {
    const errors = loadErrors(CURRENT_USER.id);
    const ids = Object.keys(errors).filter(id => errors[id] > 0);
    pool = pool.filter(q => ids.includes(q.id));
    if (!pool.length) {
      openModal('<p>Nenhuma questão errada registrada para este módulo.</p>');
      return;
    }
  }

  const questions = shuffle(pool).slice(0, 15);
  renderExamModal(modNumber, questions);
}

function renderExamModal(moduloId, questions, modalOptions = {}) {
  const state = {
    currentIndex: 0,
    answers: {},
    confirmed: {},
    revealCorrect: {},
  };

  function renderCurrentQuestion() {
    const question = questions[state.currentIndex];
    const questionOptions = question.opcoes || [];
    const isMultiQuestion = getQuestionCorrectOptions(question).length > 1 || Boolean(question.is_multipla);
    const selected = isMultiQuestion
      ? normalizeAnswerList(state.answers[question.id])
      : (state.answers[question.id] || '');
    const isConfirmed = Boolean(state.confirmed[question.id]);
    const isRevealed = Boolean(state.revealCorrect[question.id]);
    const questionScore = evaluateQuestionScore(question, selected);
    const isCorrect = questionScore === 1;
    const correctOptions = getQuestionCorrectOptions(question);
    const progressPct = Math.round(((state.currentIndex + 1) / questions.length) * 100);
    const hasSelection = isMultiQuestion ? selected.length > 0 : Boolean(selected);

    const html = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <div style="font-weight:700;">Simulado Módulo ${moduloId}</div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="padding:6px 10px;border-radius:999px;background:rgba(33,150,243,.15);font-size:.85rem;font-weight:700;">
            ${state.currentIndex + 1}/${questions.length}
          </div>
          <button id="close-exam-dynamic" class="btn btn-icon">×</button>
        </div>
      </div>

      <div style="margin-top:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="font-size:.78rem;color:#bbb;">Progresso</div>
          <div style="font-weight:700;">${state.currentIndex + 1}/${questions.length}</div>
        </div>
        <div style="height:8px;background:rgba(255,255,255,.1);border-radius:999px;overflow:hidden;margin-bottom:16px;">
          <div style="height:100%;width:${progressPct}%;background:#4CAF50;"></div>
        </div>

        <div class="question" style="margin:0;">
          <div class="question-title">${state.currentIndex + 1}. ${question.pergunta}</div>
          ${isMultiQuestion ? '<div style="font-size:.82rem;color:#9fb3d7;margin-top:4px;">Selecione mais de uma opção quando necessário.</div>' : ''}
          <div class="options">
            ${questionOptions.map((opt, idx) => `
              <label class="option" style="
                ${isMultiQuestion ? (selected.includes(opt) ? 'border-color:#2196F3;' : '') : (selected === opt ? 'border-color:#2196F3;' : '')}
                ${isRevealed && correctOptions.includes(opt) ? 'background:rgba(76,175,80,.18);border-color:#4CAF50;' : ''}
              ">
                <input type="${isMultiQuestion ? 'checkbox' : 'radio'}" name="current_question" value="${opt}" ${(isMultiQuestion ? selected.includes(opt) : selected === opt) ? 'checked' : ''} ${isConfirmed ? 'disabled' : ''} />
                ${String.fromCharCode(65 + idx)}. ${opt}
              </label>
            `).join('')}
          </div>
        </div>
      </div>

      ${isConfirmed ? `
        <div style="margin-top:14px;padding:12px;border-radius:8px;background:${questionScore > 0 ? 'rgba(76,175,80,.12)' : 'rgba(255,82,82,.12)'};border-left:4px solid ${questionScore > 0 ? '#4CAF50' : '#FF5252'};">
          <div style="font-weight:700;margin-bottom:6px;">${isCorrect ? 'Resposta correta ✅' : (questionScore === 0.5 ? 'Resposta parcial ⚠️ (0,5 ponto)' : 'Resposta incorreta ❌')}</div>
          ${isRevealed ? `<div><strong>Correta(s):</strong> ${correctOptions.join(' | ')}</div>` : ''}
          ${isRevealed && question.justificativa ? `<div style="margin-top:6px;"><strong>Justificativa:</strong> ${question.justificativa}</div>` : ''}
        </div>
      ` : ''}

      <div style="display:flex;justify-content:space-between;gap:8px;margin-top:16px;flex-wrap:wrap;">
        <div style="display:flex;gap:8px;">
          <button id="prev-question" class="btn btn-secondary" ${state.currentIndex === 0 ? 'disabled' : ''}>Anterior</button>
          <button id="show-correct" class="btn btn-secondary" ${!isConfirmed ? 'disabled' : ''}>Mostrar correta</button>
        </div>
        <div style="display:flex;gap:8px;">
          <button id="primary-action" class="btn btn-primary" ${!hasSelection && !isConfirmed ? 'disabled' : ''}>${isConfirmed ? (state.currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima') : 'Confirmar resposta'}</button>
        </div>
      </div>
    `;

    openModal(html);

    document.getElementById('close-exam-dynamic').onclick = closeModal;

    document.querySelectorAll('input[name="current_question"]').forEach(input => {
      input.addEventListener('change', () => {
        if (isMultiQuestion) {
          const current = normalizeAnswerList(state.answers[question.id]);
          if (input.checked) {
            state.answers[question.id] = [...new Set([...current, input.value])];
          } else {
            state.answers[question.id] = current.filter(opt => opt !== input.value);
          }
        } else {
          state.answers[question.id] = input.value;
        }
        renderCurrentQuestion();
      });
    });

    const prevBtn = document.getElementById('prev-question');
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (state.currentIndex > 0) {
          state.currentIndex -= 1;
          renderCurrentQuestion();
        }
      };
    }

    const showCorrectBtn = document.getElementById('show-correct');
    if (showCorrectBtn) {
      showCorrectBtn.onclick = () => {
        state.revealCorrect[question.id] = true;
        renderCurrentQuestion();
      };
    }

    const primaryBtn = document.getElementById('primary-action');
    if (primaryBtn) {
      primaryBtn.onclick = async () => {
        if (!state.confirmed[question.id]) {
          if (!state.answers[question.id]) return;
          state.confirmed[question.id] = true;
          renderCurrentQuestion();
          return;
        }

        if (state.currentIndex === questions.length - 1) {
          const result = await gradeExam(questions, state.answers);
          if (typeof modalOptions.onComplete === 'function') {
            try {
              modalOptions.onComplete(result);
            } catch (callbackError) {
              console.warn('Falha no callback de conclusão do simulado:', callbackError);
            }
          }
          return;
        }

        state.currentIndex += 1;
        renderCurrentQuestion();
      };
    }
  }

  renderCurrentQuestion();
}

async function recordResponses(responses) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    };
    const response = await apiFetch('/api/responses', {
      method: 'POST',
      headers,
      body: JSON.stringify({ responses }),
    });
    if (!response.ok) {
      throw new Error(`Falha ao sincronizar respostas (HTTP ${response.status})`);
    }
    return { ok: true };
  } catch (err) {
    // Não bloqueia a experiência do usuário se houver problemas de rede.
    console.warn('Não foi possível enviar respostas ao backend:', err);
    return { ok: false, reason: 'network' };
  }
}

async function gradeExam(questions, answersByQuestionId = {}) {
  if (!CURRENT_USER) return;
  const errors = loadErrors(CURRENT_USER.id);
  const progress = loadProgress(CURRENT_USER.id);

  const payload = [];
  let correctCount = 0;
  let totalPoints = 0;

  questions.forEach(q => {
    const answer = answersByQuestionId[q.id] ?? null;
    const questionScore = evaluateQuestionScore(q, answer);
    const isCorrect = questionScore === 1;
    const previousProgress = progress[q.id] || {};
    totalPoints += questionScore;

    // Atualiza registro de erros para permitir visualização detalhada
    if (questionScore < 1) {
      errors[q.id] = (errors[q.id] || 0) + 1;
    } else {
      delete errors[q.id];
    }

    // Atualiza progresso local para que dashboard saiba quais questões foram respondidas
    progress[q.id] = {
      correct: Boolean(previousProgress.correct) || isCorrect,
      points: Math.max(Number(previousProgress.points || 0), questionScore),
      attempts: (previousProgress.attempts || 0) + 1,
      lastAnsweredAt: new Date().toISOString()
    };

    if (isCorrect) correctCount += 1;

    payload.push({
      user_id: CURRENT_USER.id,
      module: Number(q.modulo),
      question_id: q.id,
      correto: isCorrect,
    });
  });

  saveErrors(CURRENT_USER.id, errors);
  saveProgress(CURRENT_USER.id, progress);
  const syncResult = await recordResponses(payload);
  const synced = syncResult.ok;
  const syncMessage = syncResult.reason === 'no-backend'
    ? 'Respostas salvas localmente. Sincronização indisponível no momento.'
    : (synced ? 'Respostas sincronizadas com o servidor.' : 'Respostas salvas localmente. A sincronização com o servidor falhou.');

  const score = Math.round((totalPoints / questions.length) * 100);
  if (synced) {
    await refreshUserDataFromBackend();
  }
  openModal(`<div style="text-align:center;">
    <h3>Resultado: ${score}%</h3>
    <p>Pontuação: ${totalPoints.toFixed(1)} de ${questions.length}.</p>
    <p>Acertos completos: ${correctCount}.</p>
    <p style="color:${synced ? '#4CAF50' : '#FFB74D'};">${syncMessage}</p>
    <button id="close-result" class="btn btn-primary">Fechar</button>
  </div>`);
  document.getElementById('close-result').onclick = closeModal;
  return { score, correctCount, total: questions.length, totalPoints, synced };
}

function bindNavigation() {
  if (navigationBound) return;
  navigationBound = true;

  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      setView(btn.dataset.view);
    });
  });

  const menuBtn = document.getElementById('mobile-menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      if (sidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  const backdrop = document.getElementById('sidebar-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeMobileSidebar);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMobileSidebar();
    }
  });
}

async function onLoginSuccess(user) {
  CURRENT_USER = user;
  const savedName = user?.id ? localStorage.getItem(`user_name_${user.id}`) : '';
  const name = user.user_metadata?.full_name || savedName || user.email;
  document.getElementById('user-name').textContent = name;
  // Garantir que as questões (provas) estejam carregadas antes de calcular progresso
  try {
    await loadProvas();
  } catch (e) {
    console.warn('Falha ao carregar provas antes dos módulos:', e);
  }

  try {
    await syncUserProgressFromRemote(user.id);
  } catch (e) {
    console.warn('Falha ao sincronizar progresso remoto:', e);
  }

  await loadModules().then(renderModulesGrid).catch(console.error);
  bindModuleActions();
  bindNavigation();
  setView('how-to');
  showApp();
}

async function initAuth() {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  if (shouldForceLoginView()) {
    showLogin();
  }

  const { data } = await supabase.auth.getSession();
  if (data?.session?.user && !isEmailConfirmationCallback()) {
    onLoginSuccess(data.session.user);
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      mostrarModalAtualizarSenha();
      return;
    }

    if (event === 'SIGNED_IN') {
      const url = new URL(window.location.href);
      const hasRecoveryType = (url.hash || '').includes('type=recovery');
      if (!hasRecoveryType && (url.hash || '').includes('access_token=')) {
        showInfo('E-mail confirmado com sucesso. Você já pode usar sua conta.', 'success');
        clearAuthUrlState();
        supabase.auth.signOut().finally(() => {
          CURRENT_USER = null;
          STATE.userProgress = null;
          STATE.userErrors = null;
          showLogin();
        });
        return;
      }
    }

    if (session?.user) {
      onLoginSuccess(session.user);
    } else {
      CURRENT_USER = null;
      STATE.userProgress = null;
      STATE.userErrors = null;
      showLogin();
    }
  });
}

async function signIn(email, password) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message || 'Erro ao logar');
    return;
  }
  return data;
}

async function signUp(email, password, name) {
  if (registerInFlight) return;
  registerInFlight = true;
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: getAuthRedirectUrl()
      }
    });
    if (error) {
      alert(error.message || 'Erro ao criar conta');
      return;
    }
    if (data?.user) {
      localStorage.setItem(`user_name_${data.user.id}`, name);
      fecharModalCriarConta();
      if (data.session) {
        showInfo('Conta criada com sucesso.', 'success');
      } else {
        showInfo('Conta criada. Verifique seu e-mail para confirmar o cadastro.', 'info');
      }
    }

    return data;
  } finally {
    registerInFlight = false;
  }
}

async function resetPassword(email) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getAuthRedirectUrl()
  });
  if (error) {
    alert(error.message || 'Erro ao enviar link de recuperação');
    return;
  }
  alert('Link de recuperação de senha enviado para seu email!');
  fecharModalEsqueceuSenha();
}

async function updatePassword(password) {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    alert(error.message || 'Erro ao atualizar senha');
    return false;
  }

  alert('Senha atualizada com sucesso.');
  fecharModalAtualizarSenha();
  return true;
}

async function signOut() {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
  CURRENT_USER = null;
  STATE.userProgress = null;
  STATE.userErrors = null;
  showLogin();
}

function bindLoginForm() {
  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (!email || !password) {
      alert('Preencha email e senha.');
      return;
    }
    await signIn(email, password);
  });

  // Botão de registrar na modal
  const registerBtn = document.getElementById('register-btn');
  const registerBtnDefaultLabel = registerBtn.textContent;
  registerBtn.addEventListener('click', async () => {
    if (registerInFlight) return;
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-password-confirm').value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não conferem.');
      return;
    }

    if (password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    registerBtn.disabled = true;
    registerBtn.textContent = 'Criando...';
    try {
      await signUp(email, password, name);
    } finally {
      registerBtn.disabled = false;
      registerBtn.textContent = registerBtnDefaultLabel;
    }
  });

  // Botão de reset de senha
  document.getElementById('reset-btn').addEventListener('click', () => {
    const email = document.getElementById('reset-email').value.trim();
    if (!email) {
      alert('Digite seu email.');
      return;
    }
    resetPassword(email);
  });

  document.getElementById('btn-logout').addEventListener('click', signOut);

  const updatePasswordBtn = document.getElementById('update-password-btn');
  if (updatePasswordBtn) {
    updatePasswordBtn.addEventListener('click', async () => {
      const password = document.getElementById('new-password').value.trim();
      const confirmPassword = document.getElementById('new-password-confirm').value.trim();

      if (!password || !confirmPassword) {
        alert('Preencha e confirme a nova senha.');
        return;
      }

      if (password.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres.');
        return;
      }

      if (password !== confirmPassword) {
        alert('As senhas não conferem.');
        return;
      }

      await updatePassword(password);
    });
  }
}

/**
 * NOVO: Envia respostas para o backend
 */
async function salvarRespostasNoBackend(userId, moduleId, responses) {
  if (!userId) {
    console.warn("⚠️ Não há usuário logado, respostas não serão enviadas ao backend");
    return false;
  }

  // Persistir localmente antes da sincronização remota (fallback seguro).
  const progress = loadProgress(userId);
  const errors = loadErrors(userId);
  const answeredAt = new Date().toISOString();

  responses.forEach((r) => {
    const isCorrect = Boolean(r.correct);
    const previousProgress = progress[r.id] || {};
    progress[r.id] = {
      correct: Boolean(previousProgress.correct) || isCorrect,
      points: Math.max(Number(previousProgress.points || 0), isCorrect ? 1 : 0),
      attempts: (previousProgress.attempts || 0) + 1,
      lastAnsweredAt: answeredAt
    };

    if (isCorrect) {
      delete errors[r.id];
    } else {
      errors[r.id] = (errors[r.id] || 0) + 1;
    }
  });

  saveProgress(userId, progress);
  saveErrors(userId, errors);

  // Compatibilidade legada: reaproveita estratégia principal de sync.
  const payload = responses.map(r => ({
      user_id: userId,
      module: moduleId,
      question_id: r.id,
      correto: r.correct
  }));

  const result = await recordResponses(payload);
  return Boolean(result?.ok);
}

function initApp() {
  showLogin();
  bindLoginForm();
  initAuth();

  document.getElementById('close-exam').addEventListener('click', closeModal);
}

window.addEventListener('DOMContentLoaded', initApp);
window.gerarSimulado = gerarSimulado;
window.salvarRespostasNoBackend = salvarRespostasNoBackend;
window.getSupabaseClient = getSupabaseClient;
window.loadProvas = loadProvas;
window.setView = setView;
window.getCurrentUserProgress = () => (CURRENT_USER?.id ? loadProgress(CURRENT_USER.id) : {});
window.getCurrentUserErrors = () => (CURRENT_USER?.id ? loadErrors(CURRENT_USER.id) : {});
