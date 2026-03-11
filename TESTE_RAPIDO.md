# 🧪 GUIA DE TESTE RÁPIDO — Sistema Interativo de Módulos

**Data:** 11 de Março de 2026  
**Tempo estimado:** 5 minutos  
**Objetivos:** Validar funcionalidade principal

---

## ⚡ Pre-voo Checklist

Antes de começar, verifique:

- ✅ Backend rodando? → `uvicorn backend.main:app --reload` (terminal 1)
- ✅ Frontend em `http://localhost:8080`? (terminal 2, após `python -m http.server 8080`)
- ✅ Passou por login? → Criar conta ou fazer login
- ✅ DevTools aberto? → F12 (para ver console)

---

## 🎯 Teste 1: Renderização do Grid de Módulos

**O que testar:** Cartões aparecem e são clicáveis

### Passo-a-Passo

1. **Navegue para "Módulos"** → Sidebar esquerda, clique no ícone 📚
2. **Observe os cartões:**
   - [ ] Aparecem 8 cartões (1 para cada módulo)?
   - [ ] Cada cartão tem:
     - [ ] Título (ex: "Módulo 1")
     - [ ] Número (ex: "Módulo 1 de 8")
     - [ ] Texto "👉 Clique para ver conteúdo"
3. **Teste hover:**
   - [ ] Passar mouse sobre cartão: cursor vira "pointer" (dedo)?
   - [ ] Cartão muda cor ou sombra?

**Esperado:** Cartões renderizam sem erros, cursor muda

**Se falhar:**
```javascript
// DevTools Console (F12):
// Verificar se módulos foram carregados
STATE.modules  // Deve mostrar array com 8 itens
console.log(STATE.modules.length)  // Deve ser 8
```

---

## 🎯 Teste 2: Abrir Modal com Conteúdo

**O que testar:** Clicar em módulo → Modal abre com conteúdo

### Passo-a-Passo

1. **Clique no cartão do "Módulo 1"**
2. **Modal deve abrir com:**
   - [ ] Cabeçalho: "Módulo 1" (em azul)
   - [ ] Subtítulo: "Módulo 1 de 8"
   - [ ] Conteúdo abaixo (texto formatado)
   - [ ] Scrollbar (se conteúdo for grande)

3. **Verificar formatação do conteúdo:**
   - [ ] **Texto em negrito** aparece em bold?
   - [ ] *Texto em itálico* aparece em itálico?
   - [ ] # Headings aparecem maiores?
   - [ ] • Listas aparecem com bullets?

4. **Botões aparecem?**
   - [ ] Botão "Voltar" (cinza)?
   - [ ] Botão "✓ Fazer Simulado Completo" (azul)?
   - [ ] Botão "🔄 Refazer Questões Erradas" (outro tom)?

**Esperado:** Modal abre, conteúdo formatado, 3 botões aparentes

**Se conteúdo não aparecer (fallback amarelo):**
```
✅ Está correto! Significa que o arquivo .md não está no lugar certo.
   → Próximo passo: Copiar frontend/data/modules/
```

**Se modal não abre:**
```javascript
// DevTools Console (F12):
typeof ModuleViewer  // Deve retornar "object"
typeof openModal  // Deve retornar "function"

// Se retornar "undefined", há erro de carregamento
```

---

## 🎯 Teste 3: Botões de Simulado

**O que testar:** Cliques nos botões iniciam simulado corretamente

### Passo-a-Passo (Modal ainda aberto)

1. **Clique em "✓ Fazer Simulado Completo"**
   - [ ] Modal de conteúdo fecha
   - [ ] Modal de prova abre
   - [ ] Aparece "Simulado Módulo 1" no topo
   - [ ] Aparecem ~15 questões

2. **Verificar estrutura da questão:**
   - [ ] Número da questão (1., 2., etc)?
   - [ ] Texto (pergunta)?
   - [ ] 4-5 opções com radio buttons (○)?
   - [ ] Letras (A, B, C, D, E)?

3. **Botões de ação:**
   - [ ] "Fechar" (cinza)?
   - [ ] "Enviar" (azul)?

**Esperado:** Prova abre com 15 questões formatadas

**Se questões não carregam:**
```javascript
// DevTools Console (F12):
STATE.provas  // Deve mostrar array
STATE.provas.filter(q => q.modulo == 1).length  // Deve ser > 0
```

---

## 🎯 Teste 4: Responder & Enviar

**O que testar:** Respostas são gravadas corretamente

### Passo-a-Passo (Prova aberta)

1. **Responda algumas questões:**
   - [ ] Clique em radio buttons
   - [ ] Verifique que seleção fica marcada

2. **Clique em "Enviar"**
3. **Resultado deve aparecer:**
   - [ ] Modal com "Resultado: XX%"
   - [ ] Mensagem: "Acertou N de 15 questões"
   - [ ] Botão "Fechar"

4. **Verificar envio ao backend (DevTools):**
   - [ ] F12 → Network tab
   - [ ] Procure por POST `/api/responses`
   - [ ] Status deve ser 200 ou 201
   - [ ] Response body: `{"status":"ok"}` ou similar

**Esperado:** Resultado exibido, POST retorna 200-201

**Se modal fica "congelado":**
```
Pode ser erro ao enviar respostas.
F12 → Network → Ver POST request
Se Status 400-500 → Backend não aceitou formato
```

---

## 🎯 Teste 5: Voltar para Índice

**O que testar:** Fluxo completo: retornar e abrir outro módulo

### Passo-a-Passo

1. **Clique "Fechar" no resultado**
   - [ ] Modal fecha
   - [ ] Volta para lista de módulos

2. **Clique em "Módulo 2"**
   - [ ] Modal abre com conteúdo de Módulo 2
   - [ ] Conteúdo é diferente do Módulo 1

3. **Cache funcionando?**
   - [ ] Clique novamente em "Módulo 1"
   - [ ] Modal deve abrir mais rápido (cached)

**Esperado:** Navegação fluida entre módulos

---

## 🔍 Checklist de Console (DevTools F12 → Console)

Copie e execute estes comandos:

```javascript
// 1. Verificar se ModuleViewer carregou
console.log("ModuleViewer carregado?", typeof ModuleViewer === 'object');

// 2. Verificar módulos
console.log("Módulos carregados?", STATE.modules?.length || 0, "módulos");

// 3. Verificar provas
await loadProvas();
console.log("Provas carregadas?", STATE.provas?.length || 0, "questões");

// 4. Verificar cache
ModuleViewer.printCacheStatus();

// 5. Verificar usuário
console.log("Usuário logado?", CURRENT_USER?.email || "Não");

// 6. Verificar API
console.log("API Base URL:", getApiBaseUrl());

// 7. Erros de usuário
console.log("Erros salvos:", loadErrors(CURRENT_USER.id));
```

**Se tudo retornar OK:** ✅ Sistema está funcional!

---

## ❌ Possíveis Falhas & Fixes Rápidos

| Falha | Sintoma | Fix |
|-------|---------|-----|
| Conteúdo 404 | Fallback amarelo | Copiar `frontend/data/modules/` |
| Modal não abre | Nada acontece ao clicar | Check console: `typeof ModuleViewer` |
| Botões ausentes | Sem "Fazer Simulado" | Refresh (Ctrl+R) ou clear cache |
| Prova congela | Modal fica "congelado" | Check Network tab → POST error |
| Resultado não aparece | Simulado não termina | F12 → Console → Erro vermelho |

---

## 📊 Resultado do Teste

**Marque com ✅ ou ❌:**

- [ ] **Teste 1:** Grid renderiza ✅
- [ ] **Teste 2:** Modal abre com conteúdo ✅
- [ ] **Teste 3:** Botões funcionam ✅
- [ ] **Teste 4:** Prova completa ✅
- [ ] **Teste 5:** Navegação fluida ✅

**Se 5/5 ✅:** 🎉 **SUCESSO! Sistema operacional**

**Se algum ❌:** Entre em [MUDANCAS_IMPLEMENTADAS.md](./MUDANCAS_IMPLEMENTADAS.md) → Seção "Possíveis Problemas"

---

## 📝 Reportar Resultado

Após testes:

```
✅ TESTE COMPLETO - Todos os 5 passos OK, não há erros

OU

❌ TESTE FALHOU EM PASSO X - [Descrição do erro]
```

---

**Tempo total esperado:** 5-10 minutos  
**Próximo:** Executar PASSO 5 full (backend + frontend integrado)

