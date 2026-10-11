[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/nav](../README.md) / jumpToSlide

```ts
function jumpToSlide(
   c, 
   idx, 
   smooth?
): void;
```

Defined in: website/components/carousel/custom-carousel/nav.ts:228

Instant (default) or smooth position jump to slide idx — used for the
clone teleports and resize refits. When layout hasn't produced
measurable widths yet (display:none parent, pre-paint) it retries one
frame later rather than computing a bogus 0-offset jump.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

### idx

`number`

Real-slide index.

### smooth?

`boolean` = `false`

Smooth scroll when true (default: instant).

## Returns

`void`
