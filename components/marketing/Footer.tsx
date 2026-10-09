import React from 'react';
import Link from 'next/link';

export function Footer() {
  const deploymentDate = new Date().toISOString().split('T')[0];

  return (
    <footer className="border-t border-hairline bg-paper px-6 pt-16 pb-12 sm:px-10 md:px-14">
      <div className="max-w-7xl mx-auto">
        {/* 4 Semantic Link Columns (Master Blueprint §10) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12">
          {/* Column 1: Product */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-4 border-b border-hairline pb-2">
              01 // Product
            </p>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/docs" className="text-ink-muted hover:text-ink transition-colors">
                  API &amp; Docs
                </Link>
              </li>
              <li>
                <Link href="/docs#architecture" className="text-ink-muted hover:text-ink transition-colors">
                  Architecture &amp; Topology
                </Link>
              </li>
              <li>
                <Link href="/docs#deployment" className="text-ink-muted hover:text-ink transition-colors">
                  Deployment Guide
                </Link>
              </li>
              <li>
                <Link href="/#act-1" className="text-ink-muted hover:text-ink transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard/today" className="text-ink-muted hover:text-ink transition-colors">
                  Control Center
                </Link>
              </li>
              <li>
                <Link href="/limits" className="text-ink-muted hover:text-ink transition-colors">
                  Limits &amp; Boundaries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Trust & Sovereignty */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-4 border-b border-hairline pb-2">
              02 // Trust
            </p>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/limits#sovereignty" className="text-ink-muted hover:text-ink transition-colors">
                  Hardware Sovereignty
                </Link>
              </li>
              <li>
                <span className="text-ink-muted">Ed25519 Hardware HSM (Planned)</span>
              </li>
              <li>
                <span className="text-ink-muted">Privacy Policy (Zero Telemetry)</span>
              </li>
              <li>
                <span className="text-ink-muted">Data Processing Addendum (DPA)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-4 border-b border-hairline pb-2">
              03 // Company
            </p>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/changelog" className="text-ink-muted hover:text-ink transition-colors">
                  Changelog Ledger
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink-muted hover:text-ink transition-colors">
                  About SYNEX
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-ink-muted hover:text-ink transition-colors">
                  Partners &amp; Integrators
                </Link>
              </li>
              <li>
                <span className="text-ink-muted">Indian MSME Initiative (Planned)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Start */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-4 border-b border-hairline pb-2">
              04 // Start
            </p>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/#act-11" className="text-ink font-semibold hover:underline">
                  Commit Pilot Trace Request
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-ink-muted hover:text-ink transition-colors">
                  Operator Login
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-ink-muted hover:text-ink transition-colors">
                  Setup Wizard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/approvals" className="text-ink-muted hover:text-ink transition-colors">
                  Test Approval Gate
                </Link>
              </li>
              <li>
                <Link href="/dashboard/audit" className="text-ink-muted hover:text-ink transition-colors">
                  Audit Ledger Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Demonstrated Sovereignty Baseline Strip */}
        <div className="border-t border-hairline pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[11px] text-ink-muted">
          <p>
            &copy; SYNEX · No third-party trackers on this site · Fonts self-hosted · Page weight: 159 KB HTML · 110 KB First Load JS · Last deployed{' '}
            <span className="text-ink font-semibold tabular-nums">{deploymentDate}</span>
          </p>
          <div className="flex items-center gap-4 text-ink-faint">
            <Link href="/llms.txt" className="hover:text-ink transition-colors">
              /llms.txt
            </Link>
            <span>·</span>
            <Link href="/limits" className="hover:text-ink transition-colors">
              /limits
            </Link>
            <span>·</span>
            <Link href="/changelog" className="hover:text-ink transition-colors">
              /changelog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
