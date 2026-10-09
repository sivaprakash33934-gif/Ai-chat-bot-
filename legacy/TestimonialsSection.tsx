"use client";

import React, { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  business: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Our customer support tickets dropped by 60% after implementing the AI chatbot. It understands our products better than our own staff.",
    author: "Rajesh Kumar",
    business: "Kumar Textiles · Coimbatore",
  },
  {
    quote:
      "The business intelligence feature suggested marketing ideas we never thought of. Revenue grew 23% in just 3 months.",
    author: "Priya Sharma",
    business: "Sharma Electronics · Delhi",
  },
  {
    quote:
      "At ₹198/year, this is the best investment we've made. Enterprise features at MSME pricing.",
    author: "Mohammed Ali",
    business: "Ali Traders · Mumbai",
  },
  {
    quote:
      "The knowledge base understood our entire website in minutes. No manual setup required.",
    author: "Lakshmi Iyer",
    business: "Iyer Foods · Chennai",
  },
  {
    quote:
      "Human escalation works seamlessly. Complex queries go to our team, simple ones are handled by AI.",
    author: "Amit Patel",
    business: "Patel Manufacturing · Ahmedabad",
  },
  {
    quote:
      "API integration was smooth. We connected it to our Android app in just 2 days.",
    author: "Sneha Reddy",
    business: "Reddy Logistics · Hyderabad",
  },
];

export function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Double items for seamless marquee loop (12 items total)
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{
        background: "#FAFAFC",
        paddingTop: "clamp(48px, 6vh, 64px)",
        paddingBottom: "clamp(48px, 6vh, 64px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div
          ref={headerRef}
          className="text-center"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 500ms cubic-bezier(0.19, 1, 0.22, 1), transform 500ms cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <h2 className="text-card font-display font-semibold text-ink-primary">
            Trusted by Growing Businesses
          </h2>
        </div>
      </div>

      {/* Marquee Container with edge gradients */}
      <div className="relative w-full overflow-hidden">
        {/* Left and right fade gradient overlays */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #FAFAFC 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #FAFAFC 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Marquee Track */}
        <div className="testimonials-marquee flex gap-6 w-max animate-marquee">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.author}-${idx}`}
              className="bg-surface-1 rounded-card border border-hairline p-6 flex flex-col justify-between flex-shrink-0"
              style={{
                width: "clamp(320px, 28vw, 380px)",
              }}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 stars rating">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className="fill-signal-commerce text-signal-commerce"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-sm italic text-ink-secondary leading-relaxed line-clamp-3 mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Business */}
              <div>
                <div className="font-display text-sm font-semibold text-ink-primary">
                  {item.author}
                </div>
                <div className="font-mono text-[11px] text-ink-muted mt-0.5">
                  {item.business}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
