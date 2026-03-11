# 🚀 GUIA DE DEPLOYMENT — Git + Vercel

**Data:** 11 de Março de 2026  
**Tempo estimado:** 30 minutos  
**Resultado:** Sistema live em produção

---

## 📋 Pré-Requisitos

Antes de começar, você precisa de:

1. **Conta GitHub** (grátis) — https://github.com/signup
2. **Conta Vercel** (grátis com GitHub) — https://vercel.com
3. **Git instalado** — https://git-scm.com/download/win (Windows)
4. **Credenciais prontas:**
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `ALLOWED_ORIGINS`

---

## ✅ Checklist Pré-Deploy

```
BACKEND:
  [ ] backend/main.py — Tudo funcionando?
  [ ] backend/database.py — Imports OK?
  [ ] backend/requirements.txt — Todas as dependências?
  [ ] .env — Credenciais preenchidas?
  [ ] .gitignore — .env está protegido?

FRONTEND:
  [ ] frontend/app.js — Sem erros de sintaxe?
  [ ] frontend/src/module-viewer.js — Criado e funcionando?
  [ ] frontend/index.html — Script tags corretos?
  [ ] frontend/data/modules — Conteúdo presente?
  [ ] frontend/data/modulos.json — Válido?
  [ ] frontend/data/provas.json — Válido?
  [ ] style.css — Responsivo OK?

DATABASE:
  [ ] supabase/seed.sql — Executado?
  [ ] RLS policies — Configuradas?
  [ ] Índices — 4 principais criados?

DOCUMENTAÇÃO:
  [ ] Tudo documentado?
```

Se algum ☐, volte e corrija ANTES de fazer deploy!

---

## 🔧 PASSO 1: Preparar Repositório Git (Local)

### 1.1 Inicializar Git

```powershell
# Vá para a pasta do projeto
cd C:\Users\zello\Desktop\conteudoOficial

# Verificar se já tem Git
git status

# Se der erro "not a git repository", inicializar:
git init

# Verificar gitignore
type .gitignore  # Deve ser: .env, __pycache__, *.pyc, .DS_Store
```

### 1.2 Preparar Arquivos

```powershell
# Remover cache/dev files (NÃO commitar)
Remove-Item -Recurse -Force ".\.venv" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "__pycache__" -Recurse
Remove-Item -Force ".env" -ErrorAction SilentlyContinue  
Remove-Item -Recurse -Force "conteudosssssss" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "observação" -ErrorAction SilentlyContinue

# Confirmar .gitignore (executar no PowerShell)
$gitignore = @"
# Environment
.env
.env.local
.env.*.local

# Python
__pycache__/
*.py[cod]
*`$py.class
*.so
.Python
pip-log.txt
.venv/
venv/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build/Dist
dist/
build/
*.egg-info/

# Logs
*.log
logs/
"@

Set-Content -Path ".\.gitignore" -Value $gitignore -Force
```

### 1.3 Criar arquivo `.env.example` (PÚBLICO)

```powershell
# Criar .env.example com placeholder (SEM valores reais!)
$envExample = @"
# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=seu-anon-key-aqui
SUPABASE_SERVICE_KEY=sua-service-role-key-aqui

# CORS
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000,https://seu-dominio.vercel.app

# Debug
DEBUG=False
"@

Set-Content -Path ".\.env.example" -Value $envExample -Force
```

### 1.4 Primeiro Commit

```powershell
# Adicionar todos os arquivos (exceto .gitignore)
git add --all
git status  # Verificar: .env NÃO deve aparecer!

# Fazer commit
git commit -m "Initial commit: Certifica Monstros v2.0 - Sistema Interativo"

# Listar commits
git log --oneline  # Deve mostrar 1 commit
```

---

## 🌐 PASSO 2: Criar Repositório no GitHub

### 2.1 Criar Repo no GitHub

1. Abrir https://github.com/new
2. Preencher:
   - **Repository name:** `certifica-monstros`
   - **Description:** Platform de simulados educacionais
   - **Visibility:** Public (mostrar para todos) ou Private (só você)
   - Do NOT initialize with README (já temos)
   - Clicar "Create repository"

### 2.2 Conectar Local com GitHub

```powershell
# Copie a URL HTTPS do GitHub (botão verde "Code")
# Exemplo: https://github.com/seu-usuario/certifica-monstros.git

# Adicionar remote (no PowerShell, substitua URL):
git remote add origin https://github.com/SEU-USUARIO/certifica-monstros.git

# Verificar conexão
git remote -v
# Deve mostrar: origin https://github.com/...

# Fazer push (enviar para GitHub)
git branch -M main  # Renomear para "main" (padrão)
git push -u origin main  # Enviar

# Verificar no GitHub (refresh página) — arquivo deve aparecer!
```

**Resultado:** Seu código está no GitHub! 🎉

---

## ⚡ PASSO 3: Deploy Frontend com Vercel

### 3.1 Criar Projeto Vercel via GitHub

1. Abrir https://vercel.com/new
2. Escolher "Import Git Repository"
3. Conectar conta GitHub (se pedirdo)
4. Procurar por `certifica-monstros` e clicar
5. Configurar:
   - **Framework Preset:** Other
   - **Root Directory:** ./frontend
   - **Build & Development Settings:**
     - Build Command: *(deixar vazio)*
     - Output Directory: `.`
     - Environment Variables: *(próximo passo)*

### 3.2 Variáveis de Ambiente (Build)

Adicionar Variables antes de deploy:

```
VITE_SUPABASE_URL = https://ibmembnxtbpsehqdorme.supabase.co
VITE_SUPABASE_KEY = eyJhbGciOiJIUzI1... (sua key)
VITE_API_BASE_URL = https://seu-backend.herokuapp.com (ou seu servidor)
```

**Nota:** Deixe `VITE_API_BASE_URL` em branco se o backend ainda não tem URL.

### 3.3 Deploy

1. Clicar "Deploy"
2. Esperar 2-3 minutos
3. ✅ Vercel dará URL como `https://certifica-monstros.vercel.app`

**Resultado:** Frontend ao vivo! 🌐

---

## 🖥️ PASSO 4: Deploy Backend

### Opção A: Heroku (Recomendado — Fácil)

```powershell
# 1. Criar conta em https://www.heroku.com/

# 2. Instalar Heroku CLI (Windows)
# Baixe do: https://devcenter.heroku.com/articles/heroku-cli

# 3. Login no Heroku (no PowerShell)
heroku login  # Abrirá navegador

# 4. Criar app (substitua "seu-app")
heroku create seu-app-certifica

# 5. Adicionar variáveis de ambiente
heroku config:set -a seu-app-certifica `
  SUPABASE_URL="https://ibmembnxtbpsehqdorme.supabase.co" `
  SUPABASE_KEY="seu-key" `
  SUPABASE_SERVICE_KEY="sua-service-key" `
  ALLOWED_ORIGINS="https://certifica-monstros.vercel.app,https://seu-dominio.com"

# 6. Deploy (envia código do Git)
git push heroku main  # Push para Heroku

# 7. Verificar logs
heroku logs -a seu-app-certifica -n 50

# 8. Seu backend está em: https://seu-app-certifica.herokuapp.com
```

**Resultado:** `https://seu-app-certifica.herokuapp.com/` 🚀

### Opção B: Railway.app (Alternativ)

```
1. Criar conta em https://railway.app/
2. Conectar GitHub repo
3. Selecionar branch `main`
4. Configurar environment variables
5. Deploy automático (Railway reconhece FastAPI)
6. URL gerada automicamente
```

### Opção C: VPS Próprio (Avançado)

```
1. Alugar servidor (AWS, DigitalOcean, Linode)
2. SSH: ssh root@seu-ip
3. Instalar Python, pip, nginx
4. Clone repo: git clone seu-repo
5. Instalar deps: pip install -r requirements.txt
6. Rodar: gunicorn -b 0.0.0.0:8000 backend.main:app
7. URL: https://seu-dominio.com/
```

---

## 🔗 PASSO 5: Conectar Frontend ao Backend

### 5.1 Atualizar URL de API

Após ter backend URL, atualizar Vercel:

```
1. https://vercel.com/dashboard
2. Selecionar projeto `certifica-monstros`
3. Settings → Environment Variables
4. Adicionar: VITE_API_BASE_URL = https://seu-app-certifica.herokuapp.com
5. Redeploy (automático)
```

### 5.2 Atualizar .env Local

```powershell
# Atualizar seu .env local para apontar para produção
$env = @"
SUPABASE_URL=https://ibmembnxtbpsehqdorme.supabase.co
SUPABASE_KEY=eyJhb...
SUPABASE_SERVICE_KEY=eyJhb...
ALLOWED_ORIGINS=https://certifica-monstros.vercel.app,https://seu-app-certifica.herokuapp.com,http://localhost:8080,http://localhost:3000
DEBUG=False
"@

Set-Content -Path ".\.env" -Value $env -Force
```

### 5.3 Testar Conexão

```
1. Abrir https://certifica-monstros.vercel.app
2. Fazer login
3. Fazer simulado
4. Ver DevTools (F12) → Network → POST /api/responses
5. Status deve ser 200 ✅
```

---

## 🔐 PASSO 6: Configurar CORS para Produção

### Backend (FastAPI)

```python
# Em backend/main.py, atualizar CORS:

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:8080").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600,
)
```

### Variável de Ambiente (Heroku ou Railway)

```
ALLOWED_ORIGINS=https://certifica-monstros.vercel.app,https://seu-backend-domain.com
```

---

## 📊 PASSO 7: Configurar Banco de Dados (Supabase)

### 7.1 Criar Projeto Supabase

```
1. Ir para https://supabase.com/
2. Criar novo projeto
3. Dar nome: "Certifica Monstros"
4. Escolher região: us-east-1 (mais próxima)
5. Copiar URL e keys para .env
```

### 7.2 Executar SQL (Schema)

```sql
-- Abrir Supabase Dashboard → SQL Editor
-- Copiar supabase/seed.sql COMPLETO
-- Colar em "New Query"
-- Executar (Ctrl+Enter ou botão Play)

-- Resultado esperado:
-- ✅ 3 tables created
-- ✅ 4 indexes created
-- ✅ RLS policies configured
```

### 7.3 Verificar Dados

```
1. Supabase Dashboard → Tables
2. Deve ver:
   - respostas_usuario
   - profiles
   - responses
3. Todos vazios (dados virão de usuários)
```

---

## ✅ CHECKLIST PÓS-DEPLOY

```
FRONTEND (Vercel):
  [ ] URL acessível: https://certifica-monstros.vercel.app
  [ ] Página carrega sem erros (F12)
  [ ] Login funciona
  [ ] Módulos aparecem
  [ ] Formulário de simulado completa

BACKEND (Heroku/Railway):
  [ ] URL acessível: https://seu-backend.herokuapp.com
  [ ] GET / retorna 200
  [ ] POST /api/responses aceita dados

DATABASE (Supabase):
  [ ] Tabelas existem
  [ ] RLS policies ativas
  [ ] Usuários conseguem fazer login

INTEGRAÇÃO:
  [ ] Frontend → Backend: POST funciona (F12 Network)
  [ ] Backend → Database: Dados salvos (Supabase Check)
  [ ] Dados persistem: Fazer 2 simulados, ver em Dashboard
```

---

## 🔄 Workflow Contínuo (CI/CD)

### Fazer Mudanças Localmente

```powershell
# 1. Editar código
# (ex: frontend/app.js)

# 2. Testar local
# npm start (ou http.server)

# 3. Commit
git add .
git commit -m "Descrição da mudança"

# 4. Push para GitHub
git push origin main

# 5. Vercel AUTOMATICAMENTE faz deploy!
# (Você recebe email quando completa)
```

### Rollback (Voltar versão anterior)

```powershell
# Se der problema, voltar ao commit anterior

git log --oneline  # Ver histórico
git revert HEAD    # Desfazer último commit
git push origin main

# Vercel redeploy automático
```

---

## 🐛 Troubleshooting Deploy

| Problema | Solução |
|----------|---------|
| **Vercel: 404 Not Found** | Verificar root directory é `./frontend` |
| **Backend: CORS Error** | `ALLOWED_ORIGINS` está correto em .env? |
| **Supabase: Connection refused** | Verificar URL e keys estão corretos |
| **Frontend não conecta Backend** | Backend URL em `VITE_API_BASE_URL`? |
| **Dados não salvam** | RLS policies bloqueando? Check Supabase logs |
| **Arquivo não encontrado** | Verificar `.gitignore` — não excluiu acidentalmente? |

---

## 📈 Próximas Melhorias (Produção)

```
v2.1 — Melhorias pós-deploy:
  • CDN (Cloudflare) para performance
  • SSL automático (já incluído Vercel)
  • Monitoring (Sentry)
  • Analytics (Vercel Analytics)
  • Backups automáticos (Supabase)

v2.2 — Escalabilidade:
  • Cache (Redis)
  • Load Balancer
  • Database replication
  • WAF (firewall)
```

---

## 🎉 Parabéns!

Você tem:
- ✅ Código no GitHub
- ✅ Frontend ao vivo (Vercel)
- ✅ Backend ao vivo (Heroku)
- ✅ Database configurado (Supabase)
- ✅ Sistema totalmente em produção! 🚀

---

## 📞 Resumo de URLs

```
GitHub Repository:     https://github.com/seu-usuario/certifica-monstros
Frontend (Vercel):     https://certifica-monstros.vercel.app
Backend (Heroku):      https://seu-app-certifica.herokuapp.com
Database (Supabase):   https://seu-projeto.supabase.co
```

---

**Guia criado: 11 de Março de 2026 — Pronto para Produção!** 🚀

