import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROVAS_JSON = ROOT / "frontend" / "data" / "provas.json"

DOCS = {
    # Core MuleSoft concepts used throughout the question bank
    "api_led_overview": "https://docs.mulesoft.com/general/api-led-overview",
    "exchange_overview": "https://docs.mulesoft.com/exchange/",
    "exchange_publish_assets": "https://docs.mulesoft.com/exchange/about-sharing-assets",
    "exchange_publish_workflow": "https://docs.mulesoft.com/exchange/workflow-sharing-assets",
    "composer_overview": "https://docs.mulesoft.com/composer/ms_composer_overview",
    "composer_salesforce_overview": "https://docs.mulesoft.com/composer-salesforce/ms_composer_overview",
    "composer_invocable_flows": "https://docs.mulesoft.com/composer-salesforce/ms_composer_invocable_flows",
    "rpa_overview": "https://docs.mulesoft.com/rpa-home/",
    "rpa_manager_overview": "https://docs.mulesoft.com/rpa-manager/",
    "automation_credits": "https://docs.mulesoft.com/rpa-home/ms-automation-credits-2",
    "monitoring_overview": "https://docs.mulesoft.com/monitoring/",
    "monitoring_api_dashboard": "https://docs.mulesoft.com/monitoring/api-dashboard",
    "api_autodiscovery": "https://docs.mulesoft.com/mule-gateway/mule-gateway-autodiscovery-overview",
    "rate_limiting_sla_policy": "https://docs.mulesoft.com/mule-gateway/policies-included-rate-limiting-sla",
    "gateway_overview": "https://docs.mulesoft.com/mule-gateway/",
}


def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())


def _lower(s: str) -> str:
    return _norm(s).lower()


def _has(text: str, *needles: str) -> bool:
    t = _lower(text)
    return any(n.lower() in t for n in needles)


def _first_sentence(text: str, max_len: int = 120) -> str:
    t = _norm(text)
    if not t:
        return ""
    cut = re.split(r"(?<=[.!?])\s+", t, maxsplit=1)[0]
    if len(cut) <= max_len:
        return cut
    return cut[: max_len - 3].rstrip() + "..."


def build_justification(q: dict) -> str:
    module = int(q.get("modulo", 0) or 0)
    question = _norm(q.get("pergunta", ""))
    correct = _norm(q.get("correta_texto", ""))

    # Default, then specialize by module + answer type.
    clue = _first_sentence(question)
    base = (
        "This choice best matches the requirement described in the scenario "
        "and aligns with standard product capabilities and best practices."
    )

    c = _lower(correct)
    qt = _lower(question + " " + correct)

    # If the correct option is already an explanatory statement, paraphrase it into a justification.
    # Many questions in this bank use "the correct alternative probably talks about…" style.
    if correct and len(correct.split()) >= 6:
        if _has(c, "because", "violates", "ignores", "increase", "decrease", "reduces", "supports", "enables"):
            return _norm(f"{clue} Correct because {correct[0].lower() + correct[1:]}".rstrip(".") + ".")

    # Cross-module core concepts (MuleSoft + Salesforce used in this course).
    if _has(c, "mulesoft rpa") or (_has(qt, "green-screen", "legacy") and _has(c, "rpa")):
        return _norm(
            "MuleSoft RPA is the right fit when you must automate a user interface or a legacy system without usable APIs. "
            f"{clue} "
            "It operates via screen-level interactions, whereas API-based approaches require stable endpoints."
        )

    if _has(c, "mulesoft composer") or (_has(qt, "clicks", "no-code", "field mapping") and _has(c, "composer")):
        return _norm(
            "MuleSoft Composer is designed for no-code integrations using prebuilt SaaS connectors, triggers, and simple mappings. "
            f"{clue} "
            "It is typically preferred over custom code when requirements are straightforward and speed-to-delivery matters."
        )

    if _has(c, "anypoint studio") or _has(c, "studio"):
        return _norm(
            "Anypoint Studio is appropriate when the integration needs custom logic, complex transformations (DataWeave), advanced error handling, or high control over runtime behavior. "
            f"{clue}"
        )

    if _has(c, "system api"):
        return _norm(
            "In API-led connectivity, a System API abstracts the underlying system of record and provides a stable, reusable interface. "
            f"{clue} "
            "This reduces coupling and keeps back-end changes from leaking into multiple consumers."
        )

    if _has(c, "process api"):
        return _norm(
            "A Process API centralizes business logic and orchestration across one or more System APIs, enabling reuse and consistent rules. "
            f"{clue} "
            "This is the typical place for cross-system aggregation and business-level transformations."
        )

    if _has(c, "experience api"):
        return _norm(
            "An Experience API is meant to shape data for a specific consumer or channel, keeping consumer-specific needs out of lower layers. "
            f"{clue}"
        )

    if _has(c, "anypoint exchange") or _has(c, "exchange"):
        return _norm(
            "Anypoint Exchange is the catalog for discovering, publishing, and reusing assets (APIs, templates, connectors, examples) across teams. "
            f"{clue} "
            "Using Exchange supports standardization and reduces duplicated work."
        )

    if _has(c, "api manager"):
        return _norm(
            "API Manager is used to apply governance to APIs through policies, SLAs/tiers, and analytics/visibility. "
            f"{clue} "
            "This is the correct layer for enforcing controls consistently, without changing each implementation."
        )

    if _has(c, "anypoint monitoring") or _has(c, "monitoring"):
        return _norm(
            "Anypoint Monitoring provides observability (dashboards, metrics, logs, and alerts) to detect issues and measure performance across runtimes and APIs. "
            f"{clue}"
        )

    # Salesforce Flow-focused answers (used in this track even if not MuleSoft-branded).
    if _has(c, "screen flow"):
        return _norm(
            "Screen Flows are built for guided, interactive user experiences where users must enter or confirm data. "
            f"{clue} "
            "Background flows are better when no UI is needed."
        )

    if _has(c, "record-triggered flow"):
        return _norm(
            "Record-Triggered Flows run automatically when a record is created or updated, with no user interaction required. "
            f"{clue} "
            "They are the right choice for immediate, event-driven automation on data changes."
        )

    if _has(c, "autolaunched flow"):
        return _norm(
            "Autolaunched Flows are reusable background flows that can be invoked from Apex, other flows (subflows), or orchestrations, and they do not require a UI. "
            f"{clue}"
        )

    if _has(c, "external services"):
        return _norm(
            "External Services lets a Flow call an external API declaratively from an API specification, avoiding hand-written callout code. "
            f"{clue}"
        )

    if _has(c, "http callout"):
        return _norm(
            "An HTTP Callout in Flow is appropriate when you need to invoke a simple endpoint directly from Flow, especially when no formal API specification is available. "
            f"{clue}"
        )

    if _has(c, "subflows"):
        return _norm(
            "Subflows allow you to encapsulate and reuse logic across multiple flows, reducing duplication and simplifying maintenance. "
            f"{clue}"
        )

    if _has(c, "flow orchestration"):
        return _norm(
            "Flow Orchestration is designed to coordinate multi-step, multi-user processes with stages, assignments, and visibility into progress. "
            f"{clue}"
        )

    # Common answer-phrases that are short but need a real explanation.
    if _has(c, "for each") and module == 3:
        return _norm(
            "In MuleSoft Composer, a For Each loop is used to iterate over a collection and execute the configured actions for every item. "
            f"{clue}"
        )

    if _has(c, "analysis dashboard") and module == 2:
        return _norm(
            "MuleSoft RPA Manager provides analytics dashboards to track ROI, time savings, and operational impact across automations. "
            f"{clue}"
        )

    if _has(c, "rate limiting") or _has(qt, "thousand", "thousands", "burst", "spike"):
        return _norm(
            "To protect downstream systems from spikes, you typically enforce throttling/rate limits via API management policies and scale capacity when needed. "
            f"{clue}"
        )

    if _has(c, "orchestration") or _has(qt, "stage", "work item", "work guide"):
        return _norm(
            "Orchestration concepts focus on coordinating stages/steps, pausing for human or external events, and providing visibility into progress. "
            f"{clue}"
        )

    if module == 2 and _has(qt, "lifecycle", "evaluation", "design", "build", "test", "production"):
        return _norm(
            "MuleSoft RPA follows a structured lifecycle from evaluation and design through build, test, and production. "
            f"{clue} The correct sequence reflects that progression."
        )

    # Module-specific fallback improvements.
    if module == 6 and _has(qt, "policy", "rate limit", "client id", "sla", "throttl"):
        return _norm(
            "The correct option is the one that applies governance consistently at the API management layer using policies and tiers. "
            f"{clue}"
        )

    if module == 7 and _has(qt, "publish", "version", "asset", "reuse", "catalog"):
        return _norm(
            "The correct option is the one that publishes and catalogs reusable integration assets for discovery and controlled reuse across teams. "
            f"{clue}"
        )

    if module == 5 and _has(qt, "dataweave", "transform", "batch", "high volume", "millions"):
        return _norm(
            "The correct option matches a scalable integration approach for complex transformation and higher volumes, rather than UI automation or lightweight no-code flows. "
            f"{clue}"
        )

    # Last-resort: ground the justification in the chosen answer, without being verbose.
    if correct and len(correct.split()) <= 6:
        return _norm(f"{clue} The correct choice is {correct} because it best fits the stated requirement and constraints.")

    if correct and len(correct.split()) > 6:
        # Many answers are effectively the "why" in one sentence; keep it as the justification with minimal framing.
        return _norm(f"{clue} {correct}. This is the best match for the scenario's constraints and intent.")

    return base


def infer_refs(q: dict) -> list[str]:
    module = int(q.get("modulo", 0) or 0)
    question = _lower(q.get("pergunta", ""))
    correct = _lower(q.get("correta_texto", ""))
    blob = f"{question} {correct}"

    refs: list[str] = []

    # Module anchors
    if module in (1, 5):
        refs.append(DOCS["api_led_overview"])
    if module == 2 or _has(blob, "rpa", "bot", "builder", "recorder"):
        refs.append(DOCS["rpa_overview"])
        refs.append(DOCS["rpa_manager_overview"])
    if module == 3 or _has(blob, "composer", "flow", "run history", "test mode", "connector"):
        refs.append(DOCS["composer_overview"])
        refs.append(DOCS["composer_salesforce_overview"])
    if module == 6 or _has(blob, "api manager", "policy", "autodiscovery", "rate limiting", "throttl", "client id"):
        refs.append(DOCS["gateway_overview"])
        refs.append(DOCS["api_autodiscovery"])
        refs.append(DOCS["rate_limiting_sla_policy"])
    if module == 7 or _has(blob, "exchange", "asset", "publish", "version", "reuse", "mocking"):
        refs.append(DOCS["exchange_overview"])
        refs.append(DOCS["exchange_publish_assets"])
        refs.append(DOCS["exchange_publish_workflow"])
    if _has(blob, "monitoring", "dashboard", "log search", "alerts", "observability"):
        refs.append(DOCS["monitoring_overview"])
        refs.append(DOCS["monitoring_api_dashboard"])
    if _has(blob, "system api", "process api", "experience api", "api-led"):
        refs.append(DOCS["api_led_overview"])

    # Salesforce Flow Orchestration questions in this track: MuleSoft docs cover Composer invocation + credits.
    if module in (4, 8) or _has(blob, "flow orchestration", "work item", "work guide", "stage", "orchestration"):
        refs.append(DOCS["composer_invocable_flows"])
        refs.append(DOCS["automation_credits"])

    # De-dup while preserving order
    seen = set()
    out: list[str] = []
    for r in refs:
        if r and r not in seen:
            seen.add(r)
            out.append(r)
    return out


def main() -> int:
    provas = json.loads(PROVAS_JSON.read_text(encoding="utf-8"))
    changed = 0
    fallbacks = 0

    for q in provas:
        old = _norm(q.get("justificativa", ""))
        refs = infer_refs(q)
        q["refs"] = refs

        new = build_justification(q)

        # If a previous run appended "References:" inside justificativa, strip it now.
        new = re.sub(r"\s*References:\s*.+$", "", new, flags=re.IGNORECASE).strip()
        if new == (
            "This choice best matches the requirement described in the scenario "
            "and aligns with standard product capabilities and best practices."
        ):
            fallbacks += 1
        if old != new:
            q["justificativa"] = new
            changed += 1

    PROVAS_JSON.write_text(json.dumps(provas, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Updated justifications: {changed}/{len(provas)}")
    print(f"Fallback (generic) justifications: {fallbacks}/{len(provas)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
