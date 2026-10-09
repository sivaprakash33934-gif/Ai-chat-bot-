"use client";

export default function TransparentPricing() {
  const inclusions = [
    "Autonomous AI Chatbot grounded in store data",
    "Real-time Knowledge Base & Catalog Ingestion",
    "CRM Lead Intelligence & Intent Scoring",
    "Full Multilingual Engine across 22+ Indian languages",
    "Developer API & Webhook access with stateless SDK",
    "UPI & Payment Links automation",
    "Smart Human Agent Escalation routing",
    "Zero data retention for end-user conversations",
  ];

  return (
    <section
      className="mx-auto max-w-4xl px-6 py-28 text-center md:px-8"
      aria-label="Transparent Pricing"
      id="pricing"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-mono text-xs mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Simple, Honest Pricing</span>
      </div>

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4F46E5] font-semibold">
        Transparent Pricing
      </p>

      <div className="mt-4 flex items-baseline justify-center gap-1.5">
        <span
          className="font-mono font-black text-slate-900 tabular-nums tracking-tight"
          style={{ fontSize: "clamp(3rem, 4vw + 2rem, 5.5rem)", lineHeight: 1 }}
        >
          ₹198
        </span>
        <span className="font-mono text-xl sm:text-2xl text-slate-500 font-medium">
          /year
        </span>
      </div>

      <p className="mt-4 font-semibold text-slate-900 text-lg">
        Enterprise AI for MSMEs.
      </p>

      <p className="mx-auto mt-2 max-w-prose text-slate-600 text-base leading-relaxed">
        Every feature. No hidden costs. No artificial crossed-out price.
      </p>

      <div className="mt-12 mx-auto max-w-lg rounded-2xl border border-slate-200/90 bg-white p-8 text-left shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)]">
        <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">
          Included in the ₹198 plan:
        </h3>
        <ul className="space-y-3 font-mono text-xs sm:text-sm text-slate-700">
          {inclusions.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
          <a
            href="#demo"
            data-magnetic="true"
            data-cursor="TRY"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#4F46E5] px-7 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4F46E5] shadow-sm"
          >
            GET STARTED FOR ₹198/YEAR →
          </a>
          <p className="font-mono text-[11px] text-center text-slate-500">
            Instant deployment • 100% money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
