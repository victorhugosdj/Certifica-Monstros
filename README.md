# Certifica-Monstros

Sistema de estudo interativo para certificações, com módulos teóricos, provas e simulados oficiais.

## 🚀 Quick Start

### Pré-requisitos
- Python 3.8+
- Node.js (opcional, para desenvolvimento frontend)
- Conta Supabase

### Instalação

1. **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Frontend:**
   - Abra `frontend/index.html` no navegador
   - Ou use um servidor local: `python -m http.server 8000`

3. **Configuração Supabase:**
   - Crie um projeto em https://supabase.com
   - Configure as variáveis de ambiente em `.env`:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_SERVICE_KEY=your_service_key
     ```

## 🏗️ Arquitetura

### Frontend
- **Tecnologias:** HTML, CSS, JavaScript vanilla
- **Arquivos principais:**
  - `index.html` - Estrutura da aplicação
  - `app.js` - Lógica principal
  - `module-viewer.js` - Visualização interativa de módulos
  - `exam-engine.js` - Motor de provas
  - `dashboard.js` - Estatísticas e progresso

### Backend
- **Tecnologias:** Python FastAPI
- **Arquivos principais:**
  - `main.py` - Endpoints REST
  - `database.py` - Cliente Supabase
- **Dependências:** fastapi, uvicorn, supabase, python-dotenv

### Banco de Dados
- **Supabase PostgreSQL**
- **Tabelas principais:**
  - `respostas_usuario` - Respostas dos usuários
  - `profiles` - Perfis dos usuários
  - `responses` - Respostas detalhadas

## 📊 Dados do Sistema

- **Módulos:** 8 módulos de estudo
- **Questões por módulo:** 45 questões (360 total)
- **Simulados oficiais:** 4 arquivos com 60 questões cada (240 total)
- **Estrutura de dados:**
  - `frontend/data/modulos.json` - Metadados dos módulos
  - `frontend/data/provas.json` - Banco de questões
  - `frontend/data/modules/` - Conteúdo teórico e provas em Markdown
  - `frontend/data/official-exams/` - Simulados oficiais

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
certifica-monstros/
├── api/                    # Vercel serverless functions
├── backend/               # FastAPI backend
├── frontend/              # Frontend estático
│   ├── assets/           # CSS, imagens
│   ├── data/            # Dados usados pelo frontend
│   └── src/             # JavaScript
├── docs/                 # Documentação (removida)
├── observação/           # Arquivos de observação (removidos)
└── tools/                # Scripts utilitários
```

### Comandos Úteis
- **Executar backend:** `cd backend && uvicorn main:app --reload`
- **Testar frontend:** Abrir `frontend/index.html` no navegador
- **Deploy:** Push para GitHub ativa deploy automático no Vercel

### Configuração Vercel
- **Framework:** Static Site + Serverless Functions
- **Build Command:** Nenhum (estático)
- **Output Directory:** `frontend/`
- **Functions Directory:** `api/`

## 📝 Notas para Desenvolvedores

- O frontend usa dados em `frontend/data/`
- Atualize `frontend/data/` diretamente ou via scripts de build
- Autenticação via Supabase Auth
- Dados de progresso salvos no Supabase
- Suporte a PWA (Progressive Web App)

## 🐛 Troubleshooting

- **Erro de CORS:** Verificar configuração do Vercel
- **Dados não carregam:** Verificar sincronização frontend/data
- **Auth falha:** Verificar chaves Supabase

## 📄 Licença

Este projeto é privado e confidencial.
