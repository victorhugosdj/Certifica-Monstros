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
    "http://localhost:3000,http://localhost:8080,http://localhost:5173,http://127.0.0.1:5500,http://127.0.0.1:8000,http://127.0.0.1:8080"
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


class ProgressSnapshotEntry(BaseModel):
    module: Optional[int] = None
    correct: bool
    points: float = 0
    attempts: int = 1
    lastAnsweredAt: str = ""
    wrong_attempts: Optional[int] = None


class ProgressSnapshotPayload(BaseModel):
    user_id: Optional[str] = None
    progress: Dict[str, ProgressSnapshotEntry]
    errors: Dict[str, int] = {}


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


def _normalize_iso_optional(raw_value: Optional[str]) -> Optional[str]:
    value = str(raw_value or "").strip()
    return value or None


def _parse_iso_safe(raw_value: Optional[str]) -> Optional[datetime]:
    if not raw_value:
        return None
    try:
        return datetime.fromisoformat(str(raw_value).replace("Z", "+00:00"))
    except Exception:
        return None


def _pick_latest_valid_timestamp(incoming_value: Optional[str], existing_value: Optional[str]) -> Optional[str]:
    normalized_incoming = _normalize_iso_optional(incoming_value)
    normalized_existing = _normalize_iso_optional(existing_value)
    incoming_dt = _parse_iso_safe(normalized_incoming)
    existing_dt = _parse_iso_safe(normalized_existing)

    if incoming_dt and existing_dt:
        return normalized_incoming if incoming_dt >= existing_dt else normalized_existing
    if incoming_dt:
        return normalized_incoming
    if existing_dt:
        return normalized_existing
    return None


def _build_progress_from_event_rows(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    latest_rows_by_question: Dict[str, Dict[str, Any]] = {}
    attempts_by_question: Dict[str, int] = {}
    errors_by_question: Dict[str, int] = {}

    for row in rows:
        question_id = row.get("question_id")
        if not question_id:
            continue

        attempts_by_question[question_id] = attempts_by_question.get(question_id, 0) + 1
        if not row.get("correto"):
            errors_by_question[question_id] = errors_by_question.get(question_id, 0) + 1

        created_at = row.get("created_at") or row.get("answered_at") or ""
        existing = latest_rows_by_question.get(question_id)
        if existing and created_at <= (existing.get("created_at") or existing.get("answered_at") or ""):
            continue
        latest_rows_by_question[question_id] = row

    latest_by_question: Dict[str, Dict[str, Any]] = {}
    for question_id, row in latest_rows_by_question.items():
        is_correct = bool(row.get("correto"))
        latest_by_question[question_id] = {
            "module": row.get("module"),
            "correct": is_correct,
            "points": 1 if is_correct else 0,
            "attempts": attempts_by_question.get(question_id, 1),
            "wrong_attempts": errors_by_question.get(question_id, 0),
            "lastAnsweredAt": row.get("created_at") or row.get("answered_at") or "",
        }

    return {
        "progress": latest_by_question,
        "errors": errors_by_question,
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


@app.get("/api/progress/{user_id}")
def user_progress(
    user_id: str,
    current_user: Dict[str, Any] = Security(get_authenticated_user),
) -> Dict[str, Any]:
    """Return the latest saved progress and error counters for the authenticated user."""

    if current_user["id"] != user_id:
        raise HTTPException(status_code=403, detail="You can only access your own progress")

    service_client = get_supabase_service_client()
    if not service_client:
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    try:
        # Fonte canônica de verdade (snapshot consolidado).
        # Se a tabela ainda não existir no banco, o fluxo cai para reconstrução por eventos.
        try:
            canonical_res = (
                service_client
                .table("progresso_usuario_snapshot")
                .select("question_id,module,correct,points,attempts,wrong_attempts,last_answered_at")
                .eq("user_id", user_id)
                .execute()
            )
            if not canonical_res.error:
                canonical_rows = canonical_res.data or []
                if canonical_rows:
                    progress: Dict[str, Dict[str, Any]] = {}
                    errors: Dict[str, int] = {}
                    for row in canonical_rows:
                        question_id = row.get("question_id")
                        if not question_id:
                            continue
                        wrong_attempts = int(row.get("wrong_attempts") or 0)
                        progress[question_id] = {
                            "module": row.get("module"),
                            "correct": bool(row.get("correct")),
                            "points": float(row.get("points") or 0),
                            "attempts": int(row.get("attempts") or 1),
                            "wrong_attempts": wrong_attempts,
                            "lastAnsweredAt": row.get("last_answered_at") or "",
                        }
                        if wrong_attempts > 0:
                            errors[question_id] = wrong_attempts

                    return {
                        "user_id": user_id,
                        "progress": progress,
                        "errors": errors,
                    }
            else:
                logger.info("Canonical snapshot table unavailable/error. Falling back to event history: %s", canonical_res.error)
        except Exception as canonical_error:
            logger.info("Canonical snapshot unavailable, falling back to event history: %s", canonical_error)

        res = (
            service_client
            .table("respostas_usuario")
            .select("module,question_id,correto,created_at")
            .eq("user_id", user_id)
            .execute()
        )
        if res.error:
            raise HTTPException(status_code=500, detail=str(res.error))

        rows = res.data or []
        event_state = _build_progress_from_event_rows(rows)

        return {
            "user_id": user_id,
            "progress": event_state["progress"],
            "errors": event_state["errors"],
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error computing user progress for %s: %s", user_id, e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/progress/sync")
def sync_progress_snapshot(
    payload: ProgressSnapshotPayload,
    current_user: Dict[str, Any] = Security(get_authenticated_user),
) -> Dict[str, Any]:
    """Persist a canonical, idempotent progress snapshot for the authenticated user."""

    authenticated_user_id = current_user["id"]
    if payload.user_id and payload.user_id != authenticated_user_id:
        logger.warning(
            "Ignoring mismatched payload user_id on /api/progress/sync: payload=%s auth=%s",
            payload.user_id,
            authenticated_user_id,
        )

    service_client = get_supabase_service_client()
    if not service_client:
        raise HTTPException(status_code=500, detail="Supabase service client is not configured")

    progress = payload.progress or {}
    errors = payload.errors or {}
    if not progress:
        logger.info("POST /api/progress/sync user=%s with empty progress payload", authenticated_user_id)
        return {"upserted": 0, "message": "No progress items to sync"}

    logger.info(
        "POST /api/progress/sync user=%s progress_items=%d error_items=%d",
        authenticated_user_id,
        len(progress),
        len(errors),
    )

    question_ids = [qid for qid in progress.keys() if qid]
    existing_by_question: Dict[str, Dict[str, Any]] = {}
    if question_ids:
        try:
            existing_res = (
                service_client
                .table("progresso_usuario_snapshot")
                .select("question_id,module,correct,points,attempts,wrong_attempts,last_answered_at")
                .eq("user_id", authenticated_user_id)
                .in_("question_id", question_ids)
                .execute()
            )
            if existing_res.error:
                logger.info("Could not read existing canonical snapshot rows before upsert: %s", existing_res.error)
            else:
                for row in existing_res.data or []:
                    question_id = row.get("question_id")
                    if question_id:
                        existing_by_question[question_id] = row
        except Exception as read_existing_error:
            logger.info("Skipping pre-merge with existing snapshot due to read error: %s", read_existing_error)

    now_iso = datetime.utcnow().isoformat()
    rows = []
    for question_id, entry in progress.items():
        if not question_id:
            continue
        existing = existing_by_question.get(question_id, {})

        incoming_wrong_attempts = int(errors.get(question_id, entry.wrong_attempts or 0) or 0)
        existing_wrong_attempts = int(existing.get("wrong_attempts") or 0)
        merged_wrong_attempts = max(incoming_wrong_attempts, existing_wrong_attempts)

        incoming_correct = bool(entry.correct)
        existing_correct = bool(existing.get("correct"))
        # Regra cumulativa: uma questão marcada como correta não deve regredir para incorreta.
        merged_correct = incoming_correct or existing_correct

        incoming_points = float(entry.points or 0)
        existing_points = float(existing.get("points") or 0)
        merged_points = max(incoming_points, existing_points)

        incoming_attempts = max(int(entry.attempts or 1), 1)
        existing_attempts = max(int(existing.get("attempts") or 1), 1)
        merged_attempts = max(incoming_attempts, existing_attempts)

        merged_last = _pick_latest_valid_timestamp(
            entry.lastAnsweredAt,
            existing.get("last_answered_at"),
        )

        incoming_module = entry.module
        existing_module = existing.get("module")
        merged_module = incoming_module if incoming_module is not None else existing_module

        rows.append({
            "user_id": authenticated_user_id,
            "question_id": question_id,
            "module": merged_module,
            "correct": merged_correct,
            "points": merged_points,
            "attempts": merged_attempts,
            "wrong_attempts": max(merged_wrong_attempts, 0),
            "last_answered_at": merged_last,
            "updated_at": now_iso,
        })

    if not rows:
        return {"upserted": 0, "message": "No valid progress rows to sync"}

    try:
        res = (
            service_client
            .table("progresso_usuario_snapshot")
            .upsert(rows, on_conflict="user_id,question_id")
            .execute()
        )
        upsert_error = getattr(res, "error", None)
        if upsert_error:
            logger.error(
                "Supabase upsert error on progresso_usuario_snapshot user=%s rows=%d error=%s",
                authenticated_user_id,
                len(rows),
                upsert_error,
            )
            raise HTTPException(status_code=500, detail=f"Database error: {str(upsert_error)}")

        returned_rows = getattr(res, "data", None) or []
        logger.info(
            "POST /api/progress/sync upsert success user=%s rows=%d returned=%d",
            authenticated_user_id,
            len(rows),
            len(returned_rows),
        )

        return {
            "upserted": len(rows),
            "message": "Progress snapshot synchronized",
            "timestamp": now_iso,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error syncing canonical progress snapshot for %s: %s", authenticated_user_id, e)
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


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
