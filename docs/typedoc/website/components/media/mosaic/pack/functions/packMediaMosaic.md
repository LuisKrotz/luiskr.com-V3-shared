[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/mosaic/pack](../README.md) / packMediaMosaic

```ts
function packMediaMosaic(items, wallW): PackedMosaic | null
```

Defined in: website/components/media/mosaic/pack.ts:311

Full packing pass: each step evaluates every remaining tile's lowest
legal spot and places the one whose top is the global minimum — ties
resolve to the earliest in document order, so the wall reads
left-to-right like the carousel it replaces while a narrow tile can
still slip into a pocket a wider predecessor would have sealed over
(a placed footprint's whole span rises to its top, erasing any lower
pocket it covers — picking the deepest _fit_ each step is what keeps
those shelf holes from stranding as visible gaps). Footprints carry
the GAP on the right and bottom (clamped at the wall edge).

## Parameters

### items

[`MediaMosaicItem`](../../types/interfaces/MediaMosaicItem.md)[]

Media items (intrinsic sizes via item.size).

### wallW

`number`

Wall content width in px.

## Returns

[`PackedMosaic`](../interfaces/PackedMosaic.md) \| `null`

or null for empty/degenerate input.
