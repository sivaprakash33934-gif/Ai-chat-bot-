"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  BrainCircuit,
  MessageSquare,
  BarChart3,
  Users,
  Ticket,
  Key,
  FileText,
  Settings,
  Lock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Copy,
  CheckCircle2,
  Bell,
  Terminal,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

/* — Sidebar nav — */
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BrainCircuit,    label: "AI Knowledge" },
  { icon: MessageSquare,   label: "Chatbot" },
  { icon: BarChart3,       label: "Analytics" },
  { icon: Users,           label: "Customers" },
  { icon: Ticket,          label: "Tickets" },
  { icon: Key,             label: "API Keys" },
  { icon: FileText,        label: "Invoices" },
  { icon: Settings,        label: "Settings" },
];

/* — Stat cards — */
interface StatCard {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  trend: string;
  up: boolean;
}

const STATS: StatCard[] = [
  { label: "TOTAL VISITORS",    target: 12847, trend: "+12%", up: true },
  { label: "AI CONVERSATIONS",  target: 3421,  trend: "+8%",  up: true },
  { label: "TICKETS RESOLVED",  target: 156,   trend: "+23%", up: true },
  { label: "REVENUE",           target: 45200, prefix: "₹", trend: "+15%", up: true },
];

/* — Chart — */
const CHART_BARS = [
  { day: "Mon", h: 40 },
  { day: "Tue", h: 60 },
  { day: "Wed", h: 80 },
  { day: "Thu", h: 50 },
  { day: "Fri", h: 90 },
  { day: "Sat", h: 70 },
  { day: "Sun", h: 85 },
];

/* — Conversations — */
const CONVERSATIONS = [
  { q: "What are your business hours?",       time: "2m ago",  badge: "AI",    badgeColor: "#047857" },
  { q: "I need a refund for order #4521",      time: "8m ago",  badge: "Human", badgeColor: "#B45309" },
  { q: "Do you deliver to Coimbatore?",        time: "14m ago", badge: "AI",    badgeColor: "#047857" },
  { q: "Can I get a bulk pricing quote?",      time: "22m ago", badge: "Human", badgeColor: "#B45309" },
];

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */

/** Count-up hook via requestAnimationFrame */
function useCountUp(target: number, active: boolean, duration = 1500): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out quart */
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return value;
}

/** Format number with comma separators */
function fmt(n: number): string {
  return n.toLocaleString("en-IN");
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* — Single Stat Card — */
function StatCardItem({ stat, active }: { stat: StatCard; active: boolean }) {
  const count = useCountUp(stat.target, active);
  return (
    <div
      className="bg-surface-1 rounded-card p-4 border border-hairline flex flex-col gap-1"
    >
      <span
        className="font-mono uppercase text-ink-tertiary"
        style={{ fontSize: 10, letterSpacing: "0.10em" }}
      >
        {stat.label}
      </span>
      <div className="flex items-end gap-2">
        <span
          className="font-mono font-semibold text-ink-primary tabular-data"
          style={{ fontSize: 24, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}
        >
          {stat.prefix ?? ""}{fmt(count)}
        </span>
        <span
          className="flex items-center gap-0.5 font-mono pb-0.5"
          style={{ fontSize: 11, color: stat.up ? "#047857" : "#DC2626" }}
        >
          {stat.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {stat.trend}
        </span>
      </div>
    </div>
  );
}

/* — Sidebar — */
function Sidebar() {
  return (
    <div
      className="hidden md:flex flex-col flex-shrink-0"
      style={{
        width: 220,
        background: "#F7F8FA",
        borderRight: "1px solid rgba(15,23,42,0.06)",
        padding: 16,
      }}
    >
      {/* User block */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center">
          <span className="font-display text-xs font-bold text-ink-secondary">A</span>
        </div>
        <span className="font-display text-[13px] font-semibold text-ink-primary truncate">
          Acme Corp
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-btn text-[13px] font-body cursor-default transition-colors
                ${
                  item.active
                    ? "text-ink-primary"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-black/[0.04]"
                }`}
              style={
                item.active
                  ? {
                      background: "rgba(79,70,229,0.06)",
                      borderLeft: "2px solid #4F46E5",
                      paddingLeft: 10,
                    }
                  : undefined
              }
            >
              <Icon size={15} strokeWidth={1.8} className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Bottom: AI Status + Storage */}
      <div className="mt-auto pt-4 flex flex-col gap-3 border-t border-black/[0.06]">
        <div className="flex items-center gap-2 px-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal-growth opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-growth" />
          </span>
          <span className="font-mono text-ink-secondary" style={{ fontSize: 11 }}>
            AI Status: Active
          </span>
        </div>
        <div className="px-1">
          <div className="flex justify-between mb-1">
            <span className="font-mono text-ink-muted" style={{ fontSize: 9, letterSpacing: "0.10em" }}>
              STORAGE
            </span>
            <span className="font-mono text-ink-muted" style={{ fontSize: 9 }}>
              30%
            </span>
          </div>
          <div className="h-1 rounded-pill bg-surface-3 overflow-hidden">
            <div className="h-full rounded-pill bg-signal-ai" style={{ width: "30%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* — Weekly chart — */
function WeeklyChart({ active }: { active: boolean }) {
  return (
    <div className="bg-surface-2 rounded-card p-4 border border-hairline flex flex-col">
      <span className="font-display text-sm font-semibold text-ink-primary mb-4">
        Weekly Visitors
      </span>
      <div className="flex items-end gap-2 flex-1" style={{ minHeight: 120 }}>
        {CHART_BARS.map((bar, i) => (
          <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5">
            {/* bar */}
            <div className="w-full flex items-end" style={{ height: 100 }}>
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${bar.h}%`,
                  background: `rgba(79,70,229,${0.4 + (bar.h / 100) * 0.6})`,
                  transform: active ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "bottom",
                  transition: `transform 600ms ${i * 100}ms cubic-bezier(0.19,1,0.22,1)`,
                }}
              />
            </div>
            {/* label */}
            <span className="font-mono text-ink-muted" style={{ fontSize: 10 }}>
              {bar.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* — Recent Conversations — */
function RecentConversations() {
  return (
    <div className="bg-surface-2 rounded-card p-4 border border-hairline flex flex-col">
      <span className="font-display text-sm font-semibold text-ink-primary mb-3">
        Recent Conversations
      </span>
      <div className="flex flex-col gap-2.5">
        {CONVERSATIONS.map((conv) => (
          <div key={conv.q} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-surface-3 flex-shrink-0" />
            <span className="flex-1 text-xs text-ink-secondary truncate font-body">
              {conv.q}
            </span>
            <span className="font-mono text-ink-muted flex-shrink-0" style={{ fontSize: 10 }}>
              {conv.time}
            </span>
            <span
              className="font-mono uppercase flex-shrink-0 rounded-pill px-1.5 py-0.5"
              style={{
                fontSize: 9,
                color: conv.badgeColor,
                background: `${conv.badgeColor}18`,
                border: `1px solid ${conv.badgeColor}30`,
              }}
            >
              {conv.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* — API Key Strip — */
function ApiKeyStrip() {
  return (
    <div className="bg-surface-2 rounded-card px-4 py-3 border border-hairline flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="font-mono uppercase text-ink-tertiary flex-shrink-0" style={{ fontSize: 10, letterSpacing: "0.10em" }}>
        Live API Key
      </span>
      <span className="font-mono text-ink-primary flex-1 truncate" style={{ fontSize: 13 }}>
        <span className="text-ink-primary">nk_live_a4b8c</span>
        <span className="text-ink-muted">•••••••</span>
        <span className="text-ink-primary">8f92</span>
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn font-mono uppercase text-ink-secondary hover:text-ink-primary transition-colors border border-black/[0.08] hover:border-black/[0.16]" style={{ fontSize: 11 }}>
          <Copy size={11} /> Copy
        </button>
        <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn font-mono uppercase text-ink-secondary hover:text-ink-primary transition-colors border border-black/[0.08] hover:border-black/[0.16]" style={{ fontSize: 11 }}>
          <RefreshCw size={11} /> Regenerate
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING BADGES
   ═══════════════════════════════════════════════════════════════ */

function FloatingTicket() {
  return (
    <div
      className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-card animate-float-drift"
      style={{
        background: "#F7F8FA",
        border: "1px solid rgba(180,83,9,0.2)",
        boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
      }}
    >
      <Bell size={12} className="text-signal-commerce" />
      <span className="font-mono text-signal-commerce" style={{ fontSize: 10, letterSpacing: "0.10em" }}>
        New Support Ticket
      </span>
    </div>
  );
}

function FloatingAccuracy() {
  return (
    <div
      className="absolute -bottom-4 -left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-card animate-float-drift"
      style={{
        background: "#F7F8FA",
        border: "1px solid rgba(4,120,87,0.2)",
        boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
        animationDelay: "1.5s",
      }}
    >
      <CheckCircle2 size={12} className="text-signal-growth" />
      <span className="font-mono text-signal-growth" style={{ fontSize: 10, letterSpacing: "0.10em" }}>
        98% Accuracy
      </span>
    </div>
  );
}

function FloatingApiCall() {
  return (
    <div
      className="absolute -top-4 -left-6 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-card animate-float-drift"
      style={{
        background: "#F7F8FA",
        border: "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
        animationDelay: "3s",
      }}
    >
      <Terminal size={10} className="text-signal-growth" />
      <span className="font-mono text-signal-growth" style={{ fontSize: 10 }}>
        {"> POST /v1/chat 200 OK"}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN: DASHBOARD SHOWCASE
   ═══════════════════════════════════════════════════════════════ */
export function DashboardShowcase() {
  /* ── Section visibility ── */
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [dashVisible, setDashVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          setTimeout(() => setDashVisible(true), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── 3D parallax tilt via rAF (no state re-renders) ── */
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltRAF = useRef(0);
  const currentTilt = useRef({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });

  const lerpTilt = useCallback(() => {
    const c = currentTilt.current;
    const t = targetTilt.current;
    c.x += (t.x - c.x) * 0.1;
    c.y += (t.y - c.y) * 0.1;
    if (frameRef.current) {
      frameRef.current.style.transform = `perspective(1200px) rotateX(${c.x}deg) rotateY(${c.y}deg)`;
    }
    if (Math.abs(t.x - c.x) > 0.01 || Math.abs(t.y - c.y) > 0.01) {
      tiltRAF.current = requestAnimationFrame(lerpTilt);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetTilt.current = { x: ny * -2, y: nx * 2 };
      cancelAnimationFrame(tiltRAF.current);
      tiltRAF.current = requestAnimationFrame(lerpTilt);
    },
    [lerpTilt]
  );

  const handleMouseLeave = useCallback(() => {
    targetTilt.current = { x: 0, y: 0 };
    cancelAnimationFrame(tiltRAF.current);
    tiltRAF.current = requestAnimationFrame(lerpTilt);
  }, [lerpTilt]);

  useEffect(() => {
    return () => cancelAnimationFrame(tiltRAF.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dashboard-showcase"
      className="relative bg-canvas-deep"
      style={{
        paddingTop: "clamp(64px, 8vh, 96px)",
        paddingBottom: "clamp(64px, 8vh, 96px)",
      }}
    >
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
            transition: "opacity 500ms cubic-bezier(0.19,1,0.22,1), transform 500ms cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block rounded-pill bg-signal-ai" style={{ width: 8, height: 2 }} aria-hidden="true" />
            <span className="font-mono uppercase text-signal-ai" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
              Command Center
            </span>
          </div>
          <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight mb-4">
            Your Business.{" "}
            <span className="text-ink-secondary">One Dashboard.</span>
          </h2>
          <p className="text-body-fluid text-ink-secondary font-body" style={{ maxWidth: 600 }}>
            Manage everything — AI knowledge, customer chats, analytics, API keys,
            tickets, and insights — from a single enterprise dashboard.
          </p>
        </div>

        {/* ── Dashboard Frame ── */}
        <div
          className="relative"
          style={{
            opacity: dashVisible ? 1 : 0,
            transform: dashVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 600ms 100ms cubic-bezier(0.19,1,0.22,1), transform 600ms 100ms cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          {/* Floating badges */}
          <FloatingTicket />
          <FloatingAccuracy />
          <FloatingApiCall />

          {/* Glow behind frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(79,70,229,0.05) 0%, transparent 60%)",
              transform: "scale(1.2)",
            }}
            aria-hidden="true"
          />

          {/* Browser frame wrapper with 3D tilt */}
          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden will-change-transform"
            style={{
              borderRadius: 24,
              border: "1px solid rgba(15,23,42,0.08)",
              background: "#FFFFFF",
              boxShadow: "0 16px 48px rgba(16,24,40,0.10), 0 8px 16px rgba(16,24,40,0.06)",
            }}
          >
            {/* ── Browser Chrome ── */}
            <div
              className="flex items-center px-4"
              style={{
                height: 40,
                background: "#F7F8FA",
                borderBottom: "1px solid rgba(15,23,42,0.06)",
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(245,158,11,0.6)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(16,185,129,0.6)" }} />
              </div>
              {/* URL bar */}
              <div className="flex-1 flex justify-center">
                <div
                  className="flex items-center gap-2 px-4 py-1 rounded-pill"
                  style={{ background: "#F1F2F5" }}
                >
                  <Lock size={10} className="text-ink-muted" />
                  <span className="font-mono text-ink-muted" style={{ fontSize: 11 }}>
                    app.yourbusiness.com/dashboard
                  </span>
                </div>
              </div>
              {/* Spacer for symmetry */}
              <div style={{ width: 56 }} />
            </div>

            {/* ── Dashboard Interior ── */}
            <div className="flex" style={{ minHeight: 500 }}>
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div
                className="flex-1 flex flex-col gap-5 overflow-hidden"
                style={{ background: "#FFFFFF", padding: "clamp(16px, 2vw, 24px)" }}
              >
                {/* ── Top: 4 Stat Cards ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {STATS.map((stat) => (
                    <StatCardItem key={stat.label} stat={stat} active={dashVisible} />
                  ))}
                </div>

                {/* ── Middle: Chart + Conversations ── */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-3">
                    <WeeklyChart active={dashVisible} />
                  </div>
                  <div className="md:col-span-2">
                    <RecentConversations />
                  </div>
                </div>

                {/* ── Bottom: API Key Strip ── */}
                <ApiKeyStrip />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
