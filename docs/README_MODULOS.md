# README Modulos

Este guia mostra exatamente onde ficam os conteudos e as questoes dos modulos, e como incluir material novo sem quebrar o app.

## Onde ficam os dados

- Conteudo teorico por modulo (Markdown):
  - `frontend/data/modules/Modulo 1/conteudo 1.md`
  - `frontend/data/modules/Modulo 2/conteudo 2.md`
  - ...
  - `frontend/data/modules/Modulo 8/conteudo 8.md`
- Banco de questoes em ingles por modulo (Markdown):
  - `frontend/data/modules/Modulo 1/questoes 1.md`
  - `frontend/data/modules/Modulo 2/questoes 2.md`
  - ...
  - `frontend/data/modules/Modulo 8/questoes 8.md`
- Questoes de todos os modulos (fonte principal):
  - `frontend/data/provas.json`
- Metadados/lista de modulos:
  - `frontend/data/modulos.json`
  - agora inclui `titulo_pt`, `peso_edital`, `metodologia_aprovacao` e `arquivos`
- Progresso e ranking (banco de dados):
  - `backend/main.py` (APIs que leem/escrevem progresso)
  - tabela `respostas_usuario` no Supabase (fonte de verdade)

## Regra pratica (fonte de verdade)

- Para texto teorico exibido no modal do modulo, edite os arquivos `conteudo N.md`.
- Para estudo guiado em ingles por modulo, edite os arquivos `questoes N.md`.
- Para simulados, dashboard e correcao de respostas, edite `provas.json`.
- `modulos.json` deve ser tratado como metadado pedagogico + apresentacao no front.
- Para progresso/ranking, a fonte de verdade e o Supabase via `respostas_usuario`.

## Como o progresso e salvo no banco

- As respostas dos simulados sao enviadas para o backend:
  - Endpoint: `POST /api/responses`
  - Payload: lista de respostas com `user_id`, `module`, `question_id`, `correto`
- O dashboard usa o backend para calcular progresso:
  - Endpoint: `GET /api/metrics/{user_id}`
  - Retorna total, erros e estatisticas por modulo
- O ranking global usa o backend:
  - Endpoint: `GET /api/ranking`
  - Retorna usuarios ordenados por desempenho
- Simulados oficiais usam o backend para progresso:
  - Endpoint: `GET /api/official-exams/progress/{user_id}`
  - Lê respostas com `question_id` iniciando por `official:`

Observacao: se o backend estiver indisponivel, o front pode cair para dados locais, mas o objetivo e sempre persistir no banco.

## Convenções para IDs dos simulados oficiais

- Questões dos simulados oficiais sao registradas com:
  - `official:<arquivo>:<numero>`
- Exemplo:
  - `official:Simulado V2.md:12`

## Campos pedagogicos no modulos.json

Cada modulo no JSON possui:
- `codigo`
- `titulo_pt`
- `peso_edital`
- `objetivo_pt`
- `pilares_pt`
- `metodologia_aprovacao`:
  - `estrategia`
  - `ciclo_estudo_pt`
  - `tecnicas_pt`
  - `criterio_pronto_prova_pt`
- `arquivos`:
  - `conteudo_md`
  - `questoes_md`

Esses campos sao usados para orientar o aluno no modal do modulo no frontend.

## Como adicionar ou atualizar conteudo teorico

1. Abra a pasta do modulo:
   - Exemplo modulo 3: `frontend/data/modules/Modulo 3/`
2. Edite o arquivo:
   - `conteudo 3.md`
3. Mantenha o padrao de nome:
   - `conteudo <numero_do_modulo>.md`
4. Salve em UTF-8 (padrao do projeto).

Observacao: o carregamento do app procura exatamente este caminho:
`data/modules/Modulo N/conteudo N.md`

## Como adicionar questoes novas

As questoes ficam em `frontend/data/provas.json` como uma lista de objetos JSON.

Campos obrigatorios por questao:
- `id` (string unica)
- `modulo` (numero de 1 a 8)
- `pergunta` (texto)
- `opcoes` (array com as alternativas)
- `correta_texto` (texto exatamente igual a uma opcao)

Campos recomendados:
- `justificativa` (explicacao curta da resposta)

Exemplo:

```json
{
  "id": "m2_q46",
  "modulo": 2,
  "pergunta": "Qual componente e usado para construir automacoes no desktop no MuleSoft RPA?",
  "opcoes": [
    "RPA Manager",
    "RPA Builder",
    "Anypoint Studio",
    "Flow Orchestrator"
  ],
  "justificativa": "O RPA Builder e a ferramenta de construcao desktop dos processos de RPA.",
  "correta_texto": "RPA Builder"
}
```

## Convencao para IDs de questao

- Padrao recomendado:
  - `m<modulo>_q<sequencial>`
- Exemplos:
  - `m1_q46`
  - `m8_q12`

## Estrutura esperada por modulo

- Conteudo:
  - 1 arquivo `conteudo N.md`
- Questoes para estudo:
  - 1 arquivo `questoes N.md` (em ingles)
- Fonte de simulados:
  - entradas no `provas.json` com `modulo: N`

## Fluxo editorial recomendado

1. Atualize `provas.json` com novas questoes.
2. Atualize ou regenere `questoes N.md` do modulo correspondente.
3. Mantenha `conteudo N.md` focado em teoria em portugues.
4. Evite colocar teoria + 45 questoes completas no mesmo arquivo para nao poluir leitura.

## Checklist rapido antes de commit

1. Conferir se o modulo das questoes esta correto (`modulo` entre 1 e 8).
2. Conferir se `correta_texto` bate exatamente com uma string de `opcoes`.
3. Conferir se o `id` da questao nao existe duplicado no arquivo.
4. Abrir o app e validar:
   - modulo abre conteudo
   - simulado do modulo carrega
   - resultado corrige respostas normalmente
5. Rodar verificacao local:
   - `python tests/teste_verificacao.py`

## Dica de manutencao

Se voce quiser separar banco de questoes por modulo no futuro (ex: `provas_m1.json`, `provas_m2.json`), a gente pode fazer essa migracao com script + ajuste no carregamento do frontend para facilitar escala editorial.
