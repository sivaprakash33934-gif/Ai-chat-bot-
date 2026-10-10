"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  CheckSquare,
  Users,
  BookOpen,
  Zap,
  Sliders,
  BarChart3,
  Shield,
  X,
  Layers,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { CONVERSATIONS_DIRECTORY, INITIAL_TOOL_EXECUTIONS } from "@/lib/fixtures";

interface NavItemDef {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeKey?: "unresolvedConversations" | "needsAttention" | "knowledgeIssues" | "actionIssues";
}

const NAV_ITEMS: NavItemDef[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Assistant", href: "/dashboard/assistant", icon: Bot },
  { label: "Conversations", href: "/dashboard/conversations", icon: MessageSquare, badgeKey: "unresolvedConversations" },
  { label: "Work Queue", href: "/dashboard/queue", icon: CheckSquare, badgeKey: "needsAttention" },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen, badgeKey: "knowledgeIssues" },
  { label: "Actions", href: "/dashboard/actions", icon: Zap, badgeKey: "actionIssues" },
  { label: "Rules & Permissions", href: "/dashboard/rules", icon: Sliders },
  { label: "Insights", href: "/dashboard/insights", icon: BarChart3 },
  { label: "Admin", href: "/dashboard/admin", icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const {
    needsAttentionCount,
    knowledgeIssuesCount,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useDashboardStore();

  const unresolvedConversationsCount = useMemo(() => {
    return CONVERSATIONS_DIRECTORY.filter(
      (c) => c.status === "handoff_pending" || c.status === "handoff_claimed"
    ).length;
  }, []);

  const actionIssuesCount = useMemo(() => {
    return INITIAL_TOOL_EXECUTIONS.filter(
      (e) => e.status === "failed" || e.status === "unknown"
    ).length;
  }, []);

  const getBadgeValue = (
    key?: "unresolvedConversations" | "needsAttention" | "knowledgeIssues" | "actionIssues"
  ): number => {
    if (key === "unresolvedConversations") return unresolvedConversationsCount;
    if (key === "needsAttention") return needsAttentionCount;
    if (key === "knowledgeIssues") return knowledgeIssuesCount;
    if (key === "actionIssues") return actionIssuesCount;
    return 0;
  };

  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between bg-paper border-r border-hairline p-4 w-[240px]">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            <div className="flex h-7 w-7 items-center justify-center border border-ink bg-ink text-paper">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <span className="font-serif text-[16px] font-bold tracking-tight text-ink">
                SYNEX
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                Control Center v3
              </span>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
            className="lg:hidden rounded p-1 text-ink-muted hover:text-ink focus-visible:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item.href);
            const badgeCount = getBadgeValue(item.badgeKey);
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center justify-between px-3 py-2.5 text-[13px] font-sans transition-colors rounded-sm ${
                  active
                    ? "bg-paper-elevated font-medium text-ink border border-hairline"
                    : "text-ink-muted hover:text-ink hover:bg-paper-elevated/60"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <IconComponent
                    className={`h-4 w-4 shrink-0 ${
                      active ? "text-ink" : "text-ink-muted group-hover:text-ink"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {badgeCount > 0 && (
                  <span
                    aria-label={`${badgeCount} items requiring attention`}
                    className="inline-flex items-center justify-center rounded-full bg-amber-tint border border-amber/30 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-amber"
                  >
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Sovereignty Tag */}
      <div className="border-t border-hairline pt-3 mt-6">
        <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span>Private & Local AI</span>
        </div>
        <div className="mt-1 font-mono text-[9px] text-ink-faint">
          Account: Senthil Traders (TN-COI)
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile Off-Canvas Drawer (<900px) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/30 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 flex">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
