import React from "react";
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="text-lg font-bold">Constitutional Liberation Platform</div>
                <div className="text-sm text-gray-400">Free Legal Justice for All</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Revolutionary AI-Powered Constitutional Justice Platform providing free legal document generation, 
              constitutional analysis, and property rights protection for all South African citizens.
            </p>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Open Source • Free Forever • Constitutional Purity • Public Transparency
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Platform Features
            </h3>
            <ul className="space-y-2">
              <li><Link to="/documents" className="text-gray-400 hover:text-white text-sm">Document Generator</Link></li>
              <li><Link to="/constitutional-analyzer" className="text-gray-400 hover:text-white text-sm">Constitutional Analyzer</Link></li>
              <li><Link to="/lawyer-accountability" className="text-gray-400 hover:text-white text-sm">Lawyer Accountability</Link></li>
              <li><Link to="/case-tracker" className="text-gray-400 hover:text-white text-sm">Case Tracker</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">Public Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Legal Resources
            </h3>
            <ul className="space-y-2">
              <li><a href="https://www.saflii.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">SAFLII Database</a></li>
              <li><a href="https://www.constitutionalcourt.org.za" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">Constitutional Court</a></li>
              <li><a href="https://www.justice.gov.za" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">Department of Justice</a></li>
              <li><Link to="/shakira-choonara-case" className="text-gray-400 hover:text-white text-sm">Flagship Case Study</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About the Platform</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 Constitutional Liberation Platform. Open Source Project by Plebeian Tribunal Academy.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <span className="text-xs text-gray-500">Constitutional Purity</span>
                <span className="text-xs text-gray-500">Free Access</span>
                <span className="text-xs text-gray-500">Public Transparency</span>
                <span className="text-xs text-gray-500">Open Source</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              "Justice delayed is justice denied. Justice made expensive is justice for the few. Justice made free is justice for all."
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
