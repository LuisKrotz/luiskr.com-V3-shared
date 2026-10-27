# `website\tests\coverage\components\home\mosaic-burn-letters.test.js`

Per-letter combustion tests for website/components/home/mosaic/burn.ts —

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\home\mosaic-burn-letters.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                  |

## Members

### `createRecording2D`

A recording 2D context: `fillText` snapshots the active fillStyle (the
raster ink assertion), `getImageData` returns a REAL sized buffer with
alpha painted per the `inkAt` column map (letter-run detection needs
true alpha layout — a flat 4-byte stub can never produce letters),
`measureText` returns a char-count width, and every other method no-ops.

### `useInk`

Swaps in a recording 2D context with a given ink-column map.
