[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/autoplay](../README.md) / regressRingToZero

```ts
function regressRingToZero(c): void;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:112

Drains ringProgress to 0 by RING_REGRESS_STEP per frame instead of
snapping — the ring visibly unwinds when autoplay stops, matching the
"paused" affordance. autoplayElapsed stays proportional so a resume
continues the cycle. Self-terminating: a resumed autoplay flag or
progress reaching 0 ends the RAF chain.

## Parameters

### c

[`CarouselAutoplayHost`](../interfaces/CarouselAutoplayHost.md)

The carousel host.

## Returns

`void`
