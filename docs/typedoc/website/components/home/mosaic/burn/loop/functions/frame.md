[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/loop](../README.md) / frame

```ts
function frame(s): void
```

Defined in: website/components/home/mosaic/burn/loop.ts:45

One combustion frame: rebuild the burned paper (char → glow → consume,
per letter), blit it, spawn + draw particles. When every letter's front
has passed its ink top the title is ash; the loop idles until the last
particle dies. Reversed sessions (dir −1) count progress down — the
stage climbs bottom→top again, re-inking each letter base-to-cap
while deposit particles rain onto the moving edge until the raster
is whole again and the DOM takes the pixels back.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — self-reschedules on requestAnimationFrame.

## Returns

`void`
