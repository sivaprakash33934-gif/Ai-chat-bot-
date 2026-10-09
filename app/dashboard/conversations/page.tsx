import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ConversationsBrowser } from "@/components/dashboard/ConversationsBrowser";

export const metadata: Metadata = {
  title: "Conversations · SYNEX Control Center",
  description: "Browse customer chats, verify answer citations, and take over escalated requests.",
};

export default function ConversationsPage() {
  return (
    <Suspense fallback={<div className="p-8 font-mono text-xs text-ink-muted">Loading conversations...</div>}>
      <ConversationsBrowser />
    </Suspense>
  );
}
