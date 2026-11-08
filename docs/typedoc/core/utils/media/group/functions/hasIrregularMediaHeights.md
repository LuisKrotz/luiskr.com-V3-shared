[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/group](../README.md) / hasIrregularMediaHeights

```ts
function hasIrregularMediaHeights(items): boolean
```

Defined in: core/utils/media/group.ts:67

Irregular-heights detector: reports "mosaic" on the spread signal —
(a) any sized item whose natural height exceeds TALL_ITEM_H disqualifies
the whole group (a >2560px source never renders in the natural-height
wall — the group stays on the capped carousel strip), or (b) a
max/min h/w spread of
INTERNAL_MOSAIC.RATIO_SPREAD_MIN across the group's sized items — e.g.
half 16:9 + half 9:16 (≈3.16×), or very-wide shots next to squares
(≈2.3×), or (c) a max/min natural pixel-area spread of
INTERNAL_MOSAIC.AREA_SPREAD_MIN — same-aspect sources at very different
resolutions (997×720 beside 1980×1108 ≈3.06×) that a uniform strip
would flatten. Unsized items are skipped; spread needs two sized items to
prove variation while the tall-item signal stands alone.

## Parameters

### items

`unknown`

A media item array (shape-checked, not trusted).

## Returns

`boolean`

true when the group should render as the masonry wall.
