# `core\utils\media\policy.ts`

Connection- and box-aware media budgets. The progressive

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\media\policy.ts`                          |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Media spend tier for the current connection:
low — saveData or ≤2g: never autoplay video, first rung only
medium — 3g: autoplay allowed, skip the top (uncompressed) rung
full — 4g/unknown: unrestricted

### (module scope)

Minimal shape of the Network Information API — `navigator.connection`
is non-standard but shipped by every Chromium engine; absent elsewhere.

### `mediaBudget`

Reads the Network Information API when the engine exposes it —
`navigator.connection` is Chromium-only, so Firefox/Safari always
resolve 'full' and the policy degrades to the old unrestricted climb.

- `@returns` The media spend tier for this connection.

### `videoAutoplayAllowed`

Whether muted autoplay may attach sources and start playback. A low
budget treats video like reduced-motion: the poster stays painted and
no stream bytes are fetched — a 14 MB muted loop can never become the
LCP tax on a metered connection.

### `ladderCeiling`

Highest ladder index the climb may reach. Rung order is fixed
(q50 → q75 → original → uncompressed), so the ceiling counts DOWN
from the top:
low budget → first rung only (q50-grade upgrade past LQIP)
medium budget → skip the top rung (uncompressed is the MB tier)
small box (≤768px) → skip two rungs — a ≤768 CSS-px box at 3× DPR
still resolves under a full-resolution q75, so original and
uncompressed are guaranteed waste
The terms stack: a small box on a 3g link lands on q50-grade quality.

- `@param` rungCount Total rungs in the ladder (manifest-proven).
- `@param` boxWidthCssPx Rendered width of the media box in CSS px; ≤0
- `@returns` Inclusive maximum rung index the climb may publish.

### `prefersScaledVideo`

Whether the `-scaledown-2x` video tier already over-resolves the
rendered box — scaled sources are half-resolution, so when
`box × DPR ≤ source ÷ 2` the full stream is guaranteed waste. A 0
box width (first render, before layout) falls back to the viewport
width — still a safe upper bound since a figure never exceeds it.

- `@param` mediaWidth Intrinsic video width in px.
- `@param` boxWidthCssPx Rendered box width in CSS px (0 = pre-layout).
- `@returns` True when the scaled tier should be offered first.
