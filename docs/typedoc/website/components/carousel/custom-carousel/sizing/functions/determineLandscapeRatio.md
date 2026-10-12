[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/sizing](../README.md) / determineLandscapeRatio

```ts
function determineLandscapeRatio(items): string | null
```

Defined in: website/components/carousel/custom-carousel/sizing.ts:244

Calculates the majority landscape aspect ratio key ('16:9' | '21:9' | '32:9') among the
landscape items in the list. Compares each item's width/height ratio against the 16:9,
21:9, and 32:9 target ratios and selects the mode (majority proportion).

## Parameters

### items

[`CarouselItem`](../../render/interfaces/CarouselItem.md)[]

List of slide descriptors.

## Returns

`string` \| `null`

The majority aspect ratio key ('16:9', '21:9', '32:9'), or null if no landscape items.
