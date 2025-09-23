import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DocumentTextIcon, ArrowDownTrayIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { documentService } from '../services/api'

interface DocumentForm {
  document_type: string
  full_name: string
  id_number: string
  address: string
  phone: string
  email: string
  occupation?: string
  case_type: string
  description: string
  parties_involved: string
  property_address?: string
  rental_amount?: number
  arrears_amount?: number
  violation_details?: string
  ai_enhancement: boolean
}

interface DocumentTypes {
  existing_plebeian: string[]
  property_rights: string[]
  constitutional_challenges: string[]
}

export default function DocumentGenerator() {
  const [documentTypes, setDocumentTypes] = useState<DocumentTypes | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('existing_plebeian')
  const [generatedDocument, setGeneratedDocument] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<DocumentForm>({
    defaultValues: {
      ai_enhancement: true
    }
  })

  const selectedDocumentType = watch('document_type')

  useEffect(() => {
    fetchDocumentTypes()
  }, [])

  const fetchDocumentTypes = async () => {
    try {
      const response = await documentService.getDocumentTypes()
      setDocumentTypes(response)
    } catch (error) {
      toast.error('Failed to load document types')
    }
  }

  const onSubmit = async (data: DocumentForm) => {
    setIsGenerating(true)
    try {
      const response = await documentService.generateDocument({
        documentType: data.document_type,
        fullName: data.full_name,
        idNumber: data.id_number,
        address: data.address,
        phone: data.phone,
        email: data.email,
        occupation: data.occupation,
        caseType: data.case_type,
        caseDescription: data.description,
        partiesInvolved: data.parties_involved,
        propertyAddress: data.property_address,
        rentalAmount: data.rental_amount,
        arrearsAmount: data.arrears_amount,
        violationDetails: data.violation_details,
        aiEnhancement: data.ai_enhancement
      })
      setGeneratedDocument(response)
      toast.success('Document generated successfully!')
    } catch (error) {
      toast.error('Failed to generate document')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadDocument = () => {
    if (generatedDocument) {
      const blob = new Blob([generatedDocument.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${generatedDocument.document_type}_${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  if (!documentTypes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-constitutional-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Legal Document Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Generate any of our 26 legal document types completely free. No payment required, ever. 
            AI-enhanced documents with constitutional analysis and legal precedents included.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Generation Form</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('existing_plebeian')}
                      className={`p-3 text-sm font-medium rounded-lg border ${
                        selectedCategory === 'existing_plebeian'
                          ? 'bg-constitutional-50 border-constitutional-300 text-constitutional-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Plebeian Tribunal (9)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('property_rights')}
                      className={`p-3 text-sm font-medium rounded-lg border ${
                        selectedCategory === 'property_rights'
                          ? 'bg-constitutional-50 border-constitutional-300 text-constitutional-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Property Rights (11)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('constitutional_challenges')}
                      className={`p-3 text-sm font-medium rounded-lg border ${
                        selectedCategory === 'constitutional_challenges'
                          ? 'bg-constitutional-50 border-constitutional-300 text-constitutional-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Constitutional (6)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    {...register('document_type', { required: 'Document type is required' })}
                    className="input-field"
                  >
                    <option value="">Select a document type</option>
                    {documentTypes[selectedCategory as keyof DocumentTypes]?.map((type) => (
                      <option key={type} value={type}>
                        {getDocumentTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                  {errors.document_type && (
                    <p className="mt-1 text-sm text-red-600">{errors.document_type.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('full_name', { required: 'Full name is required' })}
                      className="input-field"
                      placeholder="Your full legal name"
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Number *
                    </label>
                    <input
                      type="text"
                      {...register('id_number', { required: 'ID number is required' })}
                      className="input-field"
                      placeholder="South African ID number"
                    />
                    {errors.id_number && (
                      <p className="mt-1 text-sm text-red-600">{errors.id_number.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    {...register('address', { required: 'Address is required' })}
                    rows={3}
                    className="input-field"
                    placeholder="Your full address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className="input-field"
                      placeholder="+27 XX XXX XXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Type *
                  </label>
                  <input
                    type="text"
                    {...register('case_type', { required: 'Case type is required' })}
                    className="input-field"
                    placeholder="e.g., Property Dispute, Constitutional Challenge, Corruption Case"
                  />
                  {errors.case_type && (
                    <p className="mt-1 text-sm text-red-600">{errors.case_type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Description *
                  </label>
                  <textarea
                    {...register('description', { required: 'Case description is required' })}
                    rows={4}
                    className="input-field"
                    placeholder="Detailed description of your case, including relevant facts and circumstances"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parties Involved *
                  </label>
                  <input
                    type="text"
                    {...register('parties_involved', { required: 'Parties involved is required' })}
                    className="input-field"
                    placeholder="Names of other parties (separate with commas)"
                  />
                  {errors.parties_involved && (
                    <p className="mt-1 text-sm text-red-600">{errors.parties_involved.message}</p>
                  )}
                </div>

                {(selectedCategory === 'property_rights' || selectedDocumentType?.includes('eviction')) && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Address
                      </label>
                      <input
                        type="text"
                        {...register('property_address')}
                        className="input-field"
                        placeholder="Address of the property in question"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Rental Amount (R)
                        </label>
                        <input
                          type="number"
                          {...register('rental_amount')}
                          className="input-field"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Arrears Amount (R)
                        </label>
                        <input
                          type="number"
                          {...register('arrears_amount')}
                          className="input-field"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Violation Details
                  </label>
                  <textarea
                    {...register('violation_details')}
                    rows={3}
                    className="input-field"
                    placeholder="Specific details of constitutional or legal violations (if applicable)"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('ai_enhancement')}
                    className="h-4 w-4 text-constitutional-600 focus:ring-constitutional-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    <SparklesIcon className="inline h-4 w-4 text-yellow-500 mr-1" />
                    Enable AI Enhancement (Recommended)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Document...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <DocumentTextIcon className="h-5 w-5 mr-2" />
                      Generate Free Document
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Categories</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Plebeian Tribunal (9 types)</h4>
                  <p className="text-sm text-gray-600 mb-2">Original sovereign legal documents:</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Promissory Note</li>
                    <li>• Bill of Exchange</li>
                    <li>• Fraud Notice</li>
                    <li>• Birth Certificate Application</li>
                    <li>• Trust Accounting Demand</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Property Rights (11 types)</h4>
                  <p className="text-sm text-gray-600 mb-2">Specialized property protection:</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Urgent/Standard Eviction Applications</li>
                    <li>• Criminal Charges (Police/Prosecutor/Court)</li>
                    <li>• Constitutional Challenges</li>
                    <li>• Corruption Reports</li>
                    <li>• Utility Theft Claims</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Constitutional Challenges (6 types)</h4>
                  <p className="text-sm text-gray-600 mb-2">Challenge unconstitutional laws:</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Law/Statute Challenges</li>
                    <li>• Mandate/Bylaw Challenges</li>
                    <li>• Regulation/Directive Challenges</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">✅ Completely Free</h4>
                <p className="text-sm text-green-700">
                  All documents are generated at zero cost. No payment required, ever. 
                  This platform is funded by constitutional justice principles.
                </p>
              </div>
            </div>

            {generatedDocument && (
              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Document</h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Document Type:</span>
                    <p className="text-sm text-gray-900">{getDocumentTypeLabel(generatedDocument.document_type)}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700">Document ID:</span>
                    <p className="text-sm text-gray-900 font-mono">{generatedDocument.document_id}</p>
                  </div>

                  {generatedDocument.ai_enhancements.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">AI Enhancements:</span>
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        {generatedDocument.ai_enhancements.map((enhancement: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <SparklesIcon className="h-3 w-3 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                            {enhancement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={downloadDocument}
                    className="w-full btn-primary"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                    Download Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
