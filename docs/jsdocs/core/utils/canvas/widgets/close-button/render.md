# `core\utils\canvas\widgets\close-button\render.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\close-button\render.ts`    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `LIQUID_RATE`

Liquid fill rate — deliberately slowest so the wash pours.

### `ROT_RATE`

X-spin rate — faster so the half-turn lands near the end of the pour.

### `DRAW_RATE`

One-time stroke draw-in rate (~50 frames ≈ 830ms on mount).

### `LIQUID_FLOOR`

Sleep threshold for the liquid channel — mirrors the shader's own
`u_liquid > 0.01` gate: below it the liquid region (and every
u_time-driven wave/bubble inside it) is already invisible, so the
loop may stop without changing a single pixel.

### `CLICK_WAVE_S`

Click shockwave window in seconds — matches the shader's `clickElapsed < 0.4` gate.

### `renderStatic`

Draws one settled frame with the X fully drawn — used under reduced
motion or when the loop is stopped so the button stays visible and
hover-state still applies (without animating).

### `animate`

Starts the shared-pool render loop (skipped under reduced motion).

### `renderWasm`

Per-frame wasm render: pushes the three eased channels + one frame tick.

### `renderWebGL`

Per-frame WebGL render: updates time/hover uniforms and draws the quad.
