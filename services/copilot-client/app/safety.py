from typing import Dict


def simple_risk_classifier(prompt: str, response: str | None) -> Dict[str, int]:
    score = 0
    lower = (prompt or "").lower()
    if "file for eviction" in lower or "serve summons" in lower:
        score += 60
    if "represent in court" in lower:
        score += 40
    if response and len(response) > 4000:
        score += 10
    return {"risk_score": min(100, score), "requires_review": score >= 40}
