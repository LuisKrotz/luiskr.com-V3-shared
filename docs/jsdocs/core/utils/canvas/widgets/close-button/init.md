# `core\utils\canvas\widgets\close-button\init.ts`

| | |
|---|---|
| **Source** | `src/core\utils\canvas\widgets\close-button\init.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `FALLBACK_SIZE`

Design dimension of the expand-modal close button (px).

### `MIN_MEASURED`

Min measured size before a rect counts as "laid out".

### `RESIZE_EPS`

Width deltas below this are sub-pixel noise — skip the re-size.

### `cappedDpr`

Backing-store DPR cap — the shader's AA bands need ≤2×, not more.

### `applyBackingStore`

Applies the DPR-scaled backing-store size for the current CSS size.

### `observeResize`

Re-measures + re-sizes the backing store when the host box changes.

### `onContextLost`

Context-loss → CSS ::before/::after X strokes on the parent button.

### `init`

Boot sequence: GL init → event binding → render start; fully degrades to the fallback path.

### `tryWasm`

Attempts the WebGPU wasm close button (~48KB artifact, own
GPUDevice). MANUAL drive: this class keeps its own eased-channel
loop, so the bridge only initializes the surface. On any failure
initRest() runs the exact previous path (WebGL → CSS X).
- `@param` host The button whose canvas the wasm widget should claim.

### `initRest`

The classic boot tail — context-loss watch → WebGL attempt → CSS-X
fallback → events + loop. Runs directly on no-WebGPU browsers and
after a wasm mount failure.
- `@param` host The button to bring up on the classic path.

### `initWebGL`

Creates the WebGL context, compiles the shader program and sets up uniforms/buffers; falls back on any failure.
