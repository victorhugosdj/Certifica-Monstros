/*
  app.js - frontend application logic (login, module list, simulado generation)
  Stack: Vanilla JS + Supabase Auth + JSON-based question bank.
*/

// Supabase client (initialized on load)
let SUPABASE = null;
let CURRENT_USER = null;

const STATE = {
  modules: null,
  provas: null
};

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
}

function showLogin() {
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('main-app').style.display = 'none';
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('main-app').style.display = 'flex';
}

function getErrorKey(userId) {
  return `certifica_errors_${userId}`;
}

function getApiBaseUrl() {
  const el = document.querySelector('meta[name="api-base-url"]');
  return el?.content?.trim() || "";
}

function apiFetch(path, options = {}) {
  const base = getApiBaseUrl();
  const url = base ? `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}` : path;
  return fetch(url, options);
}

function loadErrors(userId) {
  try {
    return JSON.parse(localStorage.getItem(getErrorKey(userId)) || '{}');
  } catch {
    return {};
  }
}

function saveErrors(userId, data) {
  localStorage.setItem(getErrorKey(userId), JSON.stringify(data));
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
        
        card.innerHTML = `
          <div class="module-title">${m.codigo}</div>
          <div class="module-meta">Módulo ${idx + 1}</div>
          <div style="font-size:0.85em;color:#666;margin-top:8px;">👉 Clique para ver conteúdo</div>
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

function renderExamModal(moduloId, questions) {
  const html = [];
  html.push(`<div style="display:flex;justify-content:space-between;align-items:center;">
    <div style="font-weight:700;">Simulado Módulo ${moduloId}</div>
    <button id="close-exam" class="btn btn-icon"></button>
  </div>`);

  html.push('<div style="margin-top: 14px;">');
  questions.forEach((q, idx) => {
    const opts = q.opcoes || [];
    html.push(`
      <div class="question">
        <div class="question-title">${idx + 1}. ${q.pergunta}</div>
        <div class="options">
          ${opts.map((opt, j) => `
            <label class="option">
              <input type="radio" name="q_${q.id}" value="${opt}" />
              ${String.fromCharCode(65 + j)}. ${opt}
            </label>
          `).join('')}
        </div>
      </div>
    `);
  });
  html.push('</div>');
  html.push(`<div style="display:flex;justify-content:flex-end;gap:12px;margin-top:16px;">
  <button id="cancel-exam" class="btn btn-secondary">Fechar</button>
  <button id="submit-exam" class="btn btn-primary">Enviar</button>
</div>`);

  openModal(html.join(''));

  document.getElementById('close-exam').onclick = closeModal;
  document.getElementById('cancel-exam').onclick = closeModal;
  document.getElementById('submit-exam').onclick = () => gradeExam(questions);
}

async function recordResponses(responses) {
  try {
    await apiFetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responses }),
    });
  } catch (err) {
    // Não bloqueia a experiência do usuário se houver problemas de rede.
    console.warn('Não foi possível enviar respostas ao backend:', err);
  }
}

async function gradeExam(questions) {
  if (!CURRENT_USER) return;
  const errors = loadErrors(CURRENT_USER.id);

  const payload = [];
  let correctCount = 0;

  questions.forEach(q => {
    const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
    const answer = selected ? selected.value : null;
    const isCorrect = answer === q.correta_texto;

    if (!isCorrect) {
      errors[q.id] = (errors[q.id] || 0) + 1;
    } else {
      delete errors[q.id];
    }

    if (isCorrect) correctCount += 1;

    payload.push({
      user_id: CURRENT_USER.id,
      module: Number(q.modulo),
      question_id: q.id,
      correto: isCorrect,
    });
  });

  saveErrors(CURRENT_USER.id, errors);
  recordResponses(payload);

  const score = Math.round((correctCount / questions.length) * 100);
  openModal(`<div style="text-align:center;">
    <h3>Resultado: ${score}%</h3>
    <p>Acertou ${correctCount} de ${questions.length} questões.</p>
    <button id="close-result" class="btn btn-primary">Fechar</button>
  </div>`);
  document.getElementById('close-result').onclick = closeModal;
}

function bindNavigation() {
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      setView(btn.dataset.view);
    });
  });
}

async function onLoginSuccess(user) {
  CURRENT_USER = user;
  const name = user.user_metadata?.full_name || user.email;
  document.getElementById('user-name').textContent = name;

  await loadModules().then(renderModulesGrid).catch(console.error);
  bindModuleActions();
  bindNavigation();
  setView('how-to');
  showApp();
}

async function initAuth() {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    onLoginSuccess(data.session.user);
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      onLoginSuccess(session.user);
    } else {
      CURRENT_USER = null;
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
  if (data?.user) {
    onLoginSuccess(data.user);
  }
}

async function signUp(email, password) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  const { error, data } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert(error.message || 'Erro ao criar conta');
    return;
  }
  if (data?.user) {
    onLoginSuccess(data.user);
  }
}

async function signOut() {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
  CURRENT_USER = null;
  showLogin();
}

function bindLoginForm() {
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (!email || !password) {
      alert('Preencha email e senha.');
      return;
    }
    signIn(email, password);
  });

  document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (!email || !password) {
      alert('Preencha email e senha antes de registrar.');
      return;
    }
    signUp(email, password);
  });

  document.getElementById('btn-logout').addEventListener('click', signOut);
}

/**
 * NOVO: Envia respostas para o backend
 */
async function salvarRespostasNoBackend(userId, moduleId, responses) {
  if (!userId) {
    console.warn("⚠️ Não há usuário logado, respostas não serão enviadas ao backend");
    return false;
  }

  const payload = {
    responses: responses.map(r => ({
      user_id: userId,
      module: moduleId,
      question_id: r.id,
      correto: r.correct
    }))
  };

  try {
    const res = await apiFetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Respostas enviadas ao backend:", data);
    
    if (typeof notify === 'function') {
      notify(`${data.inserted || responses.length} respostas sincronizadas ✅`, "success");
    }
    
    return true;

  } catch (error) {
    console.error("❌ Erro ao enviar respostas:", error);
    
    if (typeof notify === 'function') {
      notify("Aviso: Respostas salvas localmente mas não sincronizadas com servidor", "warning");
    }
    
    return false;
  }
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
