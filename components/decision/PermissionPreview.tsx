"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Eye,
  Edit3,
  Lock,
  AlertTriangle,
  UserCheck,
  Info,
} from "lucide-react";
import { Role } from "@/lib/fixtures";

interface CapabilityItem {
  id: string;
  name: string;
  category: "Business Rules" | "Knowledge" | "Actions" | "Security & PII";
  description: string;
  requiredRole: Role;
  permissionLevel: "can_edit" | "requires_approval" | "view_only" | "blocked";
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "CAP-01",
    name: "Modify Autonomous Discount Limit",
    category: "Business Rules",
    description: "Adjust autonomous threshold percentages and profit margin floors.",
    requiredRole: "owner",
    permissionLevel: "can_edit",
  },
  {
    id: "CAP-02",
    name: "Approve Intercepted High-Discount Quotes",
    category: "Business Rules",
    description: "Sign off on Level 2 exception requests exceeding autonomous caps.",
    requiredRole: "ops_lead",
    permissionLevel: "requires_approval",
  },
  {
    id: "CAP-03",
    name: "Resolve Knowledge Corpus Conflicts",
    category: "Knowledge",
    description: "Designate PRIMARY vs SECONDARY authority between conflicting documents.",
    requiredRole: "ops_lead",
    permissionLevel: "can_edit",
  },
  {
    id: "CAP-04",
    name: "Trigger Manual Tool Retry & Force Dispatch",
    category: "Actions",
    description: "Resend idempotent mutation payloads to ERP or CRM after a failure.",
    requiredRole: "ops_lead",
    permissionLevel: "can_edit",
  },
  {
    id: "CAP-05",
    name: "Unmask Sensitive Customer PII (Tax IDs / GSTIN)",
    category: "Security & PII",
    description: "Reveal masked customer tax numbers and corporate credit identities.",
    requiredRole: "ops_lead",
    permissionLevel: "requires_approval",
  },
  {
    id: "CAP-06",
    name: "Rotate Production API Credentials",
    category: "Security & PII",
    description: "Generate and revoke production webhook HMAC secrets and API keys.",
    requiredRole: "owner",
    permissionLevel: "can_edit",
  },
];

export function PermissionPreview() {
  const [previewRole, setPreviewRole] = useState<Role>("ops_lead");

  const evaluateAccess = (
    cap: CapabilityItem,
    role: Role
  ): {
    state: "can_edit" | "requires_approval" | "can_view" | "cannot_perform";
    label: string;
    badgeStyle: string;
    reason: string;
  } => {
    if (role === "viewer") {
      if (cap.category === "Security & PII" && cap.id === "CAP-06") {
        return {
          state: "cannot_perform",
          label: "Blocked",
          badgeStyle: "border-error/30 bg-rose-50 text-error",
          reason: "Viewer role has zero access to enterprise credential management.",
        };
      }
      return {
        state: "can_view",
        label: "Can View Only",
        badgeStyle: "border-hairline bg-paper text-ink-muted",
        reason: "Read-only access. Cannot execute mutations or approve transactions.",
      };
    }

    if (role === "ops_lead") {
      if (cap.requiredRole === "owner") {
        return {
          state: "cannot_perform",
          label: "Owner Required",
          badgeStyle: "border-amber/40 bg-amber-tint text-amber",
          reason: "Requires Tenant Owner authority. Ops Leads cannot modify system keys or core limits.",
        };
      }
      if (cap.permissionLevel === "requires_approval") {
        return {
          state: "requires_approval",
          label: "Requires Dual-Sign",
          badgeStyle: "border-amber/40 bg-amber-tint text-amber",
          reason: "Ops Lead can review and sign off, but action leaves an audited record.",
        };
      }
      return {
        state: "can_edit",
        label: "Can Edit & Execute",
        badgeStyle: "border-success/40 bg-emerald-50 text-success",
        reason: "Authorized for day-to-day operations and exception reconciliation.",
      };
    }

    // Role is "owner"
    return {
      state: "can_edit",
      label: "Full Access",
      badgeStyle: "border-success/40 bg-emerald-50 text-success",
      reason: "Tenant Owner possesses unrestricted configuration and administrative rights.",
    };
  };

  return (
    <div className="border border-hairline bg-paper-elevated p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            <span>Governance</span>
            <span>·</span>
            <span>Role-Based Access Control</span>
          </div>
          <h3 className="font-serif text-[20px] font-semibold text-ink mt-0.5">
            Role Permission Matrix &amp; Preview
          </h3>
          <p className="font-sans text-[13px] text-ink-muted">
            Preview what each role is permitted to see, edit, approve, or execute across the Control Center.
          </p>
        </div>

        {/* Disclaimer Note */}
        <span className="border border-hairline bg-paper px-2 py-1 font-mono text-[10px] text-ink-muted">
          [FRONTEND SIMULATION PREVIEW]
        </span>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase text-ink font-semibold">
            Simulate Role View:
          </span>
          <div className="flex gap-1.5 font-mono text-[12px]">
            {(
              [
                { id: "owner", label: "Owner", sub: "Admin" },
                { id: "ops_lead", label: "Ops Lead", sub: "Operator" },
                { id: "viewer", label: "Viewer", sub: "Read Only" },
              ] as const
            ).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setPreviewRole(r.id)}
                className={`rounded border px-3 py-1 transition-colors ${
                  previewRole === r.id
                    ? "border-ink bg-ink text-paper font-semibold"
                    : "border-hairline bg-paper text-ink-muted hover:border-ink/40 hover:text-ink"
                }`}
              >
                <span>{r.label} </span>
                <span className="text-[10px] opacity-75">({r.sub})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="font-mono text-[11px] text-ink-muted">
          Active Preview: <strong className="text-ink uppercase">{previewRole}</strong>
        </div>
      </div>

      {/* Capabilities Ledger Table */}
      <div className="overflow-x-auto border border-hairline bg-paper">
        <table className="w-full text-left border-collapse" aria-label="Role capabilities table">
          <thead>
            <tr className="border-b border-hairline bg-paper-elevated font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <th scope="col" className="px-4 py-3 font-medium">Operation / Capability</th>
              <th scope="col" className="px-4 py-3 font-medium">Category</th>
              <th scope="col" className="px-4 py-3 font-medium">Preview Outcome</th>
              <th scope="col" className="px-4 py-3 font-medium">Access Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline font-sans text-[13px]">
            {CAPABILITIES.map((cap) => {
              const access = evaluateAccess(cap, previewRole);

              return (
                <tr key={cap.id} className="transition-colors hover:bg-paper-elevated/60">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-ink">{cap.name}</div>
                    <div className="font-mono text-[11px] text-ink-muted">
                      {cap.id} · {cap.description}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-ink-muted whitespace-nowrap">
                    {cap.category}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px]">
                    <span
                      className={`inline-block rounded border px-2 py-0.5 font-semibold uppercase ${access.badgeStyle}`}
                    >
                      {access.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-sans text-[12px] text-ink-muted leading-relaxed">
                    {access.reason}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Security boundary disclaimer */}
      <div className="border border-hairline bg-paper p-3 font-mono text-[11px] text-ink-muted flex items-start gap-2">
        <Info className="h-4 w-4 text-ink-muted shrink-0 mt-0.5" aria-hidden="true" />
        <p leading-relaxed>
          This is an operational UI preview of permission constraints. In production, permission checks
          are independently enforced on the server for every mutation request.
        </p>
      </div>
    </div>
  );
}
