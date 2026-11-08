# `core\tokens\motion\marquee.ts`

Marquee motion tokens — the internals project-title ticker:

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\marquee.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `COPIES`

Identical halves inside the strip — two is the minimum for a
seamless translateX(-50%) loop; each half repeats the title enough
times to span the viewport so the seam never shows.

### `MIN_REPEAT`

Pre-measure title repetitions per half — the render default before
the JS pass derives ceil(viewportW ÷ unitW) + SAFETY_REPEAT.

### `SAFETY_REPEAT`

Extra repetitions past the exact viewport fill — absorbs font-swap
width drift and sub-pixel rounding so a gap never opens at the edge.

### `SPEED_PX_S`

Drift speed in px/s — slow enough to read as a living title, fast
enough to notice the motion (≈ one viewport every ~16s at 1440px).

### `FALLBACK_S`

Pre-measure animation duration (s) — the CSS fallback while the
JS pass that derives duration = copyW ÷ SPEED_PX_S is pending.
