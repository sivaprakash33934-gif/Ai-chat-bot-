"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#pipeline", label: "Pipeline" },
    { href: "#capabilities", label: "Capabilities" },
    { href: "#command-center", label: "Command Center" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-[#FAFAFC]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 group min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-md px-1"
          aria-label="Neural Commerce Home"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#4F46E5] group-hover:scale-110 transition-transform shadow-xs shadow-[#4F46E5]/50" />
          <span>Neural Commerce</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 transition min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded px-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#demo"
            className="hidden sm:inline-flex min-h-[44px] items-center text-xs font-mono px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            data-cursor="TRY"
          >
            DEMO MODE
          </a>
          <a
            href="#pricing"
            className="inline-flex min-h-[44px] items-center text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            data-cursor="EXPLORE"
            data-magnetic="true"
          >
            ₹198 / Year
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/90 bg-[#FAFAFC] px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-200/80 flex flex-col gap-2">
              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center justify-center rounded-lg bg-slate-100 px-4 py-2.5 font-mono text-xs font-semibold text-slate-800"
              >
                DEMO MODE (STATELESS)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
