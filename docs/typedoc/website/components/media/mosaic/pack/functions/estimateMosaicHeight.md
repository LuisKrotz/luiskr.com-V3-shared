[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/mosaic/pack](../README.md) / estimateMosaicHeight

```ts
function estimateMosaicHeight(items, wallW): number
```

Defined in: website/components/media/mosaic/pack.ts:378

Pre-render height estimate — the packed wall height at a predicted
width (the view's section wrapper publishes it as --media-mosaic-height
so a deferred mosaic reserves its final box). 0 when unpacking.

## Parameters

### items

[`MediaMosaicItem`](../../types/interfaces/MediaMosaicItem.md)[]

Media items.

### wallW

`number`

Predicted wall width in px.

## Returns

`number`

Estimated wall height in px.
