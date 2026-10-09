'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ACT_NAV_ITEMS, ACT_LABELS } from '@/lib/content-contract';

const ACTS = ACT_NAV_ITEMS;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeActIndex, setActiveActIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to observe acts and update stage indicator
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const foundIndex = ACTS.findIndex((act) => act.id === entry.target.id);
            if (foundIndex !== -1) {
              setActiveActIndex(foundIndex);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    ACTS.forEach((act) => {
      const el = document.getElementById(act.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const openMobileMenu = () => {
    dialogRef.current?.showModal();
  };

  const closeMobileMenu = () => {
    dialogRef.current?.close();
    triggerBtnRef.current?.focus();
  };

  const scrollToAct = (id: string) => {
    closeMobileMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  };

  const activeAct = ACTS[activeActIndex] || ACTS[0];

  return (
    <header
      className={`sticky top-0 z-50 h-14 w-full transition-colors duration-150 ${
        scrolled
          ? 'border-b border-hairline bg-paper/95 backdrop-blur-md [@media(prefers-reduced-transparency:reduce)]:bg-paper'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 lg:pl-20 flex items-center justify-between gap-4">
        {/* Left: SYNEX Wordmark */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-[0.2em] text-ink hover:text-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            SYNEX
          </Link>

          {/* Desktop Center-Left: Active Stage Indicator */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-ink-muted border-l border-hairline pl-4">
            <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse motion-reduce:animate-none" />
            <span className="text-ink font-semibold uppercase">
              [{activeAct.label}]
            </span>
          </div>
        </div>

        {/* Mobile Center: 11-Segment Micro-Progress Bar (< 1024px) */}
        <button
          ref={triggerBtnRef}
          type="button"
          onClick={openMobileMenu}
          aria-label="Open mobile trace navigation"
          className="flex lg:hidden items-center gap-1 py-2 px-2.5 border border-hairline bg-paper-elevated focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          <div className="flex items-center gap-1">
            {ACTS.map((act, idx) => (
              <span
                key={act.id}
                className={`block h-2 w-1.5 transition-colors ${
                  idx === activeActIndex
                    ? 'bg-ink'
                    : idx < activeActIndex
                    ? 'bg-ink/40'
                    : 'bg-hairline'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-ink uppercase ml-1.5 font-semibold">
            A{activeAct.actNumber}
          </span>
        </button>

        {/* Desktop Right: Navigation Links & CTAs */}
        <div className="hidden lg:flex items-center gap-6">
          <nav aria-label="Marketing Navigation" className="flex items-center gap-5 font-mono text-xs">
            <Link href="/#act-1" className="text-ink-muted hover:text-ink transition-colors">
              How it works
            </Link>
            <Link href="/docs" className="text-ink-muted hover:text-ink transition-colors">
              Docs &amp; API
            </Link>
            <Link href="/limits" className="text-ink-muted hover:text-ink transition-colors">
              Limits
            </Link>
            <Link href="/about" className="text-ink-muted hover:text-ink transition-colors">
              About
            </Link>
            <Link href="/changelog" className="text-ink-muted hover:text-ink transition-colors">
              Changelog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="font-mono text-xs text-ink uppercase px-3 py-1.5 hover:text-black transition-colors"
            >
              Login
            </Link>
            <Link
              href="/#act-11"
              className="font-mono text-xs uppercase px-3.5 py-1.5 border border-ink bg-ink text-paper hover:bg-transparent hover:text-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink font-semibold"
            >
              Start a pilot
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu: Native HTML5 <dialog> with Automatic Focus Trapping */}
      <dialog
        ref={dialogRef}
        onCancel={() => triggerBtnRef.current?.focus()}
        className="w-full h-full max-w-none max-h-none m-0 bg-paper text-ink p-6 backdrop:bg-ink/40 open:flex flex-col justify-between"
      >
        <div>
          {/* Dialog Header */}
          <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
            <span className="font-serif text-lg font-semibold tracking-[0.2em] text-ink">
              SYNEX
            </span>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close navigation dialog"
              className="font-mono text-xs uppercase border border-hairline px-3 py-1 text-ink hover:bg-paper-elevated focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
            >
              [Close &times;]
            </button>
          </div>

          {/* 11-Act Narrative Links */}
          <div className="mb-6">
            <span className="block font-mono text-[10px] text-ink-faint uppercase tracking-wider mb-3">
              Trace Acts (SX-4471)
            </span>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {ACTS.map((act, idx) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => scrollToAct(act.id)}
                  className={`text-left p-2 border transition-colors ${
                    idx === activeActIndex
                      ? 'border-ink bg-paper-elevated font-semibold'
                      : 'border-hairline text-ink-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  <span className="font-mono text-xs">{act.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Global Utility Navigation */}
          <nav className="border-t border-hairline pt-4 space-y-2 font-mono text-xs">
            <Link
              href="/docs"
              onClick={closeMobileMenu}
              className="block text-ink hover:underline py-1"
            >
              Developer Docs &amp; Webhooks (/docs) &rarr;
            </Link>
            <Link
              href="/limits"
              onClick={closeMobileMenu}
              className="block text-ink hover:underline py-1"
            >
              V1 Boundaries &amp; Limits (/limits) &rarr;
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block text-ink hover:underline py-1"
            >
              The Thesis &amp; Custody (/about) &rarr;
            </Link>
            <Link
              href="/partners"
              onClick={closeMobileMenu}
              className="block text-ink hover:underline py-1"
            >
              Partner &amp; Integrator Network (/partners) &rarr;
            </Link>
            <Link
              href="/changelog"
              onClick={closeMobileMenu}
              className="block text-ink hover:underline py-1"
            >
              Company Changelog Ledger (/changelog) &rarr;
            </Link>
          </nav>
        </div>

        {/* Dialog Footer Actions */}
        <div className="border-t border-hairline pt-4 flex gap-3 font-mono text-xs">
          <Link
            href="/login"
            onClick={closeMobileMenu}
            className="flex-1 py-3 text-center border border-hairline text-ink hover:bg-paper-elevated"
          >
            Login
          </Link>
          <Link
            href="/#act-11"
            onClick={closeMobileMenu}
            className="flex-1 py-3 text-center border border-ink bg-ink text-paper hover:bg-transparent hover:text-ink font-semibold"
          >
            Start a pilot
          </Link>
        </div>
      </dialog>

      {/* Hairline Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-[1px] bg-ink transition-[width] duration-75 ease-linear pointer-events-none"
        style={{ width: `${(scrollProgress * 100).toFixed(2)}%` }}
        aria-hidden="true"
      />
    </header>
  );
}
