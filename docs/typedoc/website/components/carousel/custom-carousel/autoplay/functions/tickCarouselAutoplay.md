[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/autoplay](../README.md) / tickCarouselAutoplay

```ts
function tickCarouselAutoplay(c, timestamp): void;
```

Defined in: website/components/carousel/custom-carousel/autoplay.ts:161

Autoplay RAF tick: elapsed/duration → ringProgress 0–1 → paint →
advance when the cycle completes, then rebase the clock for the next
slide. The ring resets before goTo so the new slide starts empty.

## Parameters

### c

[`CarouselAutoplayHost`](../interfaces/CarouselAutoplayHost.md)

The carousel host.

### timestamp

`number`

RAF timestamp (ms) — the clock source for this frame.

## Returns

`void`
