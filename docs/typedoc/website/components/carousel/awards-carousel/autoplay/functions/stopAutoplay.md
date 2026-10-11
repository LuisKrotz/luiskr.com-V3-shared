[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/awards-carousel/autoplay](../README.md) / stopAutoplay

```ts
function stopAutoplay(host): void;
```

Defined in: website/components/carousel/awards-carousel/autoplay.ts:43

Stops auto-advance (hover, reduced-motion, offscreen). Cancels the
pending RAF so no stray tick survives, then emits `autoplaystop` for
progress-bar listeners.

## Parameters

### host

[`AwardsCarousel`](../../../AwardsCarousel/classes/AwardsCarousel.md)

The AwardsCarousel element.

## Returns

`void`
