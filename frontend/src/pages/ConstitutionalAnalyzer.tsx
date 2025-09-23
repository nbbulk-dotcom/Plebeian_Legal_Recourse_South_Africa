import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ScaleIcon, ExclamationTriangleIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { api } from '../services/api'

interface AnalysisForm {
  law_text: string
  case_context?: string
  focus_areas: string[]
}

interface AnalysisResult {
  compliance_score: number
  violations_detected: any[]
  ai_analysis: any
  recommendations: string[]
  challenge_strategy: any
  precedents: any[]
  analysis_timestamp: string
}

const focusAreaOptions = [
  { value: 'property_rights', label: 'Property Rights (Section 25)' },
  { value: 'administrative_justice', label: 'Administrative Justice (Section 33)' },
  { value: 'access_to_courts', label: 'Access to Courts (Section 34)' },
  { value: 'public_administration', label: 'Public Administration (Section 195)' }
]

export default function ConstitutionalAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<AnalysisForm>({
    defaultValues: {
      focus_areas: ['property_rights', 'administrative_justice']
    }
  })

  const onSubmit = async (data: AnalysisForm) => {
    setIsAnalyzing(true)
    try {
      const requestData = {
        law_text: data.law_text,
        case_context: data.case_context ? { description: data.case_context } : null,
        focus_areas: data.focus_areas
      }

      const response = await api.post('/api/constitutional/analyze', requestData)
      setAnalysisResult(response.data)
      toast.success('Constitutional analysis completed!')
    } catch (error) {
      toast.error('Failed to analyze constitutional compliance')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getComplianceColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    if (score >= 4) return 'text-orange-600'
    return 'text-red-600'
  }

  const getComplianceLabel = (score: number) => {
    if (score >= 8) return 'Constitutional Compliant'
    if (score >= 6) return 'Minor Violations'
    if (score >= 4) return 'Significant Violations'
    return 'Major Constitutional Violations'
  }

  const getSeverityColor = (score: number) => {
    if (score >= 8) return 'bg-red-100 text-red-800'
    if (score >= 6) return 'bg-orange-100 text-orange-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Constitutional Compliance Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI-powered analysis of laws, regulations, and legal documents for constitutional compliance. 
            Detect violations of fundamental rights and generate challenge strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Constitutional Analysis Form</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Law Text / Legal Document *
                  </label>
                  <textarea
                    {...register('law_text', { required: 'Law text is required' })}
                    rows={8}
                    className="input-field"
                    placeholder="Paste the law, regulation, statute, or legal document text you want to analyze for constitutional compliance..."
                  />
                  {errors.law_text && (
                    <p className="mt-1 text-sm text-red-600">{errors.law_text.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Context (Optional)
                  </label>
                  <textarea
                    {...register('case_context')}
                    rows={4}
                    className="input-field"
                    placeholder="Provide additional context about your specific case or situation that relates to this law..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Constitutional Focus Areas
                  </label>
                  <div className="space-y-2">
                    {focusAreaOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option.value}
                          {...register('focus_areas')}
                          className="h-4 w-4 text-constitutional-600 focus:ring-constitutional-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Constitutional Compliance...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <ScaleIcon className="h-5 w-5 mr-2" />
                      Analyze Constitutional Compliance
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Constitutional Sections</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Section 25: Property Rights</h4>
                  <p className="text-sm text-gray-600">
                    Protection against arbitrary deprivation of property. Just and equitable compensation requirements.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Section 33: Administrative Justice</h4>
                  <p className="text-sm text-gray-600">
                    Right to lawful, reasonable and procedurally fair administrative action.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Section 34: Access to Courts</h4>
                  <p className="text-sm text-gray-600">
                    Right to fair public hearing before independent and impartial tribunal.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Section 195: Public Administration</h4>
                  <p className="text-sm text-gray-600">
                    Democratic values, professional ethics, accountability and transparency.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  <SparklesIcon className="inline h-4 w-4 mr-1" />
                  AI-Powered Analysis
                </h4>
                <p className="text-sm text-blue-700">
                  Our AI analyzes laws against constitutional principles, identifies violations, 
                  and generates strategic recommendations for challenges.
                </p>
              </div>
            </div>

            {analysisResult && (
              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getComplianceColor(analysisResult.compliance_score)}`}>
                      {analysisResult.compliance_score.toFixed(1)}/10
                    </div>
                    <div className={`text-sm font-medium ${getComplianceColor(analysisResult.compliance_score)}`}>
                      {getComplianceLabel(analysisResult.compliance_score)}
                    </div>
                  </div>

                  {analysisResult.violations_detected.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-1" />
                        Violations Detected ({analysisResult.violations_detected.length})
                      </h4>
                      <div className="space-y-2">
                        {analysisResult.violations_detected.slice(0, 3).map((violation, index) => (
                          <div key={index} className={`p-2 rounded text-xs ${getSeverityColor(violation.severity_score)}`}>
                            <div className="font-medium">{violation.section}: {violation.right}</div>
                            <div className="mt-1">{violation.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysisResult.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                        Recommendations
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisResult.recommendations.slice(0, 4).map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResult.challenge_strategy && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Challenge Strategy</h4>
                      <div className="text-sm text-gray-600">
                        <div className="mb-1">
                          <span className="font-medium">Court:</span> {analysisResult.challenge_strategy.court_strategy?.recommended_court}
                        </div>
                        <div className="mb-1">
                          <span className="font-medium">Success Probability:</span> {analysisResult.challenge_strategy.court_strategy?.success_probability}
                        </div>
                        <div>
                          <span className="font-medium">Urgency:</span> {analysisResult.challenge_strategy.court_strategy?.urgency_level}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
