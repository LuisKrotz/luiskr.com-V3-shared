# `shared\scripts\build\deploy-info.mjs`

Assembles `dist/deploy-info/` — the "last deploy" bundle the CMS

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\deploy-info.mjs`              |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `COVERAGE_MODULES`

Module workspaces that publish a coverage report — mirrors the
run-modules.mjs runner order.

### `lhrEntry`

One representative run record — the shape manifest.json entries carry for
the collector (`isRepresentativeRun` runs only).

- `@param` {object} lhr Parsed lhr-*.json report.
- `@param` {string} filePath Absolute path of the lhr json.
- `@returns` {{url: string, isRepresentativeRun: boolean, jsonPath: string,

### `scanLhrFiles`

Fallback run discovery when .lighthouseci/manifest.json is missing or
unreadable (interrupted/pruned runs): scan lhr-*.json files and keep the
NEWEST report per audited URL — manifest timestamps order chronologically,
so the highest fetchTime per url is the latest representative run.

- `@returns` {Array} Synthesized manifest entries.

### `fileSize`

Byte size of a file, or null when absent.

### `unminifiedSize`

Unminified source size for a built asset — the emitted `.map` carries
`sourcesContent` (the pre-minification module text); summing byte
lengths reproduces what the bundle weighed before terser/lightningcss.

- `@param` {string} file Emitted bundle path.
- `@returns` {number|null} Summed source bytes, or null without a map.

### `walk`

Recursive generator — yields every file path under `dir`.

### `fileSizes`

Sizes for one emitted file: raw bytes plus compressed bytes — the
build's precompressed .gz/.br siblings when they exist (vite's
compression emits them next to every bundled asset), computed via
zlib for smaller strays that ship uncompressed.

- `@param` {string} file Emitted file path.
- `@returns` {{bytes:number,gzip:number,brotli:number}} Size triple.

### `blank`

Blank file-type bucket — counts plus minified/unminified/compressed bytes.

### `acc`

Folds one file's sizes (+ optional unminified bytes) into a bucket.

### `collectTier`

Scans one tier tree (dist/v/<tier>/): JS + CSS bundles with source-map
unminified sizes, misc emitted payloads (fonts/wasm spills), and the
ten largest chunks for the CMS "heaviest output" list.

- `@param` {string} dir dist/v/<tier> path.
- `@returns` {{js:object,css:object,misc:object,largest:Array}}

### `collectWasmCrates`

Per-crate wasm table — .wasm module bytes + .js glue bytes each.

### `collectBundleStats`

Full dist/ bundle inventory: a file-type rollup (js, css, html, wasm,
assets) with minified/unminified/compressed bytes, the per-tier
breakdown, the per-crate wasm table, and HTML grouped by top-level
directory (the prerendered locale trees).

- `@returns` {object|null} The bundle-stats report, or null without dist/.
