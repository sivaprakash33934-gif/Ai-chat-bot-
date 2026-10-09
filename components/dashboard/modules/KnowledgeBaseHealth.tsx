"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type ScrapeStatus = "idle" | "scraping" | "success";

const STATS = [
  { label: "Pages Indexed", value: "1,842" },
  { label: "Last Synced", value: "2 mins ago" },
  { label: "Missing Inventory Alerts", value: "7", alert: true },
];

export function KnowledgeBaseHealth() {
  const [status, setStatus] = useState<ScrapeStatus>("idle");
  const timeoutsRef = useRef<number[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Cleanup timeouts on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  const handleScrape = () => {
    if (status !== "idle") return;
    setStatus("scraping");

    const t1 = window.setTimeout(() => {
      setStatus("success");
      const t2 = window.setTimeout(() => {
        setStatus("idle");
      }, 2000);
      timeoutsRef.current.push(t2);
    }, 1500);
    timeoutsRef.current.push(t1);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-[4px] border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] p-5 transition-all duration-200 hover:border-[var(--color-signal)]"
    >
      <h2 className="text-sm font-semibold text-white">Knowledge Base Health</h2>
      <p className="mt-1 text-xs text-[var(--color-dark-muted)]">
        Graph freshness &amp; inventory sync status.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Left: Stats */}
        <dl className="space-y-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <dt className="font-mono text-xs text-[var(--color-dark-muted)]">
                {stat.label}
              </dt>
              <dd
                className={`flex items-center gap-1.5 font-mono text-sm tabular-nums ${
                  stat.alert ? "text-[var(--color-amber)]" : "text-white"
                }`}
              >
                {stat.alert && <AlertTriangle size={12} />}
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Right: Action */}
        <div className="flex flex-col items-start justify-center gap-3 border-t border-[var(--color-dark-border)] pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <p className="text-xs text-[var(--color-dark-muted)]">
            Re-scrape store catalog &amp; policy pages to refresh the knowledge
            graph.
          </p>
          <button
            onClick={handleScrape}
            disabled={status !== "idle"}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-[var(--color-dark-border)] px-4 text-sm font-medium text-white transition-all duration-200 hover:border-[var(--color-signal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  Trigger Re-Scrape
                </motion.span>
              )}
              {status === "scraping" && (
                <motion.span
                  key="scraping"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                  className="flex items-center gap-2 text-[var(--color-dark-muted)]"
                >
                  <Loader2 size={14} className="animate-spin" />
                  Scraping...
                </motion.span>
              )}
              {status === "success" && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  className="flex items-center gap-2 text-[var(--color-signal)]"
                >
                  <CheckCircle2 size={14} />
                  Synced
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
