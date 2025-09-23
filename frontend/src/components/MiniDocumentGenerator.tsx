import React, { useState } from "react";
import api from "../services/api";

export default function MiniDocumentGenerator() {
  const [template, setTemplate] = useState("urgent_eviction");
  const [location, setLocation] = useState("");
  const [facts, setFacts] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await api.post("/documents/generate", { 
        document_type: template, 
        case_details: { address: location, facts }, 
        ai_enhancement: true 
      });
      setResult(r.data);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally { 
      setLoading(false); 
    }
  }

  return (
    <form onSubmit={handleGenerate} className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="space-y-4">
        <select 
          value={template} 
          onChange={e => setTemplate(e.target.value)} 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
        >
          <option value="urgent_eviction">Urgent Eviction Application</option>
          <option value="constitutional_challenge">Constitutional Challenge</option>
          <option value="fraud_notice">Fraud Notice</option>
          <option value="promissory_note">Promissory Note</option>
        </select>
        
        <input 
          value={location} 
          onChange={e => setLocation(e.target.value)} 
          placeholder="Property address or case location" 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent" 
        />
        
        <textarea 
          value={facts} 
          onChange={e => setFacts(e.target.value)} 
          placeholder="Brief facts (3 lines max)" 
          rows={3} 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-accent focus:border-accent" 
        />
        
        <div className="flex gap-3">
          <button 
            type="submit"
            disabled={loading} 
            className="flex-1 px-6 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Document"}
          </button>
          {result && (
            <a 
              href={result.download_url} 
              className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </form>
  );
}
