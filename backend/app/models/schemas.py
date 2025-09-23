from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional
from datetime import datetime
from enum import Enum

class DocumentType(str, Enum):
    PROMISSORY_NOTE = "promissory_note"
    BILL_OF_EXCHANGE = "bill_of_exchange"
    FRAUD_NOTICE = "fraud_notice"
    BIRTH_CERTIFICATE_APP = "birth_certificate_app"
    TRUST_ACCOUNTING_DEMAND = "trust_accounting_demand"
    SETTLEMENT_DEMAND = "settlement_demand"
    RETROACTIVE_CLAIM = "retroactive_claim"
    DEBT_COLLECTOR_CHALLENGE = "debt_collector_challenge"
    MORTGAGE_DISCLOSURE_DEMAND = "mortgage_disclosure_demand"
    URGENT_EVICTION_APPLICATION = "urgent_eviction_application"
    STANDARD_EVICTION_APPLICATION = "standard_eviction_application"
    CRIMINAL_CHARGES_POLICE = "criminal_charges_police"
    CRIMINAL_CHARGES_PROSECUTOR = "criminal_charges_prosecutor"
    CRIMINAL_CHARGES_COURT = "criminal_charges_court"
    CONSTITUTIONAL_CHALLENGE = "constitutional_challenge"
    CORRUPTION_REPORT = "corruption_report"
    UTILITY_THEFT_CLAIM = "utility_theft_claim"
    DAMAGES_CLAIM = "damages_claim"
    ASSET_PRESERVATION_ORDER = "asset_preservation_order"
    CONSTITUTIONAL_DAMAGES = "constitutional_damages"
    LAW_CHALLENGE = "law_challenge"
    STATUTE_CHALLENGE = "statute_challenge"
    MANDATE_CHALLENGE = "mandate_challenge"
    BYLAW_CHALLENGE = "bylaw_challenge"
    REGULATION_CHALLENGE = "regulation_challenge"
    DIRECTIVE_CHALLENGE = "directive_challenge"

class UserDetails(BaseModel):
    full_name: str
    id_number: str
    address: str
    phone: str
    email: str
    occupation: Optional[str] = None

class CaseDetails(BaseModel):
    case_type: str
    description: str
    parties_involved: List[str]
    property_address: Optional[str] = None
    rental_amount: Optional[float] = None
    arrears_amount: Optional[float] = None
    violation_details: Optional[str] = None
    evidence_files: Optional[List[str]] = None

class DocumentRequest(BaseModel):
    document_type: DocumentType
    user_details: UserDetails
    case_details: CaseDetails
    ai_enhancement: bool = True

class DocumentResponse(BaseModel):
    document_id: str
    document_type: str
    content: str
    file_path: str
    ai_enhancements: List[str]
    legal_analysis: Dict[str, Any]
    generated_at: datetime

class ConstitutionalAnalysisRequest(BaseModel):
    law_text: str
    case_context: Optional[Dict[str, Any]] = None
    focus_areas: List[str] = ["property_rights", "administrative_justice"]

class LawyerAccountabilityRequest(BaseModel):
    lawyer_id: str
    case_history: List[Dict[str, Any]]
    fee_analysis: Dict[str, Any]

class CourtFilingRequest(BaseModel):
    case_data: CaseDetails
    documents: List[str]
    court_preference: Optional[str] = None

class CaseData(BaseModel):
    case_id: str
    case_type: str
    status: str
    parties: List[str]
    documents: List[str]
    court_assigned: Optional[str] = None
    filing_date: datetime
    next_hearing: Optional[datetime] = None

class ConstitutionalViolation(BaseModel):
    violation_id: str
    section: str
    right_violated: str
    description: str
    severity_score: int = Field(ge=1, le=10)
    remedies: List[str]
    precedents: List[str]

class LawyerPerformance(BaseModel):
    lawyer_id: str
    name: str
    firm: str
    total_cases: int
    success_rate: float
    avg_fee: float
    fee_escalations: int
    corruption_score: float = Field(ge=0, le=10)
    risk_level: str
    client_complaints: int

class CourtOutcome(BaseModel):
    case_id: str
    outcome: str
    success: bool
    damages_awarded: Optional[float] = None
    costs_order: Optional[str] = None
    appeal_status: Optional[str] = None
