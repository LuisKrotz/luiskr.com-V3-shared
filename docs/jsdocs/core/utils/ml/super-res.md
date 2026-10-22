# `core\utils\ml\super-res.ts`

ML super-resolution — when the manifest's highest proven

| | |
|---|---|
| **Source** | `src/core\utils\ml\super-res.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Injectable inference signature — tests substitute without a session.

### (module scope)

Anything with drawable dimensions — Image, ImageBitmap, video frame.

### `scratch`

Scratch canvas reused across calls — no per-upscale element churn.

### `dimsOf`

Reads the drawable's intrinsic pixel size across element kinds.

### `upscaleImage2x`

Runs the 2× super-resolution model over a confirmed-but-low-quality
source. Pixel flow: scratch canvas → RGBA readback → NCHW float32
(0–1) → ORT inference → ImageData at 2× → ImageBitmap ready for
`gpuAccel.processBitmapGPU`. Resolves null on every failure arm —
missing canvas/2d, oversized input, no runtime, bad output length —
so the caller's confirmed rung is never at risk.
- `@param` img The best confirmed source element.
- `@param` run Injectable model runner — defaults to the ORT engine.
- `@returns` The 2× bitmap, or null when enhancement isn't possible.
