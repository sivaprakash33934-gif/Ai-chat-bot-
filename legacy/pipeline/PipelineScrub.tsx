"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

const stages = [
  {
    code: "01 / DOMAIN",
    title: "Business enters.",
    body:
      "Start with a domain you control and explicitly authorize for ingestion.",
  },
  {
    code: "02 / SCRAPE",
    title: "Content separates.",
    body:
      "Permitted product, pricing and policy content is parsed into usable units.",
  },
  {
    code: "03 / KNOWLEDGE BASE",
    title: "Meaning organizes.",
    body:
      "Business information becomes structured context instead of disconnected pages.",
  },
  {
    code: "04 / NEURAL CORE",
    title: "Context connects.",
    body:
      "Relevant business knowledge is connected to the inference layer.",
  },
  {
    code: "05 / LIVE",
    title: "Intelligence acts.",
    body:
      "The resulting interface can answer a new request from current business context.",
  },
] as const;

export default function PipelineScrub() {
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
        const panels =
          gsap.utils.toArray<HTMLElement>(
            ".pipeline-stage",
            root,
          );

        panels.forEach(
          (panel, index) => {
            gsap.set(panel, {
              xPercent: -50,
              yPercent: -50,

              x:
                index === 0
                  ? 0
                  : index % 2 === 0
                    ? 150
                    : -150,

              scale:
                index === 0
                  ? 1
                  : 0.9,

              opacity:
                index === 0
                  ? 1
                  : 0,

              force3D: true,
            });
          },
        );

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=3500",
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh:
                true,
            },
          });

        for (
          let index = 1;
          index < panels.length;
          index += 1
        ) {
          const previous =
            panels[index - 1];

          const current =
            panels[index];

          timeline
            .to(
              previous,
              {
                x:
                  index % 2 === 0
                    ? -110
                    : 110,

                scale: 0.91,
                opacity: 0,

                duration: 0.7,

                ease:
                  "power2.inOut",
              },
            )
            .to(
              current,
              {
                x: 0,
                scale: 1,
                opacity: 1,

                duration: 0.8,

                ease:
                  "power3.out",
              },
              "<0.15",
            );
        }

        return () => {
          timeline.kill();
        };
      },
    );

    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        gsap.set(
          ".pipeline-stage",
          {
            clearProps:
              "transform,opacity",
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
      id="pipeline"
      ref={rootRef}
      className="pipeline"
      aria-labelledby="pipeline-title"
    >
      <div className="pipeline-inner page-shell">
        <div className="pipeline-copy">
          <span className="overline">
            INTELLIGENCE PIPELINE
          </span>

          <h2 id="pipeline-title">
            Data does not jump
            straight to AI.
          </h2>

          <p>
            It enters, gets
            structured, connects to
            context and only then
            becomes an actionable
            interface.
          </p>
        </div>

        <div
          className="pipeline-console"
          data-cursor="EXPLORE"
        >
          <div
            className="pipeline-axis"
            aria-hidden="true"
          />

          {stages.map(
            (stage) => (
              <article
                className="pipeline-stage"
                key={stage.code}
              >
                <span className="pipeline-stage-label">
                  {stage.code}
                </span>

                <h3>
                  {stage.title}
                </h3>

                <p>
                  {stage.body}
                </p>
              </article>
            ),
          )}

          <div className="pipeline-progress">
            DOMAIN → SCRAPE → KB →
            CORE → LIVE
          </div>
        </div>
      </div>
    </section>
  );
}