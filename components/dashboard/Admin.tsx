"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Users,
  Shield,
  ScrollText,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  Search,
  Lock,
  AlertCircle,
  Sliders,
  Building2,
  Clock,
  MapPin,
  AlertOctagon,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { INITIAL_ADMIN_USERS, Role } from "@/lib/fixtures";
import { EmptyState } from "./ui";

type AdminTab = "users" | "security" | "audit" | "settings";

export function Admin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as AdminTab) || "users";

  const { auditLog, addAuditEntry, role } = useDashboardStore();

  // Security Tab State: Key Reveal
  const [keyRevealed, setKeyRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Audit Log Search State
  const [auditSearch, setAuditSearch] = useState("");

  const handleTabChange = (tab: AdminTab) => {
    router.push(`/dashboard/admin?tab=${tab}`);
  };

  const handleToggleKey = () => {
    if (role === "viewer") return;

    if (!keyRevealed) {
      // Reveal triggers instant audit log entry (Addendum B)
      addAuditEntry(
        "API_KEY_REVEALED",
        "Production API Secret (synex_live_...)",
        "Operator unmasked production API credential for inspection."
      );
    }
    setKeyRevealed(!keyRevealed);
  };

  const handleCopyKey = () => {
    const rawKey = "synex_live_8f93a180bb294ac9e20a4b71";
    navigator.clipboard.writeText(rawKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Filtered Audit Log (Addendum B: reverse chronological order)
  const filteredAuditLog = auditLog.filter((entry) => {
    const q = auditSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      entry.action.toLowerCase().includes(q) ||
      entry.target.toLowerCase().includes(q) ||
      entry.details.toLowerCase().includes(q) ||
      entry.actor.toLowerCase().includes(q) ||
      entry.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Settings
          </span>
          <span className="text-ink-muted">/</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
            System & Security
          </span>
        </div>
        <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
          System & Team Settings
        </h1>
        <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted">
          Manage team members, API keys, and review recent activity.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-hairline">
        <nav className="-mb-px flex space-x-6" role="tablist" aria-label="Admin tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "users"}
            onClick={() => handleTabChange("users")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              activeTab === "users"
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Users</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "security"}
            onClick={() => handleTabChange("security")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              activeTab === "security"
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Security & API Keys</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "audit"}
            onClick={() => handleTabChange("audit")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              activeTab === "audit"
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
            }`}
          >
            <ScrollText className="h-4 w-4" />
            <span>Activity Log</span>
            <span className="rounded-full bg-paper border border-hairline px-2 py-0.2 font-mono text-[11px] text-ink-muted">
              {auditLog.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "settings"}
            onClick={() => handleTabChange("settings")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              activeTab === "settings"
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Tab 1: Users */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-hairline bg-paper-elevated">
            <table className="w-full text-left border-collapse" aria-label="Authorized operators table">
              <thead>
                <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  <th scope="col" className="px-5 py-3.5 font-medium">User</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Role</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">What They Can Do</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
                  <th scope="col" className="px-5 py-3.5 text-right font-medium">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline font-sans text-[13px]">
                {INITIAL_ADMIN_USERS.map((usr) => (
                  <tr key={usr.id} className="transition-colors hover:bg-paper/60">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-ink">{usr.name}</div>
                      <div className="font-mono text-[11px] text-ink-muted">{usr.email}</div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase ${
                          usr.role === "owner"
                            ? "border-ink bg-ink text-paper"
                            : usr.role === "ops_lead"
                            ? "border-amber/40 bg-amber-tint text-amber"
                            : "border-hairline bg-paper text-ink-muted"
                        }`}
                      >
                        {usr.role.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-sans text-[12px] text-ink-muted max-w-sm">
                      {usr.role === "owner" && "Full control: manage team, view full tax IDs, change API keys."}
                      {usr.role === "ops_lead" && "Approve discounts, edit rules, take over chats, view full tax IDs."}
                      {usr.role === "viewer" && "View-only access. Cannot change rules or view hidden tax IDs."}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        <span>Active</span>
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right font-mono text-[11px] text-ink-muted whitespace-nowrap">
                      {usr.lastLogin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Security & API Keys */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* PII Governance Notice */}
          <div className="rounded border border-hairline bg-paper p-4 flex items-start gap-3">
            <Lock className="h-5 w-5 text-ink shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-ink">
                Privacy Rules
              </h3>
              <p className="font-sans text-[13px] text-ink-muted leading-relaxed">
                Tax IDs (GSTIN) are hidden by default to protect customer privacy. Only the Operations Lead and Owner can reveal them. Every reveal is recorded in the activity log.
              </p>
            </div>
          </div>

          {/* API Keys Card */}
          <div className="border border-hairline bg-paper-elevated p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-ink" />
                <h2 className="font-serif text-[18px] font-semibold text-ink">
                  Webhook & API Keys
                </h2>
              </div>
              <span className="font-mono text-[11px] text-success">Live API Key</span>
            </div>

            <p className="font-sans text-[13px] text-ink-muted">
              Connect your website chat or ERP to send customer messages directly to AI.
            </p>

            {/* Key Field with Reveal & Copy */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink block font-semibold">
                API Key (Live)
              </span>

              <div className="flex items-center gap-2 max-w-lg">
                <div className="flex-1 rounded border border-hairline bg-paper px-3 py-2 font-mono text-[13px] text-ink">
                  {keyRevealed
                    ? "synex_live_8f93a180bb294ac9e20a4b71"
                    : "synex_live_••••••••••••••••••••••••"}
                </div>

                <button
                  type="button"
                  disabled={role === "viewer"}
                  onClick={handleToggleKey}
                  className={`inline-flex items-center gap-1.5 rounded border px-3 py-2 font-mono text-[12px] transition-colors ${
                    role === "viewer"
                      ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                      : "border-hairline bg-paper-elevated text-ink hover:border-ink/40"
                  }`}
                >
                  {keyRevealed ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      <span>Reveal</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper-elevated px-3 py-2 font-mono text-[12px] text-ink hover:border-ink/40"
                >
                  {copiedKey ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-ink-muted" />
                  )}
                  <span>{copiedKey ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {role === "viewer" && (
                <span className="font-mono text-[10px] text-ink-faint block mt-1">
                  Only the Owner and Operations Lead can reveal the API key.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Immutable Audit Log (Addendum B) */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          {/* Audit Search Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-hairline pb-3">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search activity log by action, user, or item..."
                aria-label="Search activity log"
                className="h-9 w-full rounded border border-hairline bg-paper-elevated pl-9 pr-3 font-sans text-[12px] text-ink focus:border-ink focus:outline-none"
              />
            </div>

            <span className="font-mono text-[11px] text-ink-muted">
              {filteredAuditLog.length} Events Logged
            </span>
          </div>

          {filteredAuditLog.length === 0 ? (
            <EmptyState title="No activity found matching your search." />
          ) : (
            <div className="overflow-x-auto border border-hairline bg-paper-elevated">
              <table className="w-full text-left border-collapse" aria-label="System activity log table">
                <thead>
                  <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                    <th scope="col" className="px-5 py-3.5 font-medium">Time</th>
                    <th scope="col" className="px-5 py-3.5 font-medium">User / Role</th>
                    <th scope="col" className="px-5 py-3.5 font-medium">Action</th>
                    <th scope="col" className="px-5 py-3.5 font-medium">Item</th>
                    <th scope="col" className="px-5 py-3.5 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline font-sans text-[13px]">
                  {filteredAuditLog.map((entry) => (
                    <tr key={entry.id} className="transition-colors hover:bg-paper/60">
                      <td className="px-5 py-3.5 whitespace-nowrap font-mono text-[11px] text-ink-muted">
                        <div>{entry.timestamp}</div>
                        <div className="text-[9px] text-ink-faint">{entry.id}</div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="font-semibold text-ink">{entry.actor}</div>
                        <div className="font-mono text-[10px] uppercase text-ink-muted">
                          {entry.role}
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="font-mono text-[11px] font-semibold text-ink bg-paper px-2 py-0.5 rounded border border-hairline">
                          {entry.action}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 font-mono text-[12px] text-ink whitespace-nowrap font-medium">
                        {entry.target}
                      </td>

                      <td className="px-5 py-3.5 font-sans text-[12px] text-ink-muted max-w-md leading-snug">
                        {entry.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Settings (B3) */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Tenant Profile */}
            <div className="border border-hairline bg-paper-elevated p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-hairline pb-3">
                <Building2 className="h-4 w-4 text-ink" />
                <h2 className="font-serif text-[18px] font-semibold text-ink">
                  Tenant Profile
                </h2>
              </div>

              <div className="space-y-3 font-mono text-[13px]">
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Organization Name</span>
                  <span className="font-semibold text-ink">Senthil Traders (TN-COI)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Tenant Identifier</span>
                  <span className="font-mono text-ink">TNT-IN-0418</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Business Category</span>
                  <span className="text-ink">Industrial Yarns &amp; Metal Fasteners</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Tax Registration</span>
                  <span className="font-mono text-ink">GSTIN: 33AAAAA0000A1Z5</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ink-muted">Deployment Node</span>
                  <span className="text-success font-medium">Private Self-Hosted (Coimbatore VPC)</span>
                </div>
                <div className="pt-3 border-t border-hairline">
                  <Link
                    href="/onboarding"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-[3px] border border-ink bg-paper py-2 font-mono text-[11px] text-ink hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none"
                  >
                    Run Setup Wizard (/onboarding)
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Business Hours */}
            <div className="border border-hairline bg-paper-elevated p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-hairline pb-3">
                <Clock className="h-4 w-4 text-ink" />
                <h2 className="font-serif text-[18px] font-semibold text-ink">
                  Operating Business Hours
                </h2>
              </div>

              <div className="space-y-3 font-mono text-[13px]">
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">AI Autonomous Ingestion</span>
                  <span className="font-semibold text-success">24/7 Continuous Operation</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Human Sales Desk</span>
                  <span className="text-ink">Mon–Sat 09:00 – 18:30 IST</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Warehouse Unloading Cutoff</span>
                  <span className="text-ink">Daily at 16:30 IST</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Sunday Schedule</span>
                  <span className="text-ink-muted">Autonomous Quotes Only · Desk Closed</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ink-muted">After-Hours Protocol</span>
                  <span className="text-ink font-medium">Hold escalations for T+1 morning batch</span>
                </div>
              </div>
            </div>

            {/* 3. Service Regions */}
            <div className="border border-hairline bg-paper-elevated p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-hairline pb-3">
                <MapPin className="h-4 w-4 text-ink" />
                <h2 className="font-serif text-[18px] font-semibold text-ink">
                  Service &amp; Delivery Regions
                </h2>
              </div>

              <div className="space-y-3 font-mono text-[13px]">
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Primary Zone</span>
                  <span className="font-semibold text-ink">Tamil Nadu (Coimbatore, Tirupur, Erode)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Secondary Logistics</span>
                  <span className="text-ink">Bengaluru Metro &amp; Palakkad Corridor</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Default Freight Carrier</span>
                  <span className="text-ink">Southern Express Freight (Surface)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ink-muted">Expedited Freight</span>
                  <span className="text-ink">Available on volume orders &gt;₹1,00,000</span>
                </div>
              </div>
            </div>

            {/* 4. Escalation Policy & SLA */}
            <div className="border border-hairline bg-paper-elevated p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-hairline pb-3">
                <AlertOctagon className="h-4 w-4 text-ink" />
                <h2 className="font-serif text-[18px] font-semibold text-ink">
                  Escalation Policy &amp; SLA
                </h2>
              </div>

              <div className="space-y-3 font-mono text-[13px]">
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">High Urgency SLA</span>
                  <span className="font-semibold text-ink">&lt; 15 mins during desk hours</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Standard Inquiries</span>
                  <span className="text-ink">&lt; 4 hours</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline">
                  <span className="text-ink-muted">Margin Floor Breach</span>
                  <span className="text-amber font-semibold">Requires Owner / Lead PIN</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ink-muted">Autonomous Cash Refunds</span>
                  <span className="text-error font-semibold">Hard Ceiling (₹0.00 prohibited)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
