# `core/utils/canvas/widgets/theme-slider/init.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/utils/canvas/widgets/theme-slider/init.ts`      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `backingDpr`

Backing-store oversampling: max(devicePixelRatio, 2) × 2 — deliberately
≥4× CSS px because the shader's smoothstep AA bands are ~0.02
normalized units wide and need sub-pixel coverage to look glassy
rather than stair-stepped on the tiny 64px track.

### `applyBackingStore`

Applies the oversampled backing-store size for the current track width.

### `observeResize`

Observes track width changes; re-sizes the backing store and re-maps the knob.

### `init`

Boot sequence: GL init → event binding → render start; fully degrades to the fallback path.

### `tryWasm`

Attempts the WebGPU wasm theme slider (~52KB artifact, own
GPUDevice). MANUAL drive: this class keeps its own spring loop and
pointer events, so the bridge only initializes the surface. On any
failure initRest() runs the exact previous path (WebGL → CSS).

- `@param` host The slider whose canvas the wasm widget should claim.

### `initRest`

The classic boot tail — context-loss watch → WebGL attempt →
events + loop. Runs directly on no-WebGPU browsers and after a
wasm mount failure.

- `@param` host The slider to bring up on the classic path.

### `triggerFallback`

Switches to the non-WebGL path (CSS class on the host / Canvas2D) — used on context loss or init failure; releases any live GL first.

### `initWebGL`

Creates the WebGL context, compiles the shader program and sets up uniforms/buffers; falls back on any failure.
