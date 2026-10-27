# `core\tokens\strings\debug.ts`

URL `debug` parameter vocabulary. `?debug=&lt;value&gt;` may appear

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\strings\debug.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `KEY`

The query-string key — `?debug=…`.

### `NOTIFICATION_TEST`

Fires a test toast notification at boot (notification pipeline check).

### `WEBGL_MODE`

`webGLMode:<mode>` forces the WebGL pipeline — `active` (default
probing) or `fallback` (every context acquisition returns null, so all
widgets render their CSS/2D fallback).

### `WEBGPU_WIDGETS`

`webgpuWidgets:<mode>` gates the WebGPU widget layer —
`active` opts in; absent/`fallback` keeps every widget on its
WebGL/CSS path. The layer mounts by default once the worker
route is verified on real hardware; until then it is opt-in.

### `WEBGL_MODES`

`webGLMode:` values.
