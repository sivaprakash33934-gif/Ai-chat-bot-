"use client";

import React from "react";
import { OnboardingData } from "./types";
import { Building2, FileText, ShieldAlert } from "lucide-react";

interface StepProps {
  data: OnboardingData;
  onChange: (patch: Partial<OnboardingData>) => void;
}

export function StepBusiness({ data, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="border-b border-hairline pb-2">
        <h2 className="font-serif text-[20px] font-semibold text-ink flex items-center gap-2">
          <Building2 className="h-5 w-5 text-ink-muted" /> 01 Business Entity
        </h2>
        <p className="font-mono text-[11px] text-ink-muted">Set up your enterprise profile and commercial jurisdiction.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-ink mb-1">Company Legal Name</label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
            className="w-full rounded-[3px] border border-hairline bg-paper px-3 py-2 font-mono text-[12px] text-ink focus:border-ink focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-ink mb-1">GSTIN (Optional)</label>
          <input
            type="text"
            value={data.gstin}
            onChange={(e) => onChange({ gstin: e.target.value })}
            className="w-full rounded-[3px] border border-hairline bg-paper px-3 py-2 font-mono text-[12px] text-ink focus:border-ink focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-ink mb-1">Primary Currency</label>
          <input
            type="text"
            disabled
            value={data.currency}
            className="w-full rounded-[3px] border border-hairline bg-paper-elevated px-3 py-2 font-mono text-[12px] text-ink-muted"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-ink mb-1">Operating State</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            className="w-full rounded-[3px] border border-hairline bg-paper px-3 py-2 font-mono text-[12px] text-ink focus:border-ink focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export function StepKnowledge({ data, onChange }: StepProps) {
  const sources = [
    { name: "PRICE-LIST-2026.pdf", type: "PDF", chunks: 34, authority: "PRIMARY" },
    { name: "TERMS-CREDIT-POLICY.pdf", type: "PDF", chunks: 14, authority: "PRIMARY" },
    { name: "LOGISTICS-TARIFF-TN.pdf", type: "PDF", chunks: 22, authority: "SECONDARY" },
  ];

  const toggleSource = (name: string) => {
    const next = data.selectedSources.includes(name)
      ? data.selectedSources.filter((s) => s !== name)
      : [...data.selectedSources, name];
    onChange({ selectedSources: next });
  };

  const totalChunks = sources
    .filter((s) => data.selectedSources.includes(s.name))
    .reduce((acc, curr) => acc + curr.chunks, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-hairline pb-2">
        <div>
          <h2 className="font-serif text-[20px] font-semibold text-ink flex items-center gap-2">
            <FileText className="h-5 w-5 text-ink-muted" /> 02 Knowledge Ingestion
          </h2>
          <p className="font-mono text-[11px] text-ink-muted">Select baseline catalog documents to ground the AI.</p>
        </div>
        <span className="font-mono text-[11px] text-ink bg-paper border border-hairline px-2 py-1 rounded">
          {totalChunks} Chunks Parsed
        </span>
      </div>
      <div className="space-y-2">
        {sources.map((src) => {
          const selected = data.selectedSources.includes(src.name);
          return (
            <div
              key={src.name}
              onClick={() => toggleSource(src.name)}
              className={`flex items-center justify-between p-3 rounded-[3px] border cursor-pointer transition-colors ${
                selected ? "border-ink bg-paper-elevated" : "border-hairline bg-paper hover:border-ink/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={selected} readOnly className="rounded border-hairline text-ink" />
                <div>
                  <div className="font-mono text-[12px] font-semibold text-ink">{src.name}</div>
                  <div className="font-mono text-[10px] text-ink-muted">{src.type} · {src.chunks} vectorized chunks</div>
                </div>
              </div>
              <span className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border ${
                src.authority === "PRIMARY" ? "border-ink bg-ink text-paper" : "border-hairline text-ink"
              }`}>{src.authority}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepRules({ data, onChange }: StepProps) {
  const rules = [
    { id: "RL-01", name: "Volume Discount Ceiling", desc: "Max 8.0% discount on orders under 500 units without admin approval." },
    { id: "RL-03", name: "Payment Terms Limit", desc: "Never extend beyond Net-30 payment terms without credit check." },
    { id: "RL-04", name: "Grounding Confidence Floor", desc: "Refuse answers when grounding score drops below 85%." },
  ];

  const toggleRule = (id: string) => {
    const next = data.selectedRules.includes(id)
      ? data.selectedRules.filter((r) => r !== id)
      : [...data.selectedRules, id];
    onChange({ selectedRules: next });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-hairline pb-2">
        <h2 className="font-serif text-[20px] font-semibold text-ink flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-ink-muted" /> 03 Deterministic Guardrails
        </h2>
        <p className="font-mono text-[11px] text-ink-muted">Select hard operational boundaries enforced before every AI answer.</p>
      </div>
      <div className="space-y-2">
        {rules.map((rule) => {
          const selected = data.selectedRules.includes(rule.id);
          return (
            <div
              key={rule.id}
              onClick={() => toggleRule(rule.id)}
              className={`p-3 rounded-[3px] border cursor-pointer transition-colors ${
                selected ? "border-ink bg-paper-elevated" : "border-hairline bg-paper hover:border-ink/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] font-semibold text-ink">{rule.id} · {rule.name}</span>
                <span className="font-mono text-[10px] text-ink">{selected ? "ENABLED" : "DISABLED"}</span>
              </div>
              <p className="font-mono text-[11px] text-ink-muted mt-1">{rule.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
