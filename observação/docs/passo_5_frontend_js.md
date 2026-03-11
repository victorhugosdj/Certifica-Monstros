# Passo 5 – Frontend JavaScript

## Veja os arquivos completos em:
- `frontend/app.js` – Auth, navegação, módulos, simulado, grading
- `frontend/dashboard.js` – Radar (Chart.js), questões desafiadoras, ranking

## 📝 Resumo do app.js

O `app.js` consolida TODA a lógica do frontend em um único arquivo:

1. **Init**: Configura Supabase, auth listeners, sidebar, navegação
2. **Auth**: Login, Cadastro, Esqueci Senha (tudo via `supabase.auth`)
3. **Sidebar**: Toggle colapso (desktop) e mobile-open (celular)
4. **Navegação**: `switchView(viewName)` mostra/esconde sections
5. **Módulos**: Fetch `modulos.json`, render grid de 8 cards com badge de acurácia
6. **Simulado**: `startExam(moduleCode, type)` gera 15 questões, renderiza modal
7. **Grading**: `gradeExam(moduleCode)` compara com `correta_texto`, atualiza errorBank
8. **Progresso**: `loadProgress()` / `saveProgress()` via Supabase `progress` table

## 📊 Resumo do dashboard.js

1. **renderDashboard()**: Busca métricas do backend (`/api/metrics/{user_id}`)
2. **Fallback local**: Se backend não responde, calcula do estado Supabase
3. **Gráfico Radar**: Chart.js com acurácia por módulo (M1–M8)
4. **Tabela Desafiadoras**: Top 20 questões mais erradas com botão "Refazer"
5. **Ranking**: Top 10 alunos por `consolidatedCount`

## ⚠️ Dependência

Para renderizar o Markdown dos módulos, adicione ao `<head>` do index.html:
```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

---

**Próximo passo:** [Passo 6 – Deploy](./passo_6_deploy.md)
