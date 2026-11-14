[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/sizing](../README.md) / measureFit

```ts
function measureFit(c, observedWidth?): void
```

Defined in: website/components/carousel/custom-carousel/sizing.ts:76

Decides whether the items fit side-by-side (no carousel chrome) or need
the scroll track. Side-by-side requires: ≥2 items (any count), viewport
≥ SIDE_BY_SIDE_BREAKPOINT, and projected total width ≤ host width.
The projection mirrors the shadow-DOM contract in media-figure.scss +
carousel-host.scss exactly: the strip height is the same value
setHeightVar publishes to --carousel-media-height — the smallest item
rendered into hostW × 70dvh (calcMediaBox — WASM-backed, never
upscales); every slide's box is that strip height × the source's own
ratio (width: auto, no max-width cap in carousel context), floored at
min(MEDIA_MIN_WIDTH, naturalW); each item adds its breakpoint padding

- desktop side margin. Items missing intrinsic sizes use
  GENERIC_DIMENSIONS defaults (conservative portrait) so a partial CMS
  row can't silently flip to scroll mode.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

### observedWidth?

`number`

Fresh RO width when known — avoids a layout read.

## Returns

`void`
