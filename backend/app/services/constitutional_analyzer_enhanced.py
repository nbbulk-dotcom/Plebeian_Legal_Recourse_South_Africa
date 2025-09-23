from typing import Dict, List, Any, Optional
import asyncio
import json
from datetime import datetime
from app.services.copilot_integration import CopilotIntegrationService

class ConstitutionalAnalyzerEnhanced:
    def __init__(self):
        self.copilot = CopilotIntegrationService()
        self.constitutional_sections = {
            "section_25": "Property Rights",
            "section_33": "Just Administrative Action", 
            "section_9": "Equality",
            "section_10": "Human Dignity",
            "section_16": "Freedom of Expression",
            "section_34": "Access to Courts",
            "section_1": "Founding Values"
        }
        
    async def analyze_systematic_violations(self, law_categories: List[str]) -> Dict[str, Any]:
        violations = []
        
        for category in law_categories:
            category_violations = await self._analyze_law_category(category)
            violations.extend(category_violations)
            
        return {
            "total_violations": len(violations),
            "violations_by_category": self._group_by_category(violations),
            "high_priority_violations": [v for v in violations if v["priority"] >= 8],
            "constitutional_challenges_ready": [v for v in violations if v["challenge_ready"]],
            "analysis_timestamp": datetime.now().isoformat()
        }
    
    async def _analyze_law_category(self, category: str) -> List[Dict[str, Any]]:
        law_texts = await self._get_laws_by_category(category)
        violations = []
        
        for law in law_texts:
            analysis = await self.copilot.analyze_constitutional_compliance(
                law_text=law["text"],
                constitutional_sections=list(self.constitutional_sections.keys())
            )
            
            if analysis.get("violations_detected"):
                violations.append({
                    "law_name": law["name"],
                    "category": category,
                    "violations": analysis["violations"],
                    "severity": analysis["severity"],
                    "constitutional_sections": analysis["affected_sections"],
                    "priority": analysis["challenge_priority"],
                    "challenge_ready": analysis["success_probability"] > 0.7,
                    "legal_analysis": analysis["detailed_analysis"]
                })
                
        return violations
    
    async def _get_laws_by_category(self, category: str) -> List[Dict[str, str]]:
        law_database = {
            "rental_housing": [
                {"name": "Rental Housing Act", "text": "Rental Housing Act provisions..."},
                {"name": "PIE Act", "text": "Prevention of Illegal Eviction Act provisions..."}
            ],
            "property": [
                {"name": "Property Law", "text": "Property law provisions..."},
                {"name": "Deeds Registry Act", "text": "Deeds registry provisions..."}
            ],
            "municipal": [
                {"name": "Municipal Systems Act", "text": "Municipal systems provisions..."},
                {"name": "Municipal Finance Management Act", "text": "Municipal finance provisions..."}
            ],
            "financial": [
                {"name": "National Credit Act", "text": "Credit act provisions..."},
                {"name": "Banks Act", "text": "Banking act provisions..."}
            ],
            "administrative": [
                {"name": "PAJA", "text": "Promotion of Administrative Justice Act provisions..."},
                {"name": "Public Service Act", "text": "Public service provisions..."}
            ]
        }
        
        return law_database.get(category, [])
    
    def _group_by_category(self, violations: List[Dict[str, Any]]) -> Dict[str, int]:
        categories = {}
        for violation in violations:
            category = violation["category"]
            categories[category] = categories.get(category, 0) + 1
        return categories
    
    async def generate_constitutional_challenge(self, violation: Dict[str, Any]) -> Dict[str, Any]:
        challenge_document = await self.copilot.generate_legal_document(
            template_type="constitutional_challenge",
            case_details={
                "law_name": violation["law_name"],
                "constitutional_sections": violation["constitutional_sections"],
                "legal_analysis": violation["legal_analysis"],
                "precedent_cases": await self._find_precedent_cases(violation)
            }
        )
        
        return {
            "challenge_document": challenge_document,
            "filing_court": "Constitutional Court",
            "estimated_timeline": "6-12 months",
            "success_probability": violation.get("success_probability", 0.8),
            "required_evidence": await self._identify_required_evidence(violation),
            "strategic_recommendations": await self._generate_strategy(violation)
        }
    
    async def _find_precedent_cases(self, violation: Dict[str, Any]) -> List[str]:
        return [
            "Government of RSA v Grootboom 2001 (1) SA 46 (CC)",
            "Jaftha v Schoeman 2005 (2) SA 140 (CC)",
            "Port Elizabeth Municipality v Various Occupiers 2005 (1) SA 217 (CC)"
        ]
    
    async def _identify_required_evidence(self, violation: Dict[str, Any]) -> List[str]:
        return [
            "Constitutional analysis report",
            "Legal precedent research",
            "Impact assessment on affected parties",
            "Expert legal opinions",
            "Comparative law analysis"
        ]
    
    async def _generate_strategy(self, violation: Dict[str, Any]) -> List[str]:
        return [
            "File urgent interdict to prevent immediate harm",
            "Gather comprehensive evidence of constitutional violations",
            "Engage with affected communities for impact statements",
            "Prepare detailed heads of argument",
            "Consider class action if multiple parties affected"
        ]
