# `shared\scripts\verify\a11y-checker.mjs`

| | |
|---|---|
| **Source** | `src/shared\scripts\verify\a11y-checker.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `GATING_LEVELS`

Levels that gate the run when not covered by the reviewed baseline.

### `fingerprintKey`

Stable fingerprint KEY for one finding — rule + positional-index-free
DOM path. The engine's `path.dom`/`xpath` carries `[n]` sibling
indices; on pages whose DOM is not fully deterministic at settle
(playground HUD rows, media-ladder rungs, engine boot timing) the
indices flap between runs and exact-path baselining would flag the
same verified issue as "new" forever. Stripping indices keeps the
element-type chain; the occurrence ordinal appended by
`fingerprints()` keeps N identical-shape siblings distinct, so an
EXTRA occurrence of a baselined shape still fails the gate.
- `@param` {object} f finding entry from the checker report
- `@returns` {string} normalized rule+path key (pre-ordinal)

### `fingerprints`

Fingerprints one route's findings: `${key}|${ordinal}` where ordinal
is the 0-based occurrence index of that key on the route. Gating
levels only — recommendations/manual prompts never block.
- `@param` {Array<object>} findings raw findings for one route
- `@returns` {Array<{f: object, fp: string}>} finding + fingerprint pairs

### `MIME`

MIME table for the loopback dist server — only what emitted pages load.

### `collectRoutes`

Recursively collects emitted pages — every directory holding an
index.html is a servable route (dist is fully prerendered per route
and per locale).
- `@param` {string} dir - directory to walk
- `@returns` {string[]} route paths relative to dist ('/about/' style)

### `EN_FANOUT_RE`

Mechanical fan-out generators: the star-field dossier pages and the
per-screenshot portfolio tour pages all instantiate one template with
different copy — a bounded sample covers the accessibility surface
without an hours-long scan. Same for the docs portal's per-source-file
pages (one page per repo file).

### `DOCS_DEEP_RE`

Deeper-than-section-landing docs portal pages (one page per repo file).

### `EXCLUDED_RE`

Canonical exclusions: `/<loc>/…` locale trees and the `/langs/<loc>/`
mirror are template translations of the EN surface — same DOM shapes,
different copy — and `/cms/…` is the auth-gated admin shell, not part
of the public accessibility surface.

### `FANOUT_SAMPLE`

Routes per fan-out family kept for the canonical scope.

### `canonicalRoutes`

Picks the canonical scan surface — English routes only, CMS excluded:
- every EN route scans, except fan-out families which contribute
  a small deterministic sample (first N per family)
- docs portal depth-2 landings always scan; deeper per-source pages
  contribute a sample
- `@param` {string[]} routes every emitted route
- `@returns` {string[]} canonical routes to scan

### `serveDist`

Starts the loopback static server for dist/. Resolves with {server, base}.
