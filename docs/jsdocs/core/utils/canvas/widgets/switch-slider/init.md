# `core\utils\canvas\widgets\switch-slider\init.ts`

| | |
|---|---|
| **Source** | `src/core\utils\canvas\widgets\switch-slider\init.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `backingDpr`

Backing store at clamp(devicePixelRatio, 2, 3) — the 2px floor keeps
the 1px SDF edges crisp on 1× displays; the 3× ceiling caps fill
cost on phones (the widget is only 54×28 CSS px anyway).

### `triggerFallback`

Switches to the non-WebGL path — releases any live GL, then hides the canvas so the CSS fallback shows.

### `init`

Boot sequence: GL init → event binding → render start; fully degrades to the fallback path.

### `tryWasm`

Attempts the WebGPU wasm switch (~48KB artifact, own GPUDevice).
MANUAL drive: this class keeps its own spring loop, so the bridge
only initializes the surface. On any failure initRest() runs the
exact previous path (WebGL → 2D → CSS).
- `@param` host The switch whose canvas the wasm widget should claim.

### `initRest`

The classic boot tail — WebGL attempt → 2D fallback → events +
loop. Runs directly on no-WebGPU browsers and after a wasm mount
failure.
- `@param` host The switch to bring up on the classic path.

### `initWebGL`

Creates the WebGL context, compiles the shader program and sets up uniforms/buffers; falls back on any failure.
