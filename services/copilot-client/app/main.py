import uuid
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import CopilotQuery, CopilotResponse
from app.utils import redact_pii, normalize_prompt, safe_serialize
from app.coproxy import CopilotProxy
from app.safety import simple_risk_classifier
from app.db import AsyncSessionLocal
from app.models import AuditRecord
from app.config import settings

app = FastAPI(title="Copilot Client Proxy")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

proxy = CopilotProxy()


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/query", response_model=CopilotResponse)
async def query_copilot(payload: CopilotQuery, db: AsyncSession = Depends(get_db)):
    if not settings.AI_ENABLED:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="AI features disabled")

    prompt = normalize_prompt(payload.prompt)
    redacted_prompt, _ = redact_pii(prompt)
    req_id = payload.request_id or str(uuid.uuid4())

    out = {"request_id": req_id, "redacted_response": "", "model": None, "risk_score": 0, "requires_review": True}

    try:
        response_json = await proxy.call("/v1/query", {"prompt": redacted_prompt, "context": payload.context})
        model_text = safe_serialize(response_json.get("result") or response_json)
        risk = simple_risk_classifier(redacted_prompt, model_text)
        out.update({"redacted_response": model_text[:16000], "model": response_json.get("model"), "risk_score": risk["risk_score"], "requires_review": risk["requires_review"]})
        record = AuditRecord(
            request_id=req_id,
            user_id=payload.user_id,
            doc_id=payload.doc_id,
            prompt_redacted=redacted_prompt,
            response_redacted=out["redacted_response"],
            model=out["model"],
            risk_score=out["risk_score"],
            requires_review=out["requires_review"],
        )
        db.add(record)
        await db.commit()
        return out
    except Exception:
        raise HTTPException(status_code=500, detail="Internal copilot proxy error")
