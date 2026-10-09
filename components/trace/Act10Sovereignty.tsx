'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ACT_LABELS,
  DEPLOYMENT_MODE_STATEMENT,
  INTEGRATION_STATUS,
  SIMULATED_REPLAY_CHIP,
} from '@/lib/content-contract';
import { CopyCodeBlock } from '@/components/motion/CopyCodeBlock';
import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

const DOCKER_COMPOSE_YML = `version: "3.9"
services:
  synex-engine:
    image: synex/control-center:v1.4.0
    ports: ["127.0.0.1:8080:8080"]
    environment:
      - DATABASE_URL=mysql://synex:\${MYSQL_PASSWORD}@mysql:3306/ledger
      - VECTOR_URL=http://qdrant:6333
    depends_on: [mysql, qdrant]
  mysql:
    image: mysql:8
    environment:
      - MYSQL_DATABASE=ledger
      - MYSQL_USER=synex
      - MYSQL_PASSWORD=\${MYSQL_PASSWORD} # set via environment/secrets manager
      - MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD} # set via environment/secrets manager
  qdrant:
    image: qdrant/qdrant:v1.9.0`;

const NON_GOALS = [
  { feature: 'Autonomous Outbound Bulk Cold Emails', verdict: 'NON-GOAL', rationale: 'Inbound RFQ responses and repeat buyer servicing only.' },
  { feature: 'Direct Autonomous Wire/ACH Debit', verdict: 'NON-GOAL', rationale: 'Generates verified invoices/proformas; settlement requires manual human gateway.' },
  { feature: 'Unsupervised Future Channel Messaging', verdict: 'V2 ROADMAP', rationale: 'Requires operator confirmation per outbound message until deterministic gate ships.' },
];

export function Act10Sovereignty() {
  return (
    <section id="act-10" aria-labelledby="act-10-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[10]}</span>
      </div>

      <h2 id="act-10-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        Deployment &amp; Limits
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-4">
        It runs on your hardware. And here&rsquo;s what it won&rsquo;t do yet.
        You own the data, the database records, and the execution logs. We declare our architectural limits upfront.
      </p>

      {/* Deployment Mode Statement */}
      <div className="p-3 bg-paper-elevated border border-hairline font-mono text-xs text-ink-muted mb-8 max-w-3xl">
        <span className="font-semibold text-ink uppercase text-[10px] block mb-1">Deployment Invariant</span>
        {DEPLOYMENT_MODE_STATEMENT}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Spec */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border border-hairline bg-paper p-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-hairline pb-2 mb-3">
              <span className="font-semibold text-ink uppercase tracking-wider">
                Sovereign Deployment Spec
              </span>
              <Link href="/docs#deployment" className="text-[10px] text-ink underline">
                Full Compose Guide &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 bg-paper-elevated border border-hairline">
                <span className="text-[10px] text-ink-faint block">LOCAL INFERENCE</span>
                <span className="font-semibold text-ink">Ollama on-network</span>
              </div>
              <div className="p-2 bg-paper-elevated border border-hairline">
                <span className="text-[10px] text-ink-faint block">STORAGE ENGINE</span>
                <span className="font-semibold text-ink">MySQL + Qdrant</span>
              </div>
            </div>

            <CopyCodeBlock
              filename="docker-compose.yml"
              code={DOCKER_COMPOSE_YML}
            />
          </div>
        </div>

        {/* Right Column: Non-Goals */}
        <div className="lg:col-span-6 border border-hairline bg-paper p-4 font-mono text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-hairline pb-2">
            <span className="font-semibold text-ink uppercase">What V1 Does Not Do</span>
            <Link href="/limits" className="text-[10px] text-ink underline">Read /limits &rarr;</Link>
          </div>
          <div className="space-y-2.5">
            {NON_GOALS.map((ng, i) => (
              <div key={i} className="p-2.5 bg-paper-elevated border border-hairline">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-ink">{ng.feature}</span>
                  <span className="text-amber text-[10px]">{ng.verdict}</span>
                </div>
                <p className="text-[11px] text-ink-muted">{ng.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Status Table */}
      <div className="mt-10 border border-hairline bg-paper overflow-x-auto">
        <div className="px-4 py-3 border-b border-hairline bg-paper-elevated flex items-center justify-between font-mono text-[10px] uppercase text-ink-muted">
          <span>Enterprise Adapter &amp; Channel Availability</span>
          <span className="text-ink font-semibold">Honest Integration Contract</span>
        </div>
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-hairline bg-paper text-ink-faint text-[10px] uppercase tracking-wider">
              <th className="py-2.5 px-3">System / Channel</th>
              <th className="py-2.5 px-3">Availability Status</th>
              <th className="py-2.5 px-3">Technical Specification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-ink">
            {INTEGRATION_STATUS.map((row) => {
              const isConfigurable = row.status.includes('Configurable');
              const isPrototype = row.status.includes('Prototype');
              const isPlanned = row.status.includes('Planned');
              return (
                <tr key={row.system} className="hover:bg-paper-elevated">
                  <td className="py-2.5 px-3 font-semibold text-ink">{row.system}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[10px] uppercase font-semibold border ${
                        isConfigurable
                          ? 'border-success bg-paper-elevated text-success'
                          : isPrototype
                          ? 'border-amber bg-amber-tint text-amber'
                          : isPlanned
                          ? 'border-hairline bg-paper-elevated text-ink-muted'
                          : 'border-hairline bg-paper-elevated text-ink-faint line-through'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-ink-muted text-[11px] font-serif">{row.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
