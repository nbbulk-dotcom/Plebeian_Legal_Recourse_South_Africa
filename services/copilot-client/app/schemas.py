from pydantic import BaseModel, Field
from typing import Any, Optional


class CopilotQuery(BaseModel):
    request_id: str = Field(..., min_length=8)
    user_id: Optional[str]
    doc_id: Optional[str]
    prompt: str = Field(..., min_length=5)
    context: Optional[Any]


class CopilotResponse(BaseModel):
    request_id: str
    redacted_response: str
    model: Optional[str]
    risk_score: int
    requires_review: bool
