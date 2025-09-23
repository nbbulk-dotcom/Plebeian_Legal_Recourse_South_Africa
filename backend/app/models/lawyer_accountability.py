from sqlalchemy import (Boolean, Column, DateTime, Float, ForeignKey, Integer,
                        String, Text)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class LawyerAccountability(Base):
    __tablename__ = "lawyer_accountability"

    id = Column(Integer, primary_key=True, index=True)
    lawyer_name = Column(String(255), nullable=False)
    law_firm = Column(String(255), nullable=True)
    law_society_number = Column(String(50), unique=True, nullable=False)
    corruption_score = Column(Float, default=0.0, nullable=False)
    fee_escalation_score = Column(Float, default=0.0, nullable=False)
    client_satisfaction_score = Column(Float, default=5.0, nullable=False)
    case_success_rate = Column(Float, default=0.0, nullable=False)
    total_cases = Column(Integer, default=0, nullable=False)
    successful_cases = Column(Integer, default=0, nullable=False)
    average_case_duration = Column(Float, nullable=True)
    average_fees = Column(Float, nullable=True)
    fee_transparency_score = Column(Float, default=5.0, nullable=False)
    ethical_violations = Column(Integer, default=0, nullable=False)
    client_complaints = Column(Integer, default=0, nullable=False)
    is_flagged = Column(Boolean, default=False, nullable=False)
    risk_level = Column(String(20), default="low", nullable=False)
    notes = Column(Text, nullable=True)
    last_updated = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<LawyerAccountability(id={self.id}, lawyer='{self.lawyer_name}', score={self.corruption_score})>"


class LawyerCase(Base):
    __tablename__ = "lawyer_cases"

    id = Column(Integer, primary_key=True, index=True)
    lawyer_id = Column(Integer, ForeignKey("lawyer_accountability.id"), nullable=False)
    case_number = Column(String(100), nullable=False)
    case_type = Column(String(100), nullable=False)
    client_name = Column(String(255), nullable=False)
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=True)
    outcome = Column(String(100), nullable=True)
    fees_charged = Column(Float, nullable=True)
    fees_quoted = Column(Float, nullable=True)
    client_rating = Column(Float, nullable=True)
    case_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lawyer = relationship("LawyerAccountability")
