# Passo 6 – Deploy na Vercel

## 📦 vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/main.py",
      "use": "@vercel/python"
    },
    {
      "src": "frontend/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "backend/main.py" },
    { "src": "/(.*)", "dest": "frontend/$1" }
  ]
}
```

## 🔐 Variáveis de Ambiente (Vercel Dashboard)

No painel da Vercel → Settings → Environment Variables:

| Nome | Valor |
|------|-------|
| `SUPABASE_URL` | `https://ibmembnxtbpsehqdorme.supabase.co` |
| `SUPABASE_SERVICE_KEY` | `eyJ...sua_service_role_key...` |

> ⚠️ A Service Role Key **nunca** deve aparecer no código frontend.

## 🚀 Deploy

```powershell
# Instalar Vercel CLI (se não instalado)
npm i -g vercel

# Na raiz do projeto
cd C:\Users\zello\Desktop\conteudoOficial
vercel --prod
```

## ✅ Checklist Pré-Deploy

- [ ] `provas.json` e `modulos.json` estão em `data/`
- [ ] `seed.sql` foi executado no Supabase
- [ ] Questões foram importadas via `import_questoes.py`
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] `vercel.json` na raiz do projeto
- [ ] Backend FastAPI testado localmente (`uvicorn main:app`)
- [ ] Frontend testado (abrir `index.html` no browser)

## 📌 Sobre Uptime

**Sim, com deploy na Vercel:**
- O site fica **online 24/7**, mesmo com PC desligado
- O backend FastAPI roda como **Serverless Function**
- O frontend é servido como **CDN estático**
- Supabase mantém o banco **sempre ativo**

---

🎉 **Pronto!** Seu portal de simulados está no ar!
