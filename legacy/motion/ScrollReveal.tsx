"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const el = elRef.current;
    if (!el) return;

    const offsetMap = {
      up: { y: 28, x: 0 },
      down: { y: -28, x: 0 },
      left: { x: 28, y: 0 },
      right: { x: -28, y: 0 },
    };

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...offsetMap[direction],
        opacity: 0,
        duration: 0.7,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [delay, direction]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
