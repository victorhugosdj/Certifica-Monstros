# Passo 1 – Estrutura de Diretórios

## 📂 Nova Árvore do Projeto

```text
conteudoOficial/
├── backend/
│   ├── main.py              # FastAPI: endpoints de métricas e questões
│   ├── database.py          # Conexão Supabase (Python, Service Role)
│   └── requirements.txt     # Dependências Python
│
├── frontend/
│   ├── index.html           # Login, Sidebar, Views (Módulos, Dashboard, Ranking)
│   ├── style.css            # CSS completo (sidebar retrátil, cards, modal)
│   ├── app.js               # Navegação, auth Supabase, renderização de módulos
│   └── dashboard.js         # Chart.js: Radar, barras, tabela de questões desafiadoras
│
├── data/
│   ├── modulos.json         # 8 módulos com conteúdo markdown (JÁ EXISTENTE)
│   └── provas.json          # 360 questões com gabarito verificado (JÁ EXISTENTE)
│
├── supabase/
│   └── seed.sql             # Script DDL para criar tabelas no Supabase
│
├── vercel.json              # Config de deploy (roteia /api/* para backend)
└── README.md
```

## ✅ O que fazer agora

1. Crie as pastas `backend/`, `frontend/`, `supabase/` e `docs/`:

```powershell
cd C:\Users\zello\Desktop\conteudoOficial
mkdir backend, frontend, supabase, docs
```

2. Mova os dados existentes (se ainda não organizados):

```powershell
# Os JSONs já existem em conteudosssssss/data/ - serão referenciados de lá
# ou copiados para data/ na raiz
Copy-Item conteudosssssss\data\modulos.json data\modulos.json
Copy-Item conteudosssssss\data\provas.json data\provas.json
```

3. Crie os arquivos vazios como placeholder:

```powershell
New-Item backend\main.py -Force
New-Item backend\database.py -Force
New-Item backend\requirements.txt -Force
New-Item frontend\index.html -Force
New-Item frontend\style.css -Force
New-Item frontend\app.js -Force
New-Item frontend\dashboard.js -Force
New-Item supabase\seed.sql -Force
```

## 📌 Notas Importantes

- A pasta `conteudosssssss/` continua existindo como referência legacy
- Os novos arquivos em `frontend/` substituirão os 12 arquivos JS separados
- O backend Python é **novo** e roda independente do frontend
- `data/` fica na raiz, acessível por ambos (frontend via fetch, backend via file read)

---

**Próximo passo:** [Passo 2 – Banco de Dados (seed.sql)](./passo_2_seed_sql.md)
