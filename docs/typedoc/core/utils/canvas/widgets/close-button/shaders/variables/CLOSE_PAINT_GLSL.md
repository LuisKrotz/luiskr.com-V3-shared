[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/widgets/close-button/shaders](../README.md) / CLOSE\_PAINT\_GLSL

```ts
const CLOSE_PAINT_GLSL: string
```

Defined in: core/utils/canvas/widgets/close-button/shaders.ts:41

GLSL helper library for the close-button look — shared between
CLOSE_BUTTON_FS (the dedicated close widget) and the burger's open
state, which morphs into this exact control and must paint it
pixel-identically (turquoise pour, foam crest, rising bubbles, inset
rim, rotating X strokes, click shockwave).

`lkClosePaint` works in "close pixels": the same pixel basis the
close widget's backing store uses (CSS box × capped DPR). Callers on
supersampled buffers divide fragcoord/res by their supersample factor
before calling so one unit here is always one close-widget pixel.

## Param

**pRel**

Fragment position relative to the disc center, in close px.

## Param

**minRes**

Shorter canvas dimension in close px — derives the disc
radius (`minRes/2 - 1`) exactly like the standalone close shader.

## Param

**hc**

High-contrast flag (0/1) — when set, every shade collapses to
the two poles so the control survives `--border-color` going pitch
black / pure white.

## Param

**dark**

Disc-pole flag under HC (0/1): 1 = the chip disc paints at
the DARK pole (black disc, white ink), 0 = white disc, black ink.
Ignored when `hc` is 0.

## Returns

vec4 — premultiplied=false rgba; alpha is the disc's borderAA
mask (0 outside the disc edge — no discard inside, so callers can
composite other layers around the disc).
