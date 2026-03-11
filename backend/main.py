"""FastAPI backend for metrics and basic data access.

This service is intended to run alongside the frontend and provide
lightweight APIs for reporting and optional Supabase-backed user metrics.

Run:
    uvicorn backend.main:app --reload
"""

import logging
import os
from collections import Counter
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .database import (
    get_supabase_client,
    get_supabase_service_client,
    get_user_errors,
    load_modulos,
    load_provas,
)

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Certifica Monstros - Backend")

# ✅ CORS Seguro: Apenas origens confiáveis
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:8080,http://localhost:5173,http://127.0.0.1:5500"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    max_age=3600,
)


class ResponseRecord(BaseModel):
    user_id: str
    module: int
    question_id: str
    correto: bool


class ResponseRecords(BaseModel):
    responses: List[ResponseRecord]


@app.get("/")
def root() -> Dict[str, str]:
    return {"status": "ok", "service": "certifica-monstros-backend"}


@app.get("/metrics")
def metrics() -> Dict[str, Any]:
    """Return basic metrics for the question bank."""

    provas = load_provas()
    modulos = load_modulos()

    total_questions = len(provas)
    modules_count = len(modulos)

    by_module = Counter(q.get("modulo") for q in provas)

    missing_keys = [q.get("id") for q in provas if not q.get("correta_texto")]

    return {
        "total_questions": total_questions,
        "modules": modules_count,
        "questions_per_module": dict(sorted(by_module.items())),
        "missing_correct_answer": len(missing_keys),
        "missing_correct_answer_ids": missing_keys,
    }


@app.get("/supabase/profiles")
def list_profiles(limit: int = 50) -> List[Dict[str, Any]]:
    """Returns a list of profiles from Supabase (if configured)."""

    supabase = get_supabase_client()
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")

    res = supabase.table("profiles").select("*").limit(limit).execute()
    if res.error:
        raise HTTPException(status_code=500, detail=str(res.error))
    return res.data


@app.get("/supabase/profile/{user_id}")
def get_profile(user_id: str) -> Dict[str, Any]:
    """Fetch an individual profile by user id."""

    supabase = get_supabase_client()
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not configured")

    res = supabase.table("profiles").select("*").eq("user_id", user_id).maybe_single().execute()
    if res.error:
        raise HTTPException(status_code=500, detail=str(res.error))
    return res.data or {}


@app.get("/api/metrics/{user_id}")
def user_metrics(user_id: str) -> Dict[str, Any]:
    """Compute user metrics based on Supabase response history.

    This endpoint uses the Supabase Service Role key to securely access per-user
    data (the table `respostas_usuario`).
    """

    # This endpoint reads per-user metrics. Use the Service Role client for
    # secure access (avoid exposing service keys to clients).
    try:
        errors_res = get_user_errors(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    errors_rows = errors_res.data or []
    errors = len(errors_rows)

    service_client = get_supabase_service_client()
    if not service_client:
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    # Total responses for the user (correct + incorrect)
    res = (
        service_client
        .table("respostas_usuario")
        .select("user_id,module,question_id,correto")
        .eq("user_id", user_id)
        .execute()
    )
    if res.error:
        raise HTTPException(status_code=500, detail=str(res.error))

    rows = res.data or []
    total = len(rows)

    per_module = {}
    for r in rows:
        mod = r.get("module")
        if mod is None:
            continue
        if mod not in per_module:
            per_module[mod] = {"total": 0, "errors": 0}
        per_module[mod]["total"] += 1
        if not r.get("correto"):
            per_module[mod]["errors"] += 1

    per_module_list = [
        {
            "module": mod,
            "total": stats["total"],
            "errors": stats["errors"],
            "difficulty": (stats["errors"] / stats["total"] if stats["total"] else 0),
        }
        for mod, stats in sorted(per_module.items())
    ]

    difficulty_real = errors / total if total else 0

    grafico_radar = {
        "labels": [f"M{m['module']}" for m in per_module_list],
        "values": [round(m["difficulty"] * 100, 1) for m in per_module_list],
    }

    return {
        "user_id": user_id,
        "total_responses": total,
        "total_errors": errors,
        "difficulty_real": difficulty_real,
        "per_module": per_module_list,
        "grafico_radar": grafico_radar,
    }


@app.post("/api/responses")
def record_responses(payload: ResponseRecords) -> Dict[str, Any]:
    """Record a batch of response results into the Supabase `respostas_usuario` table.
    
    Args:
        payload: ResponseRecords containing list of user responses
        
    Returns:
        Dict with number of inserted records and status message
        
    Raises:
        HTTPException: If validation or database error occurs
    """

    # Validação de entrada
    if not payload.responses:
        logger.warning("❌ POST /api/responses com array vazio")
        raise HTTPException(status_code=400, detail="responses array cannot be empty")

    service_client = get_supabase_service_client()
    if not service_client:
        logger.error("❌ Supabase service client não configurado")
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    try:
        # Preparar dados com timestamp
        rows = [
            {
                "user_id": r.user_id,
                "module": r.module,
                "question_id": r.question_id,
                "correto": r.correto,
                "created_at": datetime.utcnow().isoformat(),
            }
            for r in payload.responses
        ]

        logger.info(f"📝 Registrando {len(rows)} respostas para usuário {rows[0].get('user_id', 'unknown')}")

        res = service_client.table("respostas_usuario").insert(rows).execute()
        
        if res.error:
            logger.error(f"❌ Erro Supabase: {res.error}")
            raise HTTPException(status_code=500, detail=f"Database error: {str(res.error)}")

        logger.info(f"✅ {len(rows)} respostas registradas com sucesso")
        
        return {
            "inserted": len(rows),
            "message": f"✅ {len(rows)} respostas registradas com sucesso",
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Exception ao registrar respostas: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
