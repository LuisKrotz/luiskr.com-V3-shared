[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/layout](../README.md) / isMosaicGroup

```ts
function isMosaicGroup(c, group): boolean
```

Defined in: website/views/project/layout.ts:128

Whether a media group renders as the natural-size masonry wall instead
of a carousel — the irregular-heights detector (shared predicate in
core/utils/media/group) decides purely from intrinsic `size` ratios:
mixes like half 16:9 + half 9:16, or very-wide shots beside squares,
spread past the RATIO_SPREAD_MIN gate. On ≤CAROUSEL_MAX_W viewports the
mosaic element itself falls back to the carousel, so this is a
data-only check.

## Parameters

### c

[`ViewProject`](../../Project/classes/ViewProject.md)

The ViewProject instance (unused — facade signature).

### group

`unknown`

A media item array (shape-checked by the predicate).

## Returns

`boolean`

true when the group's height variation is too irregular for a
uniform carousel strip.
