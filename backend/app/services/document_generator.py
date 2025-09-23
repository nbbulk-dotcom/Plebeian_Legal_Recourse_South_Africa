import asyncio
import json
import os
import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from jinja2 import Environment, FileSystemLoader

from app.services.copilot_integration import CopilotIntegrationService


class DocumentGeneratorService:
    def __init__(self):
        self.copilot = CopilotIntegrationService()
        self.template_dir = "app/templates/documents"
        self.output_dir = "generated_documents"
        os.makedirs(self.output_dir, exist_ok=True)

        self.jinja_env = Environment(
            loader=FileSystemLoader(self.template_dir), autoescape=True
        )

        self.document_types = {
            "promissory_note": "Promissory Note Template",
            "bill_of_exchange": "Bill of Exchange Template",
            "fraud_notice": "Fraud Notice Template",
            "birth_certificate_app": "Birth Certificate Application",
            "trust_accounting_demand": "Trust Accounting Demand",
            "settlement_demand": "Settlement Demand Letter",
            "retroactive_claim": "Retroactive Claim Template",
            "debt_collector_challenge": "Debt Collector Challenge",
            "mortgage_disclosure_demand": "Mortgage Disclosure Demand",
            "urgent_eviction_application": "Urgent Eviction Application",
            "standard_eviction_application": "Standard Eviction Application",
            "criminal_charges_police": "Criminal Charges for Police",
            "criminal_charges_prosecutor": "Criminal Charges for Prosecutor",
            "criminal_charges_court": "Criminal Charges for Court",
            "constitutional_challenge": "Constitutional Challenge",
            "corruption_report": "Corruption Report",
            "utility_theft_claim": "Utility Theft Claim",
            "damages_claim": "Damages Claim",
            "asset_preservation_order": "Asset Preservation Order",
            "constitutional_damages": "Constitutional Damages Claim",
            "law_challenge": "Law Challenge",
            "statute_challenge": "Statute Challenge",
            "mandate_challenge": "Mandate Challenge",
            "bylaw_challenge": "Bylaw Challenge",
            "regulation_challenge": "Regulation Challenge",
            "directive_challenge": "Directive Challenge",
        }

    async def generate_document(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
        ai_enhancement: bool = True,
        user_id: int = None,
    ) -> Dict[str, Any]:
        document_id = str(uuid.uuid4())

        base_content = await self._generate_base_document(
            document_type, user_details, case_details
        )

        ai_enhancements = []
        legal_analysis = {}

        if ai_enhancement:
            enhanced_content = await self.copilot.enhance_document(
                base_content, document_type, case_details
            )
            base_content = enhanced_content.get("content", base_content)
            ai_enhancements = enhanced_content.get("enhancements", [])
            legal_analysis = enhanced_content.get("legal_analysis", {})

        file_path = await self._save_document(document_id, document_type, base_content)

        return {
            "document_id": document_id,
            "document_type": document_type,
            "content": base_content,
            "file_path": file_path,
            "ai_enhancements": ai_enhancements,
            "legal_analysis": legal_analysis,
            "generated_at": datetime.now(),
            "user_id": user_id,
        }

    async def _generate_base_document(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
    ) -> str:
        if document_type in ["promissory_note", "bill_of_exchange", "fraud_notice"]:
            return await self._generate_plebeian_document(
                document_type, user_details, case_details
            )
        elif document_type.startswith("criminal_charges"):
            return await self._generate_criminal_charges(
                document_type, user_details, case_details
            )
        elif document_type.endswith("_challenge"):
            return await self._generate_constitutional_challenge(
                document_type, user_details, case_details
            )
        elif "eviction" in document_type:
            return await self._generate_eviction_application(
                document_type, user_details, case_details
            )
        else:
            return await self._generate_generic_document(
                document_type, user_details, case_details
            )

    async def _generate_plebeian_document(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
    ) -> str:
        templates = {
            "promissory_note": """
PROMISSORY NOTE

Date: {date}

FOR VALUE RECEIVED, I, {debtor_name}, promise to pay to the order of {creditor_name}, the sum of R{amount} ({amount_words}) with interest at the rate of {interest_rate}% per annum.

This note is payable on demand and is secured by the constitutional authority of the creditor as a living man/woman.

Debtor Details:
Name: {debtor_name}
ID Number: {debtor_id}
Address: {debtor_address}

Creditor Details:
Name: {creditor_name}
ID Number: {creditor_id}
Address: {creditor_address}

This promissory note is issued under the authority of the Constitution of the Republic of South Africa and the Bills of Exchange Act.

_________________________
Signature of Debtor

_________________________
Signature of Creditor
""",
            "bill_of_exchange": """
BILL OF EXCHANGE

Date: {date}
Amount: R{amount}

TO: {drawee_name}
ADDRESS: {drawee_address}

PAY TO THE ORDER OF {payee_name} the sum of R{amount} ({amount_words}).

This bill is drawn under the authority of the Constitution and Bills of Exchange Act for the settlement of debt/obligation described as: {description}

Drawer: {drawer_name}
ID: {drawer_id}
Address: {drawer_address}

_________________________
Signature of Drawer
""",
            "fraud_notice": """
NOTICE OF FRAUD AND DEMAND FOR REMEDY

TO: {recipient_name}
ADDRESS: {recipient_address}

TAKE NOTICE that you are hereby notified of fraudulent conduct in relation to: {fraud_description}

PARTICULARS OF FRAUD:
{fraud_particulars}

CONSTITUTIONAL VIOLATIONS:
- Section 34: Access to Courts
- Section 33: Just Administrative Action
- Section 25: Property Rights (if applicable)

DEMAND FOR REMEDY:
You are hereby demanded to remedy this fraud within 30 days by:
{remedy_demands}

FAILURE TO REMEDY will result in:
1. Criminal charges being laid
2. Civil action for damages
3. Constitutional challenge proceedings
4. Public exposure of fraudulent conduct

Issued by: {issuer_name}
Date: {date}

_________________________
Signature
""",
        }

        template = templates.get(document_type, "")

        arrears_amount = case_details.get("arrears_amount") or 0
        context = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "creditor_name": user_details.get("full_name", ""),
            "creditor_id": user_details.get("id_number", ""),
            "creditor_address": user_details.get("address", ""),
            "debtor_name": case_details.get("parties_involved", [""])[0]
            if case_details.get("parties_involved")
            else "",
            "debtor_id": "Unknown",
            "debtor_address": "As per records",
            "drawee_name": case_details.get("parties_involved", [""])[0]
            if case_details.get("parties_involved")
            else "",
            "drawee_address": "As per records",
            "payee_name": user_details.get("full_name", ""),
            "drawer_name": user_details.get("full_name", ""),
            "drawer_id": user_details.get("id_number", ""),
            "drawer_address": user_details.get("address", ""),
            "amount": arrears_amount,
            "amount_words": self._number_to_words(arrears_amount),
            "interest_rate": "10.5",
            "description": case_details.get("description", ""),
            "fraud_description": case_details.get("description", ""),
            "fraud_particulars": case_details.get("violation_details", ""),
            "remedy_demands": "Full restitution and cessation of fraudulent conduct",
            "issuer_name": user_details.get("full_name", ""),
            "recipient_name": case_details.get("parties_involved", [""])[0]
            if case_details.get("parties_involved")
            else "",
            "recipient_address": "As per records",
        }

        return template.format(**context)

    async def _generate_criminal_charges(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
    ) -> str:
        if document_type == "criminal_charges_police":
            return f"""
CRIMINAL CHARGES FOR POLICE SUBMISSION

TO: Station Commander
SAPS {case_details.get('property_address', 'Local')} Police Station

COMPLAINANT DETAILS:
Name: {user_details.get('full_name', '')}
ID Number: {user_details.get('id_number', '')}
Address: {user_details.get('address', '')}
Contact: {user_details.get('phone', '')}

ACCUSED DETAILS:
Name: {case_details.get('parties_involved', ['Unknown'])[0]}
Address: {case_details.get('property_address', 'Unknown')}

CHARGES TO BE LAID:

1. CORRUPTION BY PUBLIC OFFICER
   Act: Prevention and Combating of Corrupt Activities Act 12 of 2004
   Section: Section 3 - Corrupt activities relating to public officers
   Particulars: {case_details.get('violation_details', 'Corruption in office')}

2. THEFT OF UTILITIES
   Act: Criminal Law (Theft)
   Particulars: Unlawful appropriation of electricity, water, and municipal services
   Value: R{case_details.get('arrears_amount') or 0}

3. EXTORTION
   Act: Criminal Law
   Particulars: Unlawful demand for money through threats and coercion

4. FRAUD
   Act: Criminal Law
   Particulars: Misrepresentation and fraudulent conduct

5. ABUSE OF OFFICE
   Act: Criminal Law
   Particulars: Abuse of public office for personal gain

EVIDENCE AVAILABLE:
- Documentary evidence of corruption
- Utility theft records
- Witness statements
- Financial records

CONSTITUTIONAL VIOLATIONS:
- Section 25: Property Rights
- Section 33: Just Administrative Action
- Section 195: Public Administration Principles

I hereby request that criminal charges be opened and investigated as a matter of urgency.

Date: {datetime.now().strftime('%Y-%m-%d')}

_________________________
Complainant Signature
"""

        elif document_type == "criminal_charges_prosecutor":
            return f"""
CRIMINAL CHARGES FOR PROSECUTOR SUBMISSION

TO: Senior Public Prosecutor
National Prosecuting Authority

RE: URGENT PROSECUTION REQUEST

CASE DETAILS:
Complainant: {user_details.get('full_name', '')}
Accused: {case_details.get('parties_involved', ['Unknown'])[0]}
Case Type: {case_details.get('case_type', 'Property Rights Violation')}

CHARGES RECOMMENDED FOR PROSECUTION:

COUNT 1: CORRUPTION BY PUBLIC OFFICER
Legislation: PRECCA Act 12 of 2004, Section 3
Maximum Penalty: 18 years imprisonment
Evidence: Documentary proof of corrupt conduct

COUNT 2: THEFT (Utilities)
Legislation: Criminal Law
Value: R{case_details.get('arrears_amount', 0)}
Evidence: Utility consumption records

COUNT 3: EXTORTION
Legislation: Criminal Law
Evidence: Threatening communications and demands

COUNT 4: FRAUD
Legislation: Criminal Law
Evidence: Misrepresentation in official documents

CONSTITUTIONAL IMPLICATIONS:
This case involves serious violations of constitutional rights including property rights (Section 25) and administrative justice (Section 33).

PUBLIC INTEREST:
High - involves public officer corruption and constitutional violations affecting property rights.

PROSECUTION RECOMMENDATION: URGENT PROSECUTION WARRANTED

Date: {datetime.now().strftime('%Y-%m-%d')}

_________________________
Complainant
"""

        else:  # criminal_charges_court
            return f"""
CRIMINAL CHARGES FOR COURT SUBMISSION

IN THE MAGISTRATE'S COURT FOR THE DISTRICT OF [DISTRICT]

CASE NO: [TO BE ALLOCATED]

THE STATE
vs
{case_details.get('parties_involved', ['ACCUSED'])[0]}

CHARGE SHEET

COUNT 1: CORRUPTION BY PUBLIC OFFICER
The accused is charged with corruption by a public officer in contravention of Section 3 of the Prevention and Combating of Corrupt Activities Act 12 of 2004.

PARTICULARS:
The accused, being a public officer, did unlawfully and intentionally accept or agree to accept gratification and/or act in a manner that constitutes corruption in relation to {case_details.get('description', 'property matters')}.

COUNT 2: THEFT
The accused is charged with theft in contravention of the Criminal Law.

PARTICULARS:
The accused did unlawfully and intentionally appropriate utilities and services valued at R{case_details.get('arrears_amount') or 0} belonging to the complainant.

COUNT 3: EXTORTION
The accused is charged with extortion in contravention of the Criminal Law.

PARTICULARS:
The accused did unlawfully demand money from the complainant through threats and coercion.

CONSTITUTIONAL VIOLATIONS:
The accused's conduct violates:
- Section 25 (Property Rights)
- Section 33 (Just Administrative Action)
- Section 195 (Public Administration Principles)

COMPLAINANT: {user_details.get('full_name', '')}
DATE: {datetime.now().strftime('%Y-%m-%d')}

_________________________
Prosecutor
"""

    async def _generate_constitutional_challenge(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
    ) -> str:
        challenge_type = (
            document_type.replace("_challenge", "").replace("_", " ").title()
        )

        return f"""
CONSTITUTIONAL CHALLENGE: {challenge_type.upper()}

IN THE CONSTITUTIONAL COURT OF SOUTH AFRICA

CASE NO: [TO BE ALLOCATED]

IN THE MATTER OF:
{user_details.get('full_name', '')} - APPLICANT

AND

THE MINISTER OF [RELEVANT MINISTRY] - FIRST RESPONDENT
THE PRESIDENT OF THE REPUBLIC OF SOUTH AFRICA - SECOND RESPONDENT

NOTICE OF MOTION

TO: The Registrar of the Constitutional Court
AND TO: The Respondents

TAKE NOTICE that the Applicant will make application to this Honourable Court on a date to be arranged for an order in the following terms:

1. DECLARING that {challenge_type} [SPECIFY LAW/STATUTE/MANDATE] is unconstitutional and invalid;

2. DECLARING that the said {challenge_type} violates the following constitutional rights:
   - Section 25: Property Rights
   - Section 33: Just Administrative Action
   - Section 34: Access to Courts
   - Section 38: Enforcement of Rights

3. SETTING ASIDE the {challenge_type} with immediate effect;

4. ORDERING the Respondents to pay the costs of this application;

5. GRANTING further and/or alternative relief.

GROUNDS FOR THE APPLICATION:

1. CONSTITUTIONAL VIOLATIONS
   The {challenge_type} violates fundamental constitutional rights as follows:
   {case_details.get('violation_details', 'Constitutional violations detailed in founding affidavit')}

2. PROPERTY RIGHTS VIOLATION (Section 25)
   The {challenge_type} unlawfully interferes with property rights without just compensation.

3. ADMINISTRATIVE JUSTICE VIOLATION (Section 33)
   The {challenge_type} fails to meet the requirements of lawful, reasonable and procedurally fair administrative action.

4. ACCESS TO COURTS (Section 34)
   The {challenge_type} impedes access to courts and fair public hearing.

5. PUBLIC INTEREST
   This challenge serves the public interest by protecting constitutional rights and ensuring government accountability.

CONSTITUTIONAL ANALYSIS:
{case_details.get('description', 'Detailed constitutional analysis provided in founding affidavit')}

RELIEF SOUGHT:
1. Declaration of constitutional invalidity
2. Setting aside of unconstitutional provisions
3. Costs order
4. Constitutional damages

APPLICANT: {user_details.get('full_name', '')}
DATE: {datetime.now().strftime('%Y-%m-%d')}

_________________________
Applicant / Attorney
"""

    async def _generate_eviction_application(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
    ) -> str:
        urgency = "URGENT" if "urgent" in document_type else "STANDARD"

        return f"""
{urgency} EVICTION APPLICATION

IN THE MAGISTRATE'S COURT FOR THE DISTRICT OF [DISTRICT]

CASE NO: [TO BE ALLOCATED]

IN THE MATTER OF:
{user_details.get('full_name', '')} - APPLICANT

AND

{case_details.get('parties_involved', ['RESPONDENT'])[0]} - FIRST RESPONDENT
THE SHERIFF OF THE COURT - SECOND RESPONDENT

NOTICE OF MOTION

TO: The Registrar of the Magistrate's Court
AND TO: The Respondents

TAKE NOTICE that the Applicant will make application to this Honourable Court {"on an urgent basis" if urgency == "URGENT" else ""} for an order in the following terms:

1. DECLARING that the First Respondent is unlawfully occupying the property situated at {case_details.get('property_address', '[PROPERTY ADDRESS]')};

2. ORDERING the eviction of the First Respondent from the said property;

3. ORDERING the First Respondent to pay rental arrears in the amount of R{case_details.get('arrears_amount') or 0};

4. ORDERING the First Respondent to pay utility arrears and theft charges;

5. ORDERING the First Respondent to pay the costs of this application;

6. GRANTING further and/or alternative relief.

GROUNDS FOR THE APPLICATION:

1. UNLAWFUL OCCUPATION
   The First Respondent is unlawfully occupying the property without right or title.

2. RENTAL ARREARS
   The First Respondent owes rental arrears of R{case_details.get('arrears_amount') or 0}.

3. UTILITY THEFT
   The First Respondent has unlawfully consumed utilities without payment.

4. CONSTITUTIONAL PROPERTY RIGHTS
   The Applicant's Section 25 property rights are being violated.

5. {"URGENCY" if urgency == "URGENT" else "STANDARD PROCEDURE"}
   {"This matter is urgent due to ongoing property rights violations and financial prejudice." if urgency == "URGENT" else "Standard eviction procedures apply."}

RELIEF SOUGHT:
1. Eviction order
2. Payment of arrears
3. Costs order
4. Constitutional damages

APPLICANT: {user_details.get('full_name', '')}
PROPERTY: {case_details.get('property_address', '[PROPERTY ADDRESS]')}
DATE: {datetime.now().strftime('%Y-%m-%d')}

_________________________
Applicant / Attorney
"""

    async def _generate_generic_document(
        self,
        document_type: str,
        user_details: Dict[str, Any],
        case_details: Dict[str, Any],
    ) -> str:
        return f"""
{self.document_types.get(document_type, document_type).upper()}

Date: {datetime.now().strftime('%Y-%m-%d')}

Applicant/Claimant: {user_details.get('full_name', '')}
ID Number: {user_details.get('id_number', '')}
Address: {user_details.get('address', '')}
Contact: {user_details.get('phone', '')}

Case Type: {case_details.get('case_type', '')}
Description: {case_details.get('description', '')}

Parties Involved: {', '.join(case_details.get('parties_involved', []))}

Property Address: {case_details.get('property_address', 'N/A')}
Amount Claimed: R{case_details.get('arrears_amount', 0)}

Violation Details:
{case_details.get('violation_details', 'Details to be provided')}

Constitutional Basis:
- Section 25: Property Rights
- Section 33: Just Administrative Action
- Section 34: Access to Courts

Relief Sought:
1. Appropriate legal remedy
2. Constitutional damages
3. Costs order
4. Further relief as the court deems fit

_________________________
Signature
"""

    def _number_to_words(self, number: float) -> str:
        if number is None or number == 0:
            return "Zero Rand"

        ones = [
            "",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
        ]
        teens = [
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
        ]
        tens = [
            "",
            "",
            "Twenty",
            "Thirty",
            "Forty",
            "Fifty",
            "Sixty",
            "Seventy",
            "Eighty",
            "Ninety",
        ]

        def convert_hundreds(n):
            result = ""
            if n >= 100:
                result += ones[n // 100] + " Hundred "
                n %= 100
            if n >= 20:
                result += tens[n // 10] + " "
                n %= 10
            elif n >= 10:
                result += teens[n - 10] + " "
                n = 0
            if n > 0:
                result += ones[n] + " "
            return result

        if number < 1000:
            return convert_hundreds(int(number)) + "Rand"
        elif number < 1000000:
            thousands = int(number // 1000)
            remainder = int(number % 1000)
            result = convert_hundreds(thousands) + "Thousand "
            if remainder > 0:
                result += convert_hundreds(remainder)
            return result + "Rand"
        else:
            return f"{number:,.0f} Rand"

    async def _save_document(
        self, document_id: str, document_type: str, content: str
    ) -> str:
        filename = f"{document_id}_{document_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        file_path = os.path.join(self.output_dir, filename)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

        return file_path
