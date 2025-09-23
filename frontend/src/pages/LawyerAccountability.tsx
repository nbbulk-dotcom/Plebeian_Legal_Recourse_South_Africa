import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
} from '@heroicons/react/24/outline'
import { api } from '../services/api'

interface LawyerForm {
  lawyer_id: string
}

interface CorruptionAlert {
  alert_id: string
  lawyer_name: string
  firm: string
  alert_type: string
  severity: string
  corruption_score: number
  description: string
  evidence: string[]
  recommended_actions: string[]
  generated_at: string
}

interface LawyerAnalysis {
  lawyer_info: {
    id: string
    name: string
    firm: string
  }
  performance_metrics: {
    total_cases: number
    success_rate: number
    avg_fee: number
    fee_escalations: number
    client_complaints: number
  }
  corruption_analysis: {
    corruption_score: number
    risk_level: string
    risk_color: string
    recommended_action: string
    corruption_indicators: string[]
  }
  fee_analysis: any
  mafia_tactics: any[]
  client_protection: string[]
  public_report: any
}

const sampleLawyers = [
  { id: 'LAW001', name: 'John Smith', firm: 'Smith & Associates' },
  { id: 'LAW002', name: 'Sarah Johnson', firm: 'Johnson Legal' },
  { id: 'LAW003', name: 'Michael Brown', firm: 'Brown & Partners' }
]

export default function LawyerAccountability() {
  const [corruptionAlerts, setCorruptionAlerts] = useState<CorruptionAlert[]>([])
  const [lawyerAnalysis, setLawyerAnalysis] = useState<LawyerAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(true)
  
  const { register, handleSubmit, formState: { errors } } = useForm<LawyerForm>()

  useEffect(() => {
    fetchCorruptionAlerts()
  }, [])

  const fetchCorruptionAlerts = async () => {
    try {
      const response = await api.get('/api/lawyers/corruption-alerts')
      setCorruptionAlerts(response.data.alerts)
    } catch (error) {
      toast.error('Failed to load corruption alerts')
    } finally {
      setIsLoadingAlerts(false)
    }
  }

  const onSubmit = async (data: LawyerForm) => {
    setIsAnalyzing(true)
    try {
      const requestData = {
        lawyer_id: data.lawyer_id,
        case_history: [],
        fee_analysis: {}
      }

      const response = await api.post('/api/lawyers/accountability', requestData)
      setLawyerAnalysis(response.data)
      toast.success('Lawyer analysis completed!')
    } catch (error) {
      toast.error('Failed to analyze lawyer accountability')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getCorruptionScoreColor = (score: number) => {
    if (score >= 8) return 'text-red-600'
    if (score >= 6) return 'text-orange-600'
    if (score >= 4) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'extreme': return 'bg-red-100 text-red-800 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lawyer Accountability System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            0-10 corruption scoring system with fee escalation monitoring, mafia tactics detection, 
            and public transparency for lawyer accountability and client protection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analyze Lawyer Performance</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Lawyer to Analyze
                  </label>
                  <select
                    {...register('lawyer_id', { required: 'Lawyer selection is required' })}
                    className="input-field"
                  >
                    <option value="">Select a lawyer</option>
                    {sampleLawyers.map((lawyer) => (
                      <option key={lawyer.id} value={lawyer.id}>
                        {lawyer.name} - {lawyer.firm}
                      </option>
                    ))}
                  </select>
                  {errors.lawyer_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.lawyer_id.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Lawyer Performance...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <ShieldCheckIcon className="h-5 w-5 mr-2" />
                      Analyze Lawyer Accountability
                    </div>
                  )}
                </button>
              </form>
            </div>

            {lawyerAnalysis && (
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getCorruptionScoreColor(lawyerAnalysis.corruption_analysis.corruption_score)}`}>
                      {lawyerAnalysis.corruption_analysis.corruption_score.toFixed(1)}/10
                    </div>
                    <div className="text-sm font-medium text-gray-600">Corruption Score</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(lawyerAnalysis.corruption_analysis.risk_level)}`}>
                      {lawyerAnalysis.corruption_analysis.risk_level} RISK
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Risk Level</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{lawyerAnalysis.performance_metrics.total_cases}</div>
                    <div className="text-sm text-gray-600">Total Cases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{(lawyerAnalysis.performance_metrics.success_rate * 100).toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">R{lawyerAnalysis.performance_metrics.avg_fee.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Avg Fee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{lawyerAnalysis.performance_metrics.fee_escalations}</div>
                    <div className="text-sm text-gray-600">Fee Escalations</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recommended Action</h4>
                    <div className={`p-4 rounded-lg border ${getRiskLevelColor(lawyerAnalysis.corruption_analysis.risk_level)}`}>
                      {lawyerAnalysis.corruption_analysis.recommended_action}
                    </div>
                  </div>

                  {lawyerAnalysis.mafia_tactics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                        Mafia Tactics Detected
                      </h4>
                      <div className="space-y-3">
                        {lawyerAnalysis.mafia_tactics.map((tactic, index) => (
                          <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                            <div className="font-medium text-red-800">{tactic.tactic}</div>
                            <div className="text-sm text-red-700 mt-1">{tactic.description}</div>
                            <div className="text-xs text-red-600 mt-2">Evidence: {tactic.evidence}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Client Protection Advice</h4>
                    <ul className="space-y-2">
                      {lawyerAnalysis.client_protection.map((advice, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <span className="text-constitutional-600 mr-2">•</span>
                          {advice}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Corruption Scoring System</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">0-2: Low Risk</span>
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">3-5: Medium Risk</span>
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">6-7: High Risk</span>
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">8-10: Extreme Risk</span>
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Scoring Factors</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Fee escalation patterns</li>
                  <li>• Success rate vs fees charged</li>
                  <li>• Case duration vs promises</li>
                  <li>• Client complaint frequency</li>
                  <li>• Fee-to-outcome ratios</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                Active Corruption Alerts
              </h3>
              
              {isLoadingAlerts ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-constitutional-600 mx-auto"></div>
                </div>
              ) : corruptionAlerts.length > 0 ? (
                <div className="space-y-3">
                  {corruptionAlerts.map((alert) => (
                    <div key={alert.alert_id} className="border border-red-200 rounded-lg p-3 bg-red-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-red-800">{alert.lawyer_name}</div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </div>
                      </div>
                      <div className="text-sm text-red-700 mb-2">{alert.firm}</div>
                      <div className="text-sm text-red-600">{alert.description}</div>
                      <div className="text-xs text-red-500 mt-2">
                        Score: {alert.corruption_score.toFixed(1)}/10
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No active corruption alerts
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
