[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/nav](../README.md) / cancelNavSpring

```ts
function cancelNavSpring(c): void
```

Defined in: website/components/carousel/custom-carousel/nav.ts:71

Gesture takeover — cancels a live scroll spring (track keeps its
position and mandatory snap re-engages for the user's own scroll),
drops the pending teleport, and releases isNavigating so the
scroll-handler clone check re-arms immediately.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

## Returns

`void`
