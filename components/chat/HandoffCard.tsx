"use client";

import React from "react";
import { UserCheck } from "lucide-react";
import { HandoffData } from "./types";

interface HandoffCardProps {
  handoff: HandoffData;
}

export function HandoffCard({ handoff }: HandoffCardProps) {
  const { customer, intent, summary, sources, assignedTo } = handoff;

  return (
    <div className="mt-2.5 rounded-[4px] border border-hairline bg-paper-elevated p-3.5 text-left text-[13px] space-y-3">
      <div className="flex items-center gap-1.5 border-b border-hairline pb-2 font-mono text-[11px] uppercase tracking-wider text-ink">
        <UserCheck className="h-4 w-4 stroke-[2]" aria-hidden="true" />
        <span className="font-semibold">Transferred to Human</span>
      </div>

      <p className="font-serif text-[13px] leading-relaxed text-ink">
        {assignedTo} will reply within 1 business hour. Here&apos;s exactly what she&apos;ll see:
      </p>

      {/* Context Summary Box */}
      <div className="rounded-[2px] border border-hairline bg-paper p-3 font-mono text-[11px] space-y-1.5">
        <div className="flex justify-between border-b border-hairline/60 pb-1">
          <span className="text-ink-muted">Customer:</span>
          <span className="font-medium text-ink">{customer}</span>
        </div>
        <div className="flex justify-between border-b border-hairline/60 pb-1">
          <span className="text-ink-muted">Intent:</span>
          <span className="font-medium text-ink">{intent}</span>
        </div>
        <div>
          <span className="text-ink-muted block mb-0.5">Transcript Context:</span>
          <ul className="list-disc list-inside space-y-0.5 text-ink-muted text-[10px]">
            {summary.map((line, idx) => (
              <li key={idx} className="truncate">{line}</li>
            ))}
          </ul>
        </div>
        {sources.length > 0 && (
          <div className="pt-1 border-t border-hairline/60 text-[10px] text-ink-muted">
            <span>Sources Consulted: </span>
            <span className="text-ink font-medium">{sources.join(", ")}</span>
          </div>
        )}
      </div>

      <div className="space-y-1 pt-1 font-mono text-[10px] text-ink-muted">
        <p>This conversation is now in the Escalated Chats queue in the Control Center.</p>
        <p className="text-success font-medium">✓ Handoff recorded in Activity Log.</p>
      </div>
    </div>
  );
}
