"use client";

import React, { useState } from "react";
import { ChatMessage } from "./types";
import { CitationChips } from "./CitationChips";
import { ClarifyChips } from "./ClarifyChips";
import { ActionConfirmCard } from "./ActionConfirmCard";
import { ActionStatusCard } from "./ActionStatusCard";
import { HandoffCard } from "./HandoffCard";
import { EvidencePanel } from "./EvidencePanel";

interface MessageBubbleProps {
  message: ChatMessage;
  onClarifySelect?: (option: string) => void;
  onConfirmAction?: (actionId: string) => void;
  onCancelAction?: (actionId: string) => void;
  onRetryAction?: (actionId: string) => void;
  onDuplicateAction?: () => void;
}

export function MessageBubble({
  message,
  onClarifySelect,
  onConfirmAction,
  onCancelAction,
  onRetryAction,
  onDuplicateAction,
}: MessageBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  if (message.role === "system") {
    return (
      <div className="py-1">
        <p className="font-mono text-[11px] leading-relaxed text-ink-muted">
          <span className="tabular-nums opacity-75">[{message.timestamp}]</span>{" "}
          <span>{message.content}</span>
        </p>
      </div>
    );
  }

  if (message.role === "user") {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="max-w-[85%] rounded-[4px] bg-ink px-3.5 py-2 font-sans text-[13px] leading-relaxed text-paper">
          {message.content}
        </div>
        <span className="font-mono text-[10px] tabular-nums text-ink-muted">
          {message.timestamp}
        </span>
      </div>
    );
  }

  const isLong = message.content.length > 200;
  const hasEvidence =
    (message.citations && message.citations.length > 0) ||
    (message.rulesApplied && message.rulesApplied.length > 0) ||
    (message.customerContext && message.customerContext.length > 0);

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="max-w-[90%] rounded-[4px] border border-hairline bg-paper-elevated px-4 py-3 text-left">
        <div className={`font-serif text-[14px] leading-relaxed text-ink ${!isExpanded && isLong ? "line-clamp-3" : ""}`}>
          {message.content}
        </div>

        {isLong && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 font-mono text-[10px] text-ink-muted underline hover:text-ink focus-visible:outline-none"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] tabular-nums text-ink-muted">
          {message.timestamp}
        </span>
        {hasEvidence && (
          <button
            type="button"
            onClick={() => setShowEvidence(!showEvidence)}
            className="font-mono text-[10px] text-ink underline hover:text-ink-muted focus-visible:outline-none"
            aria-expanded={showEvidence}
          >
            {showEvidence ? "Hide evidence" : "Why this answer?"}
          </button>
        )}
      </div>

      {!showEvidence && message.citations && message.citations.length > 0 && (
        <CitationChips citations={message.citations} />
      )}

      {showEvidence && (
        <EvidencePanel
          citations={message.citations}
          rulesApplied={message.rulesApplied}
          customerContext={message.customerContext}
        />
      )}

      {message.clarify && onClarifySelect && (
        <ClarifyChips clarify={message.clarify} onSelect={onClarifySelect} />
      )}

      {message.action?.status === "pending_confirmation" && onConfirmAction && onCancelAction && (
        <ActionConfirmCard
          action={message.action}
          onConfirm={onConfirmAction}
          onCancel={onCancelAction}
          onDuplicate={onDuplicateAction}
        />
      )}

      {message.action && message.action.status !== "pending_confirmation" && (
        <ActionStatusCard
          action={message.action}
          onRetry={() => onRetryAction?.(message.action!.id)}
          onCancel={() => onCancelAction?.(message.action!.id)}
        />
      )}

      {message.handoff && <HandoffCard handoff={message.handoff} />}
    </div>
  );
}
