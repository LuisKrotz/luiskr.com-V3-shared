[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/autoplay](../README.md) / stopCarouselAutoplay

```ts
function stopCarouselAutoplay(c, permanently?): void;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:82

Stops autoplay and drains the progress ring. `permanently` latches
_autoplayPermanentlyStopped — every user-initiated navigation
(arrow/dot/swipe/hover) passes true so the carousel never auto-plays
again on this page; visibility/modal stops pass false and may resume.

## Parameters

### c

[`CarouselAutoplayHost`](../interfaces/CarouselAutoplayHost.md)

The carousel host.

### permanently?

`boolean` = `false`

Latch user intent — no future resumes.

## Returns

`void`
