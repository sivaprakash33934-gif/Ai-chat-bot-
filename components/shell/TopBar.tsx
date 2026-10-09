"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Search,
  X,
  ChevronDown,
  ShieldAlert,
  Eye,
  EyeOff,
  Menu,
  Lock,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { Role } from "@/lib/fixtures";
import { HonestyBadge } from "@/components/dashboard/ui";

const ROLE_OPTIONS: { id: Role; label: string; badge: string; description: string }[] = [
  {
    id: "ops_lead",
    label: "Ops Lead",
    badge: "Full Operator",
    description: "Approve quotes, edit business rules, take over chats, show tax IDs.",
  },
  {
    id: "owner",
    label: "Owner",
    badge: "Admin",
    description: "Manage team members, view API keys, view activity log, show tax IDs.",
  },
  {
    id: "viewer",
    label: "Viewer",
    badge: "Read Only",
    description: "View-only access. Cannot change rules or show hidden tax IDs.",
  },
];

export function TopBar() {
  const {
    role,
    setRole,
    revealPII,
    setRevealPII,
    searchQuery,
    setSearchQuery,
    setMobileMenuOpen,
  } = useDashboardStore();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const closeDropdown = useCallback(() => setRoleMenuOpen(false), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setRoleMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const currentRoleDef = ROLE_OPTIONS.find((r) => r.id === role) || ROLE_OPTIONS[0];

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-hairline bg-paper px-4 md:px-6">
      {/* Outside click dismiss overlay */}
      {roleMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 cursor-default"
          onClick={closeDropdown}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open mobile navigation"
          className="lg:hidden rounded border border-hairline bg-paper-elevated p-2 text-ink hover:border-ink/40"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, companies, tax IDs... (⌘K)"
            aria-label="Search records"
            className="h-9 w-full rounded border border-hairline bg-paper-elevated pl-8 pr-8 font-sans text-[12px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search input"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Honesty Tag, PII Toggle, Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Honesty Pill (Desktop only) */}
        <div className="hidden sm:block">
          <HonestyBadge />
        </div>

        {/* PII Toggle */}
        <div className="relative">
          {role === "viewer" ? (
            <div
              title="Tax IDs are hidden by default. Only Ops Lead and Owner can reveal them."
              className="flex items-center gap-1.5 rounded border border-hairline bg-paper px-2.5 py-1.5 font-mono text-[11px] text-ink-faint opacity-60 cursor-not-allowed"
            >
              <Lock className="h-3 w-3 text-ink-muted" />
              <span className="hidden md:inline">Tax IDs Hidden</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setRevealPII(!revealPII)}
              aria-label={revealPII ? "Hide tax IDs" : "Show tax IDs"}
              className={`flex items-center gap-1.5 rounded border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                revealPII
                  ? "border-amber bg-amber-tint text-amber font-semibold"
                  : "border-hairline bg-paper-elevated text-ink hover:border-ink/40"
              }`}
            >
              {revealPII ? (
                <>
                  <EyeOff className="h-3 w-3" />
                  <span className="hidden md:inline">Tax IDs Visible</span>
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3 text-ink-muted" />
                  <span className="hidden md:inline">Show Tax IDs</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Role Switcher Dropdown */}
        <div className="relative z-30">
          <button
            type="button"
            onClick={() => setRoleMenuOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={roleMenuOpen}
            className="flex items-center gap-2 rounded border border-hairline bg-paper-elevated px-3 py-1.5 font-sans text-[12px] text-ink hover:border-ink/40"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-medium">{currentRoleDef.label}</span>
              <span className="font-mono text-[10px] text-ink-muted">({currentRoleDef.badge})</span>
            </div>
            <ChevronDown className="h-3 w-3 text-ink-muted" />
          </button>

          {roleMenuOpen && (
            <ul
              role="listbox"
              aria-label="Select user role"
              className="absolute right-0 top-[calc(100%+6px)] z-40 w-[260px] rounded border border-hairline bg-paper-elevated p-1 shadow-none"
            >
              <li className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted border-b border-hairline mb-1">
                Current Role
              </li>
              {ROLE_OPTIONS.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setRole(opt.id);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-sm text-[12px] transition-colors ${
                      role === opt.id
                        ? "bg-paper font-semibold text-ink"
                        : "text-ink-muted hover:bg-paper hover:text-ink"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">{opt.label}</span>
                      <span className="font-mono text-[10px] text-ink-muted">{opt.badge}</span>
                    </div>
                    <p className="mt-0.5 font-sans text-[11px] text-ink-muted leading-tight">
                      {opt.description}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
