[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/mosaic/layout](../README.md) / applyTileStyles

```ts
function applyTileStyles(host): void
```

Defined in: website/components/media/mosaic/layout.ts:81

Writes packed geometry into the DOM: wall height on the container and
each tile's absolute box. Post-render refreshes are no-ops when the JSX
already emitted the same inline styles (the pack is deterministic).

## Parameters

### host

[`MediaMosaic`](../../../MediaMosaic/classes/MediaMosaic.md)

The MediaMosaic element.

## Returns

`void`
