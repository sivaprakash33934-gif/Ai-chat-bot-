"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  Brain,
  Package,
  BookOpen,
  KeyRound,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  type LucideIcon,
} from "lucide-react";
import { DASHBOARD_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Package,
  BookOpen,
  KeyRound,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-[var(--color-dark-border)] bg-[var(--color-dark-bg)] transition-[width] duration-200 ease-out",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-[var(--color-dark-border)] px-4">
        {!collapsed && (
          <span className="truncate text-sm font-semibold tracking-tight text-[var(--color-dark-text)]">
            Neural Commerce
          </span>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[var(--color-dark-subtle)] hover:bg-[var(--color-dark-surface)] hover:text-[var(--color-dark-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)]"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronsRight size={16} />
          ) : (
            <ChevronsLeft size={16} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {DASHBOARD_NAV.map((item) => {
            const Icon = ICONS[item.icon ?? "Activity"];
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[44px] items-center gap-3 rounded-md px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)]",
                    active
                      ? "bg-[var(--color-dark-surface)] text-[var(--color-dark-text)]"
                      : "text-[var(--color-dark-muted)] hover:bg-[var(--color-dark-surface)]/60 hover:text-[var(--color-dark-text)]"
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      "shrink-0",
                      active && "text-[var(--color-signal)]"
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[var(--color-dark-border)] p-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-dark-subtle)]">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[var(--color-signal)]" />
          {!collapsed && "v0.1.0-stateless"}
        </div>
      </div>
    </aside>
  );
}
