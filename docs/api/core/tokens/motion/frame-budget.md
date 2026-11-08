# `core\tokens\motion\frame-budget.ts`

Animation frame-budget constants — the per-frame work

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\frame-budget.ts`                  |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MOBILE_MS`

Mobile floor — 120Hz ⇒ ~8.33ms per frame.

### `DESKTOP_MS`

Desktop floor — 240Hz ⇒ ~4.17ms per frame.

### `MOBILE_HZ`

Mobile refresh floor the animation gate enforces, in Hz.

### `DESKTOP_HZ`

Desktop refresh floor the animation gate enforces, in Hz.

### `HEAVY_ROUTE_HZ`

Media-heavy route floor — project pages dense with carousels and
media figures cannot sustain the native-refresh bound under
full-viewport raster pressure; the fluid-display minimum (60Hz) is
the honest gate there — anything below it is a real regression.
