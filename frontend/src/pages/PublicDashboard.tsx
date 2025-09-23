import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ScaleIcon, 
  ShieldCheckIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { api } from '../services/api'

interface DashboardData {
  constitutional_violations: {
    total_violations_detected: number
    by_section: Record<string, number>
    severity_distribution: Record<string, number>
    challenge_success_rate: string
    laws_declared_invalid: number
    pending_challenges: number
  }
  lawyer_performance: {
    total_lawyers_tracked: number
    high_risk_lawyers: number
    corruption_alerts_active: number
    average_corruption_score: number
    client_savings_estimated: string
    complaints_processed: number
    investigations_initiated: number
    lawyers_sanctioned: number
  }
  case_outcomes: {
    total_cases_filed: number
    success_rate_overall: string
    by_court: Record<string, { filed: number; success_rate: string }>
    by_case_type: Record<string, { filed: number; success_rate: string }>
    average_case_duration: string
    damages_awarded_total: string
    costs_orders_obtained: string
  }
  platform_impact: {
    property_owners_protected: number
    unconstitutional_laws_challenged: number
    corrupt_lawyers_exposed: number
    legal_costs_saved: string
    citizens_educated: number
    success_rate: string
  }
}

export default function PublicDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/transparency/dashboard')
      setDashboardData(response.data)
    } catch (error) {
      console.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-constitutional-600"></div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to Load Dashboard</h2>
          <button onClick={fetchDashboardData} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Public Transparency Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Live constitutional violations tracking, case outcomes, lawyer accountability metrics, 
            and platform impact statistics for complete transparency and public oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <UserGroupIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{dashboardData.platform_impact.property_owners_protected.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Property Owners Protected</div>
          </div>
          
          <div className="card text-center">
            <ScaleIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{dashboardData.platform_impact.unconstitutional_laws_challenged}</div>
            <div className="text-sm text-gray-600">Unconstitutional Laws Challenged</div>
          </div>
          
          <div className="card text-center">
            <ShieldCheckIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{dashboardData.platform_impact.corrupt_lawyers_exposed}</div>
            <div className="text-sm text-gray-600">Corrupt Lawyers Exposed</div>
          </div>
          
          <div className="card text-center">
            <CheckCircleIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-900">{dashboardData.platform_impact.success_rate}</div>
            <div className="text-sm text-gray-600">Overall Success Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
              Constitutional Violations
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{dashboardData.constitutional_violations.total_violations_detected.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Violations Detected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dashboardData.constitutional_violations.challenge_success_rate}</div>
                <div className="text-sm text-gray-600">Challenge Success Rate</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Violations by Constitutional Section</h4>
              {Object.entries(dashboardData.constitutional_violations.by_section).map(([section, count]) => (
                <div key={section} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{section}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{dashboardData.constitutional_violations.laws_declared_invalid}</div>
                <div className="text-xs text-gray-600">Laws Declared Invalid</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{dashboardData.constitutional_violations.pending_challenges}</div>
                <div className="text-xs text-gray-600">Pending Challenges</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ShieldCheckIcon className="h-6 w-6 text-orange-500 mr-2" />
              Lawyer Accountability
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{dashboardData.lawyer_performance.total_lawyers_tracked}</div>
                <div className="text-sm text-gray-600">Lawyers Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{dashboardData.lawyer_performance.high_risk_lawyers}</div>
                <div className="text-sm text-gray-600">High Risk Lawyers</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Active Corruption Alerts</span>
                <span className="font-medium text-red-600">{dashboardData.lawyer_performance.corruption_alerts_active}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Avg Corruption Score</span>
                <span className="font-medium text-gray-900">{dashboardData.lawyer_performance.average_corruption_score.toFixed(1)}/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Client Savings</span>
                <span className="font-medium text-green-600">{dashboardData.lawyer_performance.client_savings_estimated}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{dashboardData.lawyer_performance.investigations_initiated}</div>
                <div className="text-xs text-gray-600">Investigations Initiated</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{dashboardData.lawyer_performance.lawyers_sanctioned}</div>
                <div className="text-xs text-gray-600">Lawyers Sanctioned</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ChartBarIcon className="h-6 w-6 text-blue-500 mr-2" />
              Case Outcomes
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{dashboardData.case_outcomes.total_cases_filed.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Cases Filed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{dashboardData.case_outcomes.success_rate_overall}</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Success by Case Type</h4>
              {Object.entries(dashboardData.case_outcomes.by_case_type).map(([type, data]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{type}</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{data.success_rate}</div>
                    <div className="text-xs text-gray-500">{data.filed} cases</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{dashboardData.case_outcomes.average_case_duration}</div>
                <div className="text-xs text-gray-600">Avg Duration</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{dashboardData.case_outcomes.costs_orders_obtained}</div>
                <div className="text-xs text-gray-600">Costs Orders</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-green-500 mr-2" />
              Financial Impact
            </h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{dashboardData.platform_impact.legal_costs_saved}</div>
                <div className="text-sm text-gray-600">Total Legal Costs Saved</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{dashboardData.case_outcomes.damages_awarded_total}</div>
                <div className="text-sm text-gray-600">Damages Awarded</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">Free Platform Benefits</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Zero cost document generation</li>
                  <li>• Free constitutional analysis</li>
                  <li>• No lawyer fees for basic services</li>
                  <li>• Public transparency at no charge</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{dashboardData.platform_impact.citizens_educated.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Citizens Educated</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <EyeIcon className="h-6 w-6 text-purple-500 mr-2" />
            Transparency Principles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Open Data</h4>
              <p className="text-sm text-gray-600">All statistics and case outcomes are publicly accessible</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-Time Updates</h4>
              <p className="text-sm text-gray-600">Live tracking of all platform activities and outcomes</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Accountability</h4>
              <p className="text-sm text-gray-600">Public oversight of lawyer performance and corruption</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <ScaleIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Constitutional Purity</h4>
              <p className="text-sm text-gray-600">Systematic exposure of unconstitutional laws and violations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
