'use client';

import React, { useEffect, useState } from 'react';
import { ACT_NAV_ITEMS, ACT_LABELS } from '@/lib/content-contract';

export function TraceRail() {
  const [activeAct, setActiveAct] = useState<string>('act-0');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveAct(visible.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    ACT_NAV_ITEMS.forEach((act) => {
      const el = document.getElementById(act.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  return (
    <aside
      aria-label="Trace Navigation Rail"
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-16 z-40 flex-col items-center justify-center border-r border-hairline bg-paper"
    >
      <div className="absolute top-6 left-0 right-0 text-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-ink/40">
          Trace
        </span>
      </div>

      <nav aria-label="Acts List" className="w-full py-8">
        <ul className="flex flex-col items-center gap-3">
          {ACT_NAV_ITEMS.map((act) => {
            const isActive = activeAct === act.id;
            return (
              <li key={act.id} className="relative w-full flex justify-center group">
                <button
                  type="button"
                  onClick={() => handleNavClick(act.id)}
                  aria-current={isActive ? 'step' : undefined}
                  className="relative flex items-center justify-center py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber"
                >
                  <span className="sr-only">
                    {act.label}
                  </span>
                  <span
                    className={`block h-[1px] transition-all duration-150 motion-reduce:transition-none ${
                      isActive
                        ? 'w-7 bg-amber h-[2px]'
                        : 'w-3 bg-ink/30 group-hover:w-5 group-hover:bg-ink/70'
                    }`}
                  />
                </button>

                {/* Floating Act Label on Hover */}
                <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 px-2 py-0.5 border border-hairline bg-paper opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50">
                  <span className="font-mono text-[10px] text-ink uppercase">
                    {act.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-0 right-0 text-center font-mono text-[9px] text-ink/40">
        §12.1
      </div>
    </aside>
  );
}
