"use client";

import { useState } from "react";

export default function ThreeStepRail() {
  const [url, setUrl] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || simulating) return;

    setSimulating(true);
    setProgress("Connecting to storefront sitemap...");

    setTimeout(() => {
      setProgress("Extracting product specs, policies, and pricing...");
    }, 1200);

    setTimeout(() => {
      setProgress("Synthesizing unified knowledge graph...");
    }, 2400);

    setTimeout(() => {
      setProgress("Ingest complete! Grounded in source data. Ready for customer traffic.");
      setSimulating(false);
    }, 3600);
  };

  return (
    <section
      id="onboarding"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Onboarding Steps"
    >
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="font-mono text-xs font-semibold text-[#4F46E5] uppercase tracking-wider">
          Frictionless Setup
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
          Three Steps to Live Production
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-prose mx-auto">
          No manual tagging or complex integration. Ingest your catalog and deploy in under three minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            step: "01",
            title: "Submit Storefront URL or GSTIN",
            body: "Provide your public storefront domain, GSTIN/Udyam identifier, or connect via read-only catalog token.",
          },
          {
            step: "02",
            title: "Knowledge Graph Synthesis",
            body: "The neural crawler maps product attributes, return policies, shipping zones, and FAQ data into queryable structures.",
          },
          {
            step: "03",
            title: "Deploy Autonomous Surface",
            body: "Embed the lightweight web widget or route customer queries through our stateless Edge Developer API.",
          },
        ].map((s, idx) => (
          <div
            key={idx}
            data-cursor="EXPLORE"
            className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative flex flex-col justify-between"
          >
            <span
              className="font-mono text-4xl font-bold text-slate-100 absolute top-5 right-6 select-none"
              aria-hidden="true"
            >
              {s.step}
            </span>
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#06080C] text-white font-mono text-xs font-bold flex items-center justify-center mb-6">
                {s.step}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.body}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-[11px] text-[#4F46E5] flex items-center gap-1.5 font-bold">
              <span>● Fully Automated Step</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive URL Simulation Sandbox */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
        <h3 className="font-bold text-slate-900 text-base mb-2 text-center">
          Test Catalog Ingestion
        </h3>
        <p className="text-xs text-slate-500 text-center mb-6 max-w-prose mx-auto">
          Simulate our ingestion engine against any storefront domain to preview knowledge mapping.
        </p>

        <form onSubmit={handleSimulate} className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="simulate-url" className="sr-only">Store URL to simulate</label>
          <input
            id="simulate-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourstore.com"
            className="flex-1 px-4 py-3 min-h-[44px] rounded-xl bg-slate-50 border border-slate-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          />
          <button
            type="submit"
            disabled={simulating || !url}
            className="min-h-[44px] px-6 py-3 rounded-xl bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
          >
            {simulating ? "Ingesting..." : "Simulate Ingest"}
          </button>
        </form>

        {progress && (
          <div className="mt-4 p-3 rounded-xl bg-[#06080C] text-emerald-400 font-mono text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{progress}</span>
          </div>
        )}
      </div>
    </section>
  );
}
