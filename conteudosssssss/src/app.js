/**
 * INICIALIZAÇÃO E NAVEGAÇÃO PRINCIPAL
 */

async function initApp() {
  // Global Error Handler for diagnostics
  window.addEventListener('error', (event) => {
    console.error("Erro Detectado:", event.error);
    if (typeof notify === "function") {
      notify(`Erro de Sistema: ${event.message}`, "error");
    }
  });

  await DB.init();

  if (!window.SUPABASE) {
    console.warn("SUPABASE não detectado!");
    if (typeof notify === "function") {
      notify("Aviso: Chaves do Supabase não configuradas no index.html. O sistema usará armazenamento local.", "warning");
    }
  }

  setupAuth();
  setupNavigation();
  setupModuleActions();
  setupResetProgress();
  if (window.setupSettings) window.setupSettings();

  // Se houver usuário salvo no localStorage
  const savedUser = JSON.parse(localStorage.getItem('auth_user'));
  if (savedUser) {
    unlockApp(savedUser);
  }
}


function findRelevantContentSnippet(moduleCode, topics) {
  const text = MODULE_CONTENT_CACHE[moduleCode];
  if (!text || !topics || !topics.length) return null;
  const lines = text.split(/\r?\n/);
  let best = null;
  topics.forEach(topic => {
    if (best) return;
    const needle = topic.toLowerCase();
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes(needle)) {
        let start = i;
        while (start > 0 && lines[start - 1].trim() !== "") start -= 1;
        let end = i;
        while (end < lines.length - 1 && lines[end + 1].trim() !== "") end += 1;
        best = lines.slice(start, end + 1).join("\n");
        break;
      }
    }
  });
  return best;
}

/**
 * RENDERIZAÇÃO DE MÓDULOS
 */
async function renderModules() {
  const list = document.getElementById("home-modules-list");
  if (!list) return;

  const state = await loadState();
  list.innerHTML = "";

  MODULES.forEach(m => {
    const moduleState = getModuleState(state, m.code);
    const accuracy = computeAccuracy(moduleState.correctCount, moduleState.totalAnswered);
    const accuracyText = formatPercent(accuracy);

    let tagClass = "tag-warning";
    let statusLabel = "Pendente";

    if (accuracy >= 70 && moduleState.totalAnswered >= 10) {
      tagClass = "tag-success";
      statusLabel = "Domínio";
    } else if (accuracy > 0 && accuracy < 40) {
      tagClass = "tag-danger";
      statusLabel = "Crítica";
    } else if (moduleState.totalAnswered > 0) {
      statusLabel = "Média";
    }

    const card = document.createElement("div");
    card.className = "home-module-item glass-card";
    card.setAttribute("data-action", "select-module");
    card.setAttribute("data-module", m.code);
    card.setAttribute("tabindex", "0");

    const accPercent = Math.round(accuracy);

    card.innerHTML = `
      <div class="home-module-header">
        <div class="home-module-icon">📚</div>
        <div class="home-module-info">
          <div class="home-module-title">${m.code} • ${m.title}</div>
          <div class="home-module-subtitle">Peso: ${m.weight} | Status: <span class="${tagClass} tag">${statusLabel}</span></div>
        </div>
      </div>
      
      <div class="home-module-body">
        <div class="progress-container">
          <div class="progress-label">Acurácia: ${accuracyText}</div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${accPercent}%"></div>
          </div>
        </div>
        <div class="home-module-preview" id="home-preview-${m.code}"></div>
      </div>
      
      <div class="home-module-actions">
        <button class="btn-primary" data-action="select-module" data-module="${m.code}">Estudar Conteúdo</button>
        <button class="btn-secondary" data-action="exam-seq" data-exam="SIMULADO" data-module="${m.code}">Iniciar Simulado</button>
      </div>
    `;
    list.appendChild(card);

    const num = m.id;
    const rawPath = `data/modules/Modulo ${num}/conteudo ${num}.md`;
    const path = encodeURI(rawPath);
    fetch(path)
      .then(res => res.ok ? res.text() : "")
      .then(text => {
        if (!text) return;
        const preview = text.split(/\r?\n/).slice(0, 8).join("\n");
        const el = document.getElementById(`home-preview-${m.code}`);
        if (el) el.innerHTML = renderMarkdown(preview);
      })
      .catch(() => { });
  });
}

function loadModuleContent(moduleCode) {
  const moduleInfo = MODULES.find(m => m.code === moduleCode);
  if (!moduleInfo) return;
  const num = moduleInfo.id;
  const container = document.getElementById("module-content-" + moduleCode);
  if (!container) return;
  const rawPath = `data/modules/Modulo ${num}/conteudo ${num}.md`;
  const path = encodeURI(rawPath);
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar conteúdo");
      return res.text();
    })
    .then(text => {
      MODULE_CONTENT_CACHE[moduleCode] = text;
      container.innerHTML = renderMarkdown(text);
      renderModuleIndex(moduleCode);
      renderModuleSections(moduleCode);
    })
    .catch(() => {
      container.textContent = "Não foi possível carregar o conteúdo do módulo. Verifique se o arquivo existe.";
    });
}

function loadModuleExamsMD(moduleCode) {
  const moduleInfo = MODULES.find(m => m.code === moduleCode);
  if (!moduleInfo) return;
  const num = moduleInfo.id;
  const grid = document.getElementById(`module-exams-grid-${moduleInfo.code}`);
  if (!grid) return;
  const files = [`data/modules/Modulo ${num}/prova 1.md`, `data/modules/Modulo ${num}/prova 2.md`, `data/modules/Modulo ${num}/prova 3.md`];
  grid.innerHTML = "";
  files.forEach((raw, idx) => {
    const path = encodeURI(raw);
    fetch(path)
      .then(res => res.ok ? res.text() : "")
      .then(text => {
        const preview = text ? text.split(/\r?\n/).slice(0, 3).join("\n") : "";
        const html = `
          <div class="module-exam-card">
            <div class="module-exam-title">Prova ${idx + 1}</div>
            <div class="module-exam-preview">${preview ? renderMarkdown(preview) : "<em>Arquivo não encontrado</em>"}</div>
            <div class="module-exam-actions">
              <button class="btn-primary" data-action="exam-seq" data-exam="P1" data-module="${moduleInfo.code}">Gerar Prova ${idx + 1}</button>
            </div>
          </div>
        `;
        const el = document.createElement("div");
        el.innerHTML = html;
        grid.appendChild(el.firstElementChild);
      })
      .catch(() => {
        const el = document.createElement("div");
        el.className = "module-exam-card";
        el.innerHTML = `
          <div class="module-exam-title">Prova ${idx + 1}</div>
          <div class="module-exam-preview"><em>Arquivo não encontrado</em></div>
          <div class="module-exam-actions">
            <button class="btn-primary" data-action="exam-seq" data-exam="P1" data-module="${moduleInfo.code}">Gerar Prova ${idx + 1}</button>
          </div>
        `;
        grid.appendChild(el);
      });
  });
}

function loadModuleContentInto(moduleCode, targetId) {
  const moduleInfo = MODULES.find(m => m.code === moduleCode);
  if (!moduleInfo) return;
  const num = moduleInfo.id;
  const container = document.getElementById(targetId);
  if (!container) return;
  const rawPath = `data/modules/Modulo ${num}/conteudo ${num}.md`;
  const path = encodeURI(rawPath);
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar conteúdo");
      return res.text();
    })
    .then(text => {
      MODULE_CONTENT_CACHE[moduleCode] = text;

      // Track read modules for achievements
      const readModules = JSON.parse(localStorage.getItem('read_modules') || '[]');
      if (!readModules.includes(moduleCode)) {
        readModules.push(moduleCode);
        localStorage.setItem('read_modules', JSON.stringify(readModules));
      }

      container.innerHTML = renderMarkdown(text);
    })
    .catch(() => {
      container.textContent = "Não foi possível carregar o conteúdo do módulo. Verifique se o arquivo existe.";
    });
}

function loadModuleExamsInto(moduleCode, gridId) {
  const moduleInfo = MODULES.find(m => m.code === moduleCode);
  if (!moduleInfo) return;
  const num = moduleInfo.id;
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const files = [`data/modules/Modulo ${num}/prova 1.md`, `data/modules/Modulo ${num}/prova 2.md`, `data/modules/Modulo ${num}/prova 3.md`];
  grid.innerHTML = "";
  files.forEach((raw, idx) => {
    const path = encodeURI(raw);
    fetch(path)
      .then(res => res.ok ? res.text() : "")
      .then(text => {
        const preview = text ? text.split(/\r?\n/).slice(0, 3).join("\n") : "";
        const html = `
          <div class="module-exam-card">
            <div class="module-exam-title">Prova ${idx + 1}</div>
            <div class="module-exam-preview">${preview ? renderMarkdown(preview) : "<em>Arquivo não encontrado</em>"}</div>
            <div class="module-exam-actions">
              <button class="btn-primary" data-action="exam-seq" data-exam="P1" data-module="${moduleInfo.code}">Gerar Prova ${idx + 1}</button>
            </div>
          </div>
        `;
        const el = document.createElement("div");
        el.innerHTML = html;
        grid.appendChild(el.firstElementChild);
      })
      .catch(() => {
        const el = document.createElement("div");
        el.className = "module-exam-card";
        el.innerHTML = `
          <div class="module-exam-title">Prova ${idx + 1}</div>
          <div class="module-exam-preview"><em>Arquivo não encontrado</em></div>
          <div class="module-exam-actions">
            <button class="btn-primary" data-action="exam-seq" data-exam="P1" data-module="${moduleInfo.code}">Gerar Prova ${idx + 1}</button>
          </div>
        `;
        grid.appendChild(el);
      });
  });
}

async function renderAllModulesLibrary() {
  const lib = document.getElementById("home-library");
  if (!lib) return;
  lib.innerHTML = "";
  MODULES.forEach(m => {
    const section = document.createElement("div");
    section.className = "card";
    section.innerHTML = `
      <div class="card-title">${m.code} • ${m.title} — Peso ${m.weight}</div>
      <div class="module-content-body" id="library-content-${m.code}">Carregando conteúdo...</div>
      <div class="module-exams">
        <div class="module-exams-title">Provas</div>
        <div class="module-exams-grid" id="library-exams-grid-${m.code}"></div>
      </div>
    `;
    lib.appendChild(section);
    loadModuleContentInto(m.code, `library-content-${m.code}`);
    loadModuleExamsInto(m.code, `library-exams-grid-${m.code}`);
  });
}

function renderHomeModuleDetail(moduleCode) {
  const detail = document.getElementById("home-module-detail");
  if (!detail) return;
  const moduleInfo = MODULES.find(m => m.code === moduleCode);
  if (!moduleInfo) return;

  detail.innerHTML = `
    <div class="card glass-card">
      <div class="module-detail-header" style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <button class="btn-secondary" id="back-to-home" style="padding: 8px 12px;">←</button>
        <h2 style="margin: 0;">${moduleInfo.code} • ${moduleInfo.title}</h2>
      </div>
      
      <div class="module-content-body" id="module-content-${moduleInfo.code}" style="max-height: 400px; overflow-y: auto; margin-bottom: 24px;">
        <div class="skeleton-block"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>

      <div class="module-detail-footer" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <button class="btn-primary" 
          data-action="exam-seq" data-exam="SIMULADO" data-module="${moduleInfo.code}" style="height: 60px; font-weight: 700;">
          🎯 SIMULADO (15 QUESTÕES)
        </button>
        <button class="btn-secondary" 
          data-action="exam-seq" data-exam="REFORCO" data-module="${moduleInfo.code}" style="height: 60px; font-weight: 700;">
          🚀 REFORÇO (ERROS)
        </button>
      </div>
    </div>
  `;

  document.getElementById("back-to-home").onclick = () => {
    detail.innerHTML = `
      <div class="card glass-card">
        <div class="card-title">Selecione um Módulo</div>
        <p>Escolha um dos módulos à esquerda para iniciar sua jornada de aprendizado.</p>
      </div>
    `;
  };
  loadModuleContent(moduleCode);
}

function renderModuleSections(moduleCode) {
  const container = document.getElementById(`module-sections-${moduleCode}`);
  if (!container) return;
  const text = MODULE_CONTENT_CACHE[moduleCode];
  if (!text) { container.innerHTML = ""; return; }
  const lines = text.split(/\r?\n/);
  const sections = [];
  let current = null;
  lines.forEach(raw => {
    const line = raw.trimEnd();
    if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) {
      const title = line.replace(/^#+\s+/, "").trim();
      const id = "h-" + slugify(title);
      if (current) sections.push(current);
      current = { title, id, content: [] };
    } else {
      if (current) current.content.push(line);
    }
  });
  if (current) sections.push(current);
  const html = sections.slice(0, 12).map(sec => {
    const previewText = sec.content.join("\n").split(/\r?\n/).filter(Boolean).slice(0, 4).join("\n");
    const previewHtml = previewText ? renderMarkdown(previewText) : "<em>Sem preview</em>";
    return `
      <div class="module-section-card" data-action="goto-section" data-target="${sec.id}">
        <div class="module-section-title">${escapeHtml(sec.title)}</div>
        <div class="module-section-preview">${previewHtml}</div>
        <div class="module-section-actions">
          <button class="btn-primary" data-action="goto-section" data-target="${sec.id}">Ir para seção</button>
        </div>
      </div>
    `;
  }).join("");
  container.innerHTML = `
    <div class="module-sections-grid">
      ${html}
    </div>
  `;
}

function renderModuleIndex(moduleCode) {
  const container = document.getElementById(`module-index-${moduleCode}`);
  if (!container) return;
  const text = MODULE_CONTENT_CACHE[moduleCode];
  if (!text) { container.innerHTML = ""; return; }
  const lines = text.split(/\r?\n/);
  const items = [];
  lines.forEach(raw => {
    const line = raw.trim();
    if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) {
      const t = line.replace(/^#+\s+/, "").trim();
      const id = "h-" + slugify(t);
      items.push({ t, id });
    }
  });
  if (!items.length) { container.innerHTML = ""; return; }
  container.innerHTML = items.slice(0, 12).map(it => `<a href="#${it.id}" class="module-index-link">${escapeHtml(it.t)}</a>`).join("");
}

/**
 * NAVEGAÇÃO E EVENTOS
 */
function switchView(view) {
  const views = ["view-how-it-works", "view-home", "view-exam", "view-dashboard", "view-ranking", "view-wrong-bank"];
  views.forEach(v => {
    const el = document.getElementById(v);
    if (el) el.classList.remove("view-active");
  });

  const targetView = document.getElementById(`view-${view}`);
  if (targetView) targetView.classList.add("view-active");

  if (view === "exam") {
    document.body.classList.add("exam-mode");
  } else {
    document.body.classList.remove("exam-mode");
  }

  const titles = {
    "how-it-works": "Como funciona?",
    "home": "Home - Módulos",
    "dashboard": "Dashboard do Aluno",
    "ranking": "Ranking de Alunos",
    "exam": "Prova do Módulo",
    "wrong-bank": "Banco de Erros"
  };

  const titleEl = document.getElementById("main-title");
  if (titleEl) titleEl.textContent = titles[view] || "Treinador";

  if (view === "dashboard") renderDashboard();
  if (view === "ranking") renderRanking();
  if (view === "home") { renderModules(); }
}

function setupNavigation() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle-btn");

  if (toggleBtn && sidebar) {
    toggleBtn.onclick = () => {
      sidebar.classList.toggle("collapsed");
    };
  }

  const navButtons = Array.from(document.querySelectorAll(".nav-item"));
  navButtons.forEach(btn => {
    btn.onclick = () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.getAttribute("data-view");
      switchView(view);
    };
  });
}

function setupModuleActions() {
  document.addEventListener("click", e => {
    const target = e.target;
    if (target.closest('[data-action="select-module"]')) {
      const moduleCode = target.closest('[data-module]').getAttribute('data-module');
      renderHomeModuleDetail(moduleCode);
    }
    if (target.getAttribute("data-action") === "goto-section") {
      const id = target.getAttribute("data-target");
      if (id) {
        location.hash = id;
      }
    }
    if (target.getAttribute("data-action") === "exam-seq") {
      const moduleCode = target.getAttribute("data-module");
      const examType = target.getAttribute("data-exam");
      startExamSequential(moduleCode, examType);
    }
    if (target.getAttribute("data-action") === "resume-exam") {
      const moduleCode = target.getAttribute("data-module");
      startExamSequential(moduleCode, "P1"); // Tenta retomar P1 por padrão
    }
  });
  document.addEventListener("keydown", e => {
    const t = e.target;
    if (e.key === "Enter" && t && t.getAttribute && t.getAttribute("data-action") === "select-module") {
      const moduleCode = t.getAttribute("data-module");
      if (moduleCode) renderHomeModuleDetail(moduleCode);
    }
  });
}

function setupResetProgress() {
  const btn = document.getElementById("reset-progress-btn");
  if (btn) {
    btn.onclick = async () => {
      if (!confirm("Deseja realmente limpar todo o seu progresso? Esta ação não pode ser desfeita.")) return;
      if (CURRENT_USER) {
        await DB.saveProgress(CURRENT_USER.id, { modules: {} });
        alert("Progresso limpo.");
        renderModules();
        if (document.getElementById("view-dashboard").classList.contains("view-active")) renderDashboard();
      }
    };
  }
}
