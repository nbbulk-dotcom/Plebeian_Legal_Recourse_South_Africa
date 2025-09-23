import React from "react";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#0F172A"/>
            <path d="M18 8L26 14V28H10V14L18 8Z" fill="#D4AF37"/>
            <rect x="14" y="18" width="8" height="6" fill="#0F172A"/>
          </svg>
          <span className="font-semibold text-primary">Plebeian</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <Link to="/how" className="text-slate-700 hover:text-primary">How it works</Link>
          <Link to="/documents" className="text-slate-700 hover:text-primary">Documents</Link>
          <Link to="/analysis" className="text-slate-700 hover:text-primary">Analysis</Link>
          <Link to="/lawyers" className="text-slate-700 hover:text-primary">Transparency</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/documents/generate" className="inline-flex items-center px-5 py-2 rounded-md bg-accent text-white hover:bg-accent/90">Generate Document</Link>
          <Link to="/login" className="hidden md:inline-block px-4 py-2 rounded-md border hover:bg-gray-50">Sign In</Link>
        </div>
      </div>
    </header>
  );
}
