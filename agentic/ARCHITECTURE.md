# ARCHITECTURE.md

## Overview
`neare` is a monorepo with two independent backends: an existing Cloudflare-native web stack (dashboard/owner tooling) and a newly-imported Go stack (mobile app's realtime/geo features). The mobile app (Expo) is the primary end-user product; the web app is the owner-facing surface (roadmap, forum, monitoring, payments) already built out in earlier stages.

## Modules / Components

| Module | Domain | Responsibility |
|---|---|---|
| `apps/web` | Next.js on Cloudflare Workers | Marketing/dashboard site, owner-facing UI (existing) |
| `apps/api` | Hono on Cloudflare Workers + D1 | Web-facing API: auth, forum, roadmap, payments, agent, discord/telegram/nowpayments (existing) |
| `apps/admin` | Next.js on Cloudflare Workers | Internal admin/monitor dashboard (existing) |
| `packages/auth` | Bearer-token auth library | Auth for apps/web + apps/api + apps/admin (existing, unchanged) |
| `apps/mobile` | Expo / React Native | The `neare` end-user mobile app — nearby activity map, run tracking, presence UI (imported from Snackig) |
| `packages/nitro-module-math` | Nitro native module | Reference native module powering performance-critical mobile code (GPS smoothing, geo math) |
| `apps/backend-go` | Go + Fiber v2 + Postgres + better-auth | Mobile app's own backend: accounts (better-auth), realtime/geo/presence, run data, aggregated heatmaps. Separate from `apps/api` by explicit decision (see DECISIONS.md) |
| `packages/chat-ops-core` | Shared TS library | Telegram/LINE/Meta webhook + client helpers, command router, Groq NLP parsing — backs existing Telegram/Discord bots and the planned LINE "nearby running spots" bot |

## Data Flow
- Mobile app (`apps/mobile`) talks to `apps/backend-go` for accounts, run tracking, and nearby/presence queries — never to `apps/api`.
- `apps/web`/`apps/admin` continue talking to `apps/api` exactly as before; unaffected by the mobile import.
- Planned LINE bot: LINE webhook → `apps/api` (chat-ops-core LINE client, mirroring the existing `telegram` domain) → queries aggregated "popular running spots" from `apps/backend-go` → replies via LINE. Not yet implemented — depends on `apps/backend-go` exposing an aggregated nearby-spots query (see PIPELINE.md).
- All "who/what is near me" queries return aggregated/bucketed results only — never a per-user list — per DECISIONS.md → Location & presence data.

## External Dependencies
- Cloudflare Workers + D1 (existing web stack)
- Postgres (new, for `apps/backend-go`)
- Groq API (chat-ops-core NLP parsing)
- LINE Messaging API / Telegram Bot API / Discord (chat-ops-core)
- Expo/React Native ecosystem, Nitro Modules (mobile)

⸻

## Constraints
- `apps/backend-go` and `apps/api` must not be merged into a single backend without a new Conductor-approved decision — they intentionally use different auth systems (better-auth vs packages/auth Bearer).
- No individually-identifying location data may be returned by any endpoint — aggregation only (see DECISIONS.md, SECURITY_RULES.md).
- `apps/backend-go` cannot deploy to Cloudflare Workers (not a JS/WASM runtime target here) — deployment target is still open, tracked as a pipeline blocker.
