"use client";

import React from "react";
import { RotateCcw } from "lucide-react";

interface RetryButtonProps {
  retryCount: number;
  onRetry: () => void;
  maxRetries?: number;
}

export function RetryButton({ retryCount, onRetry, maxRetries = 3 }: RetryButtonProps) {
  const isExhausted = retryCount >= maxRetries;

  if (isExhausted) {
    return (
      <div className="mt-2 rounded-[2px] border border-hairline bg-paper p-2 font-mono text-[11px] text-error leading-relaxed">
        Multiple failures detected. This conversation has been flagged for manual review (demo).
      </div>
    );
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 rounded-[4px] border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] text-ink transition-colors hover:border-ink/60 hover:bg-paper-elevated active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <RotateCcw className="h-3 w-3 stroke-[2]" aria-hidden="true" />
        <span>Retry ({maxRetries - retryCount} left)</span>
      </button>
    </div>
  );
}
