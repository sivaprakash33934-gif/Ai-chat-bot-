"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CustomersList } from "@/components/dashboard/CustomersList";

function CustomersPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("returnQuery") || "";

  return <CustomersList initialQuery={query} />;
}

export default function CustomersPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center font-mono text-[12px] text-ink-muted">
          Loading Customers Directory...
        </div>
      }
    >
      <CustomersPageContent />
    </Suspense>
  );
}
