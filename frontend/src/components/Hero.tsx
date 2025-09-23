import React from "react";

export default function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Free Constitutional Justice — Document generation + AI analysis</h1>
          <p className="mt-4 text-lg text-white/90">Protect your rights with court-ready documents, instant constitutional analysis, and public transparency.</p>
          <div className="mt-6 flex gap-3">
            <a href="/documents/generate" className="px-6 py-3 rounded-md bg-gold text-primary font-semibold hover:bg-gold/90">Generate My Document</a>
            <a href="/analysis" className="px-6 py-3 rounded-md border border-white/30 hover:bg-white/10">Try Constitutional Analysis</a>
          </div>
          <div className="mt-4 flex gap-3 text-sm">
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded">✅ Open Source</span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded">📄 26 Templates</span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded">🎯 94.7% Success</span>
          </div>
        </div>
        <div className="relative">
          <div className="bg-neutralBg rounded-lg p-4 shadow-lg">
            <div className="bg-gray-200 rounded h-64 flex items-center justify-center text-gray-500">
              Dashboard Preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
