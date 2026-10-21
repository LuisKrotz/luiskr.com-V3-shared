# `core\tests\coverage\utils\gpu\webgpu-widget-tails.test.js`

Coverage tail for utils/gpu/webgpu-widget.ts — the

| | |
|---|---|
| **Source** | `src/core\tests\coverage\utils\gpu\webgpu-widget-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `lastWidget`

Captures the widget instance the fake class returns.

### `fakeGpu`

Builds a navigator.gpu double — requestAdapter → requestDevice → a
fake GPUDevice whose `lost` promise the test controls. `calls`
records requestDevice invocations so the shared-device cache is
assertable (one device for the whole page, never one per widget).

### `recordingModule`

Builds a fake wasm module whose widget records every call.

### `flushTick`

Waits one rAF-equivalent tick via a microtask+timer flush.
