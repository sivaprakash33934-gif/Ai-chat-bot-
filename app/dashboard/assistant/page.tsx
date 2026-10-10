import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AssistantWorkspace } from "@/components/dashboard/AssistantWorkspace";

export const metadata: Metadata = {
  title: "SYNEX Assistant · SYNEX Control Center",
  description: "Conversational business intelligence, evidence verification, and controlled operational actions.",
};

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-ink-muted">Loading SYNEX Assistant workspace...</div>}>
      <AssistantWorkspace />
    </Suspense>
  );
}
