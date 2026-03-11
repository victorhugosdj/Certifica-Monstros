# 📚 COMO UTILIZAR O APP — Guia Detalhado

**Última atualização:** 11 de Março de 2026  
**Versão:** 2.0 (Com Dashboard e Ranking)

---

## 📖 Índice Rápido

1. [Visão Geral](#visão-geral)
2. [Estrutura do App](#estrutura-do-app)
3. [Como Usar Passo a Passo](#como-usar-passo-a-passo)
4. [Explicação de Módulos](#explicação-de-módulos)
5. [Dashboard e Métricas](#dashboard-e-métricas)
6. [Como Funciona o Ranking](#como-funciona-o-ranking)
7. [Cálculo de Pontuação](#cálculo-de-pontuação)
8. [FAQ](#faq)

---

## 🎯 Visão Geral

**Certifica Monstros** é uma plataforma interativa de simulados educacionais com:

- ✅ **8 Módulos de Conteúdo** — Cada um com teoria completa
- ✅ **Simulados Adaptativos** — Perguntas de múltipla escolha
- ✅ **Dashboard Inteligente** — Mostra seu progresso e ranking
- ✅ **Ranking de Usuários** — Compete com outros estudantes
- ✅ **Métricas Detalhadas** — Veja seu desempenho por módulo

**Objetivo:** Estudar o conteúdo e passar nos simulados!

---

## 🏗️ Estrutura do App

### Arquitetura Visual

```
┌─────────────────────────────────────────────────┐
│         CERTIFICA MONSTROS (Home Page)          │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  AUTENTICAÇÃO (Login/Cadastro)           │   │
│  │  • Email                                 │   │
│  │  • Senha                                 │   │
│  │  (Supabase)                              │   │
│  └──────────────────────────────────────────┘   │
│                    ↓                             │
│  ┌──────────────────────────────────────────┐   │
│  │  MENU PRINCIPAL (3 Opções)               │   │
│  │  • 📚 Ver Módulos (Estudar)              │   │
│  │  • 📊 Dashboard (Métricas + Ranking)     │   │
│  │  • ⚙️ Configurações (Sair, etc)          │   │
│  └──────────────────────────────────────────┘   │
│                    ↓                             │
│  ┌──────────────────────────────────────────┐   │
│  │  MÓDULOS (8 no total)                    │   │
│  │  • Módulo 1  [Clicável]                  │   │
│  │  • Módulo 2  [Clicável]                  │   │
│  │  • ...                                   │   │
│  │  • Módulo 8  [Clicável]                  │   │
│  └──────────────────────────────────────────┘   │
│                    ↓                             │
│  ┌──────────────────────────────────────────┐   │
│  │  MODAL DO MÓDULO                         │   │
│  │  ┌─────────────────────────────────────┐ │   │
│  │  │ 📖 CONTEÚDO DO MÓDULO (Markdown)    │ │   │
│  │  │ (Texto, fórmulas, imagens)          │ │   │
│  │  │                                     │ │   │
│  │  │  [Botão: Fazer Simulado]            │ │   │
│  │  └─────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────┘   │
│                    ↓                             │
│  ┌──────────────────────────────────────────┐   │
│  │  SIMULADO (Exam Engine)                  │   │
│  │  ┌─────────────────────────────────────┐ │   │
│  │  │ Pergunta 1/15                       │ │   │
│  │  │ Qual é a resposta correta?          │ │   │
│  │  │                                     │ │   │
│  │  │ ⚪ Opção A                          │ │   │
│  │  │ ⚪ Opção B       [Responda]         │ │   │
│  │  │ ⚪ Opção C                          │ │   │
│  │  │ ⚪ Opção D                          │ │   │
│  │  │                                     │ │   │
│  │  │ [Acerto!] ✅                        │ │   │
│  │  └─────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────┘   │
│                    ↓                             │
│  ┌──────────────────────────────────────────┐   │
│  │  RESULTADO DO SIMULADO                   │   │
│  │  ✅ 12/15 Acertos (80%)                  │   │
│  │  📊 Salvo no Dashboard                   │   │
│  │                                          │   │
│  │  [Voltar ao Módulo]  [Ir ao Dashboard]   │   │
│  └──────────────────────────────────────────┘   │
│                    ↓                             │
│  ┌──────────────────────────────────────────┐   │
│  │  DASHBOARD (Relatório Completo)          │   │
│  │  ┌───────────────────────────────────┐   │   │
│  │  │ MÉTRICAS (Resumo no Topo)         │   │   │
│  │  │ • 120 Questões Respondidas        │   │   │
│  │  │ • 96 Acertos (80%)                │   │   │
│  │  │ • 6/8 Módulos com Progresso      │   │   │
│  │  └───────────────────────────────────┘   │   │
│  │                                          │   │
│  │  ┌───────────────────────────────────┐   │   │
│  │  │ 🏆 RANKING (TOP 10 Usuários)      │   │   │
│  │  │ 🥇 usuario_x     82%  (150/150)   │   │   │
│  │  │ 🥈 usuario_y     79%  (140/150)   │   │   │
│  │  │ 🥉 VOCÊ          80%  (120/150)   │   │   │
│  │  │ ...                               │   │   │
│  │  └───────────────────────────────────┘   │   │
│  │                                          │   │
│  │  ┌───────────────────────────────────┐   │   │
│  │  │ 📊 DESEMPENHO POR MÓDULO         │   │   │
│  │  │ Módulo 1: 95% (19/20)  ✅        │   │   │
│  │  │ Módulo 2: 75% (15/20)  🟢        │   │   │
│  │  │ Módulo 3: 45% (9/20)   🔴        │   │   │
│  │  └───────────────────────────────────┘   │   │
│  │                                          │   │
│  │  ┌───────────────────────────────────┐   │   │
│  │  │ 💡 RECOMENDAÇÕES                 │   │   │
│  │  │ "Foque em Módulo 3 (baixo score)" │   │   │
│  │  └───────────────────────────────────┘   │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Como Usar — Passo a Passo

### PASSO 1: Entrar na Plataforma

```
1. Abrir: https://certifica-monstros.vercel.app
   (ou localhost:8080 se testando localmente)

2. Ver tela de LOGIN

3. Escolher:
   ☐ "Já tenho conta" → [Email e Senha]
   ☐ "Novo por aqui?" → [Criar Conta]

4. Clicar "Entrar"

5. ✅ Você está dentro!
```

### PASSO 2: Explorar os Módulos

```
1. Página inicial mostra:
   📚 Módulo 1
   📚 Módulo 2
   📚 Módulo 3
   ...até Módulo 8

2. Cada módulo é UM CARD CLICÁVEL

3. Clicar em "Módulo 1"
   ↓
   Uma JANELA (modal) abre com:
   • Título do módulo
   • Conteúdo completo (Markdown renderizado)
   • Botão: "➜ Fazer Simulado"

4. Ler o conteúdo (teoria)

5. Clicar "Fazer Simulado"
```

### PASSO 3: Fazer um Simulado

```
1. Simulado carrega com 15 PERGUNTAS ALEATÓRIAS
   (do módulo que você escolheu)

2. Para cada pergunta:
   • Leia com atenção
   • Escolha uma opção (A, B, C ou D)
   • Clique em "Responder"

3. Sistema mostra:
   ✅ "Correto!" (se acertou)
   ❌ "Errado"  (se errou)

4. Passa para próxima pergunta automaticamente

5. Depois de 15 perguntas → RESULTADO FINAL

6. Resultado mostra:
   ✅ 12/15 Acertos (80%)
   📊 Performance por dificuldade
   [Botão: Voltar] [Botão: Ir ao Dashboard]
```

### PASSO 4: Ver Dashboard (Seu Progresso)

```
1. Menu Principal → "📊 Dashboard"
   OU
   Após simulado → Botão "Ir ao Dashboard"

2. Dashboard mostra (em ordem):

   ┌─ RESUMO (4 Cards no Topo)
   │  • Total de questões respondidas
   │  • Total de acertos
   │  • Taxa de acerto (%)
   │  • Módulos com progresso
   │
   ├─ RANKING (TOP 10)
   │  🥇 usuario_x - 85% (150/150)
   │  🥈 usuario_y - 82% (140/150)
   │  🥉 VOCÊ     - 80% (120/150)
   │  ... etc
   │
   ├─ DESEMPENHO POR MÓDULO
   │  Módulo 1: ✅ Excelente (95%)
   │  Módulo 2: 🟢 Bom (75%)
   │  Módulo 3: 🟡 Médio (55%)
   │  Módulo 4: 🔴 Baixo (35%)
   │  ... etc
   │
   ├─ RECOMENDAÇÕES
   │  "Você está indo muito bem em Módulos 1 e 2!"
   │  "Foque em Módulo 3 (baixo desempenho)"
   │  [Botão: Refazer Simulado de Módulo 3]
   │
   └─ QUESTÕES DESAFIADORAS
      (Perguntas que você errou mais vezes)
      • Q001: 5 erros [Refazer]
      • Q015: 3 erros [Refazer]
```

---

## 📚 Explicação de Módulos

### 8 Módulos (Estrutura)

```
MÓDULO 1
  • Conteúdo: conteudo 1.md
  • 45 Perguntas: prova_1.json, prova_2.json, prova_3.json
  
MÓDULO 2
  • Conteúdo: conteudo 2.md
  • 45 Perguntas: prova_1.json, prova_2.json, prova_3.json
  
... (mesmo padrão para Módulos 3-8)

TOTAL:
  • 8 Módulos de conteúdo
  • 360 Perguntas (8 × 45)
```

### Como os Dados Estão Organizados

```
frontend/
  ├── app.js                # Menu principal
  ├── dashboard.js          # Dashboard (este arquivo!)
  ├── index.html            # Página inicial
  ├── data/
  │   ├── modulos.json      # Info dos 8 módulos
  │   ├── provas.json       # Todas as 360 perguntas
  │   └── modules/
  │       ├── Modulo 1/
  │       │   ├── conteudo 1.md    # TEORIA
  │       │   ├── prova 1.md       # Banco de dados em Markdown
  │       │   ├── prova 2.md
  │       │   └── prova 3.md
  │       ├── Modulo 2/
  │       │   └── ... (mesma estrutura)
  │       ... (Módulos 3-8)
  │
  └── src/
      ├── module-viewer.js  # Carrega conteúdo em modal
      ├── exam-engine.js    # Renderiza perguntas e respostas
      ├── database.js       # Salva respostas (Supabase)
      └── ... outros arquivos
```

### Fluxo de Dados

```
1. Usuário clica em "Módulo 1"
   ↓
2. module-viewer.js carrega → frontend/data/modules/Modulo 1/conteudo 1.md
   ↓
3. Renderiza em HTML e mostra em modal
   ↓
4. Usuário clica "Fazer Simulado"
   ↓
5. exam-engine.js lê → frontend/data/provas.json
   ↓
6. Filtra 15 perguntas ALEATÓRIAS do Módulo 1
   ↓
7. Mostra perguntas uma por uma
   ↓
8. Usuário responde
   ↓
9. database.js envia resposta para Backend (FastAPI)
   ↓
10. Backend salva em Supabase (Cloud Database)
   ↓
11. Dashboard carrega dados do Supabase e calcula métricas
```

---

## 📊 Dashboard e Métricas

### Seções do Dashboard

#### 1️⃣ Resumo (Cards no Topo)

| Card | Mostra |
|------|--------|
| 📝 | Total de questões respondidas (acertos + erros) |
| ✅ | Total de acertos |
| 🎯 | Taxa de acerto em % |
| 📈 | Quantos módulos você já tem progresso |

**Exemplo:**
```
120 questões  |  96 acertos  |  80%  |  6/8 módulos
```

#### 2️⃣ Ranking (TOP 10 Usuários)

Mostra os 10 melhores usuários da plataforma, ordenados por:
1. **Taxa de acerto (%)** — Descendente
2. **Total de questões** — Desempate (mais questões = melhor)

**Formato:**
```
🥇 usuario_x     150/150  (100%)
🥈 usuario_y     140/150  (93%)
🥉 usuario_z     130/150  (86%)
#4 VOCÊ          80/120   (80%)  ← Seu lugar
...
```

#### 3️⃣ Desempenho por Módulo

Tabela com detalhe de cada módulo:

| Módulo | Certas | Erradas | Acurácia | Status |
|--------|--------|---------|----------|--------|
| 1      | 19     | 1       | 95%      | ✅ Excelente |
| 2      | 15     | 5       | 75%      | 🟢 Bom |
| 3      | 9      | 11      | 45%      | 🔴 Baixo |
| ...    | ...    | ...     | ...      | ... |

**Interpretação dos Status:**
- ✅ **Excelente** → 80%+ (Você domina!)
- 🟢 **Bom** → 70-79% (Está bem)
- 🟡 **Médio** → 50-69% (Precisa revisar)
- 🔴 **Baixo** → <50% (Foco aqui!)
- ⏳ **Sem dados** → Nenhuma resposta no módulo

#### 4️⃣ Recomendações Personalizadas

Mostra:
- 💯 Módulos em que você está excelente
- 📚 Módulos que precisa focar
- 📊 Barra de progresso geral
- [Botão Refazer] → Fazer novo simulado do módulo

#### 5️⃣ Questões Desafiadoras (Top 12)

Lista as 12 perguntas que você errou mais vezes:

| Questão | Erros | Ação |
|---------|-------|------|
| M1_Q001 | 5     | [Refazer] |
| M3_Q015 | 3     | [Refazer] |
| M2_Q007 | 2     | [Refazer] |

---

## 🏆 Como Funciona o Ranking

### Dados Coletados

Cada resposta do usuário salva:
```
{
  user_id: "seu-id-unico",
  question_id: "M1_Q001",
  is_correct: true,  // ou false
  timestamp: "2026-03-11T10:30:00Z",
  module: 1
}
```

### Cálculo do Ranking

```
PASSO 1: Buscar todas as respostas do Supabase
         (da tabela "responses")

PASSO 2: Agrupar por usuário
         usuario_x: [
           { is_correct: true },
           { is_correct: true },
           { is_correct: false },
           ...
         ]

PASSO 3: Calcular por usuário:
         • total_respondidas = 150
         • total_corretas = 126
         • percentual = (126 / 150) * 100 = 84%

PASSO 4: Ordenar por:
         1. Percentual DESC (maior %)
         2. Total respondidas DESC (desempate)

PASSO 5: TOP 10 → Mostrar no Dashboard
```

### Exemplo de Cálculo

```
DADOS BRUTOS (respostas na tabela):
usuario_x: 150 respostas, 126 corretas → 84%
usuario_y: 140 respostas, 119 corretas → 85%
usuario_z: 120 respostas, 100 corretas → 83%
VOCÊ:      80 respostas, 64 corretas  → 80%

RANKING FINAL (ordenado):
🥇 usuario_y - 85% (119/140)
🥈 usuario_x - 84% (126/150)
🥉 usuario_z - 83% (100/120)
#4 VOCÊ     - 80% (64/80)
```

### Pontos Importantes

- ✅ Ranking é **PÚBLICO** — Todos veem todas as posições
- ✅ Atualiza **EM TEMPO REAL** — Ao terminar um simulado
- ✅ Baseado em **PERCENTUAL**, não em número absoluto
- ✅ Você vê seu **PRIMEIRO NOME** + ID no ranking
- ✅ TOP 10 é dinâmico — Outros podem passar você qualquer hora

---

## 🧮 Cálculo de Pontuação

### Métrica 1: Taxa de Acertos (Geral)

```
Taxa de Acerto (%) = (Total de Acertos / Total de Respostas) × 100

Exemplo:
• Você respondeu 120 questões
• Acertou 96
• Taxa = (96 / 120) × 100 = 80%
```

### Métrica 2: Acurácia por Módulo

```
Acurácia Módulo = (Acertos no Módulo / Total no Módulo) × 100

Exemplo - Módulo 1:
• Respondeu 20 questões
• Acertou 19
• Acurácia = (19 / 20) × 100 = 95%
```

### Métrica 3: Dificuldade (Inverse)

```
Dificuldade Percebida = 100 - Acurácia

Se você acerta 75% → Dificuldade = 100 - 75 = 25%
(Significado: Módulo tem 25% de dificuldade para você)
```

### Métrica 4: Consistência

```
Consistência = Desvio Padrão da Acurácia entre módulos

Baixa consistência (20%) → Você varia muito
Alta consistência (5%)  → Você é consistente
```

### Como Calcular Seu Score

**Fórmula Simplificada:**

```
Score Final = (Acurácia Geral × 0.4) + 
              (Módulos Completos × 0.3) +
              (Rank de Percentual × 0.3)

Exemplo:
• Acurácia: 80% → 80 × 0.4 = 32 pontos
• Módulos: 6/8 → 75% → 75 × 0.3 = 22.5 pontos
• Rank: Você é #4 → (10-4)/10 = 60% → 60 × 0.3 = 18 pontos

TOTAL: 32 + 22.5 + 18 = 72.5 pontos (de 100)
```

---

## ❓ FAQ

### ❓ Posso ver a resposta certa após errar?

✅ **Sim!** Após responder uma pergunta, o sistema mostra:
- "❌ Errado"
- A resposta correta será destacada
- Breve explicação (se disponível)

### ❓ Minhas respostas são privadas?

✅ **Sim!** Apenas você vê detalhes das suas respostas. O ranking mostra apenas percentual + total.

### ❓ Posso refazer um módulo?

✅ **Sim!** Você pode fazer quantos simulados quiser. Cada nova tentativa conta como nova resposta.

### ❓ Como meu ranking muda?

📈 **Seu ranking atualiza:**
- ✅ Ao terminar cada simulado
- ✅ Baseado em (Acertos / Total) em tempo real
- ✅ Pode subir OU descer dependendo de novo simulado

**Exemplo:**
```
Antes: 70% (80/115) → Posição #8
Você faz simulado: 15/15 acertos
Depois: 72% (95/130) → Posição #6 (subiu!)
```

### ❓ Se eu acertar tudo, qual é meu score?

✅ **100%!** Se acertar todas as questões, sua taxa é 100%.

```
16/16 acertos numa prova = 100%
120/120 em todo o app = 100%
```

### ❓ O que são "Questões Desafiadoras"?

📚 **São as perguntas que você errou mais vezes**

O sistema rastreia quando você erra uma questão e mostra as TOP 12 mais recorrentes.

Você pode clicar em "[Refazer]" para rever essa questão especificamente.

### ❓ Quanto tempo leva um simulado?

⏱️ **5-10 minutos** dependendo de:
- Velocidade de leitura
- Tempo para pensar na resposta
- Confiança no conteúdo

**Tempo usual:**
```
15 questões × 30-40 segundos = 7-10 minutos
```

### ❓ Posso pausar o simulado?

❌ **Não.** Recomendações:
- Escolha um tempo sem pressa
- Tenha água à mão
- Encontre local tranquilo

### ❓ Meus dados são salvos na nuvem?

✅ **Sim!** Todos os seus dados estão em **Supabase** (cloud).

Benefícios:
- Acesse de qualquer device
- Dados nunca são perdidos
- Sincronização automática

### ❓ Posso exportar meus resultados?

💾 **Não (ainda).** Mas você pode:
- Fazer screenshot do dashboard
- Anotar seu percentual
- Comparar com histórico manual

---

## 📞 Suporte

Algo não funcionando?

```
1. Tente REFRESH (F5)
2. Limpe cache do navegador (Ctrl+Shift+Delete)
3. Verifique conexão com internet
4. Tente em incógnito (Ctrl+Shift+N)
5. Se problema persistir, contacte o suporte
```

---

**Pronto para começar? Abra o app e faça seu primeiro simulado!** 🚀

