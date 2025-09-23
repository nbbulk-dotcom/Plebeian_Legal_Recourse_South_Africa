from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db import AsyncSessionLocal
from app.models import AuditRecord

router = APIRouter(prefix="/review", tags=["review"])


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


@router.get("/pending")
async def list_pending(db: AsyncSession = Depends(get_db)):
    q = select(AuditRecord).where(AuditRecord.requires_review == True)
    res = await db.execute(q)
    rows = res.scalars().all()
    return [{"id": r.id, "request_id": r.request_id, "prompt": r.prompt_redacted, "risk_score": r.risk_score} for r in rows]


@router.post("/approve/{audit_id}")
async def approve(audit_id: int, db: AsyncSession = Depends(get_db)):
    q = update(AuditRecord).where(AuditRecord.id == audit_id).values(requires_review=False)
    await db.execute(q)
    await db.commit()
    return {"status": "approved"}
