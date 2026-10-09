import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ActionsCenter } from "@/components/dashboard/ActionsCenter";

export const metadata: Metadata = {
  title: "Actions · SYNEX Control Center",
  description: "Deterministic tool executions, side-effect audits, and failure recovery.",
};

export default function ActionsPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-ink-muted">Loading actions center...</div>}>
      <ActionsCenter />
    </Suspense>
  );
}
