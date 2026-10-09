# SYNEX V1 Content Contract & Narrative Copy Guide

This guide defines the single source of truth for narrative consistency, honesty labeling, and copy invariants across the SYNEX V1 marketing trace, Control Center, and documentation.

---

## 1. Core Architectural Contract (`lib/content-contract.ts`)

All public-facing labels, money metrics, timelines, and demo disclaimers MUST import from [`lib/content-contract.ts`](file:///c:/Users/ruthr/Downloads/Ai%20Chat%20Bot/lib/content-contract.ts). Duplicating literal strings is forbidden and enforced via automated prebuild audits.

### Canonical Act Names (12 Acts)
1. **Act 0 The Hero**
2. **Act 1 Grounding & Ingestion**
3. **Act 2 Extraction & Context**
4. **Act 3 The Stakes**
5. **Act 4 Policy Evaluation**
6. **Act 5 Permission Gate**
7. **Act 6 Action Log**
8. **Act 7 Human Handoff**
9. **Act 8 Operational Ledger**
10. **Act 9 Knowledge Gaps & Evaluation**
11. **Act 10 Deployment & Limits**
12. **Act 11 Open a Trace**

These labels must remain strictly identical across `TraceRail`, `Header`, mobile navigation dialog, section headings, and footer anchors.

---

## 2. The Single Money Story

To prevent contradictory financial metrics across sections, all prices follow one deterministic transaction equation:

- **List value before discount**: `₹2,84,000` (`400 units × ₹710.00`)
- **Quoted value after 12% discount**: `₹2,49,920` (`400 units × ₹624.80`)
- **Counter value at 8%**: `₹2,61,280` (`400 units × ₹653.20`)
- **Potential order value lost**: `₹2,84,000 (illustrative, not a verified loss)`

Any display of `₹2,84,000` in the application MUST be accompanied by its explicit contextual label: either `"List value before discount"` or `"Potential order value lost"`.

---

## 3. Timeline Separation Invariant

The marketing site renders two separate timelines that must NEVER share identical scale or headings:

1. **Story A — `[COUNTERFACTUAL — WITHOUT SYNEX]` (Act 3)**:
   - Uses a **day-scale timeline**:
     - `Day 0 · 21:41 IST`: Inquiry received via web chat
     - `Day 1 · 09:15 IST`: Human sales manager reviews inquiry (+11h 34m delay)
     - `Day 1 · 14:02 IST`: ERP stock verified & manual PDF quote sent (+4h 47m internal lag)
     - `Day 1 · 21:58 IST`: Customer bought from competitor
   - Outcome: `Potential order value lost: ₹2,84,000 (illustrative, not a verified loss)`.

2. **Story B — `[SIMULATED REPLAY — WITH SYNEX]` (Acts 1–2, 4–10, TracePlate)**:
   - Uses a **seconds-scale timeline** (`21:41:00.040` to `21:41:06.240`).
   - Every Act header and TracePlate displays the `[SIMULATED REPLAY]` badge.
   - TracePlate caption is strictly: `"Simulated replay — synthetic customer data, no live ERP/CRM integration."`

---

## 4. Demo Transparency & Claim Registry

- **Hero Notice Block**: Directly beneath the hero headline, the application must display:
  > *"Interactive Product Demo — This trace uses synthetic customer data and simulated execution events. Live integrations, production metrics, and cryptographic attestations are not yet connected."*
- **Interactive Controls**: Buttons that simulate actions must be labeled honestly:
  - `"Simulate approval (demo)"`
  - `"Simulate hold (demo)"`
- **Claim Registry**: All claims in `CLAIMS` are classified as either:
  - `verified`: Architecturally backed by code (e.g. deterministic rule engine, tenant isolation, retry loops).
  - `illustrative`: Synthetic demo numbers (e.g. 99.4% pass rate, 6.2s latency, compute cost). These MUST carry a visible `[DEMO]` tag in the UI.

---

## 5. Marketing Claims & Hygiene (P2)

All top-level marketing copy, integration availability, and platform guarantees must be registered in [`lib/content-contract.ts`](file:///c:/Users/ruthr/Downloads/Ai%20Chat%20Bot/lib/content-contract.ts):
- **Hero Positioning (`HERO_COPY`)**:
  - H1: `"Every AI action. Grounded, permissioned, traceable."`
  - Sub: `"SYNEX connects business knowledge, operating rules, and approved tools — so AI can resolve routine requests, take controlled action, and ask for human approval when a decision crosses a defined boundary."`
  - Dual CTAs: `[Explore simulated trace]` & `[Request a pilot]`.
- **Three-Step Overview Strip (`THREE_STEP_OVERVIEW`)**:
  - `01 Connect business knowledge` → `02 Check rules & permissions` → `03 Execute approved actions or hand off to a human.`
- **Integration Status Table (`INTEGRATION_STATUS`)**:
  - Generic CRM REST adapter & Webhooks: `Configurable in V1`
  - SAP ECC & TallyPrime: `Prototype adapter`
  - Microsoft Dynamics: `Planned`
  - WhatsApp / Instagram / Voice: `Not in V1 — see /limits`
- **Trust & Control Guarantees (`TRUST_CONTROL_ITEMS`)**:
  - 5 cards: Source evidence, Permission gates, Action logs, Uncertainty handling, Human approval.
- **Footer Claims (`FOOTER_CLAIMS`)**:
  - Measured Page Weight: `"Page weight: 159 KB HTML · 110 KB First Load JS"`
  - `Ed25519 Hardware HSM` and `Indian MSME Initiative` marked as `(Planned)`.

---

## 6. Knowledge Conflict & Policy Re-Evaluation

- **Demo SKU Protection**: The active demo SKU (`6MM-BRS-FTG`) must have zero unresolved corpus conflicts. Act 9 demonstrations of corpus conflict must reference a different SKU (`8MM-BRS-FTG: ₹680 vs ₹710`).
- **Margin Safeguard Invariant**: Act 4 Rule 04 displays `PENDING` prior to executive approval. Upon Act 5 approval, Act 6 must explicitly evaluate and pass Rule 04 before executing side-effects:
  > *"Margin recalculated post-approval: 34.2% ≥ 28.0% floor → PASS → execute. Approval of one rule never bypasses another."*

---

## 6. Technical Credibility & Deployment Invariants (P1)
- **Local Inference & Embeddings Lineage**:
  - Embedding model is strictly documented as `bge-large-en-v1.5 (1,024-dim, local BGE model via Ollama)`.
  - Deployment default claim is strictly `"Self-Hosted"`. VPC, Zero-External-Calls, and Air-Gapped configurations are defined as configured options in the Terminology Glossary.
  - Deployment invariant statement: *"V1 default: fully local inference and embeddings on customer hardware (Ollama + BGE embeddings, CPU-only). Optional cloud model routes are a per-tenant configuration and are disclosed in the UI when enabled."*
- **No Plaintext Credentials**:
  - Public marketing and docker-compose snippets use `${MYSQL_PASSWORD}` and `${MYSQL_ROOT_PASSWORD}` placeholders with `# set via environment/secrets manager`.
  - Tested compose guides reside on `/docs#deployment`.
- **Security Claim Honesty**:
  - Every cryptographic or security claim (`Ed25519`, `Merkle root`, `HSM`, `SHA-256`, `tenant isolation`) must be registered in `CLAIMS` (`lib/content-contract.ts`).
  - Illustrative claims must carry `[DEMO]` and the security caption: *"Illustrative audit metadata — cryptographic implementation pending."*
- **Operational Ledger Date Precision**:
  - Act 8 ledger timeframe is labeled *"Four-week simulated sample (Sep 1-28)"* with footnote *"Simulated fixture period; live periods will reflect actual tenant date ranges."* Literal "30 DAYS" claims in Act 8 are forbidden.

---

## 7. Regression Enforcement

Running `npm run audit:content` (or automatically during `npm run build` via `prebuild`) executes [`scripts/content-audit.mjs`](file:///c:/Users/ruthr/Downloads/Ai%20Chat%20Bot/scripts/content-audit.mjs) which fails (`exit 1`) if:
- Navigation labels differ from `ACT_LABELS`.
- Hero lacks `DEMO_NOTICE`.
- Forbidden strings are introduced (`"100% complete"`, `"text-embedding-3-large"`, plaintext `MYSQL_PASSWORD=`, `"postgres"`, `"whatsapp"` outside `/limits`, `"air-gapped"` outside `/limits`, `/docs`, and `lib/content-contract.ts`).
- Literal passwords or unparameterized database credentials appear in scanned files.
- Act 8 contains "30 Days" or "30 DAYS".
- Unregistered production certifications (e.g. ISO 27001, SOC 2) are present.
- Any uncontextualized `₹2,84,000` is detected.
