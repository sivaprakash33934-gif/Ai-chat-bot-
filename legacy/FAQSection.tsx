"use client";

import React, { useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "How does the AI understand my website?",
    a: "Our AI crawls your website, extracts all products, services, FAQs, and contact information. It then processes this data using our Neural Core engine to build a comprehensive knowledge base that powers all AI services.",
  },
  {
    q: "Is my business data secure?",
    a: "Yes. We use private Neural Core AI processing, controlled environments, individual API keys for each business, and a verification process. Your data never leaves our secure infrastructure.",
  },
  {
    q: "What happens if AI can't answer a question?",
    a: "The AI seamlessly escalates to your human support team. A ticket is created, and your support staff can take over the conversation. No customer is left without an answer.",
  },
  {
    q: "Can I use this on my mobile app?",
    a: "Absolutely. We provide SDK support for React, Next.js, JavaScript, Android, and Swift. One AI platform powers all your applications.",
  },
  {
    q: "Why is it only ₹198/year?",
    a: "Our mission is to make enterprise AI accessible to Indian MSMEs. We operate on a subsidized model with no hidden costs, no per-seat pricing, and no feature limitations.",
  },
  {
    q: "Can I pay monthly instead of yearly?",
    a: "Yes. Choose monthly auto-pay at ₹16.5/month, or pay ₹198 once a year. Both include every feature — no limits, no hidden costs.",
  },
  {
    q: "How do I get access?",
    a: "Register your business, provide your website link, go through our verification process, complete payment, and you'll have full platform access. It's not open public signup — we verify every business.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative bg-canvas-deep"
      style={{
        paddingTop: "clamp(64px, 8vh, 96px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 sm:mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 500ms cubic-bezier(0.19, 1, 0.22, 1), transform 500ms cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion list */}
        <div className="border-t border-hairline">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="border-b border-hairline"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 flex items-center justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal-ai"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium text-ink-primary pr-4 group-hover:text-ink-primary transition-colors duration-200">
                    {faq.q}
                  </span>
                  <div
                    className="flex-shrink-0 text-ink-tertiary group-hover:text-ink-primary transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <Plus size={16} />
                  </div>
                </button>

                {/* Grid Template Rows 0fr -> 1fr animation */}
                <div
                  className={`faq-accordion-grid ${isOpen ? "open" : ""}`}
                >
                  <div>
                    <p className="font-body text-sm text-ink-secondary leading-relaxed pb-5">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
