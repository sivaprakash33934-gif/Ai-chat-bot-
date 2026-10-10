"use client";

import React from "react";
import { X, ExternalLink, ShieldCheck, UserCheck, CheckCircle2 } from "lucide-react";
import { ConversationRecord } from "@/lib/fixtures";
import { DecisionReceipt } from "@/components/decision/DecisionReceipt";
import { MissingEvidencePanel } from "@/components/decision/MissingEvidencePanel";

interface ConversationDrawerProps {
  conversation: ConversationRecord | null;
  onClose: () => void;
  onTakeOver: (id: string) => void;
}

export function ConversationDrawer({ conversation, onClose, onTakeOver }: ConversationDrawerProps) {
  if (!conversation) return null;

  const isPending = conversation.status === "handoff_pending";
  const isClaimed = conversation.status === "handoff_claimed";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-conv-title"
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-hairline bg-paper-elevated shadow-none"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-hairline p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            <span>{conversation.channel}</span>
            <span>·</span>
            <span>{conversation.timestamp}</span>
          </div>
          <h2 id="drawer-conv-title" className="font-serif text-[20px] font-semibold text-ink">
            {conversation.customerName}
          </h2>
          <div className="font-sans text-[13px] text-ink-muted">{conversation.company}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close conversation drawer"
          className="rounded p-1 text-ink-muted hover:text-ink focus-visible:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Status & Summary Card */}
        <div className="border border-hairline bg-paper p-4 space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="uppercase text-ink-muted">Session ID: {conversation.id}</span>
            <span className="font-semibold text-ink">Messages: {conversation.messageCount}</span>
          </div>
          <p className="font-sans text-[13px] text-ink">{conversation.summary}</p>
        </div>

        {/* Turn-by-Turn Transcript */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink font-semibold">
            Full Conversation Transcript
          </div>
          <div className="space-y-3">
            {conversation.transcript.map((msg, idx) => {
              const isCustomer = msg.sender === "customer";
              const isAi = msg.sender === "ai";

              return (
                <div
                  key={idx}
                  className={`border border-hairline p-3.5 space-y-1.5 ${
                    isCustomer ? "bg-paper text-ink" : isAi ? "bg-paper-elevated border-l-2 border-l-ink" : "bg-success-surface/40"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-muted">
                    <span className="font-semibold uppercase text-ink">
                      {isCustomer ? conversation.customerName : isAi ? "SYNEX AI" : "Operations Agent"}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="font-sans text-[13px] text-ink leading-relaxed">{msg.text}</p>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-hairline flex flex-wrap gap-1">
                      {msg.citations.map((cite, cIdx) => (
                        <span key={cIdx} className="rounded border border-hairline bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                          Source: {cite}
                        </span>
                      ))}
                    </div>
                  )}
                  {msg.actionTaken && (
                    <div className="mt-2 pt-2 border-t border-hairline flex items-center gap-1.5 font-mono text-[11px] text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Action: {msg.actionTaken}</span>
                    </div>
                  )}

                  {/* Decision Receipt integration for transparent audit */}
                  {isAi && (
                    <div className="mt-3 pt-2 border-t border-hairline">
                      <DecisionReceipt
                        id={`REC-${conversation.id}-${idx}`}
                        question={conversation.summary}
                        outcome={
                          conversation.status === "handoff_pending" || conversation.status === "handoff_claimed"
                            ? "NEEDS HUMAN"
                            : "ALLOWED"
                        }
                        ruleCitation="Credit Policy v3.1 & Rule RL-01"
                        requiredApproval={
                          conversation.status === "handoff_pending"
                            ? "Level 2 Ops Lead Sign-off"
                            : "Autonomous Execution"
                        }
                        proposedAction={msg.actionTaken || "Information Grounding"}
                        evidence={(msg.citations || []).map((c, cIdx) => ({
                          documentTitle: c,
                          documentId: `DOC-${cIdx + 101}`,
                          authority: cIdx === 0 ? "PRIMARY" : "SECONDARY",
                          lastVerified: "Today, 09:00 IST",
                          excerpt: "Approved corporate rates and standard volume schedule.",
                        }))}
                        unresolvedUncertainty={
                          conversation.status === "handoff_pending"
                            ? "Customer requested non-standard terms not found in pre-approved rate sheet."
                            : undefined
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Missing Evidence Banner for escalated conversations */}
        {isPending && (
          <MissingEvidencePanel
            question={conversation.summary}
            missingInformation={[
              "Net-30 / Net-45 credit underwriting approval for custom dispatch",
              "Freight surcharge confirmation to non-standard destination pin code",
            ]}
            checkedSources={[
              { title: "Master Price List Q4 FY26", id: "KS-101", status: "Checked · Primary" },
              { title: "Credit Terms & Cash Discount Policy v3.1", id: "KS-102", status: "Checked · 30-day limit" },
            ]}
            onAskHuman={() => onTakeOver(conversation.id)}
          />
        )}
      </div>

      {/* Drawer Action Footer */}
      <div className="border-t border-hairline p-4 bg-paper flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-hairline px-4 py-2 font-mono text-[12px] text-ink hover:border-ink/40"
        >
          Close View
        </button>
        {(isPending || isClaimed) && (
          <button
            type="button"
            onClick={() => onTakeOver(conversation.id)}
            className="inline-flex items-center gap-2 rounded border border-ink bg-ink px-4 py-2 font-mono text-[12px] font-semibold text-paper hover:bg-ink/90"
          >
            <UserCheck className="h-4 w-4" />
            <span>{isPending ? "Take Over Conversation" : "Mark as Resolved"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
