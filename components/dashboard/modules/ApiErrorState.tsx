"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

interface ApiErrorStateProps {
  onRetry?: () => void;
}

const errorResponse = {
  error: {
    code: "INFERENCE_TIMEOUT",
    message: "Model inference exceeded 5s deadline.",
    details: {
      store_id: "blr_textiles_04",
      query_tokens: 18,
      model_latency_ms: null,
    },
  },
  status: 500,
  timestamp: "2026-10-03T11:30:00.000Z",
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
          className = "text-red-400"; // keys in error context
        } else if (/^"(?:\\.|[^"\\])*"$/.test(token)) {
          className = "text-orange-300"; // string values
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

export function ApiErrorState({ onRetry }: ApiErrorStateProps) {
  return (
    <div className="rounded-md border border-red-900/40 bg-red-950/20 p-4 font-mono">
      <div className="flex items-start gap-3">
        <AlertCircle size={14} className="mt-0.5 text-red-400" />
        <div className="flex-1">
          <p className="text-[11px] font-medium text-red-300">
            500 · INFERENCE_TIMEOUT
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">
            Model inference exceeded 5s deadline. The request was not persisted.
          </p>
        </div>
      </div>

      <div className="mt-3">
        <SyntaxHighlightedJSON data={errorResponse} />
      </div>

      <button
        onClick={onRetry}
        className="mt-3 flex items-center gap-1.5 rounded-sm border border-red-900/60 bg-red-950/40 px-2 py-1.5 text-[11px] font-medium text-red-300 transition-colors hover:border-red-800 hover:bg-red-950/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <RotateCcw size={11} />
        Retry Request
      </button>
    </div>
  );
}
