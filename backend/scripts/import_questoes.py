"""Import question bank JSON into Supabase table `questoes`.

This script reads `frontend/data/provas.json` and upserts rows into the Supabase
`questoes` table with the following schema:

- id (text, e.g. "M1-Q1")
- modulo_id (int)
- enunciado (text)
- opcoes (jsonb)
- correta (text)

Usage:
    SUPABASE_URL=... SUPABASE_SERVICE_KEY=... python backend/scripts/import_questoes.py

This script is intended to be run locally (or from CI) as part of the Supabase setup.
"""

import json
import os
from pathlib import Path

from supabase import create_client


def build_question_id(raw_id: str) -> str:
    """Convert raw id like 'm1_q1' to 'M1-Q1'."""

    if not raw_id:
        return raw_id
    return raw_id.replace("m", "M").replace("_", "-")


def main() -> None:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        raise RuntimeError(
            "Missing SUPABASE_URL and service key environment variables. "
            "Use SUPABASE_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY."
        )

    client = create_client(url, key)

    base = Path(__file__).resolve().parent.parent
    source = base / "frontend" / "data" / "provas.json"
    if not source.exists():
        raise FileNotFoundError(f"Could not find question file: {source}")

    with open(source, "r", encoding="utf-8") as f:
        provas = json.load(f)

    rows = []
    for item in provas:
        question_id = build_question_id(item.get("id", ""))
        mod = item.get("modulo")
        enunciado = item.get("pergunta") or item.get("enunciado") or ""
        opcoes = item.get("opcoes") or item.get("options") or []
        correta = item.get("correta_texto") or item.get("correta") or ""

        rows.append(
            {
                "id": question_id,
                "modulo_id": mod,
                "enunciado": enunciado,
                "opcoes": opcoes,
                "correta": correta,
            }
        )

    # Upsert the entire JSON into Supabase.
    print(f"Upserting {len(rows)} questions into supabase table 'questoes'...")
    res = client.table("questoes").upsert(rows, on_conflict=["id"]).execute()
    if res.error:
        raise RuntimeError(f"Supabase upsert failed: {res.error}")

    print("Done.")


if __name__ == "__main__":
    main()
