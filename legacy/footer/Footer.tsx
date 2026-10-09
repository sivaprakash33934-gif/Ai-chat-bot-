"use client";

import { useState } from "react";

export default function Footer() {
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  ];

  return (
    <footer
      className="border-t border-slate-200/90 bg-white py-14 px-4 sm:px-6 lg:px-8 relative z-20"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-3 flex-wrap justify-center text-center sm:text-left">
          <span className="font-semibold text-slate-900">
            © {new Date().getFullYear()} Neural Commerce Inc.
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Stateless Enterprise Runtime</span>
          <span className="hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
            <span>🇮🇳</span> Made in India for MSMEs
          </span>
        </div>

        {/* Language Selector & Legal Links */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <label htmlFor="footer-language" className="sr-only">
              Select Language
            </label>
            <select
              id="footer-language"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="min-h-[44px] px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 font-mono text-xs text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#demo"
              className="min-h-[44px] inline-flex items-center hover:text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded px-2"
            >
              Privacy Policy
            </a>
            <a
              href="#pricing"
              className="min-h-[44px] inline-flex items-center hover:text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded px-2"
            >
              Terms of Service
            </a>
            <a
              href="#faq"
              className="min-h-[44px] inline-flex items-center hover:text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded px-2"
            >
              Stateless Architecture Audit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
