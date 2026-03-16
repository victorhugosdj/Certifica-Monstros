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

from fastapi import FastAPI, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
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
bearer_scheme = HTTPBearer(auto_error=False)

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


def get_authenticated_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Security(bearer_scheme),
) -> Dict[str, Any]:
    """Validate the bearer token with Supabase and return the authenticated user."""

    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Missing or invalid authorization token")

    service_client = get_supabase_service_client()
    if not service_client:
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    try:
        auth_response = service_client.auth.get_user(credentials.credentials)
    except Exception as exc:
        logger.warning("Failed to validate bearer token: %s", exc)
        raise HTTPException(status_code=401, detail="Invalid or expired authorization token")

    user = getattr(auth_response, "user", None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired authorization token")

    return {
        "id": getattr(user, "id", None),
        "email": getattr(user, "email", None),
    }


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
def user_metrics(
    user_id: str,
    current_user: Dict[str, Any] = Security(get_authenticated_user),
) -> Dict[str, Any]:
    """Compute user metrics based on Supabase response history.

    This endpoint uses the Supabase Service Role key to securely access per-user
    data (the table `respostas_usuario`).
    """

    if current_user["id"] != user_id:
        raise HTTPException(status_code=403, detail="You can only access your own metrics")

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


@app.get("/api/ranking")
def global_ranking(limit: int = 0) -> List[Dict[str, Any]]:
    """Compute a global ranking using the Supabase Service Role key.

    Returns a list of users with aggregated correct/total counts and a
    display name when available. This endpoint must run server-side since
    it requires elevated permissions to read all users' responses.
    """

    service_client = get_supabase_service_client()
    if not service_client:
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    try:
        res = service_client.table("respostas_usuario").select("user_id,correto,created_at").execute()
        if res.error:
            raise HTTPException(status_code=500, detail=str(res.error))

        rows = res.data or []

        # Aggregate per user
        stats = {}
        for r in rows:
            uid = r.get("user_id")
            if not uid:
                continue
            entry = stats.setdefault(uid, {"correct": 0, "total": 0, "last_access": None})
            entry["total"] += 1
            if r.get("correto"):
                entry["correct"] += 1
            created_at = r.get("created_at")
            if created_at:
                if not entry["last_access"] or created_at > entry["last_access"]:
                    entry["last_access"] = created_at

        # Total questions for progress calculation
        try:
            total_questions = len(load_provas())
        except Exception:
            total_questions = 0

        # Build list
        ranking = []
        for uid, s in stats.items():
            percent = round((s["correct"] / s["total"] * 100)) if s["total"] else 0
            progress_percent = round((s["total"] / total_questions) * 100) if total_questions else 0
            ranking.append({
                "user_id": uid,
                "correct": s["correct"],
                "total": s["total"],
                "percentage": percent,
                "progress_percentage": progress_percent,
                "last_access": s.get("last_access"),
            })

        # Sort
        ranking.sort(key=lambda x: (-x["percentage"], -x["total"]))

        # Limit (0 or negative = return all)
        top = ranking if limit <= 0 else ranking[:limit]

        # Fetch display names from profiles (if present), chunking to avoid large IN queries.
        user_ids = [r["user_id"] for r in top]
        name_map: Dict[str, Optional[str]] = {}
        if user_ids:
            chunk_size = 200
            for i in range(0, len(user_ids), chunk_size):
                chunk = user_ids[i:i + chunk_size]
                prof_res = (
                    service_client
                    .table("profiles")
                    .select("user_id,display_name")
                    .in_("user_id", chunk)
                    .execute()
                )
                profiles = prof_res.data or []
                for profile in profiles:
                    name_map[profile.get("user_id")] = profile.get("display_name")

        # Attach display names
        for r in top:
            r["userName"] = name_map.get(r["user_id"]) or (r["user_id"][:12])

        return top

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error computing global ranking: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/public-progress/{user_id}")
def public_progress(
    user_id: str,
    current_user: Dict[str, Any] = Security(get_authenticated_user),
) -> Dict[str, Any]:
    """Return aggregated, public-safe progress data for a given user.

    Requires authentication, but allows viewing other users' progress.
    """

    service_client = get_supabase_service_client()
    if not service_client:
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    try:
        res = (
            service_client
            .table("respostas_usuario")
            .select("module,correto")
            .eq("user_id", user_id)
            .execute()
        )
        if res.error:
            raise HTTPException(status_code=500, detail=str(res.error))

        rows = res.data or []

        per_module = {i: {"module": i, "correct": 0, "total": 0} for i in range(1, 9)}
        for r in rows:
            mod = r.get("module")
            if mod is None:
                continue
            try:
                mod = int(mod)
            except (TypeError, ValueError):
                continue
            if mod not in per_module:
                continue
            per_module[mod]["total"] += 1
            if r.get("correto"):
                per_module[mod]["correct"] += 1

        per_module_list = []
        overall_total = 0
        overall_correct = 0
        for i in range(1, 9):
            stats = per_module[i]
            total = stats["total"]
            correct = stats["correct"]
            overall_total += total
            overall_correct += correct
            per_module_list.append({
                "module": i,
                "correct": correct,
                "total": total,
                "percentage": round((correct / total) * 100) if total else 0,
            })

        overall_percentage = round((overall_correct / overall_total) * 100) if overall_total else 0

        profile_res = (
            service_client
            .table("profiles")
            .select("display_name")
            .eq("user_id", user_id)
            .maybe_single()
            .execute()
        )
        display_name = None
        if profile_res.data:
            display_name = profile_res.data.get("display_name")

        return {
            "user_id": user_id,
            "display_name": display_name or user_id[:12],
            "overall": {
                "correct": overall_correct,
                "total": overall_total,
                "percentage": overall_percentage,
            },
            "per_module": per_module_list,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error computing public progress for %s: %s", user_id, e)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/official-exams/progress/{user_id}")
def official_exam_progress(
    user_id: str,
    current_user: Dict[str, Any] = Security(get_authenticated_user),
) -> Dict[str, Any]:
    """Return progress for official exams for the authenticated user only."""

    if current_user["id"] != user_id:
        raise HTTPException(status_code=403, detail="You can only access your own official exam progress")

    service_client = get_supabase_service_client()
    if not service_client:
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    try:
        res = (
            service_client
            .table("respostas_usuario")
            .select("question_id,correto,created_at")
            .eq("user_id", user_id)
            .like("question_id", "official:%")
            .execute()
        )
        if res.error:
            raise HTTPException(status_code=500, detail=str(res.error))

        rows = res.data or []
        per_file: Dict[str, Dict[str, Any]] = {}

        def parse_file_from_question_id(qid: str) -> Optional[str]:
            if not qid or not qid.startswith("official:"):
                return None
            parts = qid.split(":", 2)
            if len(parts) < 3:
                return None
            return parts[1]

        for r in rows:
            qid = r.get("question_id")
            file_key = parse_file_from_question_id(qid)
            if not file_key:
                continue
            entry = per_file.setdefault(file_key, {"questions": {}, "last_access": None})
            created_at = r.get("created_at")
            if created_at:
                if not entry["last_access"] or created_at > entry["last_access"]:
                    entry["last_access"] = created_at
            # Keep latest response per question
            qentry = entry["questions"].get(qid)
            if not qentry or (created_at and created_at > qentry.get("created_at", "")):
                entry["questions"][qid] = {
                    "correto": bool(r.get("correto")),
                    "created_at": created_at or "",
                }

        progress_by_file: Dict[str, Any] = {}
        for file_key, data in per_file.items():
            questions = data.get("questions", {})
            total = len(questions)
            correct = sum(1 for v in questions.values() if v.get("correto"))
            percent = round((correct / total) * 100) if total else 0
            progress_by_file[file_key] = {
                "correct": correct,
                "total": total,
                "percentage": percent,
                "last_access": data.get("last_access"),
            }

        return {
            "user_id": user_id,
            "progress": progress_by_file,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error computing official exam progress for %s: %s", user_id, e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/responses")
def record_responses(
    payload: ResponseRecords,
    current_user: Dict[str, Any] = Security(get_authenticated_user),
) -> Dict[str, Any]:
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

    invalid_users = sorted({r.user_id for r in payload.responses if r.user_id != current_user["id"]})
    if invalid_users:
        logger.warning("Rejected response batch for mismatched user_id(s): %s", invalid_users)
        raise HTTPException(status_code=403, detail="Payload user_id must match the authenticated user")

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
