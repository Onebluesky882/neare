# DEV_LOG.md

Status: ACTIVE

Owner: DEV

⸻

Purpose

This file records every direct edit Dev makes to governance files or code.

Conductor must read this file regularly and reconcile ROADMAP.md, PROJECT.md, and PIPELINE.md based on new entries.

⸻

Entry Format

Date: YYYY-MM-DD
File(s) changed: <path(s)>
Reason: <why Dev made this change>
Impact: <what Conductor/Workers should know or update because of this>

⸻

Log

<!-- Add newest entries at the top -->

Date: 2026-07-09
File(s) changed: PROJECT.md, DECISIONS.md, ARCHITECTURE.md, CONTRACTS.md, ROADMAP.md, SECURITY_RULES.md, QUESTIONS.md, PIPELINE.md, plus new apps/mobile, packages/nitro-module-math, apps/backend-go, apps/backend-go-auth
Reason: Dev ran the QUESTIONS.md onboarding flow and defined the project: neare, a privacy-first nearby-activity app (starting with running), built on Dev's existing "Snackig" prototype rather than from scratch. Dev decided to import the whole prototype (Expo mobile app, Nitro native module, Go/Fiber/Postgres backend + better-auth service) and to keep it on its own backend instead of merging into apps/api. Dev also asked for a LINE bot that answers "วิ่งไหนดี" using real nearby-activity data.
Impact:
- Governance files updated per QUESTIONS.md Conductor Instructions (license_status set to active, owner_email set, full tech stack recorded).
- PIPELINE.md now has stage-12 through stage-16: three parallel-eligible import stages (mobile/nitro-module/go-backend, all COMPLETE), stage-15 (pnpm workspace wiring, COMPLETE — root `pnpm install` and `pnpm type-check` pass clean across all 12 workspace packages including the 3 new ones; `go build ./...` passes in apps/backend-go), and stage-16 (LINE bot, still PLANNING — intentionally blocked on apps/backend-go exposing a real aggregated nearby-spots query, so the bot isn't wired against fake data).
- Source `.env` from the original Go project was NOT copied — only `apps/backend-go/.env.example` (variable names, no values). A real `.env` must be created locally before apps/backend-go can run.
- New security rule added: SECURITY_RULES.md → "Location & Presence Data" — no per-user location/presence data may ever be returned, aggregation only. Applies to all future geo/presence work including stage-16.
- Two backends now coexist by design (Cloudflare/D1/packages-auth for web, Go/Postgres/better-auth for mobile) — see DECISIONS.md for the explicit reasoning, so future workers don't "fix" this as an inconsistency.
