[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/nav](../README.md) / scrollToSlide

```ts
function scrollToSlide(c, idx): void;
```

Defined in: website/components/carousel/custom-carousel/nav.ts:205

Smooth-centers real-slide idx — `children[idx + 1]` because a clone of
the last slide is prepended to the track (index 0 is the clone).

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

### idx

`number`

Real-slide index.

## Returns

`void`
