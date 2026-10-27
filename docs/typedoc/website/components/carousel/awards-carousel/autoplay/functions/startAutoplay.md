[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/awards-carousel/autoplay](../README.md) / startAutoplay

```ts
function startAutoplay(host): void
```

Defined in: website/components/carousel/awards-carousel/autoplay.ts:23

Starts the auto-advance ticker. Bails (and actively stops any running
cycle) under reduced-motion, before ≥50% visibility, or while a
page-covering overlay (expand modal, nav menu, preferences or
language dialog) owns the frame — autoplay must never run on an
unseen, covered, or motion-sensitive carousel.
Re-bases the clock on each start so a fresh cycle always gets a full dwell.

## Parameters

### host

[`AwardsCarousel`](../../../AwardsCarousel/classes/AwardsCarousel.md)

The AwardsCarousel element.

## Returns

`void`
