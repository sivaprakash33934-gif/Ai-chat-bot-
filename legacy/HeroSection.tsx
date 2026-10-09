"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, CheckCircle2, Shield, ChevronDown } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   STAT DATA
   ═══════════════════════════════════════════════════════════════ */
const DASHBOARD_STATS = [
  { label: "VISITORS TODAY", value: "1,247", color: "text-ink-primary" },
  { label: "AI RESPONSES",   value: "89%",   color: "text-signal-ai" },
  { label: "TICKETS RESOLVED", value: "34", color: "text-signal-growth" },
  { label: "REVENUE",         value: "₹12,450", color: "text-signal-commerce" },
];

const BAR_CHART_DATA = [40, 65, 50, 80, 55, 72, 90, 60, 75, 48, 85, 70];

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD CARD (overlapping preview)
   ═══════════════════════════════════════════════════════════════ */
function DashboardCard() {
  return (
    <div className="hero-dashboard-panel relative">
      {/* Background glow */}
      <div
        className="absolute -inset-8 rounded-full pointer-events-none animate-glow-pulse"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,70,229,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Dashboard card */}
      <div className="relative">
        <div
          className="bg-surface-1 rounded-panel-lg p-5 sm:p-6 border border-hairline"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(79,70,229,0.08), 0 24px 48px rgba(16,24,40,0.08), 0 8px 16px rgba(16,24,40,0.04)",
          }}
        >
          {/* ── Window chrome ── */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#DC2626]/60" />
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]/60" />
                <span className="w-2 h-2 rounded-full bg-[#10B981]/60" />
              </div>
              <span className="text-[11px] font-mono text-ink-tertiary tracking-wide">
                Business Dashboard
              </span>
            </div>
            {/* AI Active status pill */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-pill bg-signal-ai/10 border border-signal-ai/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal-ai opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal-ai" />
              </span>
              <span className="text-[10px] font-mono text-signal-ai font-medium tracking-wider">
                AI ACTIVE
              </span>
            </div>
          </div>

          {/* ── 2×2 stat cards ── */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {DASHBOARD_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-2 rounded-btn p-2.5 sm:p-3 border border-hairline"
              >
                <div
                  className={`font-mono tabular-data text-lg sm:text-xl font-semibold leading-tight ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase text-ink-tertiary tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Bar chart mockup ── */}
          <div className="bg-surface-2 rounded-btn p-3 border border-hairline">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-ink-tertiary tracking-wider">
                WEEKLY TRAFFIC
              </span>
              <span className="text-[10px] font-mono text-signal-ai">
                +18.3%
              </span>
            </div>
            <div className="flex items-end gap-[3px]" style={{ height: 44 }}>
              {BAR_CHART_DATA.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `rgba(79,70,229,${0.3 + (h / 100) * 0.7})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL INDICATOR
   ═══════════════════════════════════════════════════════════════ */
function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      style={{ animation: "fade-in 0.3s 1.1s ease-out both" }}
    >
      <span className="font-mono uppercase text-ink-muted" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
        Scroll
      </span>
      <ChevronDown className="w-4 h-4 text-ink-muted animate-bounce-down" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO SECTION
   ═══════════════════════════════════════════════════════════════ */
interface HeroSectionProps {
  onOpenVerification: () => void;
}

export function HeroSection({ onOpenVerification }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);
  const dashboardCardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  /* ── Compositor-only mouse parallax via rAF (zero React re-renders) ── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lerp = () => {
      currentOffset.current.x +=
        (targetOffset.current.x - currentOffset.current.x) * 0.1;
      currentOffset.current.y +=
        (targetOffset.current.y - currentOffset.current.y) * 0.1;

      const { x, y } = currentOffset.current;

      // Sculpture subtle translation (max 8px)
      if (sculptureRef.current) {
        sculptureRef.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
      }

      // Overlapping dashboard card 3D tilt & counter-parallax
      if (dashboardCardRef.current) {
        dashboardCardRef.current.style.transform = `rotateY(${-2 + x * 3}deg) rotateX(${1 + y * -3}deg) translate3d(${x * -4}px, ${y * -4}px, 0)`;
      }

      rafId.current = requestAnimationFrame(lerp);
    };

    rafId.current = requestAnimationFrame(lerp);

    const onMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetOffset.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      };
    };

    const sectionEl = sectionRef.current;
    sectionEl?.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      sectionEl?.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-canvas-deep bg-dot-grid"
    >
      {/* ── Ambient AI glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "25%",
          left: "50%",
          width: "min(900px, 90vw)",
          height: "500px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0.04) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Secondary warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          left: "20%",
          width: 400,
          height: 300,
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── SVG noise texture ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Mobile soft background layer (<768px: image shows behind text at 30% opacity) ── */}
      <div
        className="md:hidden absolute top-12 inset-x-0 mx-auto w-[300px] aspect-square opacity-30 pointer-events-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/hero-sculpture.png"
          alt=""
          fill
          priority
          quality={85}
          sizes="300px"
          className="object-contain"
        />
      </div>

      {/* ── Content container ── */}
      <div
        className="relative z-10 w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        style={{
          maxWidth: 1440,
          paddingLeft: "clamp(16px, 2vw, 24px)",
          paddingRight: "clamp(16px, 2vw, 24px)",
          paddingTop: "clamp(96px, 12vh, 140px)",
          paddingBottom: "clamp(80px, 10vh, 120px)",
        }}
      >
        {/* ────────────────────────────────────────────────────
           LEFT COLUMN — Text Content (cols 1-6)
           ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col gap-6" data-hero-content>
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3"
            style={{ animation: "fade-in 0.4s 0ms cubic-bezier(0.19,1,0.22,1) both" }}
          >
            <span
              className="block rounded-pill bg-signal-ai"
              style={{ width: 8, height: 2 }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase text-signal-ai"
              style={{ fontSize: 11, letterSpacing: "0.14em" }}
            >
              AI-Powered MSME Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold text-ink-primary"
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            {/* Line 1 */}
            <span className="line-mask">
              <span
                className="line-mask-inner"
                style={{ animationDelay: "100ms" }}
              >
                Your Business.
              </span>
            </span>
            {/* Line 2 */}
            <span className="line-mask">
              <span
                className="line-mask-inner"
                style={{ animationDelay: "200ms" }}
              >
                Understood by{" "}
                <span className="text-signal-ai">AI</span>.
              </span>
            </span>
          </h1>

          {/* AI underline bar */}
          <div
            className="ai-underline-glow"
            style={{
              width: "60%",
              maxWidth: 320,
              marginTop: -4,
              animation: "hero-scale-in 0.4s 300ms cubic-bezier(0.19,1,0.22,1) both",
              transformOrigin: "left center",
            }}
            aria-hidden="true"
          />

          {/* Sub-headline */}
          <p
            className="text-body-fluid text-ink-secondary font-body"
            style={{
              maxWidth: 480,
              lineHeight: 1.55,
              animation: "fade-up 0.4s 200ms cubic-bezier(0.19,1,0.22,1) both",
            }}
          >
            One link. Your entire business becomes intelligent.
            Website → Knowledge Base → AI Chatbot → Growth.
            Enterprise AI at ₹198/year.
          </p>

          {/* CTA Button Group */}
          <div
            className="flex flex-col sm:flex-row items-start gap-4"
            style={{
              animation: "hero-scale-in 0.4s 300ms cubic-bezier(0.19,1,0.22,1) both",
            }}
          >
            {/* Primary CTA */}
            <button
              type="button"
              onClick={onOpenVerification}
              className="group/cta inline-flex items-center gap-2.5 rounded-btn bg-signal-ai hover:bg-signal-ai-hover text-white font-semibold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-deep"
              style={{
                fontSize: 14,
                letterSpacing: "0.06em",
                padding: "14px 32px",
                boxShadow: "0 0 20px rgba(79,70,229,0.15), 0 4px 12px rgba(79,70,229,0.2)",
              }}
            >
              <span>Request Access</span>
              <ArrowRight
                className="cta-arrow"
                size={15}
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </button>

            {/* Secondary CTA */}
            <a
              href="#demo"
              className="group inline-flex items-center gap-2.5 rounded-btn text-ink-secondary hover:text-ink-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 32px",
                border: "1px solid rgba(15,23,42,0.12)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(15,23,42,0.24)";
                e.currentTarget.style.background = "rgba(15,23,42,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(15,23,42,0.12)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Play
                size={13}
                strokeWidth={2.2}
                className="text-ink-secondary group-hover:text-ink-primary transition-colors"
                aria-hidden="true"
              />
              <span>Watch Demo</span>
            </a>
          </div>

          {/* Trust Strip */}
          <div
            className="flex items-center gap-3 flex-wrap"
            style={{
              animation: "fade-up 0.35s 500ms cubic-bezier(0.19,1,0.22,1) both",
            }}
          >
            {/* Item 1 */}
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-signal-growth" />
              <span
                className="font-mono uppercase text-ink-muted"
                style={{ fontSize: 11, letterSpacing: "0.12em" }}
              >
                Verified AI
              </span>
            </div>

            <span className="trust-dot" aria-hidden="true" />

            {/* Item 2 */}
            <span
              className="font-mono uppercase text-signal-commerce"
              style={{ fontSize: 11, letterSpacing: "0.12em" }}
            >
              FROM ₹16.5/MONTH
            </span>

            <span className="trust-dot" aria-hidden="true" />

            {/* Item 3 */}
            <div className="flex items-center gap-1.5">
              <Shield size={12} className="text-ink-muted" />
              <span
                className="font-mono uppercase text-ink-muted"
                style={{ fontSize: 11, letterSpacing: "0.12em" }}
              >
                Enterprise Grade
              </span>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────
           RIGHT COLUMN — Sculpture Centerpiece + Overlapping Dashboard (cols 7-12)
           ──────────────────────────────────────────────────── */}
        <div
          className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]"
          data-hero-dashboard
        >
          {/* Main Visual: Layered Porcelain Sculpture (desktop & tablet) */}
          <div
            ref={sculptureRef}
            data-hero-sculpture
            className="hidden md:block relative w-full max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] aspect-square animate-sculpture-in will-change-transform"
          >
            {/* Soft radial indigo aura BEHIND the sculpture */}
            <div
              className="absolute -inset-8 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0.03) 50%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Floating drift wrapper with seamless transparent image */}
            <div className="relative w-full h-full animate-sculpture-drift">
              <Image
                src="/hero-sculpture.png"
                alt="Concentric layered porcelain neural architecture"
                fill
                priority
                quality={92}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                className="object-contain select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Overlapping Dashboard Preview Card */}
          {/* Mobile: returns to normal flow below text. Desktop: overlaps bottom-left corner of sculpture */}
          <div
            ref={dashboardCardRef}
            className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[360px] relative md:absolute md:-bottom-4 md:-left-4 lg:-bottom-6 lg:-left-8 z-20 will-change-transform"
            style={{
              animation: "hero-panel-in 0.6s 400ms cubic-bezier(0.19,1,0.22,1) both",
            }}
          >
            <DashboardCard />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
