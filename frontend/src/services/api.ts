import axios from 'axios'

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const documentService = {
  generateDocument: async (data: any) => {
    const requestData = {
      document_type: data.documentType,
      user_details: {
        full_name: data.fullName,
        id_number: data.idNumber,
        address: data.address,
        phone: data.phone,
        email: data.email,
        occupation: data.occupation || null
      },
      case_details: {
        case_type: data.caseType,
        description: data.caseDescription,
        parties_involved: data.partiesInvolved ? data.partiesInvolved.split(',').map((p: string) => p.trim()) : [],
        property_address: data.propertyAddress || null,
        rental_amount: data.rentalAmount ? parseFloat(data.rentalAmount) : null,
        arrears_amount: data.arrearsAmount ? parseFloat(data.arrearsAmount) : null,
        violation_details: data.violationDetails || null,
        evidence_files: data.evidenceFiles || []
      },
      ai_enhancement: data.aiEnhancement || true
    }
    
    const response = await api.post('/api/documents/generate', requestData)
    return response.data
  },

  getDocumentTypes: async () => {
    const response = await api.get('/api/documents/types')
    return response.data
  }
}

export const constitutionalService = {
  analyzeConstitutionality: async (data: any) => {
    const response = await api.post('/api/constitutional/analyze', data)
    return response.data
  }
}

export const lawyerService = {
  analyzeLawyer: async (data: any) => {
    const response = await api.post('/api/lawyer/analyze', data)
    return response.data
  },

  getCorruptionAlerts: async () => {
    const response = await api.get('/api/lawyer/corruption-alerts')
    return response.data
  }
}

export const caseService = {
  getShakiraChoonaraCase: async () => {
    const response = await api.get('/api/cases/shakira-choonara')
    return response.data
  },

  trackCase: async (caseId: string) => {
    const response = await api.get(`/api/cases/${caseId}`)
    return response.data
  }
}

export const dashboardService = {
  getPublicStats: async () => {
    const response = await api.get('/api/dashboard/stats')
    return response.data
  },

  getConstitutionalViolations: async () => {
    const response = await api.get('/api/dashboard/violations')
    return response.data
  }
}

export default api
