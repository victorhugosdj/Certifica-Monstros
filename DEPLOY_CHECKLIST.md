# ⚡ DEPLOYMENT CHECKLIST — Deploy Rápido em 30 Min

## 🎯 Objetivo: Sistema ao vivo (GitHub → Vercel + Heroku)

---

## ✅ FASE 1: Preparação Local (5 min)

### GitHub
- [ ] Conta GitHub criada (https://github.com/signup)
- [ ] Repository clonado ou `git init` executado
- [ ] .env preenchido com credenciais Supabase
- [ ] .gitignore verificado (.env está listado? ✅)
- [ ] Primeiro `git push` feito

### Vercel
- [ ] Conta Vercel criada (https://vercel.com)
- [ ] Conectado com GitHub

### Heroku
- [ ] Conta Heroku criada (https://heroku.com)
- [ ] Heroku CLI instalado e `heroku login` executado

### Supabase
- [ ] Projeto criado
- [ ] URL + Key copiados
- [ ] seed.sql executado (3 tables criadas)

**Status:** ☐ Não iniciado | ☐ 25% | ☐ 50% | ✅ Completo

---

## 🚀 FASE 2: Deploy Frontend (5 min)

```
1. [ ] Vercel → Import Git Repository
2. [ ] Selecionar "certifica-monstros"
3. [ ] Framework: "Other"
4. [ ] Root: "./frontend"
5. [ ] Env Variables:
       - VITE_SUPABASE_URL = https://xxx.supabase.co
       - VITE_SUPABASE_KEY = eyJhbG...
       - VITE_API_BASE_URL = (deixar em branco por agora)
6. [ ] Deploy!
7. [ ] Esperar 2-3 minutos
8. [ ] ✅ URL: https://certifica-monstros.vercel.app
```

**Status:** ☐ Não iniciado | ☐ 25% | ☐ 50% | ✅ Completo

---

## 🖥️ FASE 3: Deploy Backend (10 min)

### Opção A: Heroku (Recomendado)

```
1. [ ] heroku create seu-app-certifica
2. [ ] heroku config:set SUPABASE_URL="https://..." \
           SUPABASE_KEY="eyJ..." \
           SUPABASE_SERVICE_KEY="eyJ..." \
           ALLOWED_ORIGINS="https://certifica-monstros.vercel.app"
3. [ ] git push heroku main
4. [ ] heroku logs -a seu-app-certifica -n 50
5. [ ] ✅ URL: https://seu-app-certifica.herokuapp.com
```

### Opção B: Railway

```
1. [ ] Criar conta em https://railway.app/
2. [ ] Conectar GitHub
3. [ ] Selecionar branch "main"
4. [ ] Environment variables iguais
5. [ ] Deploy automático (2 min)
6. [ ] ✅ URL gerada
```

**Escolhido:** ☐ Heroku | ☐ Railway | ☐ VPS Próprio

**Status:** ☐ Não iniciado | ☐ 25% | ☐ 50% | ✅ Completo

---

## 🔗 FASE 4: Conectar Frontend ao Backend (3 min)

```
1. [ ] Anotar URL do backend (ex: https://seu-app-certifica.herokuapp.com)
2. [ ] Vercel → Settings → Environment Variables
3. [ ] VITE_API_BASE_URL = https://seu-app-certifica.herokuapp.com
4. [ ] Redeploy automático (1 min)
5. [ ] Testar no F12: Network → POST /api/responses (Status 200?)
```

**Status:** ☐ Não iniciado | ☐ 25% | ☐ 50% | ✅ Completo

---

## 🧪 FASE 5: Testes de Sanidade (7 min)

### Frontend ✅
```
[ ] https://certifica-monstros.vercel.app carrega
[ ] Página não tem erros no console (F12)
[ ] Botão "Entrar" funciona
[ ] Login com conta Supabase funciona
[ ] Dashboard aparece
[ ] Lista de módulos aparece (8 módulos)
[ ] Clicar no módulo → conteúdo abre
[ ] Exame carrega perguntas
[ ] POST de respostas não dá erro
```

### Backend ✅
```
[ ] https://seu-app-certifica.herokuapp.com acessível
[ ] GET / retorna 200
[ ] POST /api/responses retorna 200
[ ] Logs mostram: "Record saved"
```

### Database ✅
```
[ ] Supabase Dashboard → Table "respostas_usuario"
[ ] Nova linha aparece após fazer simulado
[ ] Dados corretos (user_id, modulo, acertos, etc)
```

### Full Flow ✅
```
[ ] Fazer 1 simulado completo
[ ] Ver em Dashboard: nova entrada
[ ] Histórico aparece corretamente
[ ] Percentual de acerto calculado
[ ] Recomendações geradas
```

**Status:** ☐ Falhando | ☐ Parcialmente | ✅ Tudo OK

---

## 🎉 RESULTADO FINAL

Se todos os ✅ estão marcados:

```
✅ GitHub Repository:    https://github.com/seu-usuario/certifica-monstros
✅ Frontend Live:         https://certifica-monstros.vercel.app
✅ Backend Live:          https://seu-app-certifica.herokuapp.com
✅ Database Connected:    Supabase (com dados)
✅ Sistema Funcional:     Tudo em produção! 🚀
```

---

## 📊 Timing

| Fase | Tempo | Status |
|------|-------|--------|
| 1. Prep | 5 min | ☐ |
| 2. Frontend | 5 min | ☐ |
| 3. Backend | 10 min | ☐ |
| 4. Integração | 3 min | ☐ |
| 5. Testes | 7 min | ☐ |
| **TOTAL** | **30 min** | ☐ |

---

## 🆘 Problemas Comuns

Vir aqui se der erro!

### "Permission denied cannot push to GitHub"
```
Solução: 
  1. Gerar SSH key: ssh-keygen -t ed25519
  2. Adicionar em GitHub → Settings → SSH keys
  3. Usar: git remote set-url origin git@github.com:seu-usuario/repo.git
```

### "CORS Error: Origin not allowed"
```
Solução:
  1. Backend .env: ALLOWED_ORIGINS=https://certifica-monstros.vercel.app
  2. git push heroku main (redeploy)
```

### "Supabase: RLS policies are blocking"
```
Solução:
  1. Supabase → Authentication → RLS
  2. Verificar policies para tabela "respostas_usuario"
  3. Executar seed.sql novamente
```

### "Vercel: 404 when accessing site"
```
Solução:
  1. Verificar Root Directory: "frontend"
  2. Verificar vercel.json tem "rewrite" rules
```

---

## 📞 Resumo de Links

```
GitHub:    https://github.com/seu-usuario/certifica-monstros
Vercel:    https://vercel.com/dashboard
Heroku:    https://dashboard.heroku.com
Supabase:  https://supabase.com/dashboard
```

---

**Versão:** 1.0  
**Data:** 11 de Março de 2026  
**Status:** Pronto para Deploy! 🚀

