"use client";

import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";

/** Diamond glyph with signal-ai inner square matching header */
function BrandMark() {
  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: 24, height: 24 }}
      aria-hidden="true"
    >
      <div
        className="absolute border-2"
        style={{
          width: 14,
          height: 14,
          transform: "rotate(45deg)",
          borderRadius: 2,
          borderColor: "rgba(15,23,42,0.8)",
        }}
      />
      <div
        className="absolute bg-signal-ai"
        style={{
          width: 6,
          height: 6,
          borderRadius: 1,
          boxShadow: "0 0 8px rgba(79,70,229,0.6)",
        }}
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-surface-2 border-t border-hairline overflow-hidden pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BrandMark />
              <span className="font-display text-base font-bold text-ink-primary">
                Neural Commerce
              </span>
            </div>

            <p className="font-body text-sm text-ink-secondary leading-relaxed max-w-xs">
              Enterprise AI infrastructure for Indian MSMEs.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="text-ink-muted hover:text-ink-primary transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-ink-muted hover:text-ink-primary transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-ink-muted hover:text-ink-primary transition-colors duration-200"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 — Platform */}
          <div className="flex flex-col">
            <h3 className="font-display text-sm font-semibold text-ink-primary mb-4">
              Platform
            </h3>
            <ul className="flex flex-col gap-2">
              {["Features", "AI Engine", "Pricing", "SDK & API", "Documentation", "Changelog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      className="font-body text-[13px] text-ink-tertiary hover:text-ink-primary transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="flex flex-col">
            <h3 className="font-display text-sm font-semibold text-ink-primary mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              {["About", "Blog", "Careers", "Contact", "Support", "Status"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      className="font-body text-[13px] text-ink-tertiary hover:text-ink-primary transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div className="flex flex-col">
            <h3 className="font-display text-sm font-semibold text-ink-primary mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-2">
              {["Privacy Policy", "Terms of Service", "Security", "Compliance"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      className="font-body text-[13px] text-ink-tertiary hover:text-ink-primary transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>

            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-micro bg-surface-2 border border-hairline font-mono text-[10px] text-ink-muted">
                Made in India 🇮🇳
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Separator */}
        <div className="w-full h-px bg-slate-900/[0.06] mt-12 mb-6" />

        {/* Footer Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-body text-xs text-ink-muted">
            &copy; 2026 AI Business Platform. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-ink-muted">
            Built on Neural Core AI &bull; Secured with API Keys
          </p>
        </div>
      </div>

      {/* Footer Watermark */}
      <div
        className="w-full flex justify-center items-center select-none pointer-events-none overflow-hidden mt-6"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold uppercase tracking-tight text-center whitespace-nowrap leading-none"
          style={{
            fontSize: "clamp(4rem, 10vw, 10rem)",
            letterSpacing: "-0.04em",
            color: "rgba(15, 23, 42, 0.03)",
          }}
        >
          NEURAL COMMERCE
        </span>
      </div>
    </footer>
  );
}
