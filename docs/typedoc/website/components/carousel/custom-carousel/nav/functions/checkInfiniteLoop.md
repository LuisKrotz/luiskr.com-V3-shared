[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/nav](../README.md) / checkInfiniteLoop

```ts
function checkInfiniteLoop(c): void;
```

Defined in: website/components/carousel/custom-carousel/nav.ts:273

Clone-teleport check — runs after the scroll debounce: when a clone is
parked at the track's center, instant-jump to its real twin and re-sync
active classes. This is the *user-driven* wrap path (touch/wheel scroll
past an edge) — the programmatic path goes through carouselGoTo.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

## Returns

`void`
