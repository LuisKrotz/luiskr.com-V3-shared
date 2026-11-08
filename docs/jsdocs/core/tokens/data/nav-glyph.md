# `core\tokens\data\nav-glyph.ts`

Nav glyph motion tokens — the wasm artifact URL, the emitter

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\data\nav-glyph.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `GLUE_URL`

wasm-pack glue module URL (served from website/public).

### `KIND_STREAK`

Emitter kind — speed streaks across the search prompt.

### `KIND_SWOOSH`

Emitter kind — sparks riding the preferences brush swoosh.

### `POOL`

Particle pool capacity (rust POOL).

### `STRIDE`

Floats per particle record: x, y, alpha, size, hue (rust STRIDE).

### `FRAME_ORIGIN`

Canvas frame origin in viewBox units — the glyph's center sits here.

### `FRAME_SPAN`

Canvas frame span in viewBox units — three glyph widths.

### `STREAK_WIDTH`

Streak stroke width in viewBox units.

### `HUE_SPLIT`

Hue below this picks the first palette color, otherwise the second.

### `SLEEP_EPS`

Energy floor below which the frame loop goes back to sleep.

### `SEED`

Deterministic jitter seed for the particle pool.
