[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/arrows](../README.md) / destroyWebGLArrows

```ts
function destroyWebGLArrows(c): void;
```

Defined in: website/components/carousel/custom-carousel/arrows.ts:147

Destroys both arrow widgets — called on viewport exit (contexts are
released offscreen to keep the pool small) and on destroy. Nulling the
refs lets the next mount rebuild fresh.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

## Returns

`void`
