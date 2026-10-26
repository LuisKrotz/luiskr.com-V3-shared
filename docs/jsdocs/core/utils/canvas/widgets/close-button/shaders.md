# `core\utils\canvas\widgets\close-button\shaders.ts`

GLSL sources for CloseButtonWebGL, extracted from

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\close-button\shaders.ts`   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CLOSE_PAINT_GLSL`

GLSL helper library for the close-button look — shared between
CLOSE_BUTTON_FS (the dedicated close widget) and the burger's open
state, which morphs into this exact control and must paint it
pixel-identically (turquoise pour, foam crest, rising bubbles, inset
rim, rotating X strokes, click shockwave).

`lkClosePaint` works in "close pixels": the same pixel basis the
close widget's backing store uses (CSS box × capped DPR). Callers on
supersampled buffers divide fragcoord/res by their supersample factor
before calling so one unit here is always one close-widget pixel.

- `@param` pRel Fragment position relative to the disc center, in close px.
- `@param` minRes Shorter canvas dimension in close px — derives the disc
- `@param` hc High-contrast flag (0/1) — when set, every shade collapses to
- `@param` dark Disc-pole flag under HC (0/1): 1 = the chip disc paints at
- `@returns` vec4 — premultiplied=false rgba; alpha is the disc's borderAA

### `CLOSE_BUTTON_FS`

Liquid-fill fragment shader (see class docblock for the effect layers).
