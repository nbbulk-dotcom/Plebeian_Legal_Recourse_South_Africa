from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, Text, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class PrescreenField(Base):
    __tablename__ = "prescreen_fields"
    id = Column(Integer, primary_key=True)
    template_key = Column(String(256), index=True, nullable=False)
    field_key = Column(String(256), nullable=False)
    label = Column(String(512), nullable=False)
    field_type = Column(String(64), nullable=False)
    required = Column(Boolean, nullable=False, server_default="true")
    meta = Column(JSON, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)


class PrescreenSubmission(Base):
    __tablename__ = "prescreen_submissions"
    id = Column(Integer, primary_key=True)
    request_id = Column(String(64), index=True, nullable=False)
    template_key = Column(String(256), index=True, nullable=False)
    user_id = Column(Integer, nullable=True)
    data = Column(JSON, nullable=False)
    status = Column(String(50), nullable=False, server_default="draft")
    disclaimer = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "request_id": self.request_id,
            "template_key": self.template_key,
            "user_id": self.user_id,
            "data": self.data,
            "status": self.status,
            "disclaimer": self.disclaimer,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
