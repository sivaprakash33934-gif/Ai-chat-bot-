# SYNEX Platform — Master Product Specification

## 1. Executive Summary & SaaS Platform Identity

### 1.1 Product Identity
- **Product Name**: SYNEX
- **Category**: Controlled AI Business Assistant, Knowledge Platform & Action Engine.
- **Core Principle**:
  $$\text{KNOW} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{REASON} \longrightarrow \text{DECIDE} \longrightarrow \text{ACT} \longrightarrow \text{MEASURE} \longrightarrow \text{IMPROVE}$$

SYNEX enables a business to configure an AI assistant that:
1. Answers questions strictly using approved business knowledge with source citations.
2. Understands customer intent and permitted customer context.
3. Evaluates business rules and margin thresholds before making recommendations.
4. Executes only configured, authorized actions (deterministic mutations).
5. Requests human approval when a configured boundary is crossed.
6. Hands unresolved cases to a human operator with preserved context.
7. Records outcomes, audits actions, and makes knowledge gaps visible.
8. Provides an embeddable customer-facing website chat widget.
9. Provides a high-density Control Center to manage knowledge, permissions, actions, and quality.

> **Positioning Rule**: SYNEX is **never** positioned as an unrestricted autonomous agent or a generic chatbot builder. It is a controlled AI Business Assistant and Action Engine.

---

## 2. Technical Stack & Hardware Constraints

- **Frontend**: Next.js 14 (App Router, static export `out/` capable), React 18, Strict TypeScript, Tailwind CSS, Framer Motion (with `prefers-reduced-motion` zero-delay support), Lucide icons.
- **Backend Architecture (Target Platform)**:
  - Node.js & TypeScript service (Fastify / NestJS).
  - Python FastAPI for the AI microservice where applicable.
  - **Relational DB**: MySQL 8 (separately hosted).
  - **Vector DB**: Qdrant.
  - **Cache & Queue**: Redis.
  - **Local LLM Inference**: Ollama running locally (CPU-only, `bge-large-en-v1.5` embeddings, quantized models).
  - **Reverse Proxy**: Nginx.
  - **Containerization**: Docker & Docker Compose.
- **Hardware Constraints**:
  - 64 GB RAM.
  - Two 1 TB NVMe SSDs.
  - No GPU (Ollama inference runs entirely on CPU).
- **Security & Multi-Tenancy Invariant**:
  - The browser communicates solely through authenticated endpoints.
  - Never connect the browser directly to MySQL, Qdrant, or privileged Ollama APIs.
  - Client-side tenant IDs are never treated as authorization boundaries. Server-side session verification is mandatory.

---

## 3. Design System Tokens (The Editorial Ledger)

Preserve the established editorial, minimal, warm-neutral visual direction across both the marketing site and the Control Center:
- **Canvas / Paper**: `#FBFBF9` (`bg-paper`)
- **Elevated Surfaces**: `#FFFFFF` (`bg-paper-elevated`)
- **Primary Ink**: `#121210` (`text-ink`, `border-ink`)
- **Muted Text**: `#54565A` (`text-ink-muted`)
- **Faint Text**: `#8A8D91` (`text-ink-faint`)
- **Hairline Border**: `rgba(18, 18, 16, 0.12)` (`border-hairline`)
- **Amber Accent (Attention / Gate)**: `#D97706` (`border-amber`, `text-amber`, `bg-amber-tint`)
- **Success (Verification / Safe)**: `#15803D` (`text-success`, `border-success`, `bg-emerald-50`)
- **Error (Violation / Action Blocked)**: `#B3261E` (`text-error`, `border-error`, `bg-rose-50`)

### Typography
- **Headlines**: Newsreader / Serif (`font-serif`).
- **UI & Body**: Inter (`font-sans`).
- **Technical & Metric Data**: JetBrains Mono (`font-mono`, `tabular-nums`).

### Visual Rules
- Comfortable whitespace, 1px hairline borders, restrained shadows (`box-shadow: none`).
- No neon, no gratuitous gradients, no default glassmorphism.
- Outline icons from Lucide.
- WCAG 2.2 AA contrast targets, minimum 44×44 CSS px touch targets.
- Instant motion resolution for `prefers-reduced-motion`.

---

## 4. Platform Information Architecture & Route Topology

### 4.1 Public Marketing & Narrative Routes
- `/`: The 11-Act Interactive Execution Trace (Act 0 Hero $\to$ Act 11 Open a Trace), Three-Step Overview Strip, Trust Control Strip, Footers, and Embedded Sovereign Chat Widget.
- `/docs`: Enterprise Documentation including Architecture Topology (`#architecture`), Terminology Glossary (`#glossary`), and Self-Hosted Deployment (`#deployment`).
- `/limits`: Non-goals, hardware boundaries, and architectural exclusions.
- `/about`: Company philosophy, founder principles, and local-first sovereign AI manifesto.
- `/changelog`: Formal ledger of platform releases.
- `/partners`: Partner and certified integrator directory.
- `/login`: Role-gated credential-free authentication simulation (`ops_lead`, `owner`, `viewer`).
- `/onboarding`: 7-Step deterministic Guided Provisioning Wizard (`Business`, `Knowledge`, `Rules`, `Actions`, `Team`, `Test AI`, `Go Live`).
- `/embed`: Standalone embeddable preview of the chat widget.

### 4.2 Customer Control Center (`/dashboard/*`)
1. **Overview** (`/dashboard`): Real-time executive cockpit answering: Is the assistant live? Is it working correctly? What requires attention? What usage/cost data is available?
2. **Conversations** (`/dashboard/conversations`): Searchable, filterable omnichannel inbox with transcript inspection, source citations, context dossiers, and operator takeover.
3. **Work Queue** (`/dashboard/queue`): Unified operational task queue categorizing pending approvals, unmapped gaps, and handoffs.
4. **Approvals** (`/dashboard/approvals`): Intercepted transactions requiring Level 2 authority sign-off with dynamic margin preview.
5. **Customers** (`/dashboard/customers`, `/dashboard/customers/[id]`): Enterprise CRM directory with GSTIN verification, credit limits, and account history.
6. **Knowledge Base** (`/dashboard/knowledge`): Source repository with PRIMARY/SECONDARY authority, sync states, Unanswered Question inbox, and Conflict Resolver.
7. **Actions Engine** (`/dashboard/actions`): Idempotent tool definitions, live execution logs, durations, payload digests, and failure recovery.
8. **Rules & Permissions** (`/dashboard/rules`): Visual policy builder for commercial thresholds, autonomous discount limits, and role gates.
9. **Business Insights & AI Health** (`/dashboard/insights`): Unit economics, autonomous conversion yield, compute cost ledger, and latency/retrieval telemetry.
10. **Admin & Settings** (`/dashboard/admin`): System settings, team RBAC, tenant isolation profiles, Docker Compose configuration, and immutable audit logs.
11. **Legacy Safe Redirects**:
    - `/dashboard/today` $\to$ `/dashboard`
    - `/dashboard/audit` $\to$ `/dashboard/admin?tab=audit`
    - `/dashboard/handoff` $\to$ `/dashboard/queue?tab=handoffs`
    - `/dashboard/leads` $\to$ `/dashboard/conversations`

---

## 5. Content Honesty Contract & Boundary Governance

All UI metrics, simulated logs, and integration statuses strictly adhere to `lib/content-contract.ts`:
1. **Demo Honesty**: All synthetic transactions, simulated embeddings, and demonstration benchmarks carry explicit `[DEMO]` or `[SIMULATED REPLAY]` labels.
2. **Deterministic Simulations**:
   - Act 4 policy slider follows the exact lookup table `PAUSED_SIMULATION`.
   - Act 5 permission gate executes independent margin revalidation ($19.4\% \ge 18.0\%$).
   - Act 9 isolates the conflict demonstration to `8MM-BRS-FTG` to preserve the zero-conflict guarantee of principal SKU `6MM-BRS-FTG`.
   - Act 11 displays truthful submission feedback: `"Demo submission complete — no request sent"`.
3. **Database & Infrastructure**: Local self-hosted inference (Ollama CPU-only, MySQL 8, Qdrant vector store). No claims of live cloud models or unverified certifications.
4. **Zero Hallucination Guarantee**: If knowledge retrieval yields confidence below threshold, the assistant acknowledges the gap and routes to human handoff rather than guessing.
