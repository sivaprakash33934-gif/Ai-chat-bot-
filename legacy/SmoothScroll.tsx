"use client";

import { useEffect, useRef } from "react";

/**
 * Initialises Lenis smooth scroll + GSAP ScrollTrigger sync +
 * a global `data-reveal` scroll-reveal system.
 *
 * Renders nothing — purely a side-effect component.
 * Respects `prefers-reduced-motion`.
 */
export function SmoothScroll() {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    /* Respect reduced-motion */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let active = true;

    (async () => {
      try {
        const [LenisModule, gsapModule, stModule] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (!active) return;

        const Lenis = LenisModule.default;
        const gsap = gsapModule.default;
        const { ScrollTrigger } = stModule;

        gsap.registerPlugin(ScrollTrigger);

        /* ── Lenis init ── */
        const lenis = new Lenis({
          lerp: 0.075,
          smoothWheel: true,
          duration: 1.2,
        });

        if (typeof window !== "undefined") {
          (window as any).__lenis = lenis;
          if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
          }
          // Reset scroll immediately to top on mount
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        }

        /* ── Frame-locked GSAP ↔ Lenis sync ── */
        lenis.on("scroll", ScrollTrigger.update);
        const tickerCb = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);

        /* ── Global Scroll Reveal: data-reveal ── */
        const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

        document
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) => {
            const v = el.dataset.reveal || "up";
            const from: Record<string, number> =
              v === "left"
                ? { opacity: 0, x: -24 }
                : v === "right"
                ? { opacity: 0, x: 24 }
                : v === "scale"
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 0, y: 24 };

            gsap.set(el, from);

            const tween = gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power4.out",
              paused: true,
            });

            triggers.push(
              ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                onEnter: () => tween.play(),
                once: true,
              })
            );
          });

        /* ── Stagger Children: data-reveal-stagger ── */
        document
          .querySelectorAll<HTMLElement>("[data-reveal-stagger]")
          .forEach((parent) => {
            const children = Array.from(parent.children) as HTMLElement[];
            gsap.set(children, { opacity: 0, y: 24 });
            triggers.push(
              ScrollTrigger.create({
                trigger: parent,
                start: "top 85%",
                onEnter: () => {
                  gsap.to(children, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power4.out",
                    stagger: 0.08,
                  });
                },
                once: true,
              })
            );
          });

        /* ── Hero Parallax (scroll-driven fade / translate) ── */
        const heroEl = document.querySelector<HTMLElement>(
          "[data-hero-content]"
        );
        const heroDash = document.querySelector<HTMLElement>(
          "[data-hero-dashboard]"
        );

        if (heroEl) {
          gsap.to(heroEl, {
            yPercent: -15,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: heroEl.closest("section") ?? heroEl,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
        if (heroDash) {
          gsap.to(heroDash, {
            scale: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: heroDash.closest("section") ?? heroDash,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
        const heroSculpture = document.querySelector<HTMLElement>(
          "[data-hero-sculpture]"
        );
        if (heroSculpture) {
          gsap.to(heroSculpture, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: heroSculpture.closest("section") ?? heroSculpture,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        /* ── Cleanup ref ── */
        cleanupRef.current = () => {
          triggers.forEach((t) => t.kill());
          ScrollTrigger.getAll().forEach((t) => t.kill());
          gsap.ticker.remove(tickerCb);
          lenis.destroy();
          if (typeof window !== "undefined") {
            delete (window as any).__lenis;
          }
        };
      } catch (err) {
        /* Fail silently — animations are progressive enhancement */
        console.warn("[SmoothScroll] init skipped:", err);
      }
    })();

    return () => {
      active = false;
      cleanupRef.current?.();
    };
  }, []);

  return null;
}
