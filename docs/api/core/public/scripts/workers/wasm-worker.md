# `core\public\scripts\workers\wasm-worker.js`

Batch-compute worker for the wasm pool: instantiates the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\public\scripts\workers\wasm-worker.js`          |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ENGINE_URL`

engine.wasm URL — mirrors WASM_POOL.ENGINE_URL (tokens/data/wasm.ts).

### `LIFECYCLE`

READY/ERROR lifecycle message types posted before any dispatch lands.

### `COMP_MULTS`

Masonry aspect multipliers — mirrors MASONRY.COMP_MULTS (tokens/layout/masonry.ts).

### `FEATURED_MULT`

Featured-card aspect multiplier — featured tiles render wider/shorter.

### `DENSE_COLS`

Column-span contract: dense grids (≥14 cols) span 6/4; featured spans 2 otherwise.

### `DENSE_CANDIDATES_FEATURED`

Dense-grid column candidates, per span (precomputed anchor sets).

### `DRAW_DELAY_MIN_MS`

Draw-text clamps — mirrors DRAW_TIMINGS (tokens/media/dimensions.ts).

### `ASPECT_FALLBACK_W`

Media-aspect fallback when dims are missing — 16:9.

### `SPRING_STIFFNESS`

Spring integrator defaults + fixed step (seconds — ~60 Hz frame).

### `DJB2_SEED`

djb2 hash seed — the media-key hash algorithm's fixed start.

### `PREFETCH_RANGE_BYTES`

Byte-range prefetch probes — 256 KB warm / 128 KB probe.

### `DOCS_SCENE`

Docs-scene constants — mirrors DOCS_UNITS (tokens/strings/docs.ts).

### `BUBBLE_RETRIES`

Star-field bubble-carve respawn cap — max attempts to replace a point
that lands inside a void bubble before keeping the dimmed original.

### `LCG_MULT`

LCG stream constants — Numerical Recipes multiplier/increment.

### `SEARCH_SCORE`

Route-search score weights — title > keywords > path > preview.

### `FORCE_CACHE`

Shared fetch options — worker fetches always reuse the browser cache.

### `wasmInstance`

Instantiated engine.wasm export table — null until the fetch below lands.

### `isCrossOriginUrl`

`isCrossOriginUrl` — true for absolute http(s) URLs outside this
origin: workers must not fan out third-party fetches (CORS + cache
semantics differ); callers keep their own fallback for those.

- `@param` url Candidate URL.
- `@returns` True when the URL is cross-origin.

### `bitmapOptions`

`bitmapOptions` — the createImageBitmap option set shared by every
decode handler: GPU-hardware resize at decode time, no CPU color
transforms, EXIF orientation respected.

- `@param` width Requested decode width px (0 = natural).
- `@param` height Requested decode height px (0 = natural).
- `@returns` The option bag.

### `decodeBitmap`

`decodeBitmap` — decode a Blob to ImageBitmap with the shared options,
falling back to a bare decode when the engine rejects resize/color
options (older engines).

- `@param` blob The image bytes.
- `@param` width Requested width px. @param height Requested height px.
- `@returns` Promise<ImageBitmap>.

### `callEngine`

`callEngine` — invoke an engine.wasm export when the module is live,
else return undefined so the caller's JS fallback expression applies.

- `@param` name Export name.
- `@param` args Numeric args (engine routines are number-only).
- `@returns` The wasm result, or undefined.

### `post`

`post` — reply on the current dispatch: type + id correlation, the
results payload, any extra sibling fields (BATCH_LAYOUT adds
totalHeight next to results), and an optional transfer list for
zero-copy results.

- `@param` id Dispatch id. @param type Result type string.
- `@param` results Result payload. @param transfer Optional transferables.
- `@param` extra Optional sibling fields merged into the message.
