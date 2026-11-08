# `core\tokens\motion\expand.ts`

Constants for the px-space expansion spring —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\expand.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `K`

Spring stiffness — ωn² in px-space.

### `C`

Spring damping — 2ζωn with ζ≈1.0 (critically damped, no bounce).

### `SETTLE_PX`

Settle epsilon (px) — gap under this with velocity under VEL_EPS
snaps to the target so the spring never micro-rings sub-pixel.

### `VEL_EPS`

Velocity settle epsilon (px/s) — see SETTLE_PX.

### `DT_MAX_S`

Per-frame integration step cap (s) — suspended-tab resume safety.

### `DT_INIT_S`

First-frame step (s) — the loop's initial tick assumes 60Hz.

### `MAX_MS`

Watchdog (ms) — force-settles the expansion when rAF starves
(hidden tab) so the caller's settle callback can never latch.

### `MIN_TRAVEL_PX`

Travel floor (px) — sub-2px changes write instantly, no frames burnt.
