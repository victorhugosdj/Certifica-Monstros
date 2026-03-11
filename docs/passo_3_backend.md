# Passo 3 – Backend FastAPI

## 📦 requirements.txt

```text
fastapi==0.109.0
uvicorn==0.27.0
supabase==2.3.0
python-dotenv==1.0.0
```

Instale com:
```powershell
cd backend
pip install -r requirements.txt
```

## 🔌 database.py – Conexão Supabase

```python
"""
backend/database.py
Conexão segura com Supabase usando Service Role Key.
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://ibmembnxtbpsehqdorme.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibWVtYm54dGJwc2VocWRvcm1lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ3Mjg3MiwiZXhwIjoyMDg4MDQ4ODcyfQ.tW1gnZN1K1G2KuZfcIDp-JUTcYgYIKV8DCU0Gia3TTw")  # Service Role Key

_client: Client = None


def get_supabase() -> Client:
    global _client
    if _client is None:
        if not SUPABASE_KEY:
            raise ValueError("SUPABASE_SERVICE_KEY não configurada. Verifique o .env")
        _client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return _client


def get_user_errors(user_id: str):
    """Retorna todas as respostas erradas de um aluno."""
    sb = get_supabase()
    result = sb.table("respostas_usuario") \
        .select("*") \
        .eq("user_id", user_id) \
        .eq("correto", False) \
        .execute()
    return result.data or []


def get_user_answers(user_id: str):
    """Retorna todas as respostas de um aluno."""
    sb = get_supabase()
    result = sb.table("respostas_usuario") \
        .select("*") \
        .eq("user_id", user_id) \
        .execute()
    return result.data or []


def get_all_questions():
    """Retorna todas as questões do banco."""
    sb = get_supabase()
    result = sb.table("questoes").select("*").execute()
    return result.data or []
```

## 🚀 main.py – Endpoints FastAPI

```python
"""
backend/main.py
API de métricas e dados do Certifica Monstros.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict
from database import get_user_answers, get_user_errors, get_all_questions

app = FastAPI(title="Certifica Monstros API", version="1.0.0")

# CORS para o frontend acessar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, restrinja ao domínio do frontend
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok", "service": "Certifica Monstros API"}


@app.get("/api/metrics/{user_id}")
def get_metrics(user_id: str):
    """
    Calcula métricas completas para o aluno:
    - Acurácia global
    - Acurácia por módulo (para gráfico Radar)
    - Questões mais erradas (para tabela de desafios)
    - Dificuldade real por questão
    """
    answers = get_user_answers(user_id)
    if not answers:
        raise HTTPException(status_code=404, detail="Nenhuma resposta encontrada")

    # ── Métricas Globais ──
    total = len(answers)
    corretas = sum(1 for a in answers if a["correto"])
    accuracy_global = round(corretas / total * 100, 1) if total > 0 else 0

    # ── Métricas por Módulo (Radar) ──
    modulos = defaultdict(lambda: {"total": 0, "corretas": 0})
    for a in answers:
        m = modulos[a["modulo_id"]]
        m["total"] += 1
        if a["correto"]:
            m["corretas"] += 1

    grafico_radar = {}
    for mod_id, data in sorted(modulos.items()):
        acc = round(data["corretas"] / data["total"] * 100, 1) if data["total"] > 0 else 0
        grafico_radar[f"M{mod_id}"] = {
            "acuracia": acc,
            "total_respostas": data["total"],
            "total_corretas": data["corretas"]
        }

    # ── Questões Desafiadoras ──
    questao_stats = defaultdict(lambda: {"total": 0, "erros": 0, "enunciado": ""})
    for a in answers:
        qs = questao_stats[a["questao_id"]]
        qs["total"] += 1
        if not a["correto"]:
            qs["erros"] += 1

    desafiadoras = []
    for qid, stats in questao_stats.items():
        if stats["erros"] > 0:
            dificuldade_real = round(stats["erros"] / stats["total"], 2)
            desafiadoras.append({
                "questao_id": qid,
                "total_respostas": stats["total"],
                "total_erros": stats["erros"],
                "dificuldade_real": dificuldade_real
            })

    desafiadoras.sort(key=lambda x: x["dificuldade_real"], reverse=True)

    return {
        "user_id": user_id,
        "accuracy_global": accuracy_global,
        "total_respostas": total,
        "total_corretas": corretas,
        "grafico_radar": grafico_radar,
        "questoes_desafiadoras": desafiadoras[:20]  # Top 20
    }


@app.get("/api/questions/{modulo_id}")
def get_questions(modulo_id: int):
    """Retorna todas as questões de um módulo."""
    all_q = get_all_questions()
    filtered = [q for q in all_q if q["modulo_id"] == modulo_id]
    if not filtered:
        raise HTTPException(status_code=404, detail=f"Módulo {modulo_id} não encontrado")
    return filtered
```

## 🧪 Rodar o Backend Local

```powershell
cd backend
# Crie um arquivo .env com:
# SUPABASE_URL=https://ibmembnxtbpsehqdorme.supabase.co
# SUPABASE_SERVICE_KEY=eyJ...sua_service_role_key...

uvicorn main:app --reload --port 8000
```

Acesse: `http://localhost:8000/docs` para ver o Swagger automático.

## 📌 Notas

- O backend usa a **Service Role Key** (acesso total), por isso roda no **servidor**, nunca no browser
- O endpoint `/api/metrics/{user_id}` calcula `dificuldade_real = total_erros / total_respostas`
- O Swagger em `/docs` permite testar os endpoints diretamente

---

**Próximo passo:** [Passo 4 – Frontend HTML + CSS](./passo_4_frontend_html_css.md)
