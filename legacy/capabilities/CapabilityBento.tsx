"use client";

interface Capability {
  id: string;
  name: string;
  desc: string;
  span: string;
  insight?: string;
  tag?: string;
}

const CAPS: Capability[] = [
  {
    id: "chatbot",
    name: "AI Chatbot",
    desc: "Answers customer questions grounded strictly in your verified business data with zero hallucinations.",
    span: "sm:col-span-2 sm:row-span-2",
    tag: "CORE SURFACE",
  },
  {
    id: "kb",
    name: "Knowledge Base",
    desc: "Structured, queryable source of truth built from your live storefront and catalog.",
    span: "",
  },
  {
    id: "crm",
    name: "CRM Intelligence",
    desc: "Surfaces intent signals from incoming customer interactions and qualifies sales leads.",
    span: "",
    insight: "HIGH-INTENT SIGNAL",
  },
  {
    id: "orders",
    name: "Order Management",
    desc: "Tracks order status and inventory lookups referenced during real-time queries.",
    span: "sm:col-span-2",
    tag: "FULFILLMENT RAIL",
  },
  {
    id: "analytics",
    name: "Analytics & SEO",
    desc: "Identifies search demand, product interest patterns, and missing inventory queries.",
    span: "",
    insight: "SEARCH INTENT CONNECTED",
  },
  {
    id: "multilingual",
    name: "Multilingual Engine",
    desc: "Native inference across 22+ Indian languages including Hindi, Tamil, Telugu, and Marathi.",
    span: "",
  },
  {
    id: "escalation",
    name: "Smart Escalation",
    desc: "Smoothly transfers complex conversations to your team when human intervention is required.",
    span: "",
    insight: "HUMAN ROUTE REQUIRED",
  },
  {
    id: "payments",
    name: "Payment Integration",
    desc: "Generates direct UPI payment links and integrates with standard Indian checkout gateways.",
    span: "",
    insight: "PAYMENT ACTION READY",
  },
  {
    id: "api",
    name: "Developer API",
    desc: "Stateless SDK and REST endpoints to embed intelligence into any custom front-end.",
    span: "sm:col-span-2",
    insight: "POST /v1/ask",
    tag: "DEVELOPER INTERFACE",
  },
];

export default function CapabilityBento() {
  return (
    <section
      className="mx-auto max-w-7xl px-6 py-24 md:px-12"
      aria-label="Platform capabilities"
      id="capabilities"
    >
      <div className="flex flex-col items-start gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4F46E5] font-semibold">
          Platform Architecture
        </p>
        <h2
          className="text-slate-900 font-bold tracking-tight max-w-2xl text-balance"
          style={{ fontSize: "clamp(2rem, 2.6vw + 1.5rem, 3.8rem)", lineHeight: 1.05 }}
        >
          Nine modules. One connected system.
        </h2>
        <p className="text-slate-600 mt-2 max-w-prose text-base leading-relaxed">
          Every component operates in sync, sharing a unified real-time knowledge graph without
          retaining customer conversational records.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CAPS.map((cap) => (
          <article
            key={cap.id}
            data-cursor="EXPLORE"
            className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 transition-transform duration-200 ease-out hover:-translate-y-1 ${cap.span}`}
          >
            {/* Opacity-only glow layer — never animate box-shadow directly */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-indigo-500/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="relative flex items-center justify-between gap-2">
              <h3 className="font-semibold text-slate-900 text-lg tracking-tight">{cap.name}</h3>
              {cap.tag && (
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {cap.tag}
                </span>
              )}
            </div>

            <p className="relative mt-2 max-w-prose text-sm text-slate-600 leading-relaxed">
              {cap.desc}
            </p>

            {cap.insight && (
              <div className="relative mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {cap.insight}
                </span>
              </div>
            )}

            <div className="relative mt-6">
              <a
                href="#demo"
                className="inline-flex min-h-[44px] items-center font-mono text-[11px] font-bold uppercase tracking-wider text-[#4F46E5] hover:text-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded"
              >
                Inspect module →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
