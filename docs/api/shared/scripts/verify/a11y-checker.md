# `shared\scripts\verify\a11y-checker.mjs`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\verify\a11y-checker.mjs`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `GATING_LEVELS`

Levels that gate the run when not covered by the reviewed baseline.

### `baselineRoute`

Review granularity for one route's baseline entry: `{ruleId: count}` —
the set of potential-violation/recommendation rules a human reviewed on
that route (count kept for the report, not for gating). Element-path
fingerprints proved unusable: portfolio/playground pages render a
different DOM depth every run (media ladder rungs, HUD rows, lazy
reveals), so the same verified issue re-flags at shifted paths forever.
The reviewable subject is the RULE — "all text_contrast_sufficient
prompts on this route are engine artifacts", signed off in the CMS
report. A rule never seen on the route still fails the gate.
Legacy formats convert on read: `key|ordinal` arrays and `{key: n}`
maps collapse to their ruleId set.

- `@param` {object|Array<string>|undefined} entry raw baseline entry
- `@returns` {Set<string>} reviewed ruleIds for the route

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
