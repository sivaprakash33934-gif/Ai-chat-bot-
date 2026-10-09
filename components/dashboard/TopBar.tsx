"use client";

import { useState, useCallback } from "react";
import { ChevronDown, Globe, User, Lock } from "lucide-react";
import { INDIAN_LANGUAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TopBar() {
  const [language, setLanguage] = useState("English");
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Fix 1: Restore closeAll function for outside clicks
  const closeAll = useCallback(() => {
    setLangOpen(false);
    setProfileOpen(false);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--color-dark-border)] bg-[var(--color-dark-bg)] px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-signal)]" />
          <span className="font-mono text-xs text-[var(--color-dark-muted)]">
            Live • Stateless Inference
          </span>
        </div>

        {/* Session Ephemeral Badge */}
        <div className="hidden items-center gap-1.5 rounded-full border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] px-2.5 py-1 sm:flex">
          <Lock size={12} className="text-[var(--color-signal)]" />
          <span className="font-mono text-[10px] text-[var(--color-dark-muted)]">
            Ephemeral Session • No Data Stored
          </span>
        </div>
      </div>

      {/* Fix 1: Invisible overlay to close dropdowns on outside click */}
      {(langOpen || profileOpen) && (
        <button
          className="fixed inset-0 z-10 cursor-default"
          onClick={closeAll}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      <div className="relative z-20 flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => {
              setLangOpen((v) => !v);
              setProfileOpen(false);
            }}
            aria-expanded={langOpen}
            aria-haspopup="listbox"
            className="flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--color-dark-border)] px-3 text-sm text-neutral-300 transition-colors duration-150 hover:border-[var(--color-signal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)]"
          >
            <Globe size={14} />
            {language}
            <ChevronDown size={14} />
          </button>
          {langOpen && (
            <div role="listbox" className="absolute right-0 z-30 mt-2 max-h-72 w-48 overflow-y-auto rounded-md border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] py-1 shadow-xl">
              {INDIAN_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  role="option"
                  aria-selected={lang === language}
                  onClick={() => {
                    setLanguage(lang);
                    setLangOpen(false);
                  }}
                  className={cn(
                    "flex min-h-[44px] w-full items-center px-3 text-left text-sm transition-colors duration-75 hover:bg-[var(--color-dark-bg)]",
                    lang === language ? "text-[var(--color-signal)]" : "text-neutral-300"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setLangOpen(false);
            }}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-dark-border)] text-neutral-300 transition-colors duration-150 hover:border-[var(--color-signal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal)]"
            aria-label="Profile menu"
          >
            <User size={16} />
          </button>
          {profileOpen && (
            <div role="menu" className="absolute right-0 z-30 mt-2 w-48 rounded-md border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] py-1 shadow-xl">
              <a href="/dashboard/settings" role="menuitem" className="flex min-h-[44px] items-center px-3 text-sm text-neutral-300 transition-colors duration-75 hover:bg-[var(--color-dark-bg)]">
                Account Settings
              </a>
              <a href="/" role="menuitem" className="flex min-h-[44px] items-center px-3 text-sm text-red-400 transition-colors duration-75 hover:bg-[var(--color-dark-bg)]">
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
