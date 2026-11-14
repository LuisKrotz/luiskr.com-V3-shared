# `core\tokens\classes\state.ts`

Global state modifier class tokens — grouped subset of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\state.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `STATE_CLASSES`

Frozen state class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `IS_SCROLLING`

Document-level live-scroll marker — set by utils/motion/scroll-state
on the first scroll event of a gesture, removed when the settle
debounce expires (scrollend only re-arms it — atomic programmatic
scrolls emit scroll+scrollend in one task, so an immediate settle
would flicker the marker mid-gesture).
Surfaces whose idle animations can't composite (the masked tile
border-sheens) pause on `html.is-scrolling` so a gesture never pays
their per-frame raster.

### `HAS_GL_BACKDROP`

Document-level marker — the WebGL page backdrop is live, so the CSS
glow/grain layers pin to `none` instead of double-painting under it.

### `JS`

Document-level JS-capability marker — set by the head inline script.

### `NO_JS`

Document-level no-JS marker shipped in index.html until JS flips it.

### `INTRO_SKIP`

Document-level intro-skip marker — the head script stamps it when the
boot intro already ran this session or reduced-motion disables it, so
the statically-emitted loader markup never paints.
