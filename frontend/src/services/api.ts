import axios from "axios";

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api", 
  timeout: 30000 
});

export const documentService = {
  async getDocumentTypes() {
    const response = await api.get('/documents/types');
    return response.data;
  },

  async generateDocument(data: any) {
    const response = await api.post('/documents/generate', data);
    return response.data;
  }
};

export { api };
export default api;
