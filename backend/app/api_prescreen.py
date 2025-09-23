import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import AsyncSessionLocal
from app.models_prescreen import PrescreenField, PrescreenSubmission

router = APIRouter(prefix="/api/prescreen", tags=["prescreen"])


class FieldSchema(BaseModel):
    field_key: str
    label: str
    field_type: str
    required: bool = True
    meta: Optional[dict] = None


class PrescreenCreateRequest(BaseModel):
    template_key: str
    fields: List[FieldSchema]


class PrescreenFieldOut(FieldSchema):
    id: int


class PrescreenSubmissionIn(BaseModel):
    template_key: str
    request_id: Optional[str]
    user_id: Optional[int]
    data: dict


class PrescreenSubmissionOut(BaseModel):
    id: int
    request_id: str
    template_key: str
    user_id: Optional[int]
    data: dict
    status: str
    disclaimer: Optional[str]


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


@router.post("/fields", response_model=List[PrescreenFieldOut])
async def create_fields(
    payload: PrescreenCreateRequest, db: AsyncSession = Depends(get_db)
):
    rows = []
    for f in payload.fields:
        stmt = (
            insert(PrescreenField)
            .values(
                template_key=payload.template_key,
                field_key=f.field_key,
                label=f.label,
                field_type=f.field_type,
                required=f.required,
                meta=f.meta,
            )
            .returning(PrescreenField)
        )
        res = await db.execute(stmt)
        row = res.scalar_one()
        rows.append(row)
    await db.commit()
    return [
        {
            "id": r.id,
            "field_key": r.field_key,
            "label": r.label,
            "field_type": r.field_type,
            "required": r.required,
            "meta": r.meta,
        }
        for r in rows
    ]


@router.get("/fields/{template_key}", response_model=List[PrescreenFieldOut])
async def list_fields(template_key: str, db: AsyncSession = Depends(get_db)):
    q = select(PrescreenField).where(PrescreenField.template_key == template_key)
    res = await db.execute(q)
    rows = res.scalars().all()
    return [
        {
            "id": r.id,
            "field_key": r.field_key,
            "label": r.label,
            "field_type": r.field_type,
            "required": r.required,
            "meta": r.meta,
        }
        for r in rows
    ]


@router.post("/submit", response_model=PrescreenSubmissionOut)
async def submit_prescreen(
    payload: PrescreenSubmissionIn, db: AsyncSession = Depends(get_db)
):
    req_id = payload.request_id or str(uuid.uuid4())
    q = select(PrescreenField).where(
        PrescreenField.template_key == payload.template_key
    )
    res = await db.execute(q)
    fields = res.scalars().all()
    required_keys = [f.field_key for f in fields if f.required]
    missing = [
        k
        for k in required_keys
        if k not in payload.data or payload.data.get(k) in (None, "")
    ]
    if missing:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"missing_fields": missing},
        )
    disclaimer = "DRAFT: This prescreen submission will be used to populate a draft legal document and requires legal review before filing."
    stmt = (
        insert(PrescreenSubmission)
        .values(
            request_id=req_id,
            template_key=payload.template_key,
            user_id=payload.user_id,
            data=payload.data,
            status="draft",
            disclaimer=disclaimer,
        )
        .returning(PrescreenSubmission)
    )
    res2 = await db.execute(stmt)
    doc = res2.scalar_one()
    await db.commit()
    return {
        "id": doc.id,
        "request_id": doc.request_id,
        "template_key": doc.template_key,
        "user_id": doc.user_id,
        "data": doc.data,
        "status": doc.status,
        "disclaimer": doc.disclaimer,
    }


@router.get("/submission/{request_id}", response_model=PrescreenSubmissionOut)
async def get_submission(request_id: str, db: AsyncSession = Depends(get_db)):
    q = select(PrescreenSubmission).where(PrescreenSubmission.request_id == request_id)
    res = await db.execute(q)
    doc = res.scalar_one_or_none()
    if not doc:
        raise HTTPException(status_code=404, detail="submission not found")
    return {
        "id": doc.id,
        "request_id": doc.request_id,
        "template_key": doc.template_key,
        "user_id": doc.user_id,
        "data": doc.data,
        "status": doc.status,
        "disclaimer": doc.disclaimer,
    }
