"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Check,
  ArrowRight,
  Lock,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   FEATURE LIST DATA
   ═══════════════════════════════════════════════════════════════ */
const PLAN_FEATURES = [
  "AI Chatbot with Neural Core",
  "Website Understanding & Scraping",
  "Knowledge Base with PDF & Docs",
  "Business Intelligence & Insights",
  "Analytics Dashboard",
  "API + SDK Access",
  "Mini CRM & Human Support",
  "Invoice Generator",
  "SEO / AEO / GEO Tools",
  "Jitsi Video Integration",
  "Up to 5 Admin Users",
  "Ticket & Support System",
];

const TRUST_ITEMS = [
  { icon: Lock,        text: "Secure Payment via Paytm" },
  { icon: RefreshCw,   text: "Auto-renewal, cancel anytime" },
  { icon: ShieldCheck, text: "Business verification for security" },
];

/* ═══════════════════════════════════════════════════════════════
   PRICING SECTION
   ═══════════════════════════════════════════════════════════════ */
interface PricingSectionProps {
  onOpenVerification?: () => void;
}

export function PricingSection({ onOpenVerification }: PricingSectionProps) {
  /* ── Card visibility for entrance animation ── */
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" } // "top 75%"
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Header visibility ── */
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Billing mode toggle: monthly vs yearly ── */
  const [billingMode, setBillingMode] = useState<"monthly" | "yearly">("yearly");

  /* ── CTA hover ── */
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden"
      style={{
        background: "#FAFAFC",
        paddingTop: "clamp(64px, 8vh, 96px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
      {/* ── Amber ambient glow — centered behind card ── */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="animate-glow-pulse"
          style={{
            width: "min(700px, 90vw)",
            height: 600,
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.07) 0%, rgba(245,158,11,0.02) 40%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* ── Noise overlay ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Content container ── */}
      <div
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: 1200,
          paddingLeft: "clamp(16px, 2vw, 24px)",
          paddingRight: "clamp(16px, 2vw, 24px)",
        }}
      >
        {/* ════════════════════════════════
            SECTION HEADER
            ════════════════════════════════ */}
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 500ms cubic-bezier(0.19,1,0.22,1), transform 500ms cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          {/* Eyebrow — amber accent */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              className="block rounded-pill"
              style={{ width: 8, height: 2, background: "#F59E0B" }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "#B45309",
              }}
            >
              Simple Pricing
            </span>
            <span
              className="block rounded-pill"
              style={{ width: 8, height: 2, background: "#F59E0B" }}
              aria-hidden="true"
            />
          </div>

          {/* Monumental price headline */}
          <h2
            className="font-display font-bold text-ink-primary"
            style={{ lineHeight: 0.92, letterSpacing: "-0.04em" }}
          >
            {/* Line 1 */}
            <div className="line-mask mb-2">
              <div
                className="line-mask-inner"
                style={{
                  fontSize: "clamp(3rem, 8vw, 5.5rem)",
                  animationDelay: "100ms",
                }}
              >
                Enterprise AI.
              </div>
            </div>

            {/* Line 2 — price in amber */}
            <div className="line-mask">
              <div
                className="line-mask-inner flex items-baseline justify-center gap-3"
                style={{ animationDelay: "200ms" }}
              >
                <span
                  style={{
                    fontSize: "clamp(3rem, 8vw, 5.5rem)",
                    color: "#B45309",
                  }}
                  className="tabular-nums"
                >
                  {billingMode === "yearly" ? "₹198" : "₹16.5"}
                </span>
                <span
                  className="font-body font-normal text-ink-secondary"
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {billingMode === "yearly" ? "/year." : "/month."}
                </span>
              </div>
            </div>
          </h2>

          {/* Sub-text */}
          <p
            className="text-body-fluid text-ink-secondary font-body mx-auto mt-6"
            style={{ maxWidth: 520 }}
          >
            Every feature. Every tool. No hidden costs. No per-seat pricing.
            One subscription for your entire business.
          </p>
        </div>

        {/* ════════════════════════════════
            BILLING TOGGLE — Linear pricing tab
            ════════════════════════════════ */}
        <div className="flex justify-center mb-10">
          <div
            className="relative flex items-center p-1 rounded-pill bg-surface-2 border border-hairline shadow-[0_1px_3px_rgba(16,24,40,0.04)]"
            role="tablist"
            aria-label="Billing frequency toggle"
          >
            {/* Sliding selection indicator (compositor-only transform) */}
            <div
              className="absolute top-1 bottom-1 w-[140px] rounded-pill bg-surface-1 border border-hairline shadow-[0_2px_8px_rgba(16,24,40,0.06)] pointer-events-none"
              style={{
                transform:
                  billingMode === "monthly"
                    ? "translateX(0px)"
                    : "translateX(140px)",
                transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-hidden="true"
            />

            {/* Monthly tab */}
            <button
              type="button"
              role="tab"
              aria-selected={billingMode === "monthly"}
              onClick={() => setBillingMode("monthly")}
              className={`relative z-10 w-[140px] h-11 flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-colors duration-200 rounded-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai min-h-[44px] ${
                billingMode === "monthly"
                  ? "text-ink-primary font-semibold"
                  : "text-ink-tertiary hover:text-ink-primary"
              }`}
            >
              Monthly
            </button>

            {/* Yearly tab */}
            <button
              type="button"
              role="tab"
              aria-selected={billingMode === "yearly"}
              onClick={() => setBillingMode("yearly")}
              className={`relative z-10 w-[140px] h-11 flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200 rounded-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai min-h-[44px] ${
                billingMode === "yearly"
                  ? "text-ink-primary font-semibold"
                  : "text-ink-tertiary hover:text-ink-primary"
              }`}
            >
              <span>Yearly</span>
              <span
                className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-pill font-bold"
                style={{
                  color: "#047857",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  lineHeight: 1,
                }}
              >
                SAVE 98%
              </span>
            </button>
          </div>
        </div>

        {/* ════════════════════════════════
            SINGLE PRICING CARD — centered
            ════════════════════════════════ */}
        <div className="flex justify-center mb-12">
          <div
            ref={cardRef}
            className="relative w-full"
            style={{
              maxWidth: 480,
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? "scale(1)" : "scale(0.95)",
              transition:
                "opacity 500ms cubic-bezier(0.19,1,0.22,1), transform 500ms cubic-bezier(0.19,1,0.22,1)",
              background: "#F7F8FA",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 16,
              padding: 40,
            }}
          >
            {/* Top-edge highlight */}
            <div
              className="absolute inset-x-0 top-0 pointer-events-none rounded-t-panel-lg"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(245,158,11,0.25), transparent)",
              }}
              aria-hidden="true"
            />

            {/* ── BUSINESS PLAN badge ── */}
            <div className="flex justify-center mb-6">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#B45309",
                  background: "rgba(245,158,11,0.10)",
                  borderRadius: 9999,
                  padding: "4px 16px",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                Business Plan
              </span>
            </div>

            {/* ── Price display switch (compositor-only crossfade) ── */}
            <div
              key={billingMode}
              className="text-center mb-6"
              style={{
                animation: "price-crossfade 200ms cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            >
              {billingMode === "yearly" ? (
                <>
                  <div className="flex items-end justify-center gap-1.5 mb-2">
                    <span
                      className="font-display font-bold text-ink-primary tabular-nums"
                      style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.04em" }}
                    >
                      ₹198
                    </span>
                    <span
                      className="font-body text-ink-tertiary pb-2"
                      style={{ fontSize: 18 }}
                    >
                      /year
                    </span>
                  </div>

                  {/* Strikethrough + Save badge */}
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span
                      className="font-mono text-ink-muted line-through tabular-nums"
                      style={{ fontSize: 13, letterSpacing: "0.04em" }}
                    >
                      ₹9,999/year
                    </span>
                    <span
                      className="font-mono uppercase font-bold"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.10em",
                        color: "#047857",
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      Save 98%
                    </span>
                  </div>

                  {/* Offer line below */}
                  <p className="text-ink-secondary text-xs font-body">
                    Just <span className="tabular-nums font-semibold text-ink-primary">₹16.5</span>/month — billed once a year
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-end justify-center gap-1.5 mb-2">
                    <span
                      className="font-display font-bold text-ink-primary tabular-nums"
                      style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.04em" }}
                    >
                      ₹16.5
                    </span>
                    <span
                      className="font-body text-ink-tertiary pb-2"
                      style={{ fontSize: 18 }}
                    >
                      /month
                    </span>
                  </div>

                  {/* Line below */}
                  <p className="text-ink-secondary text-xs font-body mb-1">
                    Billed monthly via auto-pay. Cancel anytime.
                  </p>

                  {/* Comparison nudge */}
                  <p className="text-ink-tertiary text-[11px] font-mono">
                    Or pay <span className="tabular-nums font-medium text-ink-secondary">₹198</span> once a year — same total, one payment
                  </p>
                </>
              )}
            </div>

            {/* ── Divider ── */}
            <div
              className="mb-6"
              style={{ height: 1, background: "rgba(15,23,42,0.06)" }}
            />

            {/* ── Feature list ── */}
            <ul className="mb-8 space-y-2" role="list">
              {PLAN_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3"
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                >
                  <span className="mt-0.5 flex-shrink-0">
                    <Check
                      size={15}
                      strokeWidth={2.5}
                      style={{ color: "#047857" }}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="font-body text-ink-secondary"
                    style={{ fontSize: 14, lineHeight: 1.5 }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* ── CTA button ── */}
            <button
              type="button"
              onClick={onOpenVerification}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className="w-full flex items-center justify-center gap-2 rounded-btn font-semibold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
              style={{
                padding: "16px 24px",
                fontSize: 14,
                letterSpacing: "0.06em",
                background: ctaHovered ? "#4338CA" : "#4F46E5",
                color: "#FFFFFF",
                border: "none",
                boxShadow: ctaHovered
                  ? "0 0 32px rgba(79,70,229,0.3)"
                  : "0 0 20px rgba(79,70,229,0.15)",
                transition:
                  "background 200ms ease-out, box-shadow 200ms ease-out",
              }}
            >
              <span>Request Access</span>
              <ArrowRight
                size={15}
                strokeWidth={2.4}
                aria-hidden="true"
                style={{
                  transform: ctaHovered ? "translate(3px, 0)" : "translate(0, 0)",
                  transition: "transform 200ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </button>

            {/* ── Mode-specific note ── */}
            <p
              className="text-center text-ink-muted font-mono mt-4"
              style={{ fontSize: 11, letterSpacing: "0.08em" }}
            >
              {billingMode === "monthly"
                ? "Auto-pay via Paytm · Cancel anytime"
                : "Verification required · Not open public signup"}
            </p>
          </div>
        </div>

        {/* ════════════════════════════════
            TRUST INDICATORS
            ════════════════════════════════ */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          style={{
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? "translateY(0)" : "translateY(12px)",
            transition:
              "opacity 500ms 200ms cubic-bezier(0.19,1,0.22,1), transform 500ms 200ms cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="flex items-center gap-2.5"
              >
                <Icon
                  size={13}
                  strokeWidth={1.8}
                  className="text-ink-tertiary flex-shrink-0"
                  aria-hidden="true"
                />
                <span
                  className="font-mono uppercase text-ink-muted"
                  style={{ fontSize: 11, letterSpacing: "0.12em" }}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
