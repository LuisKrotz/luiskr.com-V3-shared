# `website\tests\coverage\components\home\mosaic-burn-letters.test.js`

Per-letter combustion tests for website/components/home/mosaic/burn.ts —

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\home\mosaic-burn-letters.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                  |

## Members

### `BURN_CLASSES`

Class-name bundle the raw burn helpers expect — mirrors the production map.

### `armCardBurn`

Partial-applied wrapper — binds the class/selector bundles so tests call with just (host, index).

### `TITLE_COLOR`

Expected fillStyle values the recording 2D ctx snapshots — title ink vs cleared pixels.

### `ITEMS`

Single-card fixture — the burn helpers only need one item to act on.

### `flush`

Generous flush — mounted render queues need real timers past microtasks.

### `createRecording2D`

A recording 2D context: `fillText` snapshots the active fillStyle (the
raster ink assertion), `getImageData` returns a REAL sized buffer with
alpha painted per the `inkAt` column map (letter-run detection needs
true alpha layout — a flat 4-byte stub can never produce letters),
`measureText` returns a char-count width, and every other method no-ops.

### `useInk`

Swaps in a recording 2D context with a given ink-column map.
