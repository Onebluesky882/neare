# CONTRACTS.md

## Purpose
<!-- Define the public interfaces between modules -->

⸻

## Module: apps/backend-go — nearby/presence aggregation (planned, not yet implemented)

### Input
- Authenticated mobile user (better-auth session) + approximate location (geohash-bucketed on the client before it's ever sent, where possible)

### Output
- Aggregated counts per area bucket (e.g. `{ geohash: string, count: number }[]`) — never a list of individual users/locations
- Run/heatmap summaries — derived data only, not raw point tracks

### Errors
- Standard JSON error shape `{ error: string }`, non-2xx status
- Buckets below the minimum size threshold are omitted or floored, never returned as an exact small number (see DECISIONS.md — Location & presence data)

⸻

## Module: apps/api — LINE bot webhook (planned, depends on apps/backend-go aggregation endpoint above)

### Input
- LINE webhook POST, verified via `packages/chat-ops-core` LINE signature check (mirrors the existing `apps/api/src/domains/telegram` pattern)
- Free-text user message (e.g. "วิ่งไหนดี")

### Output
- LINE reply message summarizing aggregated nearby running activity (from the backend-go module above)

### Errors
- Unauthorized (bad/missing LINE signature) → 401, mirrors telegram domain
- Unrecognized intent → fallback help message, same pattern as `telegram.route.ts`

⸻

<!-- Add one section per module -->
