[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/autoplay](../README.md) / startCarouselAutoplay

```ts
function startCarouselAutoplay(c): void;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:58

Starts the autoplay RAF loop unless latched off or already running.
`autoplayStart` is backdated by `autoplayElapsed` so a pause→resume
continues the cycle mid-dwell — the ring picks up where it drained to
instead of restarting the countdown.

## Parameters

### c

[`CarouselAutoplayHost`](../interfaces/CarouselAutoplayHost.md)

The carousel host.

## Returns

`void`
