"use client";

import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function EmptyState() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          ...(prefersReducedMotion && { duration: 0 }),
        }}
        className="mb-4"
      >
        <Radar
          size={32}
          className="text-[var(--color-signal)] opacity-40"
        />
      </motion.div>

      <h3 className="font-mono text-sm font-semibold text-white">
        Awaiting First Query
      </h3>
      <p className="mt-2 max-w-sm font-mono text-xs text-[var(--color-dark-muted)]">
        Live inference telemetry will appear here as queries flow through your
        commerce surfaces.
      </p>
    </div>
  );
}
