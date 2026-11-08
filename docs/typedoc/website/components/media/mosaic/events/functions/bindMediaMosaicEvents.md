[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/mosaic/events](../README.md) / bindMediaMosaicEvents

```ts
function bindMediaMosaicEvents(host): void
```

Defined in: website/components/media/mosaic/events.ts:24

Binds the mosaic's runtime listeners: (1) the ≤1024px media query whose
flips re-render between the carousel and the packed wall (repack forced
on re-entry so a changed width can't reuse stale tile geometry), and
(2) a ResizeObserver on the host that repacks on real width changes —
sub-pixel reports under FIT_EPS_PX are dropped to avoid a re-fit storm.

## Parameters

### host

[`MediaMosaic`](../../../MediaMosaic/classes/MediaMosaic.md)

The MediaMosaic element.

## Returns

`void`
