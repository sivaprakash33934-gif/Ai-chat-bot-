"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

const layers = [
  {
    code: "ANALYTICS",
    title: "Demand signals",
    description:
      "See how business questions map to products and information needs.",
  },
  {
    code: "LEADS",
    title: "Customer intent",
    description:
      "Connect qualified customer intent to your chosen sales workflow.",
  },
  {
    code: "AI",
    title: "Neural context",
    description:
      "Ground each independent request in current business knowledge.",
  },
] as const;

export default function ExplodedDashboard() {
  const rootRef =
    useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger,
    );

    const root =
      rootRef.current;

    if (!root) {
      return;
    }

    const mm =
      gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const elements =
          gsap.utils.toArray<HTMLElement>(
            ".dashboard-layer",
            root,
          );

        const states = [
          {
            x: -170,
            y: -90,
            scale: 0.84,
            rotate: -6,
          },
          {
            x: 160,
            y: 8,
            scale: 0.91,
            rotate: 5,
          },
          {
            x: -110,
            y: 120,
            scale: 0.88,
            rotate: -4,
          },
        ];

        elements.forEach(
          (element, index) => {
            const state =
              states[index];

            gsap.set(element, {
              ...state,
              opacity:
                0.68 +
                index * 0.1,

              force3D: true,
              transformPerspective:
                1200,
            });
          },
        );

        gsap.set(
          ".dashboard-signal",
          {
            scaleX: 0,
            opacity: 0,
          },
        );

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=2800",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh:
                true,
            },
          });

        timeline
          .to(elements, {
            x: (
              index: number,
            ) =>
              (
                index -
                1
              ) * 22,

            y: (
              index: number,
            ) =>
              (
                index -
                1
              ) * 16,

            rotate: 0,
            scale: 0.97,
            opacity: 0.88,

            duration: 0.9,

            stagger: 0.06,

            ease:
              "power2.inOut",
          })
          .to(
            elements,
            {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,

              duration: 0.85,

              stagger: 0.05,

              ease:
                "power3.inOut",
            },
          )
          .to(
            ".dashboard-signal",
            {
              scaleX: 1,
              opacity: 1,

              duration: 0.5,

              ease:
                "power2.out",
            },
          )
          .to(
            ".dashboard-shell",
            {
              scale: 1.012,

              duration: 0.35,

              ease:
                "power2.out",
            },
          );

        return () => {
          timeline.kill();
        };
      },
    );

    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        gsap.set(
          ".dashboard-layer",
          {
            clearProps:
              "transform,opacity",
          },
        );

        gsap.set(
          ".dashboard-signal",
          {
            scaleX: 1,
            opacity: 1,
          },
        );
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="command-center"
      aria-labelledby="command-heading"
    >
      <div className="command-grid page-shell">
        <div className="command-copy">
          <span
            className="overline"
            style={{
              color: "#A5B4FC",
            }}
          >
            COMMAND CENTER
          </span>

          <h2 id="command-heading">
            Separate signals.
            <br />
            One operating view.
          </h2>

          <p>
            Analytics, customer
            intent and AI context
            converge into one
            operational surface.
          </p>
        </div>

        <div
          className="command-stage"
          data-cursor="DRAG"
        >
          <div className="dashboard-shell">
            <header className="dashboard-header">
              <span>
                NEURAL COMMERCE /
                COMMAND
              </span>

              <strong>
                ● SYSTEM
                AVAILABLE
              </strong>
            </header>

            <div className="dashboard-layers">
              {layers.map(
                (layer) => (
                  <article
                    className="dashboard-layer"
                    key={layer.code}
                  >
                    <span className="eyebrow">
                      {layer.code}
                    </span>

                    <h3>
                      {layer.title}
                    </h3>

                    <p>
                      {
                        layer.description
                      }
                    </p>
                  </article>
                ),
              )}
            </div>

            <div
              className="dashboard-signal"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}