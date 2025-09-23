import React from "react";
import TopNav from "../components/TopNav";
import Hero from "../components/Hero";
import MetricsStrip from "../components/MetricsStrip";
import FeatureCard from "../components/FeatureCard";
import MiniDocumentGenerator from "../components/MiniDocumentGenerator";
import LiveFeed from "../components/LiveFeed";
import CaseSpotlight from "../components/CaseSpotlight";
import Footer from "../components/Footer";

const features = [
  {
    icon: "📄",
    title: "Free Document Generation",
    description: "Generate all 26 legal document types completely free. No payment required ever.",
    action: "primary" as const
  },
  {
    icon: "⚖️",
    title: "Constitutional Analysis",
    description: "AI-powered analysis of laws for constitutional compliance and violation detection.",
    action: "ghost" as const
  },
  {
    icon: "🛡️",
    title: "Lawyer Accountability",
    description: "0-10 corruption scoring system with fee escalation monitoring and public transparency.",
    action: "primary" as const
  },
  {
    icon: "👁️",
    title: "Public Transparency",
    description: "Live dashboard showing constitutional violations, case outcomes, and corruption reports.",
    action: "ghost" as const
  }
];

const feedItems = [
  {
    id: 1,
    title: "New Constitutional Challenge Filed",
    excerpt: "Property rights violation case submitted to High Court",
    time: "2 hours ago",
    tags: ["Property", "Constitutional"]
  },
  {
    id: 2,
    title: "Lawyer Alert: Fee Escalation Detected",
    excerpt: "Attorney J. Smith showing 300% fee increase pattern",
    time: "4 hours ago",
    tags: ["Alert", "Corruption"]
  },
  {
    id: 3,
    title: "Document Generated: Eviction Application",
    excerpt: "Urgent eviction application completed for Johannesburg property",
    time: "6 hours ago",
    tags: ["Document", "Eviction"]
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <Hero />
      <MetricsStrip />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revolutionary Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The first platform ever to provide completely free constitutional justice with AI-powered legal research and public transparency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutralBg">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Quick Document Generator</h2>
            <MiniDocumentGenerator />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Live Activity Feed</h2>
            <LiveFeed items={feedItems} />
          </div>
        </div>
      </section>

      <CaseSpotlight />
      <Footer />
    </div>
  );
}
