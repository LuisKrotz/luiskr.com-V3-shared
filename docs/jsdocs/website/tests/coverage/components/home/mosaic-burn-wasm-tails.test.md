# `website\tests\coverage\components\home\mosaic-burn-wasm-tails.test.js`

Coverage tail for the WebGPU/wasm burn particle path —

|                |                                                                             |
| -------------- | --------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\home\mosaic-burn-wasm-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                     |

## Members

### `mountResult`

Mutable mount result the mock returns — tests swap per case.

### `mockGpu`

Mutable WebGPU capability flag the mock's hasWebGpu reads.

### `fakeWidget`

The fake wasm widget — records every kind-specific setter call.

### `liveCount`

Mutable particle count the fake sim reports.

### `BURN_SEL`

Selector for the burn-overlay element the assertions query.

### `BURN_CLASSES`

Class-name bundle the raw burn helpers expect — mirrors the production map.

### `ITEMS`

Single-card fixture — the burn helpers only need one item to act on.

### `flush`

Generous flush — mounted render queues need real timers past microtasks.

### `seedSessionData`

Seeds a glyph + ink column so packLetters/set_ink run their arms.
