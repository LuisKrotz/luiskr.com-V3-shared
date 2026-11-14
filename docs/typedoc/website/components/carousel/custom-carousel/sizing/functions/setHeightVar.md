[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/sizing](../README.md) / setHeightVar

```ts
function setHeightVar(c): void
```

Defined in: website/components/carousel/custom-carousel/sizing.ts:423

Publishes --carousel-item-height on the enclosing <section> and
--carousel-media-height on the host: the aspect-corrected height
ensuring all slides share one uniform height. The uniform height is
the SMALLEST rendered item — the min height each sized source reaches
when fit to the strip width and the viewport cap — so siblings shrink
to it and no source upscales. The only upscale the contract allows is
the floor correction: when a source is natively narrower than
MEDIA_MIN_WIDTH, the strip lifts just enough for that smallest-width
slide to reach the floor (equal heights wins). Sources taller than
TALL_ITEM_H keep their own sliver/floor rule and stay out of the
width driver. Every slide's box is the strip height ×
its own aspect (the media-figure sheet drops the natural-size caps in
carousel context), so the media fills with zero crop and zero
distortion. In mixed carousels on mobile, the uniform height anchors
to the shortest portrait item.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

## Returns

`void`
