"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Features",  href: "#features"  },
  { label: "AI Engine", href: "#ai-engine" },
  { label: "Pricing",   href: "#pricing"   },
  { label: "SDK",       href: "#sdk"       },
  { label: "Docs",      href: "#docs"      },
];

const SECTION_IDS = ["features", "ai-engine", "pricing", "sdk", "docs"];

/* ─── Sub-components ─────────────────────────────────────── */

/** 24 × 24 diamond brand mark with an inner signal-ai fill */
function BrandMark() {
  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: 24, height: 24 }}
      aria-hidden="true"
    >
      {/* Outer rotated square — gives the diamond silhouette */}
      <div
        className="absolute border-2"
        style={{
          width: 14,
          height: 14,
          transform: "rotate(45deg)",
          borderRadius: 2,
          borderColor: "rgba(15,23,42,0.8)",
        }}
      />
      {/* Inner filled square — signal-ai core */}
      <div
        className="absolute bg-signal-ai"
        style={{
          width: 6,
          height: 6,
          borderRadius: 1,
          boxShadow: "0 0 8px rgba(79,70,229,0.6)",
        }}
      />
    </div>
  );
}

/** 5-dot AI-active status row (4 dim + 1 signal-ai) */
function AIStatusDots() {
  return (
    <div className="flex items-center gap-[4px]" aria-label="AI active status">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="rounded-full"
          style={{ width: 6, height: 6, background: "rgba(15,23,42,0.20)" }}
        />
      ))}
      {/* Active dot */}
      <span
        className="rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "#4F46E5",
          boxShadow: "0 0 6px rgba(79,70,229,0.8)",
        }}
      />
    </div>
  );
}

/** Brand logo assembly (mark + name + dot row) */
function Brand() {
  return (
    <a
      href="/"
      className="flex items-center gap-3 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai rounded-micro"
      aria-label="Neural Commerce Command — home"
    >
      <BrandMark />
      <div className="flex flex-col gap-[3px]">
        <span
          className="font-display font-bold text-ink-primary leading-none"
          style={{ fontSize: 16, letterSpacing: "-0.02em" }}
        >
          Neural Commerce
        </span>
        <AIStatusDots />
      </div>
    </a>
  );
}

/** Desktop glass-pill nav with active section highlighting */
function DesktopNav({
  activeSection,
  onNavClick,
}: {
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <nav className="hidden lg:flex" aria-label="Main navigation">
      <div className="nav-glass-pill">
        {NAV_LINKS.map((link, idx) => {
          const sectionId = link.href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <React.Fragment key={link.href}>
              {idx > 0 && <span className="nav-divider" aria-hidden="true" />}
              <a
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
                className={`nav-link-item ${
                  isActive
                    ? "!text-ink-primary font-semibold !bg-black/[0.04]"
                    : "text-ink-tertiary"
                }`}
              >
                {link.label}
              </a>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

/** Login ghost button */
function LoginButton() {
  return (
    <button
      type="button"
      className="hidden sm:inline-flex items-center px-3 py-2 rounded-btn text-ink-secondary font-medium transition-colors duration-200 hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai min-h-[44px]"
      style={{ fontSize: 13 }}
    >
      Login
    </button>
  );
}

/** "Request Access" primary CTA with decoupled arrow slide */
function RequestAccessButton({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group/cta inline-flex items-center gap-1.5 rounded-btn bg-signal-ai text-white font-semibold uppercase tracking-[0.08em] transition-all duration-200 hover:bg-signal-ai-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-deep min-h-[44px] ${className}`}
      style={{
        fontSize: 12,
        padding: "8px 20px",
        boxShadow: "0 0 20px rgba(79,70,229,0.15)",
      }}
    >
      <span>Request Access</span>
      <ArrowUpRight
        className="cta-arrow"
        aria-hidden="true"
        size={13}
        strokeWidth={2.2}
      />
    </button>
  );
}

/** Hamburger / X toggle button */
function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="lg:hidden flex flex-col justify-center items-center w-11 h-11 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai rounded-micro min-h-[44px] min-w-[44px]"
    >
      <div className={isOpen ? "ham-open" : ""} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span className="ham-line ham-line-1" />
        <span className="ham-line ham-line-2" />
        <span className="ham-line ham-line-3" />
      </div>
    </button>
  );
}

/** Full-screen mobile overlay with smooth anchor scrolling */
function MobileMenu({
  isOpen,
  onClose,
  isClosing,
  activeSection,
  onNavClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  isClosing: boolean;
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  /* Lock body scroll while open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          background: "rgba(255,255,255,0.60)",
          backdropFilter: "blur(4px)",
          animation: isClosing ? "fade-in 0.28s ease-out reverse forwards" : "fade-in 0.25s ease-out forwards",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col lg:hidden"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(15,23,42,0.08)",
          animation: isClosing
            ? "slide-in-right 0.28s cubic-bezier(0.4,0,1,1) reverse forwards"
            : "slide-in-right 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* Top row with close button */}
        <div
          className="flex items-center justify-between px-6"
          style={{ height: 64, borderBottom: "1px solid rgba(15,23,42,0.08)" }}
        >
          <Brand />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex flex-col justify-center items-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai rounded-micro min-h-[44px] min-w-[44px]"
          >
            <div className="ham-open" style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span className="ham-line ham-line-1" />
              <span className="ham-line ham-line-2" />
              <span className="ham-line ham-line-3" />
            </div>
          </button>
        </div>

        {/* Staggered nav links */}
        <nav
          className="flex-1 flex flex-col justify-center px-8 gap-2"
          aria-label="Mobile navigation links"
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  onNavClick(e, link.href);
                  onClose();
                }}
                className={`mobile-nav-link font-display font-semibold transition-colors duration-200 py-3 border-b focus-visible:outline-none min-h-[44px] flex items-center ${
                  isActive
                    ? "!text-ink-primary font-bold border-signal-ai"
                    : "text-ink-secondary hover:text-ink-primary border-black/[0.08]"
                }`}
                style={{
                  fontSize: "clamp(1.75rem, 7vw, 2rem)",
                  animation: isClosing ? undefined : "fade-up 0.3s cubic-bezier(0.16,1,0.3,1) both",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div
          className="px-6 py-8"
          style={{
            borderTop: "1px solid rgba(15,23,42,0.08)",
            animation: isClosing ? undefined : "fade-up 0.3s 400ms cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <RequestAccessButton onClick={onClose} className="w-full justify-center" />
          <p className="text-center mt-3 text-ink-muted font-mono text-[11px] tracking-wider">
            UDYAM + GSTIN VERIFIED COHORT ONLY
          </p>
        </div>
      </div>
    </>
  );
}

/* ─── Main GlobalHeader ──────────────────────────────────── */

export interface GlobalHeaderProps {
  /** Called when the "Request Access" CTA is clicked */
  onRequestAccess?: () => void;
}

export function GlobalHeader({ onRequestAccess }: GlobalHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const scrollTriggersRef = useRef<any[]>([]);

  /* ── Scroll sentinel for background blur ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP ScrollTrigger Active Link Highlighting ── */
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const [gsapModule, stModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (!active) return;

        const gsap = gsapModule.default;
        const { ScrollTrigger } = stModule;
        gsap.registerPlugin(ScrollTrigger);

        // Clear existing triggers if any
        scrollTriggersRef.current.forEach((t) => t.kill());
        scrollTriggersRef.current = [];

        SECTION_IDS.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const trigger = ScrollTrigger.create({
              trigger: el,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveSection(id),
              onEnterBack: () => setActiveSection(id),
            });
            scrollTriggersRef.current.push(trigger);
          }
        });
      } catch (err) {
        console.warn("[GlobalHeader] ScrollTrigger init skipped:", err);
      }
    })();

    return () => {
      active = false;
      scrollTriggersRef.current.forEach((t) => t.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  /* ── Lenis-Aware Smooth Anchor Scroll ── */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.startsWith("#") ? href : `#${href}`;
      const element = document.querySelector(targetId);
      if (element && typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  /* ── Menu helpers ── */
  const openMenu = useCallback(() => {
    setClosing(false);
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setClosing(true);
    /* wait for exit animation before unmounting */
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 300);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  /* ── Dynamic header styles ── */
  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: 64,
    background: scrolled
      ? "rgba(255,255,255,0.95)"
      : "rgba(255,255,255,0.80)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(15,23,42,0.08)",
    boxShadow: scrolled
      ? "0 4px 24px rgba(16,24,40,0.06), 0 1px 0 rgba(15,23,42,0.04)"
      : "none",
    transition: "background 300ms ease-out, box-shadow 300ms ease-out",
  };

  return (
    <>
      <header style={headerStyle} aria-label="Global header">
        {/* Inner constrained content row */}
        <div
          className="mx-auto flex h-full items-center justify-between"
          style={{
            maxWidth: 1440,
            paddingLeft: "clamp(16px, 2vw, 24px)",
            paddingRight: "clamp(16px, 2vw, 24px)",
          }}
        >
          {/* ── LEFT: Brand ── */}
          <Brand />

          {/* ── CENTER: Desktop glass-pill nav ── */}
          <DesktopNav
            activeSection={activeSection}
            onNavClick={handleNavClick}
          />

          {/* ── RIGHT: Actions ── */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LoginButton />
            {/* CTA hidden on xs; hamburger takes over below lg */}
            <div className="hidden sm:block">
              <RequestAccessButton onClick={onRequestAccess} />
            </div>
            <HamburgerButton
              isOpen={menuOpen}
              onClick={menuOpen ? closeMenu : openMenu}
            />
          </div>
        </div>
      </header>

      {/* Push page content below the fixed bar */}
      <div style={{ height: 64 }} aria-hidden="true" />

      {/* ── Mobile overlay ── */}
      <MobileMenu
        isOpen={menuOpen}
        isClosing={closing}
        onClose={closeMenu}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </>
  );
}
