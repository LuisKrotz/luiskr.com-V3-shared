# `core\tests\coverage\utils\ml\super-res.test.js`

Coverage for core/utils/ml/super-res.ts — input gating,

| | |
|---|---|
| **Source** | `src/core\tests\coverage\utils\ml\super-res.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `makeImg`

Minimal drawable stub — naturalWidth/Height drive the gate.

### `canvasState`

Shared canvas stub state — the module under test memoizes its scratch
canvas (`scratch ??=`), so only the FIRST stubbed createElement wins the
cached instance; every later call's getContext/drawImage must consult
this shared state rather than a per-stub closure.

### `stubCanvas`

Stubs document.createElement('canvas') with a 2d-capable fake driven by
canvasState — toggle `canvasState.ctx`/`drawThrows` per test; the winning
canvas keeps consulting them. Returns the swap-out restorer.

### `stubBitmap`

Stubs createImageBitmap — records calls, optional failure.

### `stubImageData`

happy-dom lacks ImageData — minimal stand-in honoring the shape.

### `okRun`

run stub resolving a correctly-sized 2× NCHW output for w×h input.
