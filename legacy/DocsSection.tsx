"use client";

import React, { useRef, useState, useEffect } from "react";
import { UserCheck, Globe, Code, ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: UserCheck,
    title: "Register & Verify",
    description: "Submit your business domain and GSTIN or Udyam certificate for automated compliance validation.",
  },
  {
    num: "02",
    icon: Globe,
    title: "Add Your Domain",
    description: "Point our autonomous crawler to your URL. Neural Core parses products, FAQs, and pricing in minutes.",
  },
  {
    num: "03",
    icon: Code,
    title: "Embed the Widget",
    description: "Add a single script tag or use our SDK to launch your custom conversational AI on any web or mobile app.",
  },
];

const DOC_LINKS = [
  { label: "Quickstart", href: "#docs" },
  { label: "API Reference", href: "#sdk" },
  { label: "SDK Guides", href: "#sdk" },
  { label: "Changelog", href: "#features" },
];

export function DocsSection() {
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

  return (
    <section
      id="docs"
      className="relative bg-canvas-deep bg-dot-grid"
      style={{
        paddingTop: "clamp(64px, 8vh, 96px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 max-w-2xl mx-auto"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 500ms cubic-bezier(0.19, 1, 0.22, 1), transform 500ms cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span
              className="block rounded-pill bg-signal-ai"
              style={{ width: 8, height: 2 }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase text-signal-ai tracking-widest text-[11px]"
            >
              Documentation
            </span>
          </div>

          <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight mb-4">
            Live in 10 Minutes.
          </h2>

          <p className="text-body-fluid text-ink-secondary font-body">
            Get your sovereign enterprise AI up and running with three simple steps.
          </p>
        </div>

        {/* 3-Step Quickstart Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-surface-1 rounded-xl border border-hairline p-7 flex flex-col justify-between overflow-hidden shadow-[0_4px_16px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 group"
              >
                {/* Monumental Number watermark */}
                <span
                  className="absolute top-2 right-4 font-mono font-bold text-7xl select-none pointer-events-none text-signal-ai/10 leading-none"
                  aria-hidden="true"
                >
                  {step.num}
                </span>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-signal-ai/10 flex items-center justify-center text-signal-ai mb-6 transition-transform duration-300 group-hover:scale-105">
                    <Icon size={22} strokeWidth={1.9} />
                  </div>

                  <h3 className="font-display font-semibold text-lg text-ink-primary tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="font-body text-sm text-ink-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link Row */}
        <div className="pt-8 border-t border-hairline flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {DOC_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-secondary hover:text-ink-primary transition-colors min-h-[44px] px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai rounded-btn"
            >
              <span>{link.label}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1 text-signal-ai"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
