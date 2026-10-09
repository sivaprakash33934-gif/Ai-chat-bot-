"use client";

import { motion } from "framer-motion";
import { inferenceLogs } from "@/lib/mock-data";
import { EmptyState } from "./EmptyState";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function LiveInferenceStream() {
  const prefersReducedMotion = useReducedMotion();

  if (inferenceLogs.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Live Inference Stream
            </h2>
            <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
              Stateless telemetry feed — nothing persisted beyond this view.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-[4px] border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] p-8">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Live Inference Stream
          </h2>
          <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
            Stateless telemetry feed — nothing persisted beyond this view.
          </p>
        </div>
        <span className="hidden items-center gap-1.5 font-mono text-[11px] text-[var(--color-dark-muted)] sm:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-signal)]" />
          streaming
        </span>
      </div>

      {/* Horizontal scroll container: columns never squish on small viewports */}
      <div className="mt-4 overflow-x-auto rounded-[4px] border border-[var(--color-dark-border)] transition-all duration-200 hover:border-[var(--color-signal)]">
        <table className="w-full min-w-[760px] border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] text-left text-[var(--color-dark-muted)]">
              <th scope="col" className="whitespace-nowrap px-4 py-3 font-normal">Timestamp</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 font-normal">Store Domain</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 font-normal">Query Intent</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 font-normal">Language</th>
              <th scope="col" className="whitespace-nowrap px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {inferenceLogs.map((log, i) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : i * 0.05,
                  duration: 0.2,
                }}
                className="border-b border-[var(--color-dark-border)] bg-[var(--color-dark-bg)] last:border-0 transition-colors duration-150 hover:bg-white/[0.04]"
              >
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-neutral-300">
                  {log.timestamp}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-neutral-300">
                  {log.storeDomain}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-neutral-300">
                  {log.intent}
                </td>
                <td className="whitespace-nowrap px-4 py-3 uppercase text-neutral-400">
                  {log.language}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        log.status === "RESOLVED"
                          ? "bg-[var(--color-signal)]"
                          : "bg-[var(--color-amber)]"
                      )}
                    />
                    <span
                      className={
                        log.status === "RESOLVED"
                          ? "text-neutral-300"
                          : "text-[var(--color-amber)]"
                      }
                    >
                      {log.status}
                    </span>
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
