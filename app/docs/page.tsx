import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Terminal, Key, Webhook, Code, ShieldCheck, Server, BookOpen } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { CodeBlock } from '@/components/docs/CodeBlock';
import {
  DEPLOYMENT_MODE_STATEMENT,
  EMBEDDING_MODEL_SPEC,
  TERMINOLOGY_GLOSSARY,
} from '@/lib/content-contract';

export const metadata: Metadata = {
  title: 'API & Webhooks Contract — SYNEX',
  description:
    'Complete REST API, webhook payload schemas, and zero-fuzziness integration contracts for SYNEX V1.',
};

const INGEST_PAYLOAD = `{
  "inquiry_id": "INQ-94812",
  "channel": "API_GATEWAY",
  "sender": {
    "entity_name": "Senthil Traders",
    "contact_email": "purchasing@senthiltraders.in",
    "tier": "TIER_2_REPEAT"
  },
  "content": "Need 400 units of 6mm brass hex nuts by Friday. Standard 30-day credit terms.",
  "metadata": {
    "warehouse_region": "IN_SOUTH_TN",
    "priority": "HIGH"
  }
}`;

const INGEST_RESPONSE = `{
  "status": "PROCESSING",
  "trace_id": "TRC-2026-88192",
  "state": "REASONING",
  "detected_intent": "PRICE_AND_STOCK_INQUIRY",
  "extracted_entities": {
    "sku": "BRASS-HEX-6MM",
    "quantity": 400,
    "unit": "PCS",
    "required_by": "2026-10-09",
    "payment_terms": "NET_30"
  },
  "gate_required": true,
  "gate_reason": "POL-DISCOUNT-03: Requested discount 12% exceeds auto-approval ceiling 8%",
  "audit_ledger_url": "/dashboard/audit?trace=TRC-2026-88192"
}`;

const WEBHOOK_GATE_PAYLOAD = `{
  "event_id": "EVT-GATE-4401",
  "event_type": "trace.gate_required",
  "timestamp": "2026-10-05T09:41:22Z",
  "trace_id": "TRC-2026-88192",
  "tenant_id": "TNT-IN-0418",
  "payload": {
    "buyer": "Senthil Traders",
    "sku": "BRASS-HEX-6MM",
    "quantity": 400,
    "quote_subtotal": 284000.00,
    "effective_discount": 0.12,
    "max_autonomous_discount": 0.08,
    "human_reviewer": "priya.n@company.com",
    "gate_action_url": "https://synex.internal/dashboard/approvals"
  },
  "signature": "ed25519:6b8a21f98c0d12e87a3b4..."
}`;

const WEBHOOK_EXECUTED_PAYLOAD = `{
  "event_id": "EVT-EXEC-9912",
  "event_type": "trace.executed",
  "timestamp": "2026-10-05T09:41:28Z",
  "trace_id": "TRC-2026-88192",
  "mutations": [
    { "target": "CRM", "action": "opportunity.create", "ref": "OPP-19284", "status": 201 },
    { "target": "INVENTORY", "action": "stock.reserve", "ref": "RSV-7731", "status": 200 },
    { "target": "DOCUMENTS", "action": "quotation.generate", "ref": "QT-4471.pdf", "status": 200 },
    { "target": "ERP", "action": "erp.sync", "ref": "SAP-SYNC-8821", "status": 200, "retries": 1 }
  ]
}`;

const WIDGET_SNIPPET = `<!-- SYNEX Control Center Ledger Embed Widget (Zero Third-Party Dependency) -->
<script
  src="https://static.synex.dev/v1/ledger-widget.js"
  data-tenant-id="TNT-IN-0418"
  data-mode="read-only"
  data-theme="editorial-ledger"
  data-verify-keys="ed25519"
  async
></script>
<div id="synex-ledger-mount" data-trace-id="SX-4471"></div>`;

export default function DocsPage() {
  return (
    <MarketingLayout>
      <div className="py-12 px-6 sm:px-10 md:px-16 max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-ink transition-colors mb-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> &larr; Return to Trace Ledger
        </Link>

        {/* Header Block */}
        <header className="border-b border-hairline pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2">
            <Terminal className="h-3.5 w-3.5" />
            <span>Developer Reference // API &amp; Webhooks</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink balance-heading">
            The API is the product. Here is the contract.
          </h1>
          <p className="mt-4 font-serif text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl pretty-body">
            SYNEX is a deterministic execution engine. There are no vague text prompts or uncommitted
            conversational states. Every commercial inquiry is ingested, parsed into structured
            schemas, and evaluated against strict rule invariants.
          </p>
        </header>

        {/* Section 1: Authentication */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <Key className="h-3.5 w-3.5" />
            <span>01 // Authentication &amp; Multi-Tenancy</span>
          </div>
          <p className="font-serif text-sm sm:text-base text-ink-muted leading-relaxed mb-4 pretty-body">
            All API calls require two headers: your tenant identifier and a cryptographically
            generated secret key. In self-hosted on-premises deployments, the keys are verified
            locally against your local hardware enclave without external validation calls.
          </p>

          <CodeBlock
            filename="HTTP Headers"
            language="http"
            code={`X-Synex-Tenant-Id: TNT-IN-0418\nAuthorization: Bearer sx_live_99a8124efb019c\nContent-Type: application/json`}
          />
        </section>

        {/* Section 2: Core Endpoints */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <Code className="h-3.5 w-3.5" />
            <span>02 // Core Endpoints</span>
          </div>

          <div className="space-y-8">
            {/* Endpoint: Ingest */}
            <div className="border border-hairline p-5 bg-paper">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 border border-ink bg-ink text-paper font-semibold">
                    POST
                  </span>
                  <span className="text-ink font-semibold">/v1/inquiries/ingest</span>
                </div>
                <span className="font-mono text-[11px] text-ink-muted">Rate Limit: 600 req/min</span>
              </div>
              <p className="font-serif text-sm text-ink-muted leading-relaxed mb-4 pretty-body">
                Captures an unstructured commercial inquiry from any channel (ERP, email, portal) and
                initiates the 11-Act validation trace.
              </p>

              <p className="font-mono text-xs text-ink uppercase tracking-wider mb-2 font-semibold">
                Request Body:
              </p>
              <CodeBlock filename="payload.json" code={INGEST_PAYLOAD} />

              <p className="font-mono text-xs text-ink uppercase tracking-wider mt-4 mb-2 font-semibold">
                Response (202 Accepted):
              </p>
              <CodeBlock filename="response.json" code={INGEST_RESPONSE} />
            </div>

            {/* Endpoint: Gate Sign */}
            <div className="border border-hairline p-5 bg-paper">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 border border-ink bg-ink text-paper font-semibold">
                    POST
                  </span>
                  <span className="text-ink font-semibold">/v1/traces/:trace_id/gate/sign</span>
                </div>
                <span className="font-mono text-[11px] text-ink-muted">Dual-Key Ed25519 Required</span>
              </div>
              <p className="font-serif text-sm text-ink-muted leading-relaxed mb-3 pretty-body">
                Submits human supervisor cryptographic authorization to unlock an execution gate when
                commercial thresholds (e.g. margin, credit limit) are breached.
              </p>

              <CodeBlock
                filename="gate_sign.json"
                code={`{\n  "operator_id": "OP-PRIYA-09",\n  "decision": "APPROVED",\n  "override_reason": "Strategic customer retention during Q3 volume commitment",\n  "signature_token": "ed25519:f9a84b12c091d..."\n}`}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Webhook Architecture */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <Webhook className="h-3.5 w-3.5" />
            <span>03 // Real-Time Webhook Payloads</span>
          </div>
          <p className="font-serif text-sm sm:text-base text-ink-muted leading-relaxed mb-4 pretty-body">
            SYNEX sends signed HTTP POST payloads to your endpoints when pipeline thresholds require
            human intervention or when transactions complete. Every webhook includes an Ed25519
            signature in the payload to ensure non-repudiation.
          </p>

          <div className="space-y-4">
            <details className="border border-hairline bg-paper-elevated p-4 cursor-pointer group">
              <summary className="font-mono text-xs text-ink font-semibold flex items-center justify-between list-none">
                <span>Webhook: trace.gate_required (Act 5 Permission Gate)</span>
                <span className="text-ink-muted group-open:hidden">[+] SHOW PAYLOAD</span>
                <span className="text-ink-muted hidden group-open:inline">[-] HIDE PAYLOAD</span>
              </summary>
              <div className="mt-4 pt-4 border-t border-hairline cursor-default">
                <CodeBlock filename="event_gate.json" code={WEBHOOK_GATE_PAYLOAD} />
              </div>
            </details>

            <details className="border border-hairline bg-paper-elevated p-4 cursor-pointer group">
              <summary className="font-mono text-xs text-ink font-semibold flex items-center justify-between list-none">
                <span>Webhook: trace.executed (Act 6 Deterministic Execution)</span>
                <span className="text-ink-muted group-open:hidden">[+] SHOW PAYLOAD</span>
                <span className="text-ink-muted hidden group-open:inline">[-] HIDE PAYLOAD</span>
              </summary>
              <div className="mt-4 pt-4 border-t border-hairline cursor-default">
                <CodeBlock filename="event_executed.json" code={WEBHOOK_EXECUTED_PAYLOAD} />
              </div>
            </details>
          </div>
        </section>

        {/* Section 4: Architecture & Topology Contract */}
        <section id="architecture" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <Server className="h-3.5 w-3.5" />
            <span>04 // Architecture &amp; Local Inference Topology</span>
          </div>
          <div className="p-3 bg-paper-elevated border border-hairline font-mono text-xs text-ink-muted mb-4">
            <span className="font-semibold text-ink uppercase text-[10px] block mb-1">Deployment Invariant</span>
            {DEPLOYMENT_MODE_STATEMENT}
          </div>
          <p className="font-serif text-sm sm:text-base text-ink-muted leading-relaxed mb-4 pretty-body">
            By default, all embedding generation and model inference execute strictly within the customer&rsquo;s
            internal network boundary using <strong>{EMBEDDING_MODEL_SPEC}</strong>. Vector indexes are maintained in
            Qdrant, and transactional ledger records commit to MySQL 8.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 border border-hairline bg-paper">
              <span className="text-[10px] text-ink-faint uppercase block">Embeddings Engine</span>
              <span className="font-semibold text-ink block mt-0.5">BGE-Large-EN-v1.5</span>
              <span className="text-[10px] text-ink-muted">1,024 dims · Local Ollama CPU</span>
            </div>
            <div className="p-3 border border-hairline bg-paper">
              <span className="text-[10px] text-ink-faint block uppercase">Vector Store</span>
              <span className="font-semibold text-ink block mt-0.5">Qdrant v1.9</span>
              <span className="text-[10px] text-ink-muted">HNSW Cosine · Isolated per tenant</span>
            </div>
            <div className="p-3 border border-hairline bg-paper">
              <span className="text-[10px] text-ink-faint block uppercase">Ledger Store</span>
              <span className="font-semibold text-ink block mt-0.5">MySQL 8.0</span>
              <span className="text-[10px] text-ink-muted">ACID double-entry ledger blocks</span>
            </div>
          </div>
        </section>

        {/* Section 5: Terminology Glossary */}
        <section id="glossary" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>05 // Deployment Terminology &amp; Scope Glossary</span>
          </div>
          <p className="font-serif text-sm text-ink-muted mb-4 pretty-body">
            We use precise systems vocabulary to describe deployment boundaries. Default claims vs configured
            options are explicitly defined below:
          </p>
          <div className="border border-hairline bg-paper divide-y divide-hairline font-mono text-xs">
            {TERMINOLOGY_GLOSSARY.map((item) => (
              <div key={item.term} className="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="sm:w-1/3">
                  <span className="font-bold text-ink block">{item.term}</span>
                  <span className="text-[10px] text-amber uppercase font-semibold">{item.status}</span>
                </div>
                <div className="sm:w-2/3 text-ink-muted text-[11px] leading-relaxed">
                  {item.definition}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Sovereign Deployment Spec */}
        <section id="deployment" className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <Server className="h-3.5 w-3.5 text-ink" />
            <span>06 // Tested Sovereign Docker Compose Spec</span>
          </div>
          <p className="font-serif text-sm sm:text-base text-ink-muted leading-relaxed mb-4 pretty-body">
            Production deployment file for bare-metal or private VM hosting. Passwords must be supplied via
            environment variables or your infrastructure secrets manager — plaintext credentials are never written to disk.
          </p>
          <CodeBlock
            filename="docker-compose.yml"
            language="yaml"
            code={`version: "3.9"
services:
  synex-engine:
    image: synex/control-center:v1.4.0
    container_name: synex-engine
    restart: unless-stopped
    ports:
      - "127.0.0.1:8080:8080"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://synex:\${MYSQL_PASSWORD}@mysql:3306/ledger
      - VECTOR_URL=http://qdrant:6333
      - EMBEDDING_MODEL=bge-large-en-v1.5
      - OLLAMA_HOST=http://ollama:11434
    depends_on:
      - mysql
      - qdrant
      - ollama

  mysql:
    image: mysql:8.0
    container_name: synex-mysql
    restart: unless-stopped
    environment:
      - MYSQL_DATABASE=ledger
      - MYSQL_USER=synex
      - MYSQL_PASSWORD=\${MYSQL_PASSWORD} # set via environment/secrets manager
      - MYSQL_ROOT_PASSWORD=\${MYSQL_ROOT_PASSWORD} # set via environment/secrets manager
    volumes:
      - mysql_data:/var/lib/mysql

  qdrant:
    image: qdrant/qdrant:v1.9.0
    container_name: synex-qdrant
    restart: unless-stopped
    volumes:
      - qdrant_data:/qdrant/storage

  ollama:
    image: ollama/ollama:latest
    container_name: synex-ollama
    restart: unless-stopped
    volumes:
      - ollama_models:/root/.ollama

volumes:
  mysql_data:
  qdrant_data:
  ollama_models:`}
          />
        </section>

        {/* Section 7: Website Embed Snippet */}
        <section id="embed" className="scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            <span>07 // Zero-Dependency Web Component Embed</span>
          </div>
          <p className="font-serif text-sm sm:text-base text-ink-muted leading-relaxed mb-4 pretty-body">
            Embed an audited live trace ledger directly into your supplier portal, customer extranet,
            or ERP dashboard using a single script tag with zero third-party dependencies.
          </p>
          <CodeBlock filename="embed.html" language="html" code={WIDGET_SNIPPET} />
        </section>
      </div>
    </MarketingLayout>
  );
}
