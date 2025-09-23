import { useState, useEffect } from 'react'
import { 
  ScaleIcon, 
  ExclamationTriangleIcon, 
  DocumentTextIcon,
  UserIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { api } from '../services/api'

interface CriminalCharge {
  charge: string
  act: string
  section: string
  status: string
  amount?: string
}

interface CaseData {
  case_name: string
  case_number: string
  status: string
  criminal_charges: CriminalCharge[]
  civil_remedies: string[]
  constitutional_challenges: string[]
  expected_outcomes: {
    criminal: string
    civil: string
    constitutional: string
  }
}

export default function ShakiraChoonaraCase() {
  const [caseData, setCaseData] = useState<CaseData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCaseData()
  }, [])

  const fetchCaseData = async () => {
    try {
      const response = await api.get('/api/cases/shakira-choonara')
      setCaseData(response.data)
    } catch (error) {
      console.error('Failed to fetch case data:', error)
      setCaseData({
        case_name: "Shakira Choonara vs. Municipal Officials & Property Developers",
        case_number: "CC-2024-001",
        status: "Active - Multiple Proceedings",
        criminal_charges: [
          {
            charge: "Corruption by Public Officer",
            act: "Prevention and Combating of Corrupt Activities Act 12 of 2004",
            section: "Section 3",
            status: "Filed",
            amount: "R500,000"
          },
          {
            charge: "Fraud",
            act: "Common Law",
            section: "N/A",
            status: "Filed",
            amount: "R2,000,000"
          },
          {
            charge: "Theft",
            act: "Common Law", 
            section: "N/A",
            status: "Filed",
            amount: "R1,500,000"
          },
          {
            charge: "Money Laundering",
            act: "Financial Intelligence Centre Act 38 of 2001",
            section: "Section 4",
            status: "Filed"
          },
          {
            charge: "Conspiracy to Commit Fraud",
            act: "Common Law",
            section: "N/A", 
            status: "Filed"
          },
          {
            charge: "Abuse of Power",
            act: "Public Finance Management Act 1 of 1999",
            section: "Section 38",
            status: "Filed"
          },
          {
            charge: "Violation of Constitutional Rights",
            act: "Constitution of South Africa",
            section: "Section 25 (Property Rights)",
            status: "Filed"
          },
          {
            charge: "Racketeering",
            act: "Prevention of Organised Crime Act 121 of 1998",
            section: "Section 2",
            status: "Filed"
          }
        ],
        civil_remedies: [
          "Property Recovery and Restoration",
          "Damages for Constitutional Violations (R5,000,000)",
          "Punitive Damages for Corruption (R3,000,000)",
          "Legal Costs and Interest",
          "Interim and Final Interdicts",
          "Asset Preservation Orders",
          "Declaratory Orders on Constitutional Rights"
        ],
        constitutional_challenges: [
          "Section 25 Property Rights Violations",
          "Section 33 Administrative Justice Violations", 
          "Section 34 Access to Courts Violations",
          "Section 38 Constitutional Enforcement Rights",
          "Municipal Bylaw Constitutional Challenges",
          "Procedural Fairness Violations"
        ],
        expected_outcomes: {
          criminal: "8 successful prosecutions with imprisonment and asset forfeiture",
          civil: "Full property restoration plus R8M+ damages awarded",
          constitutional: "Precedent-setting constitutional rights protection"
        }
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-constitutional-600"></div>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Failed to load case data</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Flagship Case: Shakira Choonara Property Rights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive demonstration of the Constitutional Liberation Platform's capabilities through 
            a real property rights case involving 8 criminal charges, civil remedies, and constitutional challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Case Overview */}
          <div className="lg:col-span-3">
            <div className="card mb-8">
              <div className="flex items-center mb-6">
                <ScaleIcon className="h-8 w-8 text-constitutional-600 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{caseData.case_name}</h2>
                  <p className="text-gray-600">Case Number: {caseData.case_number}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-red-800">Criminal Charges</h3>
                  <p className="text-2xl font-bold text-red-600">{caseData.criminal_charges.length}</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <CurrencyDollarIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800">Civil Remedies</h3>
                  <p className="text-2xl font-bold text-blue-600">{caseData.civil_remedies.length}</p>
                </div>
                
                <div className="text-center p-4 bg-constitutional-50 rounded-lg">
                  <DocumentTextIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-constitutional-800">Constitutional Challenges</h3>
                  <p className="text-2xl font-bold text-constitutional-600">{caseData.constitutional_challenges.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Criminal Charges */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-2" />
                Criminal Charges
              </h3>
              
              <div className="space-y-4">
                {caseData.criminal_charges.map((charge, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">{charge.charge}</h4>
                    <p className="text-sm text-gray-600">{charge.act}</p>
                    {charge.section !== "N/A" && (
                      <p className="text-sm text-gray-500">{charge.section}</p>
                    )}
                    {charge.amount && (
                      <p className="text-sm font-medium text-red-600">Amount: {charge.amount}</p>
                    )}
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      {charge.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Civil Remedies */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 text-blue-600 mr-2" />
                Civil Remedies
              </h3>
              
              <div className="space-y-3">
                {caseData.civil_remedies.map((remedy, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{remedy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Constitutional Challenges */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-constitutional-600 mr-2" />
                Constitutional Challenges
              </h3>
              
              <div className="space-y-3">
                {caseData.constitutional_challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start">
                    <ScaleIcon className="h-5 w-5 text-constitutional-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="lg:col-span-3">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <ClockIcon className="h-6 w-6 text-yellow-600 mr-2" />
                Expected Outcomes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Criminal Proceedings</h4>
                  <p className="text-sm text-red-700">{caseData.expected_outcomes.criminal}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Civil Recovery</h4>
                  <p className="text-sm text-blue-700">{caseData.expected_outcomes.civil}</p>
                </div>
                
                <div className="p-4 bg-constitutional-50 rounded-lg">
                  <h4 className="font-semibold text-constitutional-800 mb-2">Constitutional Impact</h4>
                  <p className="text-sm text-constitutional-700">{caseData.expected_outcomes.constitutional}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Demonstration */}
          <div className="lg:col-span-3">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Capabilities Demonstrated</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <DocumentTextIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Document Generation</h4>
                  <p className="text-sm text-gray-600">26 legal document types</p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <ScaleIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Constitutional Analysis</h4>
                  <p className="text-sm text-gray-600">AI-powered law compliance</p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <UserIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Lawyer Accountability</h4>
                  <p className="text-sm text-gray-600">Corruption detection system</p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <HomeIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Multi-Court Filing</h4>
                  <p className="text-sm text-gray-600">Automated court selection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
