# `core/tokens/classes/gpu.ts`

WebGPU overlay class tokens — the dual-layer render canvas

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/classes/gpu.ts`                          |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `GPU_OVERLAY_CLASSES`

Frozen gpu-overlay class-name map — sole declaration site for these
tokens; consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.

### `GPU_OVERLAY`

Full-screen WebGPU canvas — painted layer of the dual-layer split.

### `GPU_OVERLAY_ACTIVE`

Present while the wasm module is live — gates pointer routing.
