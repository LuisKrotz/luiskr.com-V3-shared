[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/mosaic/pack](../README.md) / mosaicTileSize

```ts
function mosaicTileSize(natW, natH, wallW): object
```

Defined in: website/components/media/mosaic/pack.ts:89

The tile box for one media item inside a `wallW`-wide wall. Ladder:
÷3 for quality (display < source), ÷4 when ÷3 still overflows the wall,
fit-to-wall beyond that; then the expand-trigger floor — ÷2 or undivided
when the scaled tile would be too small for the modal-open button.
Missing intrinsic sizes fall back to the generic media box.

## Parameters

### natW

`number`

Intrinsic width (≤0 → generic fallback).

### natH

`number`

Intrinsic height (≤0 → generic fallback).

### wallW

`number`

Wall content width in px (≤0 → generic fallback).

## Returns

`object`

The rendered tile size in CSS px.

### w

```ts
w: number
```

### h

```ts
h: number
```
