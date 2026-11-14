[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/layout/masonry](../README.md) / INTERNAL\_MOSAIC

```ts
const INTERNAL_MOSAIC: Readonly<{
  RATIO_SPREAD_MIN: 2
  TALL_ITEM_H: 2560
  DIVISOR_DEFAULT: 3
  DIVISOR_WIDE: 4
  DIVISOR_SMALL: 2
  EXTREME_WIDE_RATIO: 4
  AREA_SPREAD_MIN: 3
  MAJORITY_RATIO_EPS: 1.05
  MIN_TILE_W: 144
  MIN_TILE_H: 89
  CAROUSEL_MAX_W: 1024
  FILL_MIN_W: 24
  FILL_MIN_H: 64
  FILL_GROW_MAX: 1.5
}>
```

Defined in: core/tokens/layout/masonry.ts:28

Internals media-mosaic constants — the natural-size masonry wall that
replaces a carousel when a project section mixes wildly different media
heights. Sole declaration site — consumers import members rather than
re-declaring the literals (zero-hardcoding rule).
