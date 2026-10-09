"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { ApiErrorState } from "./ApiErrorState";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const requestBody = {
  store_id: "blr_textiles_04",
  query: "Do you have size XL in stock?",
  lang: "en",
};

const responseBody = {
  intent: "STOCK_CHECK",
  answer: "Yes, Size XL is available in 3 color variants.",
  confidence: 0.94,
  session_state: null,
  latency_ms: 184,
};

function SyntaxHighlightedJSON({ data }: { data: unknown }) {
  const json = JSON.stringify(data, null, 2);
  const tokens = json.split(
    /("(?:\\.|[^"\\])*"(?:\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?)/g
  );

  return (
    <pre className="overflow-x-auto whitespace-pre text-[11px] leading-relaxed text-neutral-300">
      {tokens.map((token, i) => {
        if (!token) return null;
        let className = "text-neutral-300";
        if (/^"(?:\\.|[^"\\])*"\s*:$/.test(token)) {
          className = "text-[var(--color-signal)]"; // keys
        } else if (/^"(?:\\.|[^"\\])*"$/.test(token)) {
          className = "text-amber-300"; // string values
        } else if (/^(true|false|null)$/.test(token)) {
          className = "text-sky-400"; // literals
        } else if (/^-?\d+(?:\.\d+)?$/.test(token)) {
          className = "text-purple-400 tabular-nums"; // numbers
        }
        return (
          <span key={i} className={className}>
            {token}
          </span>
        );
      })}
    </pre>
  );
}

export function DeveloperApiConsole() {
  const [showError, setShowError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleRetry = () => {
    setShowError(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: prefersReducedMotion ? 0 : 0.05,
      }}
      className="rounded-[4px] border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] p-5 transition-all duration-200 hover:border-[var(--color-signal)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[var(--color-signal)]" />
          <h2 className="text-sm font-semibold text-white">Developer API Console</h2>
        </div>

        {/* Error state toggle button */}
        <button
          onClick={() => setShowError((v) => !v)}
          className="rounded-sm border border-[var(--color-dark-border)] bg-[var(--color-dark-bg)] px-2 py-1 font-mono text-[11px] text-[var(--color-dark-muted)] transition-colors hover:border-[var(--color-signal)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)]"
        >
          {showError ? "Show Success" : "Show Error"}
        </button>
      </div>

      <p className="mt-1 text-xs text-[var(--color-dark-muted)]">
        Every request is inferred fresh — no session, no memory.
      </p>

      <div className="mt-4">
        {showError ? (
          <ApiErrorState onRetry={handleRetry} />
        ) : (
          <div className="rounded-md border border-[var(--color-dark-border)] bg-[#050505] p-4 font-mono">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-signal)]/60" />
              <span className="ml-2 text-[11px] text-neutral-600">
                POST /v1/ask — stateless
              </span>
            </div>

            <p className="text-[11px] text-neutral-500">
              <span className="text-neutral-600">$</span> curl -X POST
              https://api.neuralcommerce.in/v1/ask
            </p>

            <div className="mt-2">
              <SyntaxHighlightedJSON data={requestBody} />
            </div>

            <div className="mt-4 border-t border-[var(--color-dark-border)] pt-3 text-[11px] text-neutral-600">
              # 200 OK · 184ms · no state persisted
            </div>

            <div className="mt-2">
              <SyntaxHighlightedJSON data={responseBody} />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
