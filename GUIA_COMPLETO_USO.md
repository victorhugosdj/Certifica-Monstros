# 📖 GUIA COMPLETO DE USO — Certifica Monstros v2.0

**Versão:** 2.0 (Interativa)  
**Data:** 11 de Março de 2026  
**Tempo de leitura:** 10 minutos

---

## 🎯 Para Usuários Iniciantes

### 1️⃣ Primeira Vez: Criar Conta

```
Passo 1: Abrer https://localhost:8080 (local) ou vercel URL (produção)
Passo 2: Clicar em "Criar conta"
Passo 3: Preencher:
  • Email: seu@email.com
  • Senha: Mínimo 6 caracteres (recomendado: forte!)
Passo 4: Clicar "Criar conta" e esperar
Passo 5: ✅ Você está logado!
```

**O que acontece nos bastidores:**
- Supabase cria novo usuário em segundo plano
- Suas respostas serão salvas com seu ID
- Acesso apenas seu próprio histórico

---

### 2️⃣ Fazer Login (próximas vezes)

```
Passo 1: Abrir página
Passo 2: Entrar > preencher email + senha
Passo 3: Clicar "Entrar"
Passo 4: ✅ Pronto!
```

---

### 3️⃣ Usar o Sistema: 3 Seções

#### 🏠 **Como Utilizar** (Aba #1)

- Leia instruções básicas
- Veja como funciona o fluxo
- Nenhuma ação necessária aqui

#### 📚 **Módulos** (Aba #2) ⭐ PRINCIPAL

**O novo fluxo (v2.0):**

```
1. Clique em qualquer cartão de módulo (8 disponíveis)
        ↓
2. Modal abre mostrando CONTEÚDO do módulo
   (Headers, seções, explicações)
        ↓
3. Leia o conteúdo com calma (não é obrigado)
        ↓
4. Escolha uma opção:

   ✓ "Fazer Simulado Completo"
      └─ 15 questões do módulo escolhidas aleatoriamente
      └─ Resp ondas não serão julgadas até você clicar "Enviar"
      └─ Após enviar, vê resultado

   🔄 "Refazer Questões Erradas"
      └─ Aparece APENAS se você errou antes
      └─ 15 questões que você errou em simulados anteriores
      └─ Ideal para revisar pontos fracos
```

**Como responder uma prova:**

```
Para cada questão:
1. Leia a pergunta com atenção
2. Analise as 4-5 opções
3. Clique no radio button (○) da sua resposta
4. Ao terminar, clique "Enviar"
5. Veja resultado:
   - ✅ Percentual de acerto
   - Número de questões certas vs totais
   - Botão para voltar ao índice
```

#### 📊 **Dashboard** (Aba #3) ⭐ NOVO!

**O que vê no dashboard:**

```
1️⃣ GRÁFICO DE DIFICULDADE (Radar)
   └─ Mostra quais módulos você acha mais difíceis
   └─ Vermelho = mais difícil, Azul = mais fácil
   └─ Ajuda a identificar pontos fracos

2️⃣ TABELA DE DESEMPENHO POR MÓDULO (NOVO)
   └─ Módulo | Certas | Erradas | Acerto %
   └─ Exemplo:
      Módulo 1 |  35 |   10 |  77.8%  ✅
      Módulo 2 |  20 |   25 |  44.4%  ⚠️
      Módulo 3 |  40 |    5 |  88.9%  ✅

3️⃣ LISTA DE QUESTÕES DESAFIADORAS
   └─ Top 12 questões que você mais erra
   └─ Mostra quantas vezes errou cada uma
   └─ Botão para refazer cada grupo

4️⃣ RECOMENDAÇÕES PERSONALIZADAS
   └─ "Você está indo bem no Módulo 1!"
   └─ "Foco no Módulo 5 para melhorar"
   └─ "Parabéns! X% de progresso geral"
```

---

## 🎮 Para Usuários Intermediários

### Estratégia: Como Estudar Metodicamente

#### **Opção 1: Linear (Módulo por Módulo)**

```
Semana 1:
  Seg: Módulo 1 — Conteúdo + Simulado completo
  Ter: Módulo 1 — Refazer questões erradas
  Qua: Módulo 2 — Conteúdo + Simulado
  ... (continue)

Vantagem: Aprofunda bem cada tópico
Tempo: 2-3 horas por módulo
```

#### **Opção 2: Diagnóstico (Vê fraco primeiro)**

```
1. Faça teste de cada módulo (15 questões)
2. Veja no Dashboard qual tem menor %
3. Foque em refazê-los: Refazer Questões Erradas
4. Após melhorar, próximo módulo

Vantagem: Optimiza tempo
Tempo: 45 min por módulo
```

#### **Opção 3: Misturado (Revisão diária)**

```
Usar a lista "Questões Desafiadoras"
  └─ Clique em "Refazer" em cada linha
  └─ Mina de ouro de prática

Vantagem: Foco em pontos fracos
Tempo: 30 min (qualquer hora)
```

### Entender o Dashboard

**Gráfico Radar (Dificuldade):**
```
      Módulo 1: 20% (fácil!)
      Módulo 2: 55% (médio)
      Módulo 3: 80% (difícil!)
           ↓
   = Estude mais estruturas do Módulo 3
```

**Tabela de Acertos (NOVO):**
```
Módulo 1: 77.8% ← Acima de 70%, bom!
Módulo 2: 44.4% ← Abaixo de 50%, refazer!
Módulo 3: 88.9% ← Acima de 80%, excelente!

Meta: Manter TODOS acima de 70%
```

---

## 👨‍💼 Para Usuários Avançados

### Rastrear Progresso

**Salvo automaticamente:**
- ✅ Cada resposta que você dá
- ✅ Data e hora
- ✅ Módulo e ID da questão
- ✅ Se estava correta ou errada
- ✅ Histórico completo

**Como ver progresso no time:**
- Abrir Dashboard
- Ver tabela de percentuais
- Comparar com histórico anterior

### Calcular Score

**Fórmula usada:**
```
Score = (Total de Corretas) / (Total de Questões) × 100

Exemplo:
  45 questões certas de 60 tentativas
  = (45/60) × 100 = 75% ✅

Faixas:
  0-50%:   Iniciante  🔴
  50-70%:  Intermediate 🟡
  70-85%:  Bom 🟢
  85-100%: Excelente 🌟
```

### Exportar Dados (Futuro)

*Recurso em desenvolvimento:*
- [ ] Download em CSV
- [ ] Relatório PDF
- [ ] Compartilhar score
- [ ] Certificado automático (80%+)

---

## 🔧 Troubleshooting: O Que Fazer Se...

### "Não consigo logar"

```
Possíveis causas:
1. Email/senha incorretos
   └─ Verificar CAPS LOCK
   └─ Tentar "Esqueci a senha"

2. Conexão fraca
   └─ Recarga página: Ctrl+R
   └─ Verifique internet

3. Backend offline
   └─ Se desenvolvimento local: uvicorn backend.main:app --reload
   └─ Se em produção: contate suporte
```

### "Minha resposta não foi salva"

```
Possíveis causas:
1. Clicou "Enviar"? Verifique se popup apareceu
   └─ Se não, há erro JavaScript (F12 → Console)

2. Problemas de conexão
   └─ DevTools (F12) → Network → procurar POST /api/responses
   └─ Se status 4xx ou 5xx, há erro no servidor

3. localStorage cheio
   └─ Limpar cache: Ctrl+Shift+Delete
   └─ Reload: Ctrl+R
```

### "Não consigo ver minhas questões erradas"

```
Possíveis causas:
1. Nunca fez simulado
   └─ Fazer 1 simulado completo primeiro

2. Acertou tudo
   └─ Parabéns! Tente módulo mais difícil

3. Cache expirou
   └─ localStorage.clear() no DevTools (F12)
   └─ Fazer novo simulado
```

### "Dashboard mostra 0%"

```
Possíveis causas:
1. Nenhum simulado completo
   └─ Fazer primeiro simulado agora

2. Conexão backend
   └─ Verificar se backend está rodando
   └─ Se local: uvicorn backend.main:app --reload

3. Bug (raro)
   └─ Reload: Ctrl+R
   └─ Limpar cache: Ctrl+Shift+Delete
```

---

## 📱 Funciona em Celular?

**SIM! Responsivo 100%**

```
Tamanho suportados:
  • Celular (até 480px) ✅
  • Tablet (481-768px) ✅
  • Desktop (769px+) ✅

Testar no seu celular:
  1. Local: http://192.168.1.X:8080 (substitua IP local)
  2. Produção: Vercel URL automático no celular

Dica: Adicionar à tela inicial (Android/iOS)
  Android: Menu > Adicionar à tela
  iOS: Compartilhar > Adicionar à Home
```

---

## 🎓 Currículo: O Que Você Aprenderá

**Os 8 Módulos cobrem:**

| Módulo | Tópicos | Questões |
|--------|---------|----------|
| 1 | Melhores Práticas de Hiperautomação | 45 |
| 2 | Seleção de Ferramentas | 45 |
| 3 | Padrões de Design | 45 |
| 4 | Implementação Prática | 45 |
| 5 | Integração e Testes | 45 |
| 6 | Segurança e Compliance | 45 |
| 7 | Troubleshooting | 45 |
| 8 | Casos de Uso Reais | 45 |

**Total:** 360 questões = ~20 horas de estudo

---

## ✨ Dicas Pro

1. **Estude depois de trabalhar:** Cérebro bem descansado = melhor memorização

2. **Use o "Refazer Questões Erradas":** Reforço em áreas fracas

3. **Meta viável:** 70% em cada módulo em 2 semanas

4. **Pausas:** A cada 25 minutos, descanse 5 minutos (Pomodoro)

5. **Revisão:** Refaça módulos completos a cada semana para reforçar

6. **Comunidade:** Compartilhe seu score! 🏆

---

## 🎯 Metas Sugeridas

```
Semana 1: Conhecer plataforma, fazer Module 1 (50%)
Semana 2: Modules 2-3, alvo 70% em M1
Semana 3: Modules 4-5, alvo 70% em M1-3
Semana 4: Modules 6-7, alvo 70% em M1-5
Semana 5: Module 8 + Review, alvo 70% em M1-7
Semana 6: Final review, meta 80%+ em TODOS

CERTIFICAÇÃO: 80%+ em todos os 8 módulos!
```

---

## 💬 FAQ

**P: Posso fazer os módulos em qualquer ordem?**  
R: SIM! Não há dependências, cada um é independente.

**P: Quanto tempo leva?**  
R: 2-3 horas por módulo (conteúdo + 2-3 simulados).

**P: Posso refazer um módulo depois de passar?**  
R: SIM! Sempre aberta para revisão.

**P: Há limite de tentativas?**  
R: NÃO! Faça quantas vezes quiser.

**P: Meu score aparece para outros?**  
R: NÃO! Seus dados são privados (Supabase RLS).

**P: Oq fazer se tiver dúvida sobre questão?**  
R: Cada questão tem justificativa (será adicionado).

---

## 🚀 Próximas Versões

```
v2.1: Justificativas de respostas
v2.2: Sistema de discussão (comunidade)
v2.3: Video aulas integradas
v3.0: App mobile nativo
v3.1: IA personalisada (recomendação)
```

---

**Bom estudo! Você consegue! 💪**

*Documentação criada: 11 de Março de 2026 — v2.0*

