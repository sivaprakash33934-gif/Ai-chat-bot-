"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Globe,
  Bug,
  BrainCircuit,
  Cpu,
  Rocket,
  MessageSquareText,
  TrendingUp,
  Search,
  Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   STEP DATA
   ═══════════════════════════════════════════════════════════════ */
interface PipelineStep {
  id: string;
  icon: React.ElementType;
  label: string;
  subLabel: string;
  /** Extra CSS class on the node circle */
  nodeClass?: string;
  /** If true, add the scan-overlay to the node */
  scan?: boolean;
  /** If true, add the pulsing ring */
  pulseRing?: boolean;
  /** If true, mark as success/emerald */
  success?: boolean;
}

const STEPS: PipelineStep[] = [
  {
    id: "website",
    icon: Globe,
    label: "Business Domain",
    subLabel: "yoursite.com",
  },
  {
    id: "scrape",
    icon: Bug,
    label: "AI Reads & Scrapes",
    subLabel: "Products, Services, FAQs, Contact",
    scan: true,
  },
  {
    id: "knowledge",
    icon: BrainCircuit,
    label: "Knowledge Base Built",
    subLabel: "Website + PDF + Documents",
    nodeClass: "pipe-node-core",
  },
  {
    id: "neural-core",
    icon: Cpu,
    label: "Neural Core Engine",
    subLabel: "Private, Secure, Proprietary",
    pulseRing: true,
  },
  {
    id: "output",
    icon: Rocket,
    label: "AI Services Live",
    subLabel: "Chatbot, Analytics, Insights, Support",
    success: true,
  },
];

/* ═══════════════════════════════════════════════════════════════
   OUTPUT CARDS DATA
   ═══════════════════════════════════════════════════════════════ */
interface OutputCard {
  icon: React.ElementType;
  title: string;
  description: string;
  accentColor: string;
  glowColor: string;
}

const OUTPUT_CARDS: OutputCard[] = [
  {
    icon: MessageSquareText,
    title: "AI Chatbot",
    description:
      "Enterprise chatbot that answers customer questions using your business knowledge.",
    accentColor: "#4F46E5",
    glowColor: "rgba(79, 70, 229, 0.15)",
  },
  {
    icon: TrendingUp,
    title: "Business Intelligence",
    description:
      "AI analyzes your business and suggests growth strategies, marketing ideas, and market trends.",
    accentColor: "#B45309",
    glowColor: "rgba(180, 83, 9, 0.15)",
  },
  {
    icon: Search,
    title: "Analytics & SEO",
    description:
      "Track visitors, optimize for search engines, and monitor your digital presence.",
    accentColor: "#047857",
    glowColor: "rgba(4, 120, 87, 0.15)",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PIPELINE NODE
   ═══════════════════════════════════════════════════════════════ */
function PipelineNode({
  step,
  active,
}: {
  step: PipelineStep;
  active: boolean;
}) {
  const Icon = step.icon;
  const baseClasses = [
    "pipe-node",
    step.nodeClass ?? "",
    active ? (step.success ? "pipe-success" : "pipe-active") : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-3 relative">
      {/* Pulsing ring (Neural Core step) */}
      {step.pulseRing && active && (
        <span
          className="absolute inset-0 m-auto rounded-full animate-pulse-ring pointer-events-none"
          style={{
            width: 64,
            height: 64,
            border: "2px solid rgba(79,70,229,0.3)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Node circle */}
      <div className={baseClasses}>
        {/* Scan overlay for scraper step */}
        {step.scan && active && <div className="scan-overlay" aria-hidden="true" />}

        <Icon
          size={step.nodeClass === "pipe-node-core" ? 28 : 24}
          strokeWidth={1.8}
          className={`transition-colors duration-500 ${
            active
              ? step.success
                ? "text-signal-growth"
                : "text-signal-ai"
              : "text-ink-muted"
          }`}
        />
      </div>

      {/* Labels */}
      <div className={`pipe-label ${active ? "pipe-step-active" : ""}`}>
        <div className="pipe-title">{step.label}</div>
        <div className="pipe-sub mt-0.5">{step.subLabel}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONNECTING LINE (between nodes)
   ═══════════════════════════════════════════════════════════════ */

/** Horizontal line (desktop) */
function ConnectorH({ drawn }: { drawn: boolean }) {
  return (
    <div className="pipe-line-h hidden md:block">
      <div className={`pipe-line-fill-h ${drawn ? "pipe-drawn" : ""}`} />
      {drawn && <span className="pipe-packet-h" />}
    </div>
  );
}

/** Vertical line (mobile) */
function ConnectorV({ drawn }: { drawn: boolean }) {
  return (
    <div className="pipe-line-v md:hidden mx-auto">
      <div className={`pipe-line-fill-v ${drawn ? "pipe-drawn" : ""}`} />
      {drawn && <span className="pipe-packet-v" />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURE OUTPUT CARD
   ═══════════════════════════════════════════════════════════════ */
function FeatureCard({
  card,
  visible,
  delay,
}: {
  card: OutputCard;
  visible: boolean;
  delay: number;
}) {
  const Icon = card.icon;

  return (
    <div
      className="output-card bg-surface-1 rounded-card border border-hairline p-6 relative overflow-hidden"
      style={{
        borderTop: `2px solid ${card.accentColor}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 400ms ${delay}ms cubic-bezier(0.19,1,0.22,1), transform 400ms ${delay}ms cubic-bezier(0.19,1,0.22,1)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style.boxShadow = `0 0 24px ${card.glowColor}`);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style.boxShadow = "none");
      }}
    >
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-btn mb-4"
        style={{ background: `${card.accentColor}15` }}
      >
        <Icon size={20} strokeWidth={1.8} style={{ color: card.accentColor }} />
      </div>
      <h4 className="text-card font-display font-semibold text-ink-primary mb-2">
        {card.title}
      </h4>
      <p className="text-subtext text-ink-secondary leading-relaxed">
        {card.description}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN: HOW IT WORKS
   ═══════════════════════════════════════════════════════════════ */
export function HowItWorks() {
  /* ── Scroll-scrub state ── */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1); // -1 = none active
  const [cardsVisible, setCardsVisible] = useState(false);

  /* Cards visibility observer */
  const cardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Scroll-driven step activation ── */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportH = window.innerHeight;

      /* How far we've scrolled into the wrapper.
         0 = wrapper top just hit viewport top
         1 = wrapper bottom just hit viewport bottom */
      const scrolledInto = -rect.top;
      const totalScrollable = wrapperHeight - viewportH;
      const progress = Math.max(0, Math.min(1, scrolledInto / totalScrollable));

      /* Map progress to 5 steps:
         0.00-0.10 = step 0, 0.10-0.30 = step 1, 0.30-0.50 = step 2,
         0.50-0.70 = step 3, 0.70-1.00 = step 4 */
      const thresholds = [0, 0.10, 0.30, 0.50, 0.70];
      let step = -1;
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (progress >= thresholds[i]) {
          step = i;
          break;
        }
      }
      setActiveStep(step);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Helper: is a connecting line (index i, between step i and i+1) drawn? */
  const isLineDrawn = (lineIdx: number) => activeStep > lineIdx;

  return (
    <section
      id="ai-engine"
      className="relative"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF 0%, #FAFAFC 100%)",
      }}
    >
      {/* ── Scroll wrapper — provides ~300vh of scroll real-estate ── */}
      <div ref={wrapperRef} style={{ minHeight: "300vh", position: "relative" }}>
        {/* ── Sticky viewport — stays visible while user scrolls the wrapper ── */}
        <div
          className="sticky top-0 min-h-screen flex flex-col justify-center"
          style={{
            paddingTop: "clamp(64px, 8vh, 96px)",
            paddingBottom: "clamp(64px, 8vh, 96px)",
          }}
        >
          <div
            className="mx-auto w-full"
            style={{
              maxWidth: 1440,
              paddingLeft: "clamp(16px, 2vw, 24px)",
              paddingRight: "clamp(16px, 2vw, 24px)",
            }}
          >
            {/* ── Section Header ── */}
            <div className="mb-16 max-w-2xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="block rounded-pill bg-signal-ai"
                  style={{ width: 8, height: 2 }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono uppercase text-signal-ai"
                  style={{ fontSize: 11, letterSpacing: "0.14em" }}
                >
                  The Intelligence Pipeline
                </span>
              </div>

              {/* Title */}
              <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight mb-4">
                From Your Website to AI Intelligence
              </h2>

              {/* Sub-text */}
              <p
                className="text-body-fluid text-ink-secondary font-body"
                style={{ maxWidth: 560 }}
              >
                Give us your domain link. Our AI reads, understands, and builds
                your business knowledge base automatically.
              </p>
            </div>

            {/* ═══════════════════════════════════════════════════
               FLOW DIAGRAM
               ═══════════════════════════════════════════════════ */}

            {/* Desktop: horizontal row */}
            <div className="hidden md:flex items-center justify-between gap-0 mb-20">
              {STEPS.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <PipelineNode step={step} active={activeStep >= idx} />
                  {idx < STEPS.length - 1 && (
                    <ConnectorH drawn={isLineDrawn(idx)} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile: vertical column */}
            <div className="flex md:hidden flex-col items-center gap-0 mb-16">
              {STEPS.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <PipelineNode step={step} active={activeStep >= idx} />
                  {idx < STEPS.length - 1 && (
                    <ConnectorV drawn={isLineDrawn(idx)} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ── Step progress indicator ── */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  className="rounded-pill transition-all duration-300"
                  style={{
                    width: activeStep === idx ? 24 : 6,
                    height: 6,
                    background:
                      activeStep >= idx
                        ? step.success
                          ? "#047857"
                          : "#4F46E5"
                        : "rgba(15, 23, 42, 0.12)",
                  }}
                />
              ))}
            </div>

            {/* Scroll hint */}
            <p className="text-center font-mono text-ink-muted" style={{ fontSize: 10, letterSpacing: "0.12em" }}>
              {activeStep < 4
                ? "SCROLL TO ADVANCE THE PIPELINE ↓"
                : "PIPELINE COMPLETE — AI SERVICES DEPLOYED ✓"}
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
         OUTPUT FEATURE CARDS — below the pinned flow
         ═══════════════════════════════════════════════════════ */}
      <div
        ref={cardsRef}
        className="mx-auto w-full"
        style={{
          maxWidth: 1440,
          paddingLeft: "clamp(16px, 2vw, 24px)",
          paddingRight: "clamp(16px, 2vw, 24px)",
          paddingTop: "clamp(48px, 6vh, 80px)",
          paddingBottom: "clamp(64px, 8vh, 96px)",
        }}
      >
        {/* Section mini-header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles size={14} className="text-signal-commerce" />
            <span
              className="font-mono uppercase text-signal-commerce"
              style={{ fontSize: 11, letterSpacing: "0.14em" }}
            >
              What Your AI Produces
            </span>
          </div>
          <h3 className="text-card font-display font-semibold text-ink-primary">
            Three Pillars of AI Output
          </h3>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OUTPUT_CARDS.map((card, idx) => (
            <FeatureCard
              key={card.title}
              card={card}
              visible={cardsVisible}
              delay={idx * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
