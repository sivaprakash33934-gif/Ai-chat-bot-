"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor follower — desktop only.
 * Two elements: a small white dot + an outer ring.
 * All tracking via requestAnimationFrame + direct DOM manipulation — zero React rerenders.
 * Ring appears on interactive hover, EXPLORE label on dashboard hover.
 * Respects prefers-reduced-motion. Hidden on touch devices and mobile.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const hovering = useRef(false);
  const exploring = useRef(false);

  useEffect(() => {
    /* Guard: touch device, mobile, or reduced-motion */
    if ("ontouchstart" in window) return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    /* ── Mouse move ── */
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    /* ── Mouse leaves viewport ── */
    const onMouseLeaveDocument = () => {
      visible.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    /* ── Hover detection via event delegation ── */
    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      const dashboard = t.closest("#dashboard-showcase");

      if (interactive && !hovering.current) {
        hovering.current = true;
        dot.style.transform = "translate(-50%,-50%) scale(0)";
        ring.style.transform = "translate(-50%,-50%) scale(1)";
      }

      if (dashboard && !exploring.current) {
        exploring.current = true;
        ring.style.transform = "translate(-50%,-50%) scale(1.75)";
        label.style.opacity = "1";
        label.style.transform = "scale(0.57)";
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      const dashboard = t.closest("#dashboard-showcase");

      if (interactive) {
        hovering.current = false;
        dot.style.transform = "translate(-50%,-50%) scale(1)";
        ring.style.transform = "translate(-50%,-50%) scale(0)";
      }

      /* Only reset exploring when actually leaving the dashboard section */
      if (dashboard && !t.closest("#dashboard-showcase")) {
        exploring.current = false;
        label.style.opacity = "0";
        label.style.transform = "scale(0)";
        if (!hovering.current) {
          ring.style.transform = "translate(-50%,-50%) scale(0)";
        }
      }
    };

    /* ── rAF Lerp Loop ── */
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      const x = pos.current.x;
      const y = pos.current.y;

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;

      rafRef.current = requestAnimationFrame(loop);
    };

    /* ── Attach ── */
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener(
      "mouseleave",
      onMouseLeaveDocument
    );
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        onMouseLeaveDocument
      );
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] opacity-0 hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "white",
          mixBlendMode: "difference",
          transform: "translate(-50%,-50%) scale(1)",
          transition:
            "transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 200ms",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999] opacity-0 hidden md:block flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.4)",
          background: "transparent",
          mixBlendMode: "difference",
          transform: "translate(-50%,-50%) scale(0)",
          transition:
            "transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 200ms, border-color 200ms",
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        {/* EXPLORE label (visible only on dashboard hover) */}
        <span
          ref={labelRef}
          className="font-mono uppercase text-white select-none"
          style={{
            fontSize: 7,
            letterSpacing: "0.16em",
            opacity: 0,
            transform: "scale(0)",
            transition: "opacity 200ms, transform 200ms",
            whiteSpace: "nowrap",
          }}
        >
          Explore
        </span>
      </div>
    </>
  );
}
