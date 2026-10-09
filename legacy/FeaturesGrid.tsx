"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Database,
  TrendingUp,
  BarChart3,
  Code2,
  Users,
  FileText,
  Search,
  Video,
  ArrowUpRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   FEATURE DATA
   ═══════════════════════════════════════════════════════════════ */
interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  isCore?: boolean;
}

const FEATURES: Feature[] = [
  {
    id: "chatbot",
    icon: MessageSquare,
    title: "AI Chatbot",
    description:
      "Modern enterprise chatbot powered by Neural Core. Answers customer questions using your website data, PDFs, and business knowledge. Multilingual support with human escalation fallback.",
    isCore: true,
  },
  {
    id: "knowledge",
    icon: Database,
    title: "Knowledge Base",
    description:
      "Upload PDFs, documents, business info, and compliance data. AI processes everything into a searchable knowledge base that powers all AI services.",
  },
  {
    id: "bi",
    icon: TrendingUp,
    title: "Business Intelligence",
    description:
      "AI analyzes your business data and provides growth suggestions, marketing ideas, market trends, competitor insights, and actionable recommendations.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Website Analytics",
    description:
      "Track daily, weekly, monthly, and yearly visitors. Understand traffic patterns, peak hours, and visitor behavior with clean visual dashboards.",
  },
  {
    id: "api",
    icon: Code2,
    title: "API + SDK Access",
    description:
      "Individual API keys for every business. SDK support for React, Next.js, JavaScript, Android, and Swift. One AI platform, multiple applications.",
  },
  {
    id: "crm",
    icon: Users,
    title: "Mini CRM + Human Support",
    description:
      "Monitor customer chats, manage tickets, handle complaints. AI handles normal queries, humans take over complex ones. Seamless escalation flow.",
  },
  {
    id: "invoice",
    icon: FileText,
    title: "Invoice Generator",
    description:
      "Create professional invoices with customer details, business info, product/service line items, and amounts. Download and share instantly.",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO / AEO / GEO",
    description:
      "Optimize your business for traditional search engines, AI answer engines, and generative AI systems. Stay discoverable everywhere.",
  },
  {
    id: "video",
    icon: Video,
    title: "Jitsi Integration",
    description:
      "Built-in audio and video calls for customer meetings, support calls, team communication, and AI-to-human escalation conversations.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   INDIVIDUAL FEATURE CARD
   ═══════════════════════════════════════════════════════════════ */
interface CardProps {
  feature: Feature;
  /** Whether the card is in the visible viewport (for entry animation) */
  visible: boolean;
  /** Stagger delay in ms */
  delay: number;
}

function FeatureCard({ feature, visible, delay }: CardProps) {
  const Icon = feature.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  /* 3D tilt state */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    /* Normalise to -1 … 1 */
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    /* Clamp to ±2 degrees */
    setTilt({ x: ny * -2, y: nx * 2 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  /* Card base style — entry animation driven by `visible` + `delay` */
  const cardStyle: React.CSSProperties = {
    /* Entry animation */
    opacity: visible ? 1 : 0,
    transform: visible
      ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0)`
      : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(20px)",
    transition: visible
      ? `opacity 400ms ${delay}ms cubic-bezier(0.19,1,0.22,1),
         transform 400ms ${delay}ms cubic-bezier(0.19,1,0.22,1)`
      : "none",
    /* When hovered the tilt overrides the entry transform instantly */
    ...(hovered && {
      transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`,
      transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms ease-out, box-shadow 200ms ease-out",
    }),
    /* Core card — top accent + inner glow */
    borderTop: feature.isCore ? "2px solid #4F46E5" : "1px solid rgba(15,23,42,0.06)",
    boxShadow: feature.isCore
      ? "inset 0 0 24px rgba(79,70,229,0.05)"
      : "none",
  };

  return (
    <div
      ref={cardRef}
      role="article"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`relative flex flex-col gap-4 rounded-card p-6 bg-surface-1 border transition-[border-color,box-shadow] will-change-transform
        ${hovered ? "border-black/[0.12]" : "border-black/[0.06]"}
        ${feature.isCore ? "border-t-signal-ai" : ""}`}
    >
      {/* ── CORE badge (top-right corner) ── */}
      {feature.isCore && (
        <span
          className="absolute top-4 right-4 font-mono uppercase text-signal-ai rounded-micro px-2 py-0.5"
          style={{
            fontSize: 9,
            letterSpacing: "0.10em",
            background: "rgba(79,70,229,0.10)",
          }}
          aria-label="Core feature"
        >
          CORE
        </span>
      )}

      {/* ── Icon container ── */}
      <div
        className="inline-flex items-center justify-center rounded-btn transition-colors duration-200"
        style={{
          width: 40,
          height: 40,
          background: hovered
            ? "rgba(79,70,229,0.12)"
            : "rgba(79,70,229,0.06)",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <Icon
          size={20}
          strokeWidth={1.8}
          className="text-signal-ai transition-colors duration-200"
        />
      </div>

      {/* ── Title ── */}
      <h3
        className="font-display font-semibold text-ink-primary leading-snug"
        style={{ fontSize: 18 }}
      >
        {feature.title}
      </h3>

      {/* ── Description ── */}
      <p
        className="font-body text-ink-secondary flex-1"
        style={{ fontSize: 14, lineHeight: 1.55 }}
      >
        {feature.description}
      </p>

      {/* ── Learn more link ── */}
      <a
        href={`#feature-${feature.id}`}
        className="group/link inline-flex items-center gap-1 mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai rounded-micro"
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#4F46E5",
        }}
      >
        <span>Learn more</span>
        <ArrowUpRight
          size={11}
          strokeWidth={2.5}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        />
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN: FEATURES GRID
   ═══════════════════════════════════════════════════════════════ */
export function FeaturesGrid() {
  /* IntersectionObserver replaces GSAP ScrollTrigger */
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(FEATURES.length).fill(false)
  );

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    /* Stagger each child card individually */
    const cards = Array.from(el.children) as HTMLElement[];
    const observers: IntersectionObserver[] = [];

    cards.forEach((card, idx) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            obs.disconnect(); // fire once
          }
        },
        { threshold: 0, rootMargin: "0px 0px -15% 0px" } // trigger at 85% visibility
      );
      obs.observe(card);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Section header visibility */
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="relative bg-canvas-deep bg-dot-grid"
      style={{
        paddingTop: "clamp(64px, 8vh, 96px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
      {/* Subtle top ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "min(800px, 90vw)",
          height: 300,
          background:
            "radial-gradient(ellipse at top, rgba(79,70,229,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: 1440,
          paddingLeft: "clamp(16px, 2vw, 24px)",
          paddingRight: "clamp(16px, 2vw, 24px)",
        }}
      >
        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          className="mb-16 max-w-2xl"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 500ms cubic-bezier(0.19,1,0.22,1), transform 500ms cubic-bezier(0.19,1,0.22,1)",
          }}
        >
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
              Platform Capabilities
            </span>
          </div>

          {/* Title */}
          <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight mb-4">
            Everything Your Business Needs.{" "}
            <span className="text-ink-secondary">One Platform.</span>
          </h2>

          {/* Sub-text */}
          <p
            className="text-body-fluid text-ink-secondary font-body"
            style={{ maxWidth: 600 }}
          >
            From AI chatbot to business intelligence, analytics to invoicing —
            enterprise tools built for MSME.
          </p>
        </div>

        {/* ── 9-Card Grid: 3 cols desktop / 2 tablet / 1 mobile ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature, idx) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              visible={visibleCards[idx]}
              delay={idx * 80}
            />
          ))}
        </div>

        {/* ── Value footer strip ── */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-card bg-surface-1 border border-black/[0.06]"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 500ms 200ms cubic-bezier(0.19,1,0.22,1), transform 500ms 200ms cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-ink-muted uppercase"
              style={{ fontSize: 11, letterSpacing: "0.12em" }}
            >
              ALL 9 FEATURES INCLUDED
            </span>
            <span
              className="px-2 py-0.5 rounded-micro bg-signal-commerce/10 text-signal-commerce font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.10em" }}
            >
              FROM ₹16.5/MONTH
            </span>
          </div>
          <div className="flex items-center gap-2 text-ink-muted font-mono" style={{ fontSize: 11, letterSpacing: "0.10em" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-signal-growth" />
            <span>NO PER-FEATURE FEES · NO SEAT LIMITS · MSME VERIFIED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
