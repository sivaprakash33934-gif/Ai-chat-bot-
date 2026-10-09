"use client";

import { useState, useEffect } from "react";

/**
 * Page loader — shows for 500ms on initial load.
 * Brand diamond mark + a thin scaleX progress bar.
 * Fades out, then hero entrance sequence begins.
 * Respects prefers-reduced-motion (skips loader instantly).
 */
export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    /* Skip loader under reduced motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoading(false);
      return;
    }

    const t1 = setTimeout(() => setFadeOut(true), 500);
    const t2 = setTimeout(() => setLoading(false), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-canvas-deep"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 300ms ease-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
      aria-label="Loading"
    >
      {/* Brand diamond mark — enlarged version of header glyph */}
      <div
        className="relative flex items-center justify-center mb-8"
        style={{ width: 48, height: 48 }}
        aria-hidden="true"
      >
        {/* Outer rotated square */}
        <div
          className="absolute border-2"
          style={{
            width: 28,
            height: 28,
            transform: "rotate(45deg)",
            borderRadius: 4,
            borderColor: "rgba(15,23,42,0.8)",
          }}
        />
        {/* Inner signal-ai core */}
        <div
          className="absolute bg-signal-ai"
          style={{
            width: 12,
            height: 12,
            borderRadius: 2,
            boxShadow: "0 0 16px rgba(79,70,229,0.6)",
          }}
        />
      </div>

      {/* Progress bar — compositor-only scaleX animation */}
      <div
        className="overflow-hidden rounded-pill"
        style={{ width: 192, height: 2, background: "#F1F2F5" }}
      >
        <div
          className="h-full rounded-pill bg-signal-ai origin-left animate-loader-scale"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Brand name */}
      <p
        className="mt-6 font-mono uppercase text-ink-muted"
        style={{ fontSize: 10, letterSpacing: "0.14em" }}
      >
        Neural Commerce Command
      </p>
    </div>
  );
}
