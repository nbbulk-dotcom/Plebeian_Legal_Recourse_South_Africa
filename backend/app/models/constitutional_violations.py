import enum

from sqlalchemy import (Boolean, Column, DateTime, Enum, Float, Integer,
                        String, Text)
from sqlalchemy.sql import func

from app.database import Base


class ViolationType(enum.Enum):
    PROPERTY_RIGHTS = "property_rights"
    ADMINISTRATIVE_JUSTICE = "administrative_justice"
    EQUALITY = "equality"
    HUMAN_DIGNITY = "human_dignity"
    FREEDOM_OF_EXPRESSION = "freedom_of_expression"
    ACCESS_TO_COURTS = "access_to_courts"
    JUST_ADMINISTRATIVE_ACTION = "just_administrative_action"


class ViolationSeverity(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class ConstitutionalViolation(Base):
    __tablename__ = "constitutional_violations"

    id = Column(Integer, primary_key=True, index=True)
    law_name = Column(String(255), nullable=False)
    law_type = Column(String(100), nullable=False)
    violation_type = Column(Enum(ViolationType), nullable=False)
    severity = Column(Enum(ViolationSeverity), nullable=False)
    constitutional_section = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    legal_analysis = Column(Text, nullable=False)
    precedent_cases = Column(Text, nullable=True)
    challenge_priority = Column(Integer, default=5, nullable=False)
    success_probability = Column(Float, nullable=True)
    estimated_impact = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    challenge_filed = Column(Boolean, default=False, nullable=False)
    challenge_date = Column(DateTime(timezone=True), nullable=True)
    challenge_outcome = Column(String(100), nullable=True)
    detected_by = Column(String(100), default="AI_ANALYZER", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<ConstitutionalViolation(id={self.id}, law='{self.law_name}', type='{self.violation_type.value}')>"
