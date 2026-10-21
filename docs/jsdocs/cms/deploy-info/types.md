# `cms\deploy-info\types.ts`

| | |
|---|---|
| **Source** | `src/cms\deploy-info\types.ts` |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### (module scope)

Manifest index of the deploy-info bundle — `files` maps report names
to their JSON paths inside dist/deploy-info/, `generatedAt`/`commit` stamp
which build produced them.

### (module scope)

Shape of the Lighthouse JSON summary — `urls` pairs each audited
URL with its category scores (performance, a11y, best-practices, SEO).

### (module scope)

Shape of the Jest coverage summary consumed by the Deploy Info tab —
`total` holds per-metric {covered,total,pct} aggregates (statements, branches,
functions, lines).

### (module scope)

Shape of the axe-scan report — `engine` names the axe-core version and
`surfaces` lists each mounted DOM surface with its violations (id, impact, help)
so the CMS tab can render them grouped by page area.

### (module scope)

Shape of the security-scan report — `scanner` records whether snyk or
yarn audit produced it, `ok` the gate outcome, `vulnerabilities` the advisory
rows (acceptedRisk marks entries waived via security-exceptions.json).

### (module scope)

Shape of the console-scan gate output — `ok` is the pass/fail,
`violations` lists each `console.*` callsite found under src/ (file, line,
method) since src is a zero-console zone (AGENTS.md rule 12).

### (module scope)

One file-type rollup in the bundle-stats report — `bytes` is the
emitted (minified) size, `unminified` the pre-minification source
bytes recovered from sourcemap sourcesContent, `gzip`/`brotli` the
compressed wire sizes.

### (module scope)

One ES-target tier row — the js/css/misc buckets emitted under
dist/v/<tier>/ plus that tier's ten heaviest chunks.

### (module scope)

One wasm artifact crate row — .wasm module bytes + .js glue bytes.

### (module scope)

Shape of the bundle-stats report — the post-build dist/ inventory:
file-type totals (js/css/html/wasm/assets) with minified vs
unminified vs compressed bytes, per-tier rows, the per-crate wasm
table, prerendered-HTML grouped by top-level directory, and the
heaviest emitted chunks overall.

### (module scope)

Tri-state of the Deploy Info fetch: still `loading`, the bundle
is `missing` (no deploy-info/ in this build), or the index parsed `ready`.
