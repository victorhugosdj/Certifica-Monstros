"""Database helpers for the backend.

This module provides a thin wrapper around Supabase and a small helper to
load the frontend JSON data (provas/modulos) for the metrics endpoints.

The frontend data lives under `frontend/data/`.
"""

import json
import logging
import os
from pathlib import Path
from typing import Any, Dict, Optional

from supabase import Client, create_client

# Configurar logging
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent
SUPABASE_SERVICE_KEY_ENV_NAMES = ("SUPABASE_SERVICE_KEY", "SUPABASE_SERVICE_ROLE_KEY")


def get_supabase_client() -> Optional[Client]:
    """Return a Supabase client using the public (anon) key.

    This client should be used for operations that do not require elevated
    permissions (e.g., read-only access to public data).
    """

    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        return None
    return create_client(url, key)


def get_supabase_service_client() -> Optional[Client]:
    """Return a Supabase client using the Service Role key.

    The Service Role key has elevated permissions and should only be used
    server-side (never exposed to clients). It is required for securely
    reading/writing user-specific data such as error reports.
    """

    url = os.getenv("SUPABASE_URL")
    key = next((os.getenv(env_name) for env_name in SUPABASE_SERVICE_KEY_ENV_NAMES if os.getenv(env_name)), None)
    if not url or not key:
        return None
    return create_client(url, key)


def get_supabase_service_client_error_detail() -> str:
    """Return a consistent error detail for missing service client configuration."""

    return (
        "Supabase service client is not configured. "
        "Required env vars: SUPABASE_URL and SUPABASE_SERVICE_KEY "
        "(or SUPABASE_SERVICE_ROLE_KEY)."
    )


def get_user_errors(user_id: str):
    """Fetch all incorrect answers for a given user from Supabase.

    The table name is expected to be `respostas_usuario`.
    """

    client = get_supabase_service_client()
    if not client:
        raise RuntimeError(get_supabase_service_client_error_detail())

    return (
        client
        .table("respostas_usuario")
        .select("*")
        .eq("user_id", user_id)
        .eq("correto", False)
        .execute()
    )


def load_frontend_json(filename: str) -> Any:
    """Load a JSON file from frontend/data by name.
    
    Args:
        filename: Name of the file to load (e.g., 'provas.json')
        
    Returns:
        Parsed JSON content
        
    Raises:
        FileNotFoundError: If file doesn't exist
        json.JSONDecodeError: If JSON is malformed
    """

    path = BASE_DIR / "frontend" / "data" / filename
    
    if not path.exists():
        logger.error(f"❌ Arquivo não encontrado: {path}")
        raise FileNotFoundError(f"Could not find {path}")

    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        logger.info(f"✅ {filename} carregado com sucesso ({len(data) if isinstance(data, list) else 'dict'} itens)")
        return data
        
    except json.JSONDecodeError as e:
        logger.error(f"❌ JSON malformado em {filename}: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"❌ Erro ao carregar {filename}: {str(e)}")
        raise


def load_provas() -> Any:
    return load_frontend_json("provas.json")


def load_modulos() -> Any:
    return load_frontend_json("modulos.json")
