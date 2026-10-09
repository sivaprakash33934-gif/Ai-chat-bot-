"use client";

import { useEffect, useRef } from "react";

const ALLOWED_LABELS = new Set(["EXPLORE", "DRAG", "TRY"]);

export default function ContextualCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const currentMagneticRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;

    if (!root || !label) {
      return;
    }

    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      root.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;
      frame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      // Check contextual cursor label
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const value = target?.dataset.cursor;

      if (!value || !ALLOWED_LABELS.has(value)) {
        root.dataset.visible = "false";
      } else {
        label.textContent = value;
        root.dataset.visible = "true";
      }

      // Magnetic pull micro-interaction on elements with data-magnetic="true"
      const magneticTarget = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic='true']");
      if (magneticTarget) {
        currentMagneticRef.current = magneticTarget;
        const rect = magneticTarget.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        magneticTarget.style.transition = "transform 0.1s ease-out";
        magneticTarget.style.transform = `translate3d(${relX * 0.25}px, ${relY * 0.25}px, 0)`;
      } else if (currentMagneticRef.current) {
        currentMagneticRef.current.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
        currentMagneticRef.current.style.transform = "translate3d(0, 0, 0)";
        currentMagneticRef.current = null;
      }
    };

    const hide = () => {
      root.dataset.visible = "false";
      if (currentMagneticRef.current) {
        currentMagneticRef.current.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
        currentMagneticRef.current.style.transform = "translate3d(0, 0, 0)";
        currentMagneticRef.current = null;
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="context-cursor"
      data-visible="false"
      aria-hidden="true"
    >
      <span ref={labelRef} />
    </div>
  );
}