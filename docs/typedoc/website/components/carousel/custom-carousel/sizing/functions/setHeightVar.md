[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/sizing](../README.md) / setHeightVar

```ts
function setHeightVar(c): void
```

Defined in: website/components/carousel/custom-carousel/sizing.ts:362

Publishes --carousel-item-height on the enclosing <section> and
--carousel-media-height on the host: the aspect-corrected height
ensuring all slides share one uniform height. In mixed carousels on
mobile, the uniform height anchors to the shortest portrait item.
The published height is also capped at the smallest natural item
height — the strip may be _less_ tall than the projection, but no
slide may ever render taller than its source file's real pixels.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

## Returns

`void`
