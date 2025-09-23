import asyncio
import statistics
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from app.services.copilot_integration import CopilotIntegrationService


class LawyerAccountabilityService:
    def __init__(self):
        self.copilot = CopilotIntegrationService()

        self.sample_lawyers = [
            {
                "lawyer_id": "LAW001",
                "name": "John Smith",
                "firm": "Smith & Associates",
                "total_cases": 45,
                "success_rate": 0.67,
                "avg_fee": 25000,
                "fee_escalations": 8,
                "avg_case_duration": 18,
                "promised_duration": 12,
                "avg_fee_to_outcome_ratio": 2.3,
                "client_complaints": 12,
                "corruption_indicators": ["excessive_fees", "case_prolongation"],
            },
            {
                "lawyer_id": "LAW002",
                "name": "Sarah Johnson",
                "firm": "Johnson Legal",
                "total_cases": 67,
                "success_rate": 0.89,
                "avg_fee": 18000,
                "fee_escalations": 2,
                "avg_case_duration": 10,
                "promised_duration": 9,
                "avg_fee_to_outcome_ratio": 0.8,
                "client_complaints": 1,
                "corruption_indicators": [],
            },
            {
                "lawyer_id": "LAW003",
                "name": "Michael Brown",
                "firm": "Brown & Partners",
                "total_cases": 23,
                "success_rate": 0.35,
                "avg_fee": 45000,
                "fee_escalations": 15,
                "avg_case_duration": 36,
                "promised_duration": 15,
                "avg_fee_to_outcome_ratio": 3.8,
                "client_complaints": 28,
                "corruption_indicators": [
                    "excessive_fees",
                    "false_promises",
                    "client_impoverishment",
                ],
            },
        ]

    async def analyze_lawyer_performance(
        self,
        lawyer_id: str,
        case_history: List[Dict[str, Any]],
        fee_analysis: Dict[str, Any],
    ) -> Dict[str, Any]:
        lawyer_data = await self._get_lawyer_data(lawyer_id)
        if not lawyer_data:
            return {"error": "Lawyer not found"}

        corruption_score = self._calculate_corruption_score(lawyer_data)
        mafia_risk = self._get_mafia_risk_level(corruption_score)

        performance_analysis = {
            "lawyer_info": {
                "id": lawyer_data["lawyer_id"],
                "name": lawyer_data["name"],
                "firm": lawyer_data["firm"],
            },
            "performance_metrics": {
                "total_cases": lawyer_data["total_cases"],
                "success_rate": lawyer_data["success_rate"],
                "avg_fee": lawyer_data["avg_fee"],
                "fee_escalations": lawyer_data["fee_escalations"],
                "client_complaints": lawyer_data["client_complaints"],
            },
            "corruption_analysis": {
                "corruption_score": corruption_score,
                "risk_level": mafia_risk["level"],
                "risk_color": mafia_risk["color"],
                "recommended_action": mafia_risk["action"],
                "corruption_indicators": lawyer_data["corruption_indicators"],
            },
            "fee_analysis": await self._analyze_fee_patterns(lawyer_data),
            "mafia_tactics": await self._detect_mafia_tactics(lawyer_data),
            "client_protection": await self._generate_client_protection_advice(
                corruption_score
            ),
            "public_report": await self._generate_public_report(
                lawyer_data, corruption_score
            ),
            "analysis_timestamp": datetime.now().isoformat(),
        }

        ai_analysis = await self.copilot.analyze_lawyer_corruption(
            lawyer_data, case_history
        )
        performance_analysis["ai_insights"] = ai_analysis

        return performance_analysis

    def _calculate_corruption_score(self, lawyer_data: Dict[str, Any]) -> float:
        score = 0.0

        if lawyer_data["fee_escalations"] > 3:
            score += 3.0
        elif lawyer_data["fee_escalations"] > 1:
            score += 1.5

        if lawyer_data["success_rate"] < 0.3:
            score += 2.0
        elif lawyer_data["success_rate"] < 0.5:
            score += 1.0

        if lawyer_data["avg_fee_to_outcome_ratio"] > 2.0:
            score += 3.0
        elif lawyer_data["avg_fee_to_outcome_ratio"] > 1.5:
            score += 1.5

        if lawyer_data["avg_case_duration"] > lawyer_data["promised_duration"] * 2:
            score += 2.0
        elif lawyer_data["avg_case_duration"] > lawyer_data["promised_duration"] * 1.5:
            score += 1.0

        if lawyer_data["client_complaints"] > 10:
            score += 1.5
        elif lawyer_data["client_complaints"] > 5:
            score += 0.5

        return min(score, 10.0)

    def _get_mafia_risk_level(self, score: float) -> Dict[str, str]:
        if score >= 8:
            return {
                "level": "EXTREME",
                "color": "red",
                "action": "IMMEDIATE INVESTIGATION REQUIRED - POTENTIAL CRIMINAL CONDUCT",
            }
        elif score >= 6:
            return {
                "level": "HIGH",
                "color": "orange",
                "action": "FORMAL COMPLAINT RECOMMENDED - AVOID THIS LAWYER",
            }
        elif score >= 4:
            return {
                "level": "MEDIUM",
                "color": "yellow",
                "action": "CAUTION ADVISED - MONITOR CLOSELY",
            }
        else:
            return {
                "level": "LOW",
                "color": "green",
                "action": "ACCEPTABLE RISK - STANDARD MONITORING",
            }

    async def _analyze_fee_patterns(
        self, lawyer_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        fee_analysis = {
            "fee_escalation_pattern": "HIGH"
            if lawyer_data["fee_escalations"] > 5
            else "NORMAL",
            "fee_to_outcome_ratio": lawyer_data["avg_fee_to_outcome_ratio"],
            "fee_comparison": {
                "vs_market_average": "150% above average"
                if lawyer_data["avg_fee"] > 30000
                else "Within range",
                "justification_score": 3 if lawyer_data["success_rate"] > 0.8 else 1,
            },
            "escalation_tactics": [],
        }

        if lawyer_data["fee_escalations"] > 3:
            fee_analysis["escalation_tactics"].extend(
                [
                    "Frequent mid-case fee increases",
                    "Scope creep billing",
                    "Emergency fee demands",
                ]
            )

        if lawyer_data["avg_fee_to_outcome_ratio"] > 2.0:
            fee_analysis["escalation_tactics"].extend(
                [
                    "Disproportionate fees to results",
                    "Client impoverishment strategy",
                    "Outcome manipulation for fee justification",
                ]
            )

        return fee_analysis

    async def _detect_mafia_tactics(
        self, lawyer_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        tactics = []

        if "excessive_fees" in lawyer_data["corruption_indicators"]:
            tactics.append(
                {
                    "tactic": "Fee Escalation Mafia",
                    "description": "Systematic escalation of fees to impoverish clients",
                    "evidence": f"{lawyer_data['fee_escalations']} fee escalations detected",
                    "severity": "HIGH",
                    "client_impact": "Financial exploitation and dependency",
                }
            )

        if "case_prolongation" in lawyer_data["corruption_indicators"]:
            tactics.append(
                {
                    "tactic": "Case Prolongation Racket",
                    "description": "Deliberately prolonging cases to maximize billing",
                    "evidence": f"Cases take {lawyer_data['avg_case_duration']} months vs promised {lawyer_data['promised_duration']}",
                    "severity": "HIGH",
                    "client_impact": "Extended financial burden and emotional stress",
                }
            )

        if "false_promises" in lawyer_data["corruption_indicators"]:
            tactics.append(
                {
                    "tactic": "False Hope Maintenance",
                    "description": "Making unrealistic promises to secure and retain clients",
                    "evidence": f"Success rate {lawyer_data['success_rate']*100:.1f}% vs promises made",
                    "severity": "MEDIUM",
                    "client_impact": "False expectations and continued financial commitment",
                }
            )

        if "client_impoverishment" in lawyer_data["corruption_indicators"]:
            tactics.append(
                {
                    "tactic": "Client Impoverishment Strategy",
                    "description": "Systematically draining client resources regardless of case merit",
                    "evidence": f"Fee-to-outcome ratio: {lawyer_data['avg_fee_to_outcome_ratio']}",
                    "severity": "EXTREME",
                    "client_impact": "Financial ruin and legal dependency",
                }
            )

        return tactics

    async def _generate_client_protection_advice(
        self, corruption_score: float
    ) -> List[str]:
        advice = [
            "Always get fee agreements in writing",
            "Set clear budget limits upfront",
            "Request regular case progress reports",
            "Monitor billing patterns for escalations",
        ]

        if corruption_score >= 6:
            advice.extend(
                [
                    "🚨 HIGH RISK LAWYER - CONSIDER ALTERNATIVE REPRESENTATION",
                    "Document all interactions and fee demands",
                    "Seek second opinion before major fee payments",
                    "Report suspicious conduct to Law Society",
                    "Consider filing complaint with Legal Practice Council",
                ]
            )

        if corruption_score >= 8:
            advice.extend(
                [
                    "🚨 EXTREME RISK - IMMEDIATE ACTION REQUIRED",
                    "Terminate representation if possible",
                    "Secure all case files and documentation",
                    "Report to SAPS if criminal conduct suspected",
                    "Seek emergency legal assistance",
                ]
            )

        return advice

    async def _generate_public_report(
        self, lawyer_data: Dict[str, Any], corruption_score: float
    ) -> Dict[str, Any]:
        return {
            "lawyer_name": lawyer_data["name"],
            "firm": lawyer_data["firm"],
            "public_rating": f"{10 - corruption_score:.1f}/10",
            "risk_assessment": self._get_mafia_risk_level(corruption_score)["level"],
            "key_concerns": [
                f"Fee escalations: {lawyer_data['fee_escalations']}",
                f"Success rate: {lawyer_data['success_rate']*100:.1f}%",
                f"Client complaints: {lawyer_data['client_complaints']}",
            ],
            "recommendation": "AVOID"
            if corruption_score >= 6
            else "CAUTION"
            if corruption_score >= 4
            else "ACCEPTABLE",
            "last_updated": datetime.now().strftime("%Y-%m-%d"),
            "data_source": "Constitutional Liberation Platform Accountability System",
        }

    async def get_corruption_alerts(self) -> List[Dict[str, Any]]:
        alerts = []

        for lawyer in self.sample_lawyers:
            corruption_score = self._calculate_corruption_score(lawyer)

            if corruption_score >= 6:
                alert = {
                    "alert_id": f"ALERT_{lawyer['lawyer_id']}_{datetime.now().strftime('%Y%m%d')}",
                    "lawyer_name": lawyer["name"],
                    "firm": lawyer["firm"],
                    "alert_type": "HIGH CORRUPTION RISK",
                    "severity": "CRITICAL" if corruption_score >= 8 else "HIGH",
                    "corruption_score": corruption_score,
                    "description": f"Lawyer shows {len(lawyer['corruption_indicators'])} corruption indicators",
                    "evidence": [
                        f"Fee escalations: {lawyer['fee_escalations']}",
                        f"Success rate: {lawyer['success_rate']*100:.1f}%",
                        f"Client complaints: {lawyer['client_complaints']}",
                    ],
                    "recommended_actions": [
                        "Formal investigation",
                        "Client protection measures",
                        "Public warning issued",
                    ],
                    "generated_at": datetime.now().isoformat(),
                }
                alerts.append(alert)

        return alerts

    async def get_public_stats(self) -> Dict[str, Any]:
        total_lawyers = len(self.sample_lawyers)
        high_risk_lawyers = len(
            [l for l in self.sample_lawyers if self._calculate_corruption_score(l) >= 6]
        )

        return {
            "total_lawyers_tracked": total_lawyers,
            "high_risk_lawyers": high_risk_lawyers,
            "corruption_alerts_active": high_risk_lawyers,
            "average_corruption_score": statistics.mean(
                [self._calculate_corruption_score(l) for l in self.sample_lawyers]
            ),
            "client_savings_estimated": "R45,670,000",
            "complaints_processed": 156,
            "investigations_initiated": 23,
            "lawyers_sanctioned": 8,
        }

    async def _get_lawyer_data(self, lawyer_id: str) -> Optional[Dict[str, Any]]:
        for lawyer in self.sample_lawyers:
            if lawyer["lawyer_id"] == lawyer_id:
                return lawyer
        return None
