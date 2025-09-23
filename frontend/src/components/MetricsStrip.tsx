import React from "react";

export default function MetricsStrip() {
  const metrics = [
    { value: "1,247", label: "Documents Generated", microcopy: "This month" },
    { value: "89", label: "Constitutional Violations", microcopy: "Detected" },
    { value: "156", label: "Lawyers Monitored", microcopy: "Transparency score" },
    { value: "94.7%", label: "Success Rate", microcopy: "Court victories" }
  ];

  return (
    <section className="py-12 bg-neutralBg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{metric.value}</div>
              <div className="text-gray-900 font-medium mb-1">{metric.label}</div>
              <div className="text-sm text-gray-500">{metric.microcopy}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
