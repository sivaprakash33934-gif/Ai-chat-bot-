"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Why is Neural Commerce strictly stateless?",
    a: "Our customer interaction surface operates with zero session cookies, zero localStorage, and zero permanent server conversation logs. Each request is evaluated independently against your verified store catalog, eliminating data privacy risks and ensuring total GDPR/DPDP compliance.",
  },
  {
    q: "How does the engine prevent hallucinations?",
    a: "Responses are strictly grounded in your ingested storefront data, catalog attributes, return policies, and GSTIN business records. When a customer asks about a specification or product you do not stock, the system transparently indicates the absence rather than fabricating details.",
  },
  {
    q: "What does the ₹198/year plan actually include?",
    a: "The ₹198/year plan includes full platform access: autonomous AI chatbot, knowledge base crawler, CRM lead intelligence, 22+ Indian languages, UPI payment linking, smart human agent routing, and developer API endpoints with zero hidden charges.",
  },
  {
    q: "How does human escalation work when the AI is unsure?",
    a: "If a visitor query falls below confidence thresholds or requests bespoke assistance, the engine automatically routes the visitor directly to your WhatsApp Business number, phone line, or support ticketing channel.",
  },
  {
    q: "Can I integrate this with Shopify, WooCommerce, or custom stores?",
    a: "Yes. Ingestion takes three minutes via your public store URL or sitemap. You can embed our lightweight drop-in widget or integrate via our typed TypeScript/Python Edge SDK.",
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      aria-label="Frequently Asked Questions"
      id="faq"
    >
      <div className="text-center mb-14">
        <span className="font-mono text-xs font-semibold text-[#4F46E5] uppercase tracking-wider">
          Clarity & Governance
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-sm mt-2 max-w-prose mx-auto">
          Everything you need to know about our stateless architecture, pricing, and MSME infrastructure.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] min-h-[44px]"
              aria-expanded={openIdx === idx}
            >
              <span>{faq.q}</span>
              <span className="font-mono text-xl text-[#4F46E5] w-6 h-6 flex items-center justify-center select-none" aria-hidden="true">
                {openIdx === idx ? "−" : "+"}
              </span>
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                <p className="max-w-prose">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export { FaqAccordion as FAQAccordion };
