"use client";

import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Lock,
  ArrowRight,
  UserCheck,
  Send,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { GSTINDisplay, EmptyState, StatusBadge } from "./ui";

export function QueueHandoffs({ initialSelectedId }: { initialSelectedId?: string }) {
  const {
    handoffs,
    takeOverHandoff,
    returnHandoffToAI,
    role,
  } = useDashboardStore();

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (initialSelectedId && handoffs.some((h) => h.id === initialSelectedId)) {
      return initialSelectedId;
    }
    return handoffs[0]?.id || "";
  });

  const [internalNote, setInternalNote] = useState<string>("");
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);

  const selectedHandoff = useMemo(
    () => handoffs.find((h) => h.id === selectedId) || handoffs[0],
    [handoffs, selectedId]
  );

  const isViewer = role === "viewer";

  const handleReturnToAI = () => {
    if (selectedHandoff) {
      returnHandoffToAI(selectedHandoff.id, internalNote);
      setInternalNote("");
      setShowNoteInput(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div>
          <h2 className="font-serif text-[18px] font-semibold text-ink">
            Escalated Conversations
          </h2>
          <p className="font-sans text-[12px] text-ink-muted">
            Conversations where AI was unsure or the customer requested special terms.
          </p>
        </div>
        <span className="font-mono text-[11px] text-ink-muted">
          {handoffs.filter((h) => h.status === "pending").length} Waiting for You
        </span>
      </div>

      {handoffs.length === 0 ? (
        <EmptyState
          title="No escalated conversations."
          description="AI is handling all incoming customer messages smoothly."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Master List (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-2">
              Needs Help ({handoffs.length})
            </span>

            {handoffs.map((h) => {
              const isSelected = selectedHandoff?.id === h.id;

              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setSelectedId(h.id)}
                  className={`w-full text-left p-3.5 border transition-all rounded-sm ${
                    isSelected
                      ? "border-ink bg-paper-elevated ring-1 ring-ink"
                      : "border-hairline bg-paper hover:bg-paper-elevated hover:border-ink/40"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                        <StatusBadge status={h.status} />
                        {h.source === "widget" && (
                          <span className="rounded-sm border border-ink/20 bg-paper px-1.5 py-0.2 font-mono text-[9px] text-ink uppercase tracking-wider font-semibold">
                            Website Chat
                          </span>
                        )}
                        <span className="text-ink-muted">{h.id}</span>
                      </div>
                      <div className="mt-1 font-sans text-[13px] font-semibold text-ink">
                        {h.company}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-ink-faint">
                      {h.timestamp}
                    </span>
                  </div>

                  <p className="mt-2 text-[12px] text-ink-muted line-clamp-2 leading-snug">
                    {h.issue}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-ink-muted">AI Confidence</span>
                    <span
                      className={`font-semibold ${
                        h.confidenceScore < 0.75 ? "text-error" : "text-amber"
                      }`}
                    >
                      {Math.round(h.confidenceScore * 100)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dossier Detail (Right 8 cols) */}
          <div className="lg:col-span-8">
            {selectedHandoff ? (
              <div className="border border-hairline bg-paper-elevated p-6 space-y-6">
                {/* Title & Buyer Meta */}
                <div className="border-b border-hairline pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        Escalated Conversation
                      </span>
                      <span>·</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink">
                        {selectedHandoff.id}
                      </span>
                      {selectedHandoff.source === "widget" && (
                        <span className="rounded-sm border border-ink/20 bg-paper px-1.5 py-0.2 font-mono text-[9px] text-ink uppercase tracking-wider font-semibold">
                          Website Chat
                        </span>
                      )}
                    </div>
                    <StatusBadge status={selectedHandoff.status} />
                  </div>

                  <h3 className="mt-1 font-serif text-[24px] font-semibold text-ink">
                    {selectedHandoff.company}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-[12px] font-mono text-ink-muted">
                    <span>Contact: {selectedHandoff.buyerName}</span>
                    <span>·</span>
                    <GSTINDisplay gstin={selectedHandoff.gstin} />
                    <span>·</span>
                    <span>Escalated {selectedHandoff.timestamp}</span>
                  </div>
                </div>

                {/* Analysis Box: What AI Tried & Why AI Needed Help */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-sm border border-hairline bg-paper p-4 space-y-2">
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                      What AI Tried
                    </div>
                    <ul className="space-y-1.5 text-[12px] text-ink-muted list-disc list-inside leading-snug">
                      {selectedHandoff.whatTried.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-sm border border-error/30 bg-error-surface/40 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-error">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span>Why AI Needed Help</span>
                    </div>
                    <p className="font-sans text-[12px] text-ink leading-relaxed">
                      {selectedHandoff.whyFailed}
                    </p>
                  </div>
                </div>

                {/* Turn-by-Turn Conversation Transcript */}
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-3">
                    Full Conversation ({selectedHandoff.transcript.length} Messages)
                  </h4>
                  <div className="border border-hairline bg-paper p-4 space-y-3 max-h-72 overflow-y-auto">
                    {selectedHandoff.transcript.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${
                          msg.sender === "buyer" ? "items-start" : "items-end"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted mb-0.5">
                          <span>{msg.sender === "buyer" ? selectedHandoff.buyerName : "AI Assistant"}</span>
                          <span>·</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <div
                          className={`max-w-md rounded-sm p-3 text-[13px] leading-relaxed ${
                            msg.sender === "buyer"
                              ? "bg-paper-elevated border border-hairline text-ink"
                              : "bg-ink text-paper"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Internal Note Input (when opened) */}
                {showNoteInput && (
                  <div className="border border-hairline bg-paper p-4 space-y-2 rounded-sm">
                    <label
                      htmlFor="internal-note"
                      className="block font-mono text-[11px] uppercase tracking-wider text-ink"
                    >
                      Internal Note
                    </label>
                    <textarea
                      id="internal-note"
                      rows={2}
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      placeholder="Add guidance for AI or internal team notes before re-routing..."
                      className="w-full rounded border border-hairline bg-paper-elevated p-2 font-sans text-[12px] text-ink focus:border-ink focus:outline-none"
                    />
                  </div>
                )}

                {/* Viewer RBAC Advisory */}
                {isViewer && (
                  <div className="flex items-center gap-2 rounded border border-hairline bg-paper p-3 text-[12px] font-mono text-ink-muted">
                    <Lock className="h-4 w-4 text-ink-muted" />
                    <span>
                      You are in View Only mode. Only Ops Lead can take over conversations.
                    </span>
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      disabled={isViewer || selectedHandoff.status === "claimed"}
                      onClick={() => takeOverHandoff(selectedHandoff.id)}
                      className={`inline-flex items-center gap-2 rounded border px-4 py-2 font-mono text-[12px] font-semibold transition-colors ${
                        isViewer || selectedHandoff.status === "claimed"
                          ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                          : "border-ink bg-ink text-paper hover:bg-ink/90"
                      }`}
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Take Over Conversation</span>
                    </button>

                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => setShowNoteInput(!showNoteInput)}
                      className="inline-flex items-center gap-2 rounded border border-hairline bg-paper px-3 py-2 font-mono text-[12px] text-ink hover:border-ink/40"
                    >
                      <span>{showNoteInput ? "Cancel Note" : "Add Note"}</span>
                    </button>

                    <button
                      type="button"
                      disabled={isViewer || selectedHandoff.status === "resolved"}
                      onClick={handleReturnToAI}
                      className={`inline-flex items-center gap-2 rounded border px-4 py-2 font-mono text-[12px] transition-colors ${
                        isViewer || selectedHandoff.status === "resolved"
                          ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                          : "border-success/40 bg-success-surface text-success hover:border-success"
                      }`}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Return to AI</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState title="Select a conversation to view" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
