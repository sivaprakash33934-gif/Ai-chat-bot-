"use client";

import React from "react";
import Link from "next/link";
import { OnboardingData } from "./types";
import { Wrench, Users, Bot, Rocket, Check } from "lucide-react";
import ChatWidget from "@/components/chat/ChatWidget";
import { ReplayCompareLab } from "@/components/decision/ReplayCompareLab";

interface StepProps {
  data: OnboardingData;
  onChange: (patch: Partial<OnboardingData>) => void;
}

export function StepActions({ data, onChange }: StepProps) {
  const actions = [
    { id: "create_lead", name: "Create CRM Commercial Lead", desc: "Allows AI to prepare lead records requiring human or buyer verification." },
    { id: "book_appointment", name: "Schedule Operations Consultation", desc: "Allows buyers to request callback slots for high-volume orders." },
    { id: "check_stock", name: "Check Real-Time Stock", desc: "Allows AI to query warehouse ERP for physical and available inventory." },
  ];

  const toggleAction = (id: string) => {
    const next = data.enabledActions.includes(id)
      ? data.enabledActions.filter((a) => a !== id)
      : [...data.enabledActions, id];
    onChange({ enabledActions: next });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-hairline pb-2">
        <h2 className="font-serif text-[20px] font-semibold text-ink flex items-center gap-2">
          <Wrench className="h-5 w-5 text-ink-muted" /> 04 Allowed Actions
        </h2>
        <p className="font-mono text-[11px] text-ink-muted">Configure executable tools governed by approval boundaries.</p>
      </div>
      <div className="space-y-2">
        {actions.map((act) => {
          const enabled = data.enabledActions.includes(act.id);
          return (
            <div
              key={act.id}
              onClick={() => toggleAction(act.id)}
              className={`p-3 rounded-[3px] border cursor-pointer transition-colors ${
                enabled ? "border-ink bg-paper-elevated" : "border-hairline bg-paper hover:border-ink/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] font-semibold text-ink">{act.name}</span>
                <span className="font-mono text-[10px] text-ink">{enabled ? "ACTIVE" : "DISABLED"}</span>
              </div>
              <p className="font-mono text-[11px] text-ink-muted mt-1">{act.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepTeam({ data, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="border-b border-hairline pb-2">
        <h2 className="font-serif text-[20px] font-semibold text-ink flex items-center gap-2">
          <Users className="h-5 w-5 text-ink-muted" /> 05 Team Access
        </h2>
        <p className="font-mono text-[11px] text-ink-muted">Invite an operations lead to manage exceptions and handoffs.</p>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-ink mb-1">Operator Email</label>
          <input
            type="email"
            value={data.inviteEmail}
            onChange={(e) => onChange({ inviteEmail: e.target.value })}
            className="w-full rounded-[3px] border border-hairline bg-paper px-3 py-2 font-mono text-[12px] text-ink focus:border-ink focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-ink mb-1">Assigned Role</label>
          <select
            value={data.inviteRole}
            onChange={(e) => onChange({ inviteRole: e.target.value as any })}
            className="w-full rounded-[3px] border border-hairline bg-paper px-3 py-2 font-mono text-[12px] text-ink focus:border-ink focus:outline-none"
          >
            <option value="owner">Owner (Full admin & billing control)</option>
            <option value="ops_lead">Ops Lead (Approvals & conflict resolution)</option>
            <option value="viewer">Viewer (Read-only, masked PII)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function StepTestAI() {
  const [activeTestMode, setActiveTestMode] = React.useState<"chat" | "lab">("chat");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-2">
        <div>
          <h2 className="font-serif text-[20px] font-semibold text-ink flex items-center gap-2">
            <Bot className="h-5 w-5 text-ink-muted" /> 06 Interactive Simulator &amp; Test Lab
          </h2>
          <p className="font-mono text-[11px] text-ink-muted">
            Test inquiries against configured documents, inspect decision receipts, or run differential test comparisons.
          </p>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTestMode("chat")}
            className={`rounded border px-2.5 py-1 transition-colors ${
              activeTestMode === "chat"
                ? "border-ink bg-ink text-paper font-semibold"
                : "border-hairline bg-paper text-ink-muted hover:border-ink/40"
            }`}
          >
            Chat Widget
          </button>
          <button
            type="button"
            onClick={() => setActiveTestMode("lab")}
            className={`rounded border px-2.5 py-1 transition-colors ${
              activeTestMode === "lab"
                ? "border-ink bg-ink text-paper font-semibold"
                : "border-hairline bg-paper text-ink-muted hover:border-ink/40"
            }`}
          >
            Replay &amp; Compare Lab
          </button>
        </div>
      </div>

      {activeTestMode === "chat" ? (
        <div className="rounded-[4px] border border-hairline bg-paper p-2">
          <ChatWidget embedded={true} />
        </div>
      ) : (
        <div className="rounded-[4px] border border-hairline bg-paper-elevated p-4">
          <ReplayCompareLab />
        </div>
      )}
    </div>
  );
}

export function StepGoLive({ data }: { data: OnboardingData }) {
  const checklist = [
    { label: "Business Entity Verified", detail: `${data.companyName} (${data.state})` },
    { label: "Knowledge Grounding Seeded", detail: `${data.selectedSources.length} Primary Documents Indexed` },
    { label: "Deterministic Guardrails Active", detail: `${data.selectedRules.length} Hard Rules Enforced` },
    { label: "Permitted Tool Actions", detail: `${data.enabledActions.length} Operations Tools Bound` },
    { label: "Primary Operator Invited", detail: `${data.inviteEmail} (${data.inviteRole})` },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-hairline pb-2">
        <h2 className="font-serif text-[20px] font-semibold text-ink flex items-center gap-2">
          <Rocket className="h-5 w-5 text-ink-muted" /> 07 Ready for Production Deployment
        </h2>
        <p className="font-mono text-[11px] text-ink-muted">All deployment parameters verified. Prototype state ready.</p>
      </div>

      <div className="rounded-[4px] border border-hairline bg-paper-elevated p-4 space-y-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-semibold block">Configuration Checklist</span>
        <ul className="space-y-2">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[12px]">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mt-0.5">✓</div>
              <div className="font-mono">
                <span className="text-ink font-medium">{item.label}: </span>
                <span className="text-ink-muted">{item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2">
        <Link
          href="/dashboard"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] border border-ink bg-ink px-4 py-3 font-mono text-[13px] text-paper hover:bg-ink-muted transition-colors focus-visible:outline-none"
        >
          Enter Control Center
        </Link>
      </div>
    </div>
  );
}
