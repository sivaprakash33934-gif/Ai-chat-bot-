"use client";

import React, { useRef, useState, useEffect } from "react";
import { Database, Languages, UserCog, Bell, BadgeCheck } from "lucide-react";
import { ChatWindow } from "@/components/ChatbotWidget";

/* ═══════════════════════════════════════════════════════════════
   FEATURE BULLETS
   ═══════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: Database,
    title: "Knowledge-Powered",
    description:
      "Answers based on your specific website data and uploaded documents.",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description:
      "Speaks English, Tamil, Hindi, and more to serve your local customers.",
  },
  {
    icon: UserCog,
    title: "Smart Escalation",
    description:
      "Seamlessly transfers complex queries to your human support team.",
  },
];

/* Demo conversation pre-seeded into the showcase mockup */
const SHOWCASE_MESSAGES = [
  {
    id: "s-ai-1",
    role: "ai" as const,
    text: "Hello! How can I help you with our services today?",
  },
  {
    id: "s-user-1",
    role: "user" as const,
    text: "What are your business hours?",
  },
];

/* ═══════════════════════════════════════════════════════════════
   FLOATING BADGES (decorative around the mockup)
   ═══════════════════════════════════════════════════════════════ */
function TicketToast() {
  return (
    <div
      className="absolute -top-3 -right-3 flex items-center gap-2 px-3 py-2 rounded-btn animate-float-drift"
      style={{
        background: "#F7F8FA",
        border: "1px solid rgba(245,158,11,0.2)",
        boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
        zIndex: 2,
      }}
    >
      <Bell size={12} className="text-signal-commerce" />
      <span
        className="font-mono uppercase text-signal-commerce"
        style={{ fontSize: 10, letterSpacing: "0.10em" }}
      >
        Ticket Created
      </span>
    </div>
  );
}

function AccuracyBadge() {
  return (
    <div
      className="absolute -bottom-3 -left-3 flex items-center gap-2 px-3 py-2 rounded-btn animate-float-drift"
      style={{
        background: "#F7F8FA",
        border: "1px solid rgba(16,185,129,0.2)",
        boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
        animationDelay: "1.5s",
        zIndex: 2,
      }}
    >
      <BadgeCheck size={12} className="text-signal-growth" />
      <span
        className="font-mono uppercase text-signal-growth"
        style={{ fontSize: 10, letterSpacing: "0.10em" }}
      >
        98% Accuracy
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHOWCASE SECTION
   ═══════════════════════════════════════════════════════════════ */
export function ChatbotShowcase() {
  /* ── Section visibility ── */
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          setTimeout(() => setContentVisible(true), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Simulated typing reply in showcase ── */
  const [showTyping, setShowTyping] = useState(false);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    if (!contentVisible) return;
    /* After showcase becomes visible, simulate the typing + reply */
    const t1 = setTimeout(() => setShowTyping(true), 800);
    const t2 = setTimeout(() => {
      setShowTyping(false);
      setShowReply(true);
    }, 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [contentVisible]);

  /* Build the showcase messages dynamically */
  const showcaseMessages = [
    ...SHOWCASE_MESSAGES,
    ...(showReply
      ? [
          {
            id: "s-ai-2",
            role: "ai" as const,
            text: "We are open Monday to Saturday, 9:00 AM to 6:00 PM IST. Our AI chatbot is available 24/7 for instant responses.",
          },
        ]
      : []),
  ];

  return (
    <section
      ref={sectionRef}
      id="chatbot-showcase"
      className="relative bg-canvas-deep"
      style={{
        paddingTop: "clamp(64px, 8vh, 96px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(800px, 90vw)",
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(79,70,229,0.06) 0%, transparent 70%)",
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
          className="mb-16 max-w-2xl"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 500ms cubic-bezier(0.19,1,0.22,1), transform 500ms cubic-bezier(0.19,1,0.22,1)",
          }}
        >
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
              Enterprise Conversational AI
            </span>
          </div>

          <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight mb-4">
            Your Customers.{" "}
            <span className="text-ink-secondary">Answered Instantly.</span>
          </h2>

          <p
            className="text-body-fluid text-ink-secondary font-body"
            style={{ maxWidth: 600 }}
          >
            An enterprise chatbot that reads your website, understands your PDFs,
            and answers customer questions 24/7. Powered by our private Neural Core AI for
            maximum privacy and speed.
          </p>
        </div>

        {/* ── Split Layout: features (left 5) + mockup (right 7) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ──────────── LEFT: Feature blocks ──────────── */}
          <div
            className="lg:col-span-5 flex flex-col gap-8"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible
                ? "translateY(0)"
                : "translateY(20px)",
              transition:
                "opacity 500ms 100ms cubic-bezier(0.19,1,0.22,1), transform 500ms 100ms cubic-bezier(0.19,1,0.22,1)",
            }}
          >
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center rounded-btn flex-shrink-0 mt-1"
                    style={{
                      width: 40,
                      height: 40,
                      background: "rgba(79,70,229,0.08)",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className="text-signal-ai"
                    />
                  </div>
                  <div>
                    <h4
                      className="font-display font-semibold text-ink-primary mb-1"
                      style={{ fontSize: 16 }}
                    >
                      {feat.title}
                    </h4>
                    <p
                      className="text-ink-secondary font-body"
                      style={{ fontSize: 14, lineHeight: 1.55 }}
                    >
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Metric strip */}
            <div className="flex items-center gap-6 pt-4">
              {[
                { label: "AVG RESPONSE", value: "<0.8s" },
                { label: "ACCURACY", value: "98%" },
                { label: "LANGUAGES", value: "22+" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span
                    className="font-mono font-bold text-ink-primary"
                    style={{ fontSize: 18 }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="font-mono uppercase text-ink-muted"
                    style={{ fontSize: 9, letterSpacing: "0.12em" }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ──────────── RIGHT: Chat mockup ──────────── */}
          <div
            className="lg:col-span-7 flex justify-center lg:justify-end"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible
                ? "translateX(0)"
                : "translateX(40px)",
              transition:
                "opacity 500ms 250ms cubic-bezier(0.19,1,0.22,1), transform 500ms 250ms cubic-bezier(0.19,1,0.22,1)",
            }}
          >
            <div className="relative w-full" style={{ maxWidth: 420 }}>
              {/* Floating decorative badges */}
              <TicketToast />
              <AccuracyBadge />

              {/* Glow behind card */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(79,70,229,0.08) 0%, transparent 70%)",
                  transform: "scale(1.3)",
                }}
                aria-hidden="true"
              />

              {/* Device frame */}
              <div
                className="relative overflow-hidden"
                style={{
                  background: "#F7F8FA",
                  border: "1px solid rgba(15,23,42,0.06)",
                  borderRadius: 24,
                  padding: 12,
                  boxShadow: "0 16px 48px rgba(16,24,40,0.10)",
                }}
              >
                {/* Inner chat — rendered in embedded mode */}
                <div
                  className="overflow-hidden"
                  style={{ borderRadius: 16, height: 480 }}
                >
                  <ChatWindow
                    embedded
                    initialMessages={showcaseMessages}
                    key={showReply ? "with-reply" : "no-reply"}
                  />
                  {/* Overlay typing indicator if active */}
                  {showTyping && (
                    <div
                      className="absolute bottom-20 left-4 flex items-center gap-1 px-4 py-3"
                      style={{
                        background: "#F7F8FA",
                        borderRadius: "4px 12px 12px 12px",
                        border: "1px solid rgba(15,23,42,0.06)",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full bg-signal-ai animate-typing-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
