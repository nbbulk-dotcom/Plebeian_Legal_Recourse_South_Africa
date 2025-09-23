import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { 
  MagnifyingGlassIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
  ScaleIcon
} from '@heroicons/react/24/outline'
import { api } from '../services/api'

interface TrackingForm {
  case_id: string
}

interface CaseTracking {
  case_id: string
  case_number: string
  status: string
  court: string
  filing_date: string
  next_hearing?: string
  progress: Array<{
    stage: string
    completed: boolean
    date: string
  }>
  recent_updates: string[]
  success_prediction: string
  estimated_completion: string
  required_actions: string[]
}

const sampleCases = [
  { id: 'CASE_A1B2C3D4', type: 'Property Rights Violation', status: 'Active' },
  { id: 'CASE_E5F6G7H8', type: 'Constitutional Challenge', status: 'Filed' },
  { id: 'CASE_I9J0K1L2', type: 'Corruption Case', status: 'Under Review' }
]

export default function CaseTracker() {
  const [caseTracking, setCaseTracking] = useState<CaseTracking | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<TrackingForm>()

  const onSubmit = async (data: TrackingForm) => {
    setIsTracking(true)
    try {
      const response = await api.get(`/api/courts/track/${data.case_id}`)
      setCaseTracking(response.data)
      toast.success('Case tracking information retrieved!')
    } catch (error) {
      toast.error('Failed to retrieve case tracking information')
    } finally {
      setIsTracking(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'filed': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressIcon = (completed: boolean) => {
    return completed ? (
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
    ) : (
      <ClockIcon className="h-5 w-5 text-gray-400" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Court Case Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your cases across all court levels with real-time updates, progress monitoring, 
            and success predictions powered by AI analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Case</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case ID or Case Number
                  </label>
                  <input
                    type="text"
                    {...register('case_id', { required: 'Case ID is required' })}
                    className="input-field"
                    placeholder="Enter your case ID (e.g., CASE_A1B2C3D4)"
                  />
                  {errors.case_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.case_id.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    You can find your case ID in the confirmation email or document you received when filing.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isTracking}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTracking ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Tracking Case...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                      Track Case
                    </div>
                  )}
                </button>
              </form>
            </div>

            {caseTracking && (
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Case Tracking Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Case Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Case ID:</span> {caseTracking.case_id}</div>
                      <div><span className="font-medium">Case Number:</span> {caseTracking.case_number}</div>
                      <div><span className="font-medium">Court:</span> {caseTracking.court}</div>
                      <div><span className="font-medium">Filing Date:</span> {new Date(caseTracking.filing_date).toLocaleDateString()}</div>
                      {caseTracking.next_hearing && (
                        <div><span className="font-medium">Next Hearing:</span> {new Date(caseTracking.next_hearing).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Status & Predictions</h4>
                    <div className="space-y-2">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseTracking.status)}`}>
                        {caseTracking.status}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Success Prediction:</span> {caseTracking.success_prediction}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Est. Completion:</span> {new Date(caseTracking.estimated_completion).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Case Progress</h4>
                    <div className="space-y-3">
                      {caseTracking.progress.map((stage, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {getProgressIcon(stage.completed)}
                          <div className="flex-1">
                            <div className={`font-medium ${stage.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {stage.stage}
                            </div>
                            <div className="text-sm text-gray-500">
                              {stage.completed ? `Completed: ${stage.date}` : 'Pending'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recent Updates</h4>
                    <ul className="space-y-2">
                      {caseTracking.recent_updates.map((update, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <span className="text-constitutional-600 mr-2">•</span>
                          {update}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {caseTracking.required_actions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <ExclamationCircleIcon className="h-5 w-5 text-orange-500 mr-2" />
                        Required Actions
                      </h4>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <ul className="space-y-2">
                          {caseTracking.required_actions.map((action, index) => (
                            <li key={index} className="flex items-start text-sm text-orange-800">
                              <span className="text-orange-600 mr-2">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Case IDs</h3>
              
              <div className="space-y-3">
                {sampleCases.map((case_item) => (
                  <div key={case_item.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium text-gray-900">{case_item.id}</div>
                    <div className="text-sm text-gray-600">{case_item.type}</div>
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getStatusColor(case_item.status)}`}>
                      {case_item.status}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">How to Track</h4>
                <p className="text-sm text-blue-700">
                  Enter your case ID above to get real-time tracking information, 
                  progress updates, and required actions for your case.
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Court System Coverage</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ScaleIcon className="h-5 w-5 text-constitutional-600" />
                  <div>
                    <div className="font-medium text-gray-900">Magistrate's Court</div>
                    <div className="text-sm text-gray-600">Civil claims, evictions, criminal matters</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ScaleIcon className="h-5 w-5 text-constitutional-600" />
                  <div>
                    <div className="font-medium text-gray-900">High Court</div>
                    <div className="text-sm text-gray-600">Constitutional matters, appeals, urgent applications</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ScaleIcon className="h-5 w-5 text-constitutional-600" />
                  <div>
                    <div className="font-medium text-gray-900">Constitutional Court</div>
                    <div className="text-sm text-gray-600">Constitutional challenges, direct access</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  <DocumentTextIcon className="inline h-4 w-4 mr-1" />
                  Automated Filing
                </h4>
                <p className="text-sm text-green-700">
                  Our system automatically selects the optimal court based on your case type 
                  and handles filing procedures across all court levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
