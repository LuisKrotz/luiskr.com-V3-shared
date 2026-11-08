[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/group](../README.md) / mediaItemHeightRatio

```ts
function mediaItemHeightRatio(item): number | null
```

Defined in: core/utils/media/group.ts:30

Height ratio (h/w) of one media item — the rendered height the media
would take at a common width, which is exactly the axis a uniform
carousel strip flattens. Null when the item carries no usable intrinsic
size (unsized rows are excluded from the spread decision rather than
guessed — a row that can't prove variation keeps the carousel).

## Parameters

### item

`MediaGroupItem` \| `null` \| `undefined`

One media descriptor.

## Returns

`number` \| `null`

h ÷ w, or null for missing/degenerate sizes.
