from sqlalchemy import Column, Integer, Text, String, TIMESTAMP, Boolean
from sqlalchemy.sql import func
from app.db import Base


class AuditRecord(Base):
    __tablename__ = "copilot_audit"
    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(String(64), index=True, nullable=False)
    user_id = Column(String(128), index=True, nullable=True)
    doc_id = Column(String(128), index=True, nullable=True)
    prompt_redacted = Column(Text, nullable=False)
    response_redacted = Column(Text, nullable=True)
    model = Column(String(128), nullable=True)
    risk_score = Column(Integer, nullable=True)
    requires_review = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
