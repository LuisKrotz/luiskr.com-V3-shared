[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/lifecycle](../README.md) / onStoreUpdate

```ts
function onStoreUpdate(host): void
```

Defined in: website/components/carousel/custom-carousel/lifecycle.ts:54

Store change → propagate reduced-motion to both arrows and gate
autoplay on reduced-motion / any open overlay (expand modal, nav
menu, preferences or language dialog). The resume arm requires BOTH
`isActive` (carousel mode, not side-by-side) and `isFullyVisible` —
an overlay closing must not revive a carousel that's offscreen.

## Parameters

### host

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

## Returns

`void`
