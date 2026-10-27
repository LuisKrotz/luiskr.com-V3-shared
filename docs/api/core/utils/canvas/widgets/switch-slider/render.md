# `core\utils\canvas\widgets\switch-slider\render.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\switch-slider\render.ts`   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `renderStatic`

Snap state to target and draw a single settled frame — used under
reduced motion or when the loop is stopped, so toggles still visibly
update without animating.

### `animate`

Starts the requestAnimationFrame render loop (skipped under reduced motion).

### `renderWasm`

Per-frame wasm render: pushes spring/context state + one frame tick.

### `renderWebGL`

Per-frame WebGL render: updates time/knob uniforms and draws the quad.

### `renderCanvas2D`

Per-frame Canvas2D fallback render — same visual language as the shader.
