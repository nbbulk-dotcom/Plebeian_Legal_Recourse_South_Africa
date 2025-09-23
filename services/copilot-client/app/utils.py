import re
import json
from typing import Tuple


PII_PATTERNS = [
    re.compile(r"\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b"),
    re.compile(r"\b\d{13,19}\b"),
    re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"),
]


def redact_pii(text: str) -> Tuple[str, bool]:
    if not text:
        return text, False
    redacted = text
    changed = False
    for p in PII_PATTERNS:
        redacted, n = p.subn("[REDACTED]", redacted)
        if n:
            changed = True
    return redacted, changed


def normalize_prompt(prompt: str, max_len: int = 8000) -> str:
    s = " ".join(prompt.split())
    if len(s) > max_len:
        s = s[:max_len]
    return s


def safe_serialize(obj) -> str:
    try:
        return json.dumps(obj, ensure_ascii=False)
    except Exception:
        return str(obj)
