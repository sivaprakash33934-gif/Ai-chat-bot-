"use client";

import React, { Suspense } from "react";
import { Admin } from "@/components/dashboard/Admin";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center font-mono text-[12px] text-ink-muted">
          Loading Admin & Activity Log...
        </div>
      }
    >
      <Admin />
    </Suspense>
  );
}
