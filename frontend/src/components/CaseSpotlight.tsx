import React from "react";

export default function CaseSpotlight() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/90">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-gold text-primary text-sm font-medium rounded">Flagship Case</span>
                <span className="px-3 py-1 bg-success text-white text-sm font-medium rounded">Active</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Shakira Choonara Property Rights Case</h2>
              <p className="text-white/90 mb-6">
                Comprehensive legal action demonstrating the platform's full capabilities: 8 criminal charges, 
                civil remedies, constitutional challenges, and public transparency for corruption exposure.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">Criminal charges filed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-sm">Constitutional challenge submitted</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  <span className="text-sm">Civil remedies pending</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-gold text-primary font-semibold rounded-md hover:bg-gold/90">
                View Full Case Details
              </button>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Case Timeline</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-success rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium text-sm">Initial Filing</div>
                    <div className="text-xs text-white/70">Property rights violation documented</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-gold rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium text-sm">Criminal Charges</div>
                    <div className="text-xs text-white/70">8 charges including corruption by public officer</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-white/50 rounded-full mt-1"></div>
                  <div>
                    <div className="font-medium text-sm">Court Response</div>
                    <div className="text-xs text-white/70">Awaiting High Court scheduling</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
