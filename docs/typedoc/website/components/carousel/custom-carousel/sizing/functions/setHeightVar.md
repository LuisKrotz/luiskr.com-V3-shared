[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/sizing](../README.md) / setHeightVar

```ts
function setHeightVar(c): void
```

Defined in: website/components/carousel/custom-carousel/sizing.ts:356

Publishes --carousel-item-height on the enclosing <section> and
--carousel-media-height on the host: the aspect-corrected height
ensuring all slides share one uniform height. The uniform height is
the TALLEST rendered item — the max height each sized source reaches
when fit to the strip width and the viewport cap. Every slide's box is
the strip height × its own aspect (the media-figure sheet drops the
natural-size caps in carousel context), so the media fills with zero
crop and zero distortion; a short source covers the taller box.
In mixed carousels on mobile, the uniform height anchors to the
shortest portrait item.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

## Returns

`void`
