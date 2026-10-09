import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const metadata: Metadata = {
  title: "Setup Wizard — SYNEX",
  description: "Configure your enterprise AI workspace in 7 deterministic steps.",
};

export default function OnboardingPage() {
  return (
    <MarketingLayout>
      <main className="min-h-screen bg-paper px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between border-b border-hairline pb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-ink-muted hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Control Center
            </Link>
            <span className="font-mono text-[11px] text-ink-muted uppercase">
              Guided Provisioning · Demo Mode
            </span>
          </div>

          <Suspense
            fallback={
              <div className="py-20 text-center font-mono text-[12px] text-ink-muted">
                Loading Setup Wizard Ledger…
              </div>
            }
          >
            <OnboardingWizard />
          </Suspense>
        </div>
      </main>
    </MarketingLayout>
  );
}
