import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  action: "primary" | "ghost";
}

export default function FeatureCard({ icon, title, description, action }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className={`px-4 py-2 rounded-md text-sm font-medium ${
        action === "primary" 
          ? "bg-accent text-white hover:bg-accent/90" 
          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}>
        {action === "primary" ? "Get Started" : "Learn More"}
      </button>
    </div>
  );
}
