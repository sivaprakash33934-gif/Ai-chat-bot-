# SYNEX SaaS Platform — Implementation Plan & Phase Roadmap

## 1. Overview & Strategy

### Strategic Objective
Evolve the SYNEX platform into a controlled AI Business Assistant & Action Engine SaaS Control Center while strictly preserving:
1. **The 11-Act Interactive Landing Page**: Zero layout regressions or broken anchors on `/`.
2. **Next.js Static Export (`next build`)**: Clean build with 0 errors across all 36 prerendered routes.
3. **The Content Contract & Honesty Invariants**: Strict adherence to `lib/content-contract.ts` and clean prebuild audits (`npm run audit:content`).
4. **Editorial Ledger Design System**: Paper `#FBFBF9`, Ink `#121210`, Hairline `12% ink`, Amber attention, Green verification, Red violation.

---

## 2. Capability Mapping Matrix

| Capability | Current State | Target State | Implementation Strategy |
| :--- | :--- | :--- | :--- |
| **Product Identity** | Autonomous commerce narrative | Controlled AI Business Assistant & Action Engine | Grounding, rules, permission gates, human handoffs, honest status |
| **Interactive 11-Act Trace** | Fully implemented on `/` | Preserved as core differentiator | Maintain acts 0–11 without regression |
| **Marketing Navigation** | Header with links to Acts, Docs, Limits, Login | Header with How it works, Docs, Limits, Pricing, Login, Pilot | Refine Header navigation without breaking content-contract audit |
| **Control Center Shell** | Responsive Sidebar + TopBar | Full tenant context, live reactive badges, role switching | Ensure zero layout thrashing, accessible keyboard navigation |
| **Conversations Inbox** | Searchable directory with Drawer | Omnichannel filters (Channel, Status), citations, takeover | Completed in `ConversationsBrowser.tsx` & `ConversationDrawer.tsx` |
| **Knowledge Base** | Document table, gap inbox, conflict resolver | Authority tiers (PRIMARY/SECONDARY), fresh/stale states | Completed in `Knowledge.tsx` |
| **Rules & Permissions** | Dynamic slider, margin floor checks, RBAC gates | Multi-parameter policy controls, draft isolation | Completed in `RulesPermissions.tsx` |
| **Actions Center** | Tool definitions, execution logs, failure recovery | Idempotent mutations, 504 handling, retry limits | Completed in `ActionsCenter.tsx` |
| **AI Test Lab / Simulator** | Embedded chat in onboarding step 6 & public widget | Multi-turn testing with citations, actions, handoffs | Completed in `ChatWidget.tsx` |
| **Insights vs AI Health** | Integrated analytics & telemetry | Dedicated sections for business results vs system health | Completed in `Insights.tsx` |
| **Setup Wizard** | 7-step guided provisioning | 7 stages: Business, Knowledge, Rules, Actions, Team, Test, Go Live | Completed in `OnboardingWizard.tsx` |
| **Security & Multi-Tenancy** | Local-first architecture documentation & RBAC simulation | Documented boundaries, server session requirements | Fully documented in docs, limits, and product spec |

---

## 3. Execution Batches & Status

- **Batch 1 (Audit & Specifications)**: ✅ Audited routes, components, tokens, audit script, and updated `SYNEX_PLATFORM_PRODUCT_SPEC.md` and `SYNEX_IMPLEMENTATION_PLAN.md`.
- **Batch 2 (Content Contract & Navigation Polish)**: Check Header & navigation links to ensure full compatibility with product requirements and content audit.
- **Batch 3 (Verification & Static Export Hardening)**: Run `npm run audit:content` and `npm run build` to verify 100% clean compilation.
