"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RedirectClient({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <div className="py-16 text-center font-mono text-[13px] text-ink-muted">
      <span>Redirecting to {to}...</span>
    </div>
  );
}
