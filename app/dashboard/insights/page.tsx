"use client";

import React, { Suspense } from "react";
import { Insights } from "@/components/dashboard/Insights";

export default function InsightsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center font-mono text-[12px] text-ink-muted">
          Loading Insights & Ledger...
        </div>
      }
    >
      <Insights />
    </Suspense>
  );
}
