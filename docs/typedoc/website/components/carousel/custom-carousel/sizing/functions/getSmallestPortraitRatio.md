[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/sizing](../README.md) / getSmallestPortraitRatio

```ts
function getSmallestPortraitRatio(items): number | null
```

Defined in: website/components/carousel/custom-carousel/sizing.ts:318

Calculates the smallest portrait aspect ratio (height / width) among portrait items.
Used in mixed carousels to anchor the uniform carousel height on mobile to the
shortest portrait item.

## Parameters

### items

[`CarouselItem`](../../render/interfaces/CarouselItem.md)[]

List of slide descriptors.

## Returns

`number` \| `null`

Smallest portrait height-to-width ratio, or null if no portrait items with sizes.
