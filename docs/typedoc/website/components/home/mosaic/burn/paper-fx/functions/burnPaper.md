[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/paper-fx](../README.md) / burnPaper

```ts
function burnPaper(s, stage, jagAmp): void
```

Defined in: website/components/home/mosaic/burn/paper-fx.ts:41

Rebuilds the burning title inside the work canvas for this frame.

Layers, per letter (paper-space coords, i.e. 0..paperW / 0..paperH):

1.  `paper` — the pristine glyph raster.
2.  Scorch — a `source-atop` band painted only over the letter's own
    span just above its live front; `source-atop` composites onto ink
    pixels only, so the glyph visibly chars dark before it erodes and
    the gaps between letters stay untouched.
3.  Ember glow — a soft `lighter` wash hugging the front, ink-clipped
    the same way: the glyph's still-alive lower edge smoulders.
4.  Consume — a `destination-out` polygon below each letter's jagged
    front erases the raster bottom-up at that letter's own pace.

The composite then blits to the display canvas — the DOM ink is long
hidden, so what the user reads IS this raster burning through itself.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — paints into s.workCtx.

### stage

`number`

Global burn stage 0..1 (1 − prog on rebuild).

### jagAmp

`number`

Jagged-edge amplitude in device px.

## Returns

`void`
