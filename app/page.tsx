import React from 'react';
import { TraceRail } from './components/trace/TraceRail';
import { Act0Hero } from './components/trace/Act0Hero';
import { Act1Know } from './components/trace/Act1Know';
import { Act2Understand } from './components/trace/Act2Understand';
import { Act3Stakes } from './components/trace/Act3Stakes';
import { Act4Reason } from './components/trace/Act4Reason';
import { Act5PermissionGate } from './components/trace/Act5PermissionGate';
import { Act6Act } from './components/trace/Act6Act';
import { Act7Handoff } from './components/trace/Act7Handoff';
import { Act8Measure } from './components/trace/Act8Measure';
import { Act9Improve } from './components/trace/Act9Improve';
import { TracePlate } from './components/trace/TracePlate';
import { Act10Sovereignty } from './components/trace/Act10Sovereignty';
import { Act11Conversion } from './components/trace/Act11Conversion';
import { ThreeStepStrip } from '@/components/marketing/ThreeStepStrip';
import { TrustControlStrip } from '@/components/marketing/TrustControlStrip';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';

export default function TraceHomePage() {
  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper">
      {/* WCAG AA Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-paper font-mono text-xs focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Secondary Skip Link: Jump directly to economic outcome / Act 8 */}
      <a
        href="#act-8"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-48 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-paper font-mono text-xs focus:outline-none"
      >
        Skip to the outcome (Act 8 Ledger) &rarr;
      </a>

      {/* Global Slim Header with Scroll-Spy & Mobile Menu */}
      <Header />

      {/* Global Left Gutter Navigation */}
      <TraceRail />

      {/* Main Narrative Ledger Flow */}
      <main id="main-content" className="w-full lg:pl-16 overflow-x-clip">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-14">
          {/* Act 0: The Sentence & Hero */}
          <Act0Hero />

          {/* Three-Step Overview Strip */}
          <ThreeStepStrip />

          {/* Act 1: Grounding & Evidentiary Ingestion */}
          <Act1Know />

          {/* Act 2: Semantic Parse & Extraction */}
          <Act2Understand />

          {/* Act 3: The Stakes (Full-Bleed Dark Stage Break) */}
          <Act3Stakes />

          {/* Act 4: Rule Chain & Policy Evaluation with Interactive Preview Slider */}
          <Act4Reason />

          {/* Act 5: Permission Gate (Signature §21.1 Interaction) */}
          <Act5PermissionGate />

          {/* Act 6: Deterministic Side-Effects & Execution Log */}
          <Act6Act />

          {/* Act 7: Priya's Payload & Operational Handoff */}
          <Act7Handoff />

          {/* Act 8: Double-Entry Accounting & Economic Telemetry */}
          <Act8Measure />

          {/* Act 9: Autonomous Self-Auditing & Knowledge Gaps */}
          <Act9Improve />

          {/* The Trace Plate (Blueprint §41.2 Print-Grade Archival Artifact) */}
          <TracePlate />

          {/* Act 10: Hardware Sovereignty & Operational Boundaries */}
          <Act10Sovereignty />

          {/* Trust & Control Guarantees Strip */}
          <TrustControlStrip />

          {/* Act 11: Conversion / Open a Trace */}
          <Act11Conversion />
        </div>

        {/* Global 4-column trust ledger & sovereignty baseline */}
        <Footer />
      </main>

      {/* Sovereign AI Chat Shell */}
      <ChatWidget />
    </div>
  );
}
