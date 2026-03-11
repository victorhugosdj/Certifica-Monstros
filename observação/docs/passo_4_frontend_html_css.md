# Passo 4 – Frontend: HTML + CSS

## 📄 index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certifica Monstros – Treinador de Elite</title>
  <meta name="description"
    content="Plataforma premium de simulados para certificações de Hiperautomação.">

  <!-- Supabase Config -->
  <meta name="supabase-url" content="https://ibmembnxtbpsehqdorme.supabase.co">
  <meta name="supabase-anon-key"
    content="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibWVtYm54dGJwc2VocWRvcm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzI4NzIsImV4cCI6MjA4ODA0ODg3Mn0.K0-75dWTwUNYm09iOP8bKzxqEWndloyWDIpPnDToa0E">

  <!-- Fontes e Libs -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div id="app">

    <!-- ═══════════ TELA DE LOGIN ═══════════ -->
    <section id="login-screen">
      <div class="login-overlay">
        <div class="login-card">
          <div class="login-logo">
            <h1>🔥 Certifica Monstros</h1>
            <p>Treinador de Elite em Hiperautomação</p>
          </div>

          <!-- Formulário Login -->
          <div id="form-login" class="auth-form">
            <input type="email" id="login-email" placeholder="Email" class="input">
            <input type="password" id="login-password" placeholder="Senha" class="input">
            <button id="btn-login" class="btn-primary">ENTRAR</button>
            <div class="auth-links">
              <a href="#" id="show-register">Criar conta</a> •
              <a href="#" id="show-forgot">Esqueci a senha</a>
            </div>
          </div>

          <!-- Formulário Cadastro -->
          <div id="form-register" class="auth-form" style="display:none">
            <input type="text" id="reg-name" placeholder="Nome completo" class="input">
            <input type="email" id="reg-email" placeholder="Email" class="input">
            <input type="password" id="reg-password" placeholder="Senha" class="input">
            <input type="password" id="reg-confirm" placeholder="Confirmar senha" class="input">
            <button id="btn-register" class="btn-primary">CADASTRAR</button>
            <div class="auth-links"><a href="#" id="show-login-back">Já tenho conta</a></div>
          </div>

          <!-- Formulário Esqueci Senha -->
          <div id="form-forgot" class="auth-form" style="display:none">
            <input type="email" id="forgot-email" placeholder="Email" class="input">
            <button id="btn-forgot" class="btn-secondary">ENVIAR LINK</button>
            <div class="auth-links"><a href="#" id="show-login-back2">Voltar ao login</a></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ APP PRINCIPAL ═══════════ -->
    <section id="main-app" style="display:none">

      <!-- ── SIDEBAR RETRÁTIL ── -->
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <span class="sidebar-title">🔥 Certifica Monstros</span>
          <button id="btn-toggle-sidebar" class="btn-icon">☰</button>
        </div>
        <nav class="sidebar-nav">
          <button class="nav-item active" data-view="how-it-works">
            <span class="nav-icon">💡</span><span class="nav-label">Como Utilizar</span>
          </button>
          <button class="nav-item" data-view="modulos">
            <span class="nav-icon">📚</span><span class="nav-label">Módulos</span>
          </button>
          <button class="nav-item" data-view="dashboard">
            <span class="nav-icon">📊</span><span class="nav-label">Dashboard</span>
          </button>
          <button class="nav-item" data-view="ranking">
            <span class="nav-icon">🏆</span><span class="nav-label">Ranking</span>
          </button>
          <button class="nav-item" data-view="settings">
            <span class="nav-icon">⚙️</span><span class="nav-label">Configurações</span>
          </button>
        </nav>
        <div class="sidebar-footer">
          <span class="footer-user" id="sidebar-user">Visitante</span>
        </div>
      </aside>

      <!-- ── CONTEÚDO PRINCIPAL ── -->
      <main class="content">
        <header class="content-header">
          <button id="btn-sidebar-mobile" class="btn-icon mobile-only">☰</button>
          <h1 id="page-title">Como Utilizar</h1>
        </header>

        <!-- View: Como Utilizar -->
        <div id="view-how-it-works" class="view active">
          <div class="card">
            <h2>🚀 Bem-vindo à Fábrica de Monstros</h2>
            <div class="steps-grid">
              <div class="step-card"><span class="step-num">1</span>
                <strong>Estudo dos Módulos</strong>
                <p>8 módulos com conteúdo teórico diretamente na plataforma.</p>
              </div>
              <div class="step-card"><span class="step-num">2</span>
                <strong>Simulados Dinâmicos</strong>
                <p>15 questões sorteadas aleatoriamente por módulo.</p>
              </div>
              <div class="step-card"><span class="step-num">3</span>
                <strong>Banco de Erros</strong>
                <p>Questões erradas vão pro banco. Acerte 2x seguidas para dominar.</p>
              </div>
              <div class="step-card"><span class="step-num">4</span>
                <strong>Dashboard & Ranking</strong>
                <p>Métricas em gráfico Radar, questões desafiadoras e ranking.</p>
              </div>
            </div>
            <button class="btn-primary btn-lg" onclick="switchView('modulos')">
              ► INICIAR MÓDULOS
            </button>
          </div>
        </div>

        <!-- View: Módulos (Grid de 8 cards) -->
        <div id="view-modulos" class="view">
          <div class="modules-grid" id="modules-grid">
            <!-- Renderizado via JS -->
          </div>
          <div id="module-detail" class="module-detail">
            <!-- Conteúdo do módulo selecionado -->
          </div>
        </div>

        <!-- View: Dashboard -->
        <div id="view-dashboard" class="view">
          <div id="dashboard-container">
            <!-- Renderizado via dashboard.js -->
          </div>
        </div>

        <!-- View: Ranking -->
        <div id="view-ranking" class="view">
          <div id="ranking-container"></div>
        </div>

        <!-- View: Configurações -->
        <div id="view-settings" class="view">
          <div class="card">
            <h2>Configurações da Conta</h2>
            <input type="text" id="settings-name" placeholder="Nome de exibição" class="input">
            <button id="btn-save-profile" class="btn-primary">Salvar</button>
            <hr>
            <button id="btn-logout" class="btn-danger">Sair da Conta</button>
          </div>
        </div>
      </main>

      <!-- ── MODAL DE PROVA (Overlay Z-9999) ── -->
      <div id="exam-modal" class="exam-overlay" style="display:none">
        <div class="exam-card">
          <div id="exam-container"></div>
        </div>
      </div>
    </section>
  </div>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="app.js"></script>
  <script src="dashboard.js"></script>
</body>
</html>
```

---

## 🎨 style.css

```css
/* ═══════════════════════════════════════
   CERTIFICA MONSTROS - Design System
   ═══════════════════════════════════════ */

:root {
  /* Cores */
  --bg-dark: #0a0e17;
  --bg-card: #111827;
  --bg-sidebar: #0d1117;
  --border: #1f2937;
  --primary: #ef4444;
  --primary-glow: rgba(239, 68, 68, 0.25);
  --accent: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --text: #e5e7eb;
  --text-dim: #9ca3af;
  --text-bright: #ffffff;

  /* Sidebar */
  --sidebar-width: 260px;
  --sidebar-collapsed: 64px;

  /* Spacing */
  --radius: 12px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg-dark);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── INPUTS ── */
.input {
  width: 100%;
  padding: 14px 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-bright);
  font-size: 0.95rem;
  margin-bottom: 12px;
  transition: var(--transition);
}
.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

/* ── BOTÕES ── */
.btn-primary {
  width: 100%; padding: 14px;
  background: linear-gradient(135deg, var(--primary), #dc2626);
  color: white; font-weight: 700; font-size: 1rem;
  border: none; border-radius: 8px; cursor: pointer;
  transition: var(--transition);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px var(--primary-glow); }
.btn-secondary {
  width: 100%; padding: 14px;
  background: rgba(255,255,255,0.05); color: var(--text);
  font-weight: 600; border: 1px solid var(--border);
  border-radius: 8px; cursor: pointer; transition: var(--transition);
}
.btn-secondary:hover { background: rgba(255,255,255,0.1); }
.btn-danger {
  width: 100%; padding: 14px;
  background: transparent; color: var(--primary);
  border: 1px solid var(--primary); border-radius: 8px;
  cursor: pointer; font-weight: 600; transition: var(--transition);
}
.btn-danger:hover { background: var(--primary); color: white; }
.btn-icon {
  background: none; border: none; color: var(--text); font-size: 1.4rem;
  cursor: pointer; padding: 6px;
}
.btn-lg { height: 56px; font-size: 1.15rem; }

/* ── LOGIN OVERLAY ── */
.login-overlay {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #0a0e17 0%, #1a1a2e 100%);
  z-index: 10000;
}
.login-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 40px;
  width: 420px; max-width: 90vw;
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
}
.login-logo { text-align: center; margin-bottom: 32px; }
.login-logo h1 { font-size: 1.8rem; color: var(--primary); }
.login-logo p { color: var(--text-dim); margin-top: 8px; }
.auth-links { text-align: center; margin-top: 16px; }
.auth-links a { color: var(--accent); text-decoration: none; font-size: 0.9rem; }
.auth-links a:hover { text-decoration: underline; }

/* ── SIDEBAR ── */
.sidebar {
  position: fixed; left: 0; top: 0; bottom: 0;
  width: var(--sidebar-width);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  transition: width var(--transition);
  z-index: 100;
  overflow: hidden;
}
.sidebar.collapsed { width: var(--sidebar-collapsed); }
.sidebar.collapsed .nav-label,
.sidebar.collapsed .sidebar-title,
.sidebar.collapsed .footer-user { display: none; }

.sidebar-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 16px; border-bottom: 1px solid var(--border);
}
.sidebar-title { font-weight: 700; font-size: 1rem; color: var(--primary); white-space: nowrap; }

.sidebar-nav { flex: 1; padding: 12px 8px; display: flex; flex-direction: column; gap: 4px; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; border: none; background: none;
  color: var(--text-dim); font-size: 0.95rem;
  cursor: pointer; border-radius: 8px; transition: var(--transition);
  text-align: left; width: 100%;
}
.nav-item:hover { background: rgba(255,255,255,0.05); color: var(--text); }
.nav-item.active {
  background: var(--primary-glow); color: var(--primary); font-weight: 600;
}
.nav-icon { font-size: 1.2rem; flex-shrink: 0; }

.sidebar-footer {
  padding: 16px; border-top: 1px solid var(--border);
  font-size: 0.85rem; color: var(--text-dim);
}

/* ── CONTENT AREA ── */
.content {
  margin-left: var(--sidebar-width);
  padding: 24px 32px;
  min-height: 100vh;
  transition: margin-left var(--transition);
}
.sidebar.collapsed ~ .content { margin-left: var(--sidebar-collapsed); }

.content-header {
  display: flex; align-items: center; gap: 16px;
  margin-bottom: 32px; padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.content-header h1 { font-size: 1.6rem; }
.mobile-only { display: none; }

/* ── VIEWS ── */
.view { display: none; }
.view.active { display: block; animation: fadeIn 0.3s ease; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── CARDS ── */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
}

/* ── MODULES GRID (8 Cards) ── */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}
.module-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}
.module-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  opacity: 0;
  transition: var(--transition);
}
.module-card:hover { transform: translateY(-4px); border-color: var(--primary); }
.module-card:hover::before { opacity: 1; }
.module-card h3 { margin-bottom: 8px; font-size: 1.1rem; }
.module-card .module-desc { color: var(--text-dim); font-size: 0.9rem; }
.module-card .module-badge {
  display: inline-block; margin-top: 12px;
  padding: 4px 10px; border-radius: 20px;
  font-size: 0.75rem; font-weight: 600;
  background: rgba(16, 185, 129, 0.1); color: var(--success);
}

/* Steps Grid */
.steps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin: 24px 0; }
.step-card {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border);
  border-radius: 8px; padding: 20px; position: relative;
}
.step-num {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--primary-glow); color: var(--primary);
  font-weight: 700; font-size: 1.1rem; margin-bottom: 8px;
}
.step-card strong { display: block; margin-bottom: 4px; }
.step-card p { color: var(--text-dim); font-size: 0.85rem; }

/* ── EXAM OVERLAY ── */
.exam-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
}
.exam-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  width: 900px; max-width: 95vw;
  max-height: 90vh; overflow-y: auto;
  padding: 40px;
}

/* ── DASHBOARD ── */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.stat-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 24px;
}
.stat-value {
  font-size: 2.5rem; font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.stat-label { color: var(--text-dim); font-size: 0.85rem; margin-top: 4px; }

/* ── RESPONSIVO ── */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: var(--sidebar-width);
  }
  .sidebar.mobile-open { transform: translateX(0); }
  .content { margin-left: 0; padding: 16px; }
  .mobile-only { display: block; }
  .modules-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
}
```

## 📌 Notas

- A sidebar é **retrátil**: clica em "☰" e colapsa para só ícones
- O modal de prova usa `z-index: 9999` e cobre tudo
- Grid de módulos usa `auto-fill` para adaptar de 1 a 4 colunas
- Design premium com gradientes, glassmorphism, micro-animações

---

**Próximo passo:** [Passo 5 – Frontend JavaScript](./passo_5_frontend_js.md)
