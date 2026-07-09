# PROJECT.md

## Project Name
neare

## Goal
A privacy-first app for discovering nearby activity — starting with running/movement: see that people are out running near you, how dense a spot is, and what's happening in your area, without exposing who any specific person is. Built on top of the existing "Snackig" prototype (Expo mobile app + Nitro native module + Go/Fiber/Postgres/better-auth backend), which already frames the idea as "social movement platform" rather than a plain running tracker (live nearby runners, community heatmap, group runs).

## Tech Stack
- **apps/web, apps/api, apps/admin** (existing template): Next.js + Hono + Cloudflare Workers + D1, Bearer-token auth via packages/auth — dashboard / owner-facing surfaces.
- **apps/mobile** (new, imported from Snackig): Expo 56 / React Native 0.85, expo-router, react-native-maps, Reanimated + Worklets, Nitro Modules for native performance, Uniwind (Tailwind for RN).
- **packages/nitro-module-math** (new): Nitro native module — reference/starting point for custom native modules needed for GPS/geo performance work.
- **apps/backend-go** (new, imported from Snackig): Go + Fiber v2 + Postgres (pgx) + better-auth (TS) — serves the mobile app's realtime/geo features (live presence, nearby runners, heatmap). Kept as its own backend per explicit decision — NOT merged into apps/api's Cloudflare/D1 stack.
- **packages/chat-ops-core** (existing, stage-11): Telegram/LINE/Meta webhook + client helpers, command router, Groq-based NLP intent parsing — used for the planned LINE bot ("วิ่งไหนดี" → nearby running spots).
- Package manager: **pnpm** across the whole monorepo, including apps/mobile (Snackig's original bun.lock is dropped).

## Team / Agents
Single Conductor/Worker session (Dev-directed) for this setup pass — no separate dispatched worker agents yet.

## Current Stage
stage-1-setup — COMPLETE. Next: stage-12/13/14 (Snackig import), see PIPELINE.md.

---

## Status
ACTIVE

---

## License

```
license_status: active
```

<!-- Dev sets this to "active" before any work begins. -->
<!-- Conductor checks this field before every dispatch. -->
<!-- See CONDUCTOR.md → PRE-FLIGHT CHECK for enforcement. -->

---

## Config

```
conductor_branch: main
owner_email: wansing05@gmail.com
```

<!-- conductor_branch: the branch all PRs merge into — default is "main" -->
<!-- owner_email: the user who gets owner role after first deploy (answer from QUESTIONS.md Q0) -->
