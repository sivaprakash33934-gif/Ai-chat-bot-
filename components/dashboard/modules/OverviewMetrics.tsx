"use client";

import { motion } from "framer-motion";
import { Activity, Radar, Share2, Cpu, type LucideIcon } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { queryVelocityData } from "@/lib/mock-data";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Metric {
  label: string;
  value: string;
  icon: LucideIcon;
  delta: string;
  pulse?: boolean;
}

const METRICS: Metric[] = [
  { label: "Live Queries (24h)", value: "12,489", icon: Activity, delta: "+8.2%", pulse: true },
  { label: "Intent Signals Caught", value: "9,204", icon: Radar, delta: "+5.1%" },
  { label: "Knowledge Graph Nodes", value: "48,120", icon: Share2, delta: "+1.4%" },
  { label: "Stateless API Calls", value: "312,045", icon: Cpu, delta: "+14.7%" },
];

interface AxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string | number };
}

function XAxisTick({ x = 0, y = 0, payload }: AxisTickProps) {
  return (
    <text
      x={x}
      y={y + 12}
      textAnchor="middle"
      fontSize={10}
      fill="var(--color-dark-muted)"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {payload?.value}
    </text>
  );
}

function YAxisTick({ x = 0, y = 0, payload }: AxisTickProps) {
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor="end"
      fontSize={10}
      fill="var(--color-dark-muted)"
      style={{
        fontFamily: "var(--font-mono)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {payload?.value}
    </text>
  );
}

interface TooltipPayloadItem {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-md border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] px-3 py-2 font-mono text-xs">
      <p className="text-[var(--color-dark-muted)]">{label}</p>
      <p className="mt-1 tabular-nums text-white">
        {payload[0].value.toLocaleString()} queries
      </p>
    </div>
  );
}

export function OverviewMetrics() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Demand Signals
          </h1>
          <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
            Real-time telemetry across your commerce surfaces.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] px-3 py-1.5 font-mono text-[11px] text-[var(--color-dark-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
          Session Ephemeral — Data is not stored. Inference is stateless.
        </span>
      </div>

      {/* Metric Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : i * 0.05,
                duration: 0.25,
              }}
              className="group rounded-[4px] border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] p-5 transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--color-signal)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-[var(--color-dark-muted)]">
                  {metric.pulse && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ...(prefersReducedMotion && { duration: 0 }),
                      }}
                      className="relative flex h-2 w-2"
                    >
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-signal)] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-signal)]" />
                    </motion.span>
                  )}
                  {metric.label}
                </span>
                <Icon size={16} className="text-[var(--color-signal)]" />
              </div>
              <p className="mt-3 font-mono text-2xl tabular-nums text-white">
                {metric.value}
              </p>
              <p className="mt-1 font-mono text-xs tabular-nums text-[var(--color-signal)]">
                {metric.delta}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Query Velocity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: prefersReducedMotion ? 0 : 0.2,
          duration: 0.3,
        }}
        className="mt-6 rounded-[4px] border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] p-5 transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--color-signal)]"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wide text-[var(--color-dark-muted)]">
            Query Velocity — Last 24h
          </h2>
          <span className="font-mono text-[11px] text-[var(--color-dark-muted)]">
            queries / hour
          </span>
        </div>

        <div className="mt-4 min-w-0 w-full">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={queryVelocityData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              aria-label="Query velocity over the last 24 hours"
            >
              <defs>
                <linearGradient
                  id="queryVelocityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="hour"
                tick={<XAxisTick />}
                axisLine={{ stroke: "var(--color-dark-border)" }}
                tickLine={false}
                interval={2}
              />
              <YAxis
                tick={<YAxisTick />}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--color-dark-border)" }} />
              <Area
                type="monotone"
                dataKey="queries"
                stroke="#10B981"
                strokeWidth={1.5}
                fill="url(#queryVelocityGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}
