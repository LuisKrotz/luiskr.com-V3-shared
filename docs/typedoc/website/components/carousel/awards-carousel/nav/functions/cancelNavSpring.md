[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/awards-carousel/nav](../README.md) / cancelNavSpring

```ts
function cancelNavSpring(host): void
```

Defined in: website/components/carousel/awards-carousel/nav.ts:61

Gesture takeover — cancels a live scroll spring, drops the pending
teleport, releases isNavigating. Mandatory snap re-engages from the
lifted animating class so the user's own scroll owns the track.

## Parameters

### host

[`AwardsCarousel`](../../../AwardsCarousel/classes/AwardsCarousel.md)

The AwardsCarousel element.

## Returns

`void`
