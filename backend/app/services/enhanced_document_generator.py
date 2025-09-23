import asyncio
import json
from datetime import datetime
from typing import Any, Dict, List, Optional

from app.services.copilot_integration import CopilotIntegrationService
from app.services.document_generator import DocumentGeneratorService


class EnhancedDocumentGenerator(DocumentGeneratorService):
    def __init__(self):
        super().__init__()
        self.copilot = CopilotIntegrationService()

    async def generate_with_validation(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
        user_id: int = None,
    ) -> Dict[str, Any]:
        validation_result = await self._validate_legal_compliance(
            document_type, case_details
        )

        if not validation_result["is_compliant"]:
            return {
                "error": "Legal compliance validation failed",
                "validation_issues": validation_result["issues"],
                "recommendations": validation_result["recommendations"],
            }

        base_document = await super().generate_document(
            document_type,
            user_details,
            case_details,
            ai_enhancement=True,
            user_id=user_id,
        )

        enhanced_document = await self._enhance_with_legal_validation(
            base_document, validation_result
        )

        return enhanced_document

    async def _validate_legal_compliance(
        self, document_type: str, case_details: Dict[str, Any]
    ) -> Dict[str, Any]:
        validation_checks = {
            "constitutional_compliance": await self._check_constitutional_compliance(
                document_type, case_details
            ),
            "statutory_compliance": await self._check_statutory_compliance(
                document_type, case_details
            ),
            "procedural_compliance": await self._check_procedural_compliance(
                document_type, case_details
            ),
        }

        issues = []
        for check_type, result in validation_checks.items():
            if not result["compliant"]:
                issues.extend(result["issues"])

        return {
            "is_compliant": len(issues) == 0,
            "issues": issues,
            "recommendations": await self._generate_compliance_recommendations(issues),
            "validation_score": self._calculate_validation_score(validation_checks),
        }

    async def _check_constitutional_compliance(
        self, document_type: str, case_details: Dict[str, Any]
    ) -> Dict[str, Any]:
        constitutional_requirements = {
            "criminal_charges_police": [
                "Section 35 - Arrested persons rights",
                "Section 12 - Freedom and security",
            ],
            "criminal_charges_prosecutor": [
                "Section 35 - Arrested persons rights",
                "Section 12 - Freedom and security",
            ],
            "criminal_charges_court": [
                "Section 35 - Arrested persons rights",
                "Section 34 - Access to courts",
            ],
            "urgent_eviction_application": [
                "Section 25 - Property rights",
                "Section 26 - Housing rights",
            ],
            "constitutional_challenge": [
                "Section 2 - Supremacy of Constitution",
                "Section 172 - Powers of courts",
            ],
            "corruption_report": [
                "Section 195 - Basic values and principles governing public administration"
            ],
        }

        required_sections = constitutional_requirements.get(document_type, [])
        compliance_analysis = await self.copilot.analyze_constitutional_compliance(
            document_type=document_type,
            case_details=case_details,
            required_sections=required_sections,
        )

        return {
            "compliant": compliance_analysis.get("compliant", True),
            "issues": compliance_analysis.get("issues", []),
            "required_sections": required_sections,
        }

    async def _check_statutory_compliance(
        self, document_type: str, case_details: Dict[str, Any]
    ) -> Dict[str, Any]:
        statutory_requirements = {
            "urgent_eviction_application": ["PIE Act", "Rental Housing Act"],
            "criminal_charges_police": ["Criminal Procedure Act", "PRECCA Act"],
            "corruption_report": ["PRECCA Act", "Public Service Act"],
            "utility_theft_claim": ["Municipal Systems Act", "Criminal Law"],
        }

        required_statutes = statutory_requirements.get(document_type, [])

        return {"compliant": True, "issues": [], "required_statutes": required_statutes}

    async def _check_procedural_compliance(
        self, document_type: str, case_details: Dict[str, Any]
    ) -> Dict[str, Any]:
        procedural_requirements = {
            "urgent_eviction_application": [
                "Notice to occupiers served",
                "Municipal consultation completed",
                "Alternative accommodation considered",
            ],
            "criminal_charges_police": [
                "Sufficient evidence gathered",
                "Witness statements obtained",
                "Proper jurisdiction confirmed",
            ],
            "constitutional_challenge": [
                "Standing to challenge established",
                "Direct and substantial interest shown",
                "Alternative remedies considered",
            ],
        }

        required_procedures = procedural_requirements.get(document_type, [])

        return {
            "compliant": True,
            "issues": [],
            "required_procedures": required_procedures,
        }

    async def _generate_compliance_recommendations(
        self, issues: List[str]
    ) -> List[str]:
        if not issues:
            return ["Document meets all compliance requirements"]

        recommendations = []
        for issue in issues:
            if "constitutional" in issue.lower():
                recommendations.append("Consult with constitutional law expert")
            elif "procedural" in issue.lower():
                recommendations.append(
                    "Review procedural requirements with legal practitioner"
                )
            elif "evidence" in issue.lower():
                recommendations.append("Gather additional supporting evidence")
            else:
                recommendations.append("Seek legal review before filing")

        return recommendations

    def _calculate_validation_score(self, validation_checks: Dict[str, Any]) -> float:
        total_checks = len(validation_checks)
        passed_checks = sum(
            1 for check in validation_checks.values() if check["compliant"]
        )
        return (passed_checks / total_checks) * 10 if total_checks > 0 else 10.0

    async def _enhance_with_legal_validation(
        self, base_document: Dict[str, Any], validation_result: Dict[str, Any]
    ) -> Dict[str, Any]:
        enhanced_content = base_document["content"]

        legal_validation_notice = f"""

📋 LEGAL VALIDATION REPORT
Validation Score: {validation_result['validation_score']:.1f}/10
Compliance Status: {'✅ COMPLIANT' if validation_result['is_compliant'] else '⚠️ REQUIRES REVIEW'}

"""

        if validation_result["recommendations"]:
            legal_validation_notice += "📌 RECOMMENDATIONS:\n"
            for rec in validation_result["recommendations"]:
                legal_validation_notice += f"• {rec}\n"

        enhanced_content += legal_validation_notice

        return {
            **base_document,
            "content": enhanced_content,
            "validation_result": validation_result,
            "requires_legal_review": not validation_result["is_compliant"],
        }

    async def generate_case_package(
        self,
        package_type: str,
        case_details: Dict[str, Any],
        user_details: Dict[str, Any],
    ) -> Dict[str, Any]:
        packages = {
            "property_rights_comprehensive": [
                "criminal_charges_police",
                "criminal_charges_prosecutor",
                "criminal_charges_court",
                "urgent_eviction_application",
                "damages_claim",
                "constitutional_challenge",
            ],
            "constitutional_challenge_package": [
                "constitutional_challenge",
                "law_challenge",
                "constitutional_damages",
            ],
            "financial_liberation_package": [
                "promissory_note",
                "bill_of_exchange",
                "fraud_notice",
                "debt_collector_challenge",
            ],
        }

        document_types = packages.get(package_type, [])
        generated_documents = []

        for doc_type in document_types:
            document = await self.generate_with_validation(
                doc_type, user_details, case_details
            )
            generated_documents.append(
                {"document_type": doc_type, "document": document}
            )

        return {
            "package_type": package_type,
            "documents": generated_documents,
            "package_summary": await self._generate_package_summary(
                package_type, generated_documents
            ),
            "filing_instructions": await self._generate_filing_instructions(
                package_type
            ),
            "estimated_timeline": await self._estimate_package_timeline(package_type),
            "total_estimated_costs": await self._estimate_package_costs(package_type),
        }

    async def _generate_package_summary(
        self, package_type: str, documents: List[Dict[str, Any]]
    ) -> str:
        summaries = {
            "property_rights_comprehensive": "Complete legal package for property rights protection including criminal charges, civil remedies, and constitutional challenges.",
            "constitutional_challenge_package": "Comprehensive constitutional challenge package for systematic law reform and constitutional compliance.",
            "financial_liberation_package": "Enhanced Plebeian Tribunal documents for financial freedom and debt resolution.",
        }

        return summaries.get(package_type, "Custom legal document package")

    async def _generate_filing_instructions(self, package_type: str) -> List[str]:
        instructions = {
            "property_rights_comprehensive": [
                "1. File criminal charges with SAPS first",
                "2. Serve eviction notices on occupiers",
                "3. Submit urgent eviction application to High Court",
                "4. File constitutional challenge if administrative failures identified",
                "5. Pursue damages claim after eviction granted",
            ],
            "constitutional_challenge_package": [
                "1. File constitutional challenge in High Court",
                "2. Serve all affected parties",
                "3. Submit heads of argument within prescribed timeframes",
                "4. Prepare for constitutional hearing",
                "5. Consider appeal to Constitutional Court if necessary",
            ],
        }

        return instructions.get(
            package_type, ["Consult with legal practitioner for filing guidance"]
        )

    async def _estimate_package_timeline(self, package_type: str) -> str:
        timelines = {
            "property_rights_comprehensive": "6-18 months for complete resolution",
            "constitutional_challenge_package": "12-24 months including potential appeals",
            "financial_liberation_package": "3-6 months for debt resolution",
        }

        return timelines.get(package_type, "Timeline varies based on case complexity")

    async def _estimate_package_costs(self, package_type: str) -> str:
        costs = {
            "property_rights_comprehensive": "R75,000 - R150,000 (excluding attorney fees)",
            "constitutional_challenge_package": "R100,000 - R250,000 (excluding attorney fees)",
            "financial_liberation_package": "R15,000 - R35,000 (excluding attorney fees)",
        }

        return costs.get(package_type, "Costs vary based on case complexity")
