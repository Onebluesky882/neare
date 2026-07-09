# DECISIONS.md

## Purpose
Record architectural decisions that all agents must follow. DECISIONS.md is authoritative — workers may not deviate without Conductor approval.

⸻

## Decision: Version Policy

**Date:** 2026-06-16
**Status:** ACCEPTED

**Context:**
Workers default to package versions from training data, which are outdated. Example: choosing Vite v4 when current stable is v8. This causes security exposure and missing features.

**Decision:**
All packages must use the latest stable version at time of installation unless a version is explicitly pinned below in "Pinned Versions". Workers must verify current version at runtime before installing — training-data version numbers are not authoritative.

Mandatory check before install:
```bash
npm info <package> version        # Node
pip index versions <package>      # Python
cargo search <package>            # Rust
```

Bootstrap scaffolds must use `@latest`:
```bash
npm create vite@latest
npx create-next-app@latest
npx create-expo-app@latest
```

See AGENT_RULES.md → Version Policy for enforcement rules and violation consequences.

**Consequences:**
* Workers must run the version check and include verified version in gate-out `dependencies_added`
* Claiming "latest" without the check command output = Status: FAIL
* If a specific version is required, Dev or Conductor must pin it in "Pinned Versions" below

⸻

## Pinned Versions

**Authority: Dev only.** Only Dev may add, change, or remove entries here. Conductor and Workers may NOT modify this table. Any change must be logged in DEV_LOG.md.

When a package appears in this table, workers must use the exact version specified — the `@latest` rule does NOT apply. Workers may not upgrade or downgrade without Dev approval.

Format:

| Package | Pinned Version | Reason | Pinned By | Date |
|---------|---------------|--------|-----------|------|
| example: react | 18.3.1 | stability — v19 breaking changes not yet assessed | Dev | 2026-06-16 |

Pinned Versions:

| Package | Pinned Version | Reason | Pinned By | Date |
|---------|---------------|--------|-----------|------|
| (none) | — | all packages use @latest | — | — |

⸻

## Decision: Agent Orchestration Patterns

**Date:** 2026-06-23
**Status:** ACCEPTED

**Context:**
The system needs to support four orchestration modes: single agent (current), supervisor routing, parallel fan-out, and sequential safe mode. Without a clear decision on which to use when, workers will either over-engineer simple tasks or choose parallel execution when tasks have hidden dependencies — causing race conditions or data corruption.

**Decision:**
Four patterns are supported, governed by a strict decision flowchart (see AGENT_RULES.md Orchestration Rule). Sequential is the default safe fallback. Parallel is opt-in and only allowed when all tasks are provably independent.

**Technical implementation in this stack (Anthropic Managed Agents):**

| Pattern | Managed Agents feature | When |
|---|---|---|
| Single | `sessions.create` + single agent | Default |
| Supervisor | `multiagent: {type: "coordinator"}` + sub-agents roster | Unknown task type at request time |
| Parallel fan-out | Coordinator dispatches to multiple sub-agents simultaneously; waits for all `thread_status_idle` | Tasks provably independent |
| Sequential | Coordinator dispatches one sub-agent, waits for `thread_status_idle`, then next | Tasks have any dependency |

**Retry + Fallback rules:**

- If a sub-agent fails (`session.status_terminated` or `session.error`): retry once with the same agent
- If retry also fails: fall back to Sequential Pattern — the coordinator handles the failed task itself using single-agent mode
- Never silently discard a failed task — always surface the error to the user
- Fallback model for Anthropic refusals: `claude-opus-4-8` (already wired in stage-12 via `fallbacks` param)

**Safe mode enforcement:**

Before dispatching parallel, the coordinator must check:
1. Do any tasks write to the same file path?
2. Does any task's output become another task's input?
3. Do any tasks modify the same D1 row?

If any check is true → block parallel, use sequential automatically.

**Consequences:**
- Orchestration pattern must be documented in every task file that uses multi-agent
- Workers must not choose Parallel unless they have verified all tasks are independent
- Sequential is always valid — workers must never choose Parallel to "look better"
- Retry + fallback logic must be implemented in `agent.handler.ts` for any multi-agent stage

⸻

## Decision: Anthropic Managed Agents for Web-Based Code Editing

**Date:** 2026-06-23
**Status:** ACCEPTED

**Context:**
Non-technical clients (business owners with no VSCode, no terminal) need to request code changes to their project via a web UI. A web interface backed by Claude must be able to read and modify their codebase directly without requiring the client to touch code or a terminal.

**Decision:**
Use **Anthropic Managed Agents** (`/v1/agents`, `/v1/sessions`) with a `github_repository` resource. Client's GitHub PAT is stored in an **Anthropic Vault** (never in the database as plaintext). Each chat session mounts the client's repo at `/workspace`. Claude uses file tools to modify files, then commits and pushes. All communication is HTTP — compatible with Cloudflare Workers.

**Anthropic resource model:**
- One shared Agent → `ANTHROPIC_AGENT_ID` secret (created once via setup script)
- One shared Environment → `ANTHROPIC_ENV_ID` secret (created once via setup script)
- Per-user Vault → `vault_id` stored in database
- Per-conversation Session → `session_id` stored in database

**Consequences:**
- `@anthropic-ai/sdk` required in the API app
- Cloudflare secrets required: `ANTHROPIC_API_KEY`, `ANTHROPIC_AGENT_ID`, `ANTHROPIC_ENV_ID`
- GitHub PAT stored in Anthropic Vault only — never logged, never database plaintext

⸻

## Decision: Import Snackig as the neare mobile product

**Date:** 2026-07-09
**Status:** ACCEPTED

**Context:**
Dev already has a working prototype ("Snackig") at `/Users/onebluesky882/local_files/myApp/Snackig`: an Expo mobile app, a Nitro native module example, and a separate Go backend (Fiber + Postgres) plus a small `better-auth` TS service. Dev wants this to become the core mobile product for `neare` — a privacy-first "nearby activity" app — rather than rebuilding from scratch.

**Decision:**
- Import `snackig/` → `apps/mobile` (Expo/React Native), converted to pnpm (drop `bun.lock`).
- Import `nitro-module-math/` → `packages/nitro-module-math` (kept as a native-module reference/starting point).
- Import `backend/go_project` + `backend/better-auth` → `apps/backend-go`. This backend stays **separate** from `apps/api` (Hono/Cloudflare/D1) — Dev explicitly chose to keep using the existing Go+Postgres+better-auth stack for the mobile app's realtime/geo features instead of building that logic into the Cloudflare Workers API. `apps/api`/`apps/web`/`apps/admin` are unaffected and keep using `packages/auth` Bearer tokens.
- No secrets copied: `backend/go_project/.env`, the compiled `main` binary, and `tmp/` build artifacts are excluded from the import. A fresh `.env` must be created locally (see SECURITY_RULES.md).

**Consequences:**
- The repo now has two backends with two auth systems (Cloudflare/D1/packages-auth for web, Go/Postgres/better-auth for mobile). Any future work must not conflate the two or route web dashboard traffic through the Go backend without a new CONTRACTS.md entry + Conductor approval (see SECURITY_RULES.md — API Surface Protection).
- pnpm is the single package manager across the whole monorepo (see Config in PROJECT.md / QUESTIONS.md Q7).
- Deployment target for `apps/backend-go` is not Cloudflare Workers (Go doesn't run there) — a real deployment target (VM/container) is still open, tracked in PIPELINE.md.

⸻

## Decision: Location & presence data must be aggregated, never individually identifying

**Date:** 2026-07-09
**Status:** ACCEPTED

**Context:**
The core "neare" feature is showing that people/activity exist near a user (density, live nearby runners, heatmaps) without exposing who any specific person is. Dev and Conductor discussed this against GDPR/PDPA: location data can count as personal data even without a name attached, if it can still be linked back to an individual (e.g. a near-empty area, high-precision realtime pings, or persisted location history).

**Decision:**
- Any endpoint or UI surface showing "people near you" must return **aggregated counts / density**, never a list of individually resolvable users, unless the viewer has an explicit mutual-consent relationship with that specific person (e.g. an accepted "group run" invite — out of scope until designed).
- Raw location pings are never persisted indefinitely; only derived/aggregate data (heatmap buckets, run summaries) may be retained. Retention window must be defined before any location-writing endpoint ships.
- Areas below a minimum bucket size (Dev/Conductor to set a concrete threshold, e.g. "fewer than N people in a geohash cell") must not be displayed as an exact count — show a floor value or hide the cell instead, so no cell of 1–2 people can be de-anonymized by inference.
- Location sharing requires explicit opt-in consent, must be revocable, and must not be silently upgraded (e.g. from "share while using app" to "always").
- See SECURITY_RULES.md → Location & Presence Data for the enforceable rule text.

**Consequences:**
- Every future stage touching GPS/presence/heatmap data must be checked against this decision before merge-approval.
- `apps/backend-go` geo endpoints must expose aggregation, not raw point queries, from day one — no "quick individual lookup" shortcut even for debugging.

⸻

<!-- Add one section per decision -->
