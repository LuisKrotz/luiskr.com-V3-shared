# `experiments/star-field/star/dossier.ts`

Lazy dossier loader for star-field bodies — fetches

| | |
|---|---|
| **Source** | `src/experiments/star-field/star/dossier.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_cache`

In-flight + resolved dossier cache — body id → dossier (or promise).

### `fetchDossier`

Fetches one dossier JSON — cached per id; a failed fetch resolves null
(the panel falls back to the catalog name) rather than throwing.
- `@param` id Body id matching `public/data/<id>.json`.
- `@returns` The dossier or null on fetch/parse failure.

### `loadDossier`

Selection path — marks the panel loading, prefetches, then assigns the
resolved dossier only when the selection is still current (a fast
second select must not have a slow first response overwrite it).
- `@param` c The StarField component.
- `@param` id Selected body id.

### `prefetchDossier`

Approach path — warms the cache without touching the panel; the select
path later resolves instantly from `_cache`.
- `@param` id Approached body id.
