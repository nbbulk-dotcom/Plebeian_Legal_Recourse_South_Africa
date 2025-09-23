from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class ReviewStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    REQUIRES_REVISION = "requires_revision"

class LegalReviewer(Base):
    __tablename__ = "legal_reviewers"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    law_society_number = Column(String(50), unique=True, nullable=False)
    specialization = Column(String(255), nullable=False)
    years_experience = Column(Integer, nullable=False)
    qualifications = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", foreign_keys=[user_id])
    approver = relationship("User", foreign_keys=[approved_by])

class DocumentTemplate(Base):
    __tablename__ = "document_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    template_name = Column(String(255), unique=True, nullable=False)
    template_type = Column(String(100), nullable=False)
    template_content = Column(Text, nullable=False)
    version = Column(String(20), nullable=False, default="1.0")
    is_active = Column(Boolean, default=False, nullable=False)
    requires_legal_review = Column(Boolean, default=True, nullable=False)
    risk_level = Column(String(20), default="medium", nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    creator = relationship("User")
    approvals = relationship("TemplateApproval", back_populates="template")

class TemplateApproval(Base):
    __tablename__ = "template_approvals"
    
    id = Column(Integer, primary_key=True, index=True)
    template_id = Column(Integer, ForeignKey("document_templates.id"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("legal_reviewers.id"), nullable=False)
    status = Column(Enum(ReviewStatus), default=ReviewStatus.PENDING, nullable=False)
    review_notes = Column(Text, nullable=True)
    legal_compliance_score = Column(Integer, nullable=True)
    constitutional_compliance = Column(Boolean, nullable=True)
    statutory_compliance = Column(Boolean, nullable=True)
    procedural_compliance = Column(Boolean, nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    template = relationship("DocumentTemplate", back_populates="approvals")
    reviewer = relationship("LegalReviewer")
