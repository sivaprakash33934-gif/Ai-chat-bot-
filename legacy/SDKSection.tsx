"use client";

import React, { useRef, useState, useEffect } from "react";
import { Key, Sliders, Webhook, Copy, Check } from "lucide-react";

const PLATFORMS = [
  "React",
  "Next.js",
  "JavaScript",
  "Android",
  "Swift",
  "REST API",
];

const SDK_FEATURES = [
  {
    icon: Key,
    title: "Individual API Keys",
    description: "Cryptographically isolated keys per business domain with fine-grained role scopes.",
  },
  {
    icon: Sliders,
    title: "Usage Controls",
    description: "Hard quotas, rate limiting, and automated throttling to prevent unexpected cost spikes.",
  },
  {
    icon: Webhook,
    title: "Real-time Webhooks",
    description: "Instant JSON payloads for customer handoffs, escalated tickets, and completed orders.",
  },
];

export function SDKSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("npm install @neuralcommerce/sdk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="sdk"
      className="relative bg-canvas-elevated"
      style={{
        paddingTop: "clamp(64px, 8vh, 96px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-14 max-w-2xl"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 500ms cubic-bezier(0.19, 1, 0.22, 1), transform 500ms cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="block rounded-pill bg-signal-ai"
              style={{ width: 8, height: 2 }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase text-signal-ai tracking-widest text-[11px]"
            >
              Developer Platform
            </span>
          </div>

          <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight mb-4">
            One API.{" "}
            <span className="text-ink-secondary">Every Platform.</span>
          </h2>

          <p className="text-body-fluid text-ink-secondary font-body">
            Connect your AI chatbot to any platform with our official SDKs.
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 cols): Code Window Mockup */}
          <div className="lg:col-span-6 bg-surface-2 rounded-xl border border-hairline overflow-hidden shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
            {/* Top Bar with Traffic Lights */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/60" />
                <span className="w-3 h-3 rounded-full bg-amber-400/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/60" />
              </div>
              <span className="font-mono text-xs text-ink-muted">
                quickstart.ts
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy install command"
                className="text-ink-muted hover:text-ink-primary transition-colors min-h-[44px] min-w-[44px] -my-2 -mr-2 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai rounded-btn"
              >
                {copied ? <Check size={14} className="text-signal-growth" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Terminal Command Strip */}
            <div className="px-5 py-3 bg-surface-1 border-b border-hairline flex items-center gap-2 font-mono text-xs">
              <span className="text-signal-ai font-semibold select-none">$</span>
              <span className="text-ink-primary font-medium">npm install @neuralcommerce/sdk</span>
            </div>

            {/* Code Snippet */}
            <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-ink-primary">
              <pre className="font-mono">
                <code>
                  <span className="text-ink-secondary">import</span> &#123; <span className="text-signal-ai font-semibold">NeuralCore</span> &#125; <span className="text-ink-secondary">from</span> <span className="text-signal-growth">&apos;@neuralcommerce/sdk&apos;</span>;{"\n\n"}
                  <span className="text-ink-secondary">const</span> ai = <span className="text-ink-secondary">new</span> <span className="text-signal-ai font-semibold">NeuralCore</span>(&#123;{"\n"}
                  {"  "}apiKey: <span className="text-signal-growth">&apos;nk_live_9f81a74e2d...&apos;</span>,{"\n"}
                  {"  "}domain: <span className="text-signal-growth">&apos;yoursite.com&apos;</span>,{"\n"}
                  &#125;);{"\n\n"}
                  <span className="text-ink-secondary">const</span> response = <span className="text-ink-secondary">await</span> ai.<span className="text-ink-primary font-semibold">chat</span>(<span className="text-signal-growth">&apos;What are your hours?&apos;</span>);{"\n"}
                  console.<span className="text-ink-primary font-semibold">log</span>(response.text);
                </code>
              </pre>
            </div>
          </div>

          {/* Right Column (6 cols): Platform Chips & Mini Feature Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Platform Chips */}
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-3">
                Supported Environments
              </span>
              <div className="flex flex-wrap gap-2.5">
                {PLATFORMS.map((platform) => (
                  <span
                    key={platform}
                    className="px-3.5 py-1.5 rounded-btn bg-surface-1 border border-hairline font-mono text-xs text-ink-primary uppercase tracking-wide transition-all duration-200 hover:border-signal-ai cursor-default"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 Mini Feature Cards (Stacked) */}
            <div className="flex flex-col gap-3">
              {SDK_FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-surface-1 border border-hairline flex items-start gap-4 transition-all duration-200 hover:border-slate-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-signal-ai/10 flex items-center justify-center flex-shrink-0 text-signal-ai mt-0.5">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm text-ink-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-ink-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
