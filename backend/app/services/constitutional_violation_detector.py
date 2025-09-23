import asyncio
import json
from datetime import datetime
from typing import Any, Dict, List, Optional

from app.services.copilot_integration import CopilotIntegrationService


class ConstitutionalViolationDetector:
    def __init__(self):
        self.copilot = CopilotIntegrationService()
        self.law_categories = {
            "rental_housing": "Rental Housing and Tenant Protection Laws",
            "property": "Property Rights and Land Laws",
            "municipal": "Municipal and Local Government Laws",
            "financial": "Financial Services and Banking Laws",
            "administrative": "Administrative Justice and Public Service Laws",
        }

    async def scan_systematic_violations(self) -> Dict[str, Any]:
        all_violations = []

        for category, description in self.law_categories.items():
            category_violations = await self._scan_category_violations(category)
            all_violations.extend(category_violations)

        return {
            "total_violations_detected": len(all_violations),
            "violations_by_category": self._group_violations_by_category(
                all_violations
            ),
            "high_priority_violations": [
                v for v in all_violations if v["priority"] >= 8
            ],
            "challenge_ready_violations": [
                v for v in all_violations if v["challenge_ready"]
            ],
            "public_dashboard_data": await self._generate_dashboard_data(
                all_violations
            ),
            "scan_timestamp": datetime.now().isoformat(),
        }

    async def _scan_category_violations(self, category: str) -> List[Dict[str, Any]]:
        laws_to_scan = await self._get_laws_for_category(category)
        violations = []

        for law in laws_to_scan:
            violation_analysis = await self._analyze_law_for_violations(law, category)
            if violation_analysis["violations_found"]:
                violations.append(violation_analysis)

        return violations

    async def _get_laws_for_category(self, category: str) -> List[Dict[str, str]]:
        law_database = {
            "rental_housing": [
                {
                    "name": "Rental Housing Act 50 of 1999",
                    "text": "Rental Housing Act provisions that may conflict with constitutional property rights...",
                    "jurisdiction": "National",
                },
                {
                    "name": "Prevention of Illegal Eviction Act 19 of 1998",
                    "text": "PIE Act provisions that may create procedural barriers to property rights...",
                    "jurisdiction": "National",
                },
            ],
            "property": [
                {
                    "name": "Deeds Registries Act 47 of 1937",
                    "text": "Deeds registry provisions that may create administrative barriers...",
                    "jurisdiction": "National",
                },
                {
                    "name": "Land Restitution Act 22 of 1994",
                    "text": "Land restitution provisions that may conflict with existing property rights...",
                    "jurisdiction": "National",
                },
            ],
            "municipal": [
                {
                    "name": "Municipal Systems Act 32 of 2000",
                    "text": "Municipal systems provisions that may violate administrative justice...",
                    "jurisdiction": "National",
                },
                {
                    "name": "Municipal Property Rates Act 6 of 2004",
                    "text": "Property rates provisions that may constitute arbitrary taxation...",
                    "jurisdiction": "National",
                },
            ],
            "financial": [
                {
                    "name": "National Credit Act 34 of 2005",
                    "text": "Credit act provisions that may violate economic freedom...",
                    "jurisdiction": "National",
                },
                {
                    "name": "Banks Act 94 of 1990",
                    "text": "Banking act provisions that may create monopolistic practices...",
                    "jurisdiction": "National",
                },
            ],
            "administrative": [
                {
                    "name": "Promotion of Administrative Justice Act 3 of 2000",
                    "text": "PAJA provisions that may create procedural barriers to justice...",
                    "jurisdiction": "National",
                },
                {
                    "name": "Public Service Act 103 of 1994",
                    "text": "Public service provisions that may enable corruption...",
                    "jurisdiction": "National",
                },
            ],
        }

        return law_database.get(category, [])

    async def _analyze_law_for_violations(
        self, law: Dict[str, str], category: str
    ) -> Dict[str, Any]:
        constitutional_analysis = await self.copilot.analyze_constitutional_compliance(
            law_text=law["text"],
            constitutional_sections=[
                "Section 25 - Property Rights",
                "Section 33 - Just Administrative Action",
                "Section 9 - Equality",
                "Section 34 - Access to Courts",
                "Section 22 - Freedom of trade, occupation and profession",
            ],
        )

        if constitutional_analysis.get("violations_detected", False):
            return {
                "violations_found": True,
                "law_name": law["name"],
                "category": category,
                "jurisdiction": law["jurisdiction"],
                "violation_type": constitutional_analysis["primary_violation_type"],
                "severity": constitutional_analysis["severity"],
                "constitutional_sections_violated": constitutional_analysis[
                    "violated_sections"
                ],
                "description": constitutional_analysis["violation_description"],
                "legal_analysis": constitutional_analysis["detailed_analysis"],
                "precedent_cases": constitutional_analysis.get(
                    "relevant_precedents", []
                ),
                "priority": constitutional_analysis["challenge_priority"],
                "success_probability": constitutional_analysis[
                    "challenge_success_probability"
                ],
                "challenge_ready": constitutional_analysis[
                    "challenge_success_probability"
                ]
                > 0.7,
                "estimated_impact": constitutional_analysis["potential_impact"],
                "affected_population": constitutional_analysis.get(
                    "affected_population", "Unknown"
                ),
                "detection_timestamp": datetime.now().isoformat(),
            }

        return {"violations_found": False}

    def _group_violations_by_category(
        self, violations: List[Dict[str, Any]]
    ) -> Dict[str, int]:
        categories = {}
        for violation in violations:
            if violation.get("violations_found"):
                category = violation["category"]
                categories[category] = categories.get(category, 0) + 1
        return categories

    async def _generate_dashboard_data(
        self, violations: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        valid_violations = [v for v in violations if v.get("violations_found")]

        return {
            "total_laws_scanned": len(violations),
            "total_violations_found": len(valid_violations),
            "violations_by_severity": self._group_by_severity(valid_violations),
            "violations_by_constitutional_section": self._group_by_constitutional_section(
                valid_violations
            ),
            "challenge_ready_count": len(
                [v for v in valid_violations if v.get("challenge_ready")]
            ),
            "high_impact_violations": [
                v
                for v in valid_violations
                if "high" in v.get("estimated_impact", "").lower()
            ],
            "recent_detections": sorted(
                valid_violations, key=lambda x: x["detection_timestamp"], reverse=True
            )[:10],
        }

    def _group_by_severity(self, violations: List[Dict[str, Any]]) -> Dict[str, int]:
        severity_counts = {"low": 0, "medium": 0, "high": 0, "critical": 0}
        for violation in violations:
            severity = violation.get("severity", "medium").lower()
            if severity in severity_counts:
                severity_counts[severity] += 1
        return severity_counts

    def _group_by_constitutional_section(
        self, violations: List[Dict[str, Any]]
    ) -> Dict[str, int]:
        section_counts = {}
        for violation in violations:
            sections = violation.get("constitutional_sections_violated", [])
            for section in sections:
                section_counts[section] = section_counts.get(section, 0) + 1
        return section_counts

    async def generate_challenge_for_violation(
        self, violation_id: str
    ) -> Dict[str, Any]:
        violation = await self._get_violation_by_id(violation_id)

        if not violation:
            return {"error": "Violation not found"}

        challenge_document = await self.copilot.generate_legal_document(
            template_type="constitutional_challenge",
            case_details={
                "law_name": violation["law_name"],
                "violation_description": violation["description"],
                "constitutional_sections": violation[
                    "constitutional_sections_violated"
                ],
                "legal_analysis": violation["legal_analysis"],
                "precedent_cases": violation["precedent_cases"],
            },
        )

        return {
            "challenge_document": challenge_document,
            "violation_details": violation,
            "filing_court": "High Court (with potential Constitutional Court appeal)",
            "estimated_timeline": "12-24 months",
            "success_probability": violation["success_probability"],
            "strategic_approach": await self._generate_challenge_strategy(violation),
            "required_resources": await self._estimate_challenge_resources(violation),
        }

    async def _get_violation_by_id(self, violation_id: str) -> Optional[Dict[str, Any]]:
        return {
            "law_name": "Example Rental Housing Act Provision",
            "description": "Provision creates arbitrary barriers to property rights",
            "constitutional_sections_violated": ["Section 25", "Section 33"],
            "legal_analysis": "Detailed constitutional analysis...",
            "precedent_cases": ["Jaftha v Schoeman", "FNB v Minister of Finance"],
            "success_probability": 0.8,
        }

    async def _generate_challenge_strategy(
        self, violation: Dict[str, Any]
    ) -> List[str]:
        return [
            "Prepare comprehensive constitutional analysis",
            "Gather evidence of practical impact on affected parties",
            "Research comparative law from other constitutional democracies",
            "Engage with civil society organizations for amicus curiae support",
            "Develop alternative legislative proposals",
            "Consider interim relief applications if urgent",
        ]

    async def _estimate_challenge_resources(
        self, violation: Dict[str, Any]
    ) -> Dict[str, Any]:
        return {
            "estimated_legal_costs": "R150,000 - R300,000",
            "timeline": "12-24 months",
            "required_expertise": [
                "Constitutional law specialist",
                "Administrative law expert",
                "Subject matter expert in affected law area",
            ],
            "evidence_gathering": [
                "Impact studies on affected communities",
                "Comparative law research",
                "Expert legal opinions",
                "Statistical analysis of law's effects",
            ],
            "success_factors": [
                "Strong constitutional foundation",
                "Clear evidence of practical harm",
                "Supportive precedent cases",
                "Public interest considerations",
            ],
        }
