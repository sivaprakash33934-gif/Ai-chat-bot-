"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";

function EmbedContent() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme");
  const theme = themeParam === "dark" ? "dark" : "light";

  return (
    <div className={`h-screen w-screen overflow-hidden ${theme === "dark" ? "bg-ink" : "bg-paper-elevated"}`}>
      <ChatWidget embedded theme={theme} />
    </div>
  );
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-paper flex items-center justify-center font-mono text-xs text-ink-muted">Loading SYNEX…</div>}>
      <EmbedContent />
    </Suspense>
  );
}
