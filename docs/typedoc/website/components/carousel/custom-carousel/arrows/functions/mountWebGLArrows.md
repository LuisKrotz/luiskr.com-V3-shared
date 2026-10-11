[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/arrows](../README.md) / mountWebGLArrows

```ts
function mountWebGLArrows(c): void;
```

Defined in: website/components/carousel/custom-carousel/arrows.ts:105

Mounts the CarouselArrowWebGL widgets on the prev/next button canvases.
Idempotent per canvas: a live widget whose canvas was replaced by a
re-render is destroyed first (a canvas can't host two GL contexts), and
a widget on the same canvas is left alone — GL contexts are never
churned by renders.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

## Returns

`void`
