'use client';

import React, { useState } from 'react';
import { ACT_LABELS } from '@/lib/content-contract';
import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

export function Act11Conversion() {
  const [form, setForm] = useState({ email: '', companyName: '', erpSystem: 'SAP ECC / S4HANA', monthlyVolume: '100–500 inquiries/mo' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.companyName) return;
    setSubmitted(true);
  };

  return (
    <section id="act-11" aria-labelledby="act-11-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
        {ACT_LABELS[11]} · Commercial Onboarding
      </div>

      <h2 id="act-11-heading" className="font-serif text-3xl sm:text-4xl text-ink mb-8">
        Open a Trace
      </h2>

      <StaticFirstReveal delay={0.08}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="border border-hairline p-6 bg-paper space-y-4 font-mono text-xs">
          <div>
            <label htmlFor="email" className="block uppercase text-ink-faint text-[10px] mb-1">01 // Enterprise Work Email</label>
            <input
              id="email" type="email" required placeholder="procurement@enterprise.com" value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-3 py-2 border border-hairline bg-transparent text-ink focus:border-ink focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block uppercase text-ink-faint text-[10px] mb-1">02 // Company Legal Entity</label>
            <input
              id="companyName" type="text" required placeholder="Precision Tools Ltd" value={form.companyName}
              onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
              className="w-full px-3 py-2 border border-hairline bg-transparent text-ink focus:border-ink focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="erpSystem" className="block uppercase text-ink-faint text-[10px] mb-1">03 // Primary ERP System</label>
            <select
              id="erpSystem" value={form.erpSystem} onChange={(e) => setForm((p) => ({ ...p, erpSystem: e.target.value }))}
              className="w-full px-3 py-2 border border-hairline bg-paper text-ink focus:border-ink focus:outline-none"
            >
              <option value="SAP ECC / S4HANA">SAP ECC / S4HANA</option>
              <option value="TallyPrime Enterprise">TallyPrime Enterprise</option>
              <option value="Zoho Books / ERP">Zoho Books / ERP</option>
              <option value="Custom Database">Custom Database / Internal API</option>
            </select>
          </div>
          <button
            type="submit" disabled={submitted}
            className={`w-full py-3 uppercase tracking-wider border transition-colors ${
              submitted ? 'border-success bg-paper-elevated text-success' : 'border-ink bg-ink text-paper hover:bg-ink-muted'
            }`}
          >
            {submitted ? 'Demo submission complete — no request sent' : 'Commit Pilot Trace Request'}
          </button>
          {submitted && (
            <p className="text-[10px] text-ink-muted text-center pt-1">
              Prototype mode: No enterprise data was transmitted to a live server.
            </p>
          )}
        </form>

        {/* Right Column: Reassurance */}
        <div className="border border-hairline bg-paper-elevated p-6 font-mono text-xs space-y-4">
          <span className="block font-semibold uppercase text-ink tracking-wider border-b border-hairline pb-2">
            Pilot Governance Agreement
          </span>
          <ul className="space-y-2 text-ink-muted text-[11px] leading-relaxed">
            <li>✓ Self-hosted Docker container delivered to your private VPC.</li>
            <li>✓ 14-day parallel simulation without routing live buyer traffic.</li>
            <li>✓ Grounded solely on your provided catalog PDFs and rate sheets.</li>
            <li>✓ Zero model fine-tuning; customer IP never leaves your server.</li>
          </ul>
        </div>
      </div>
      </StaticFirstReveal>
    </section>
  );
}
