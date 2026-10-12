[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/shared](../README.md) / rgb

```ts
function rgb(hex): Rgb
```

Defined in: experiments/star-field/engine/bodies/procedural/shared.ts:40

Unpacks a packed hex color into `[r, g, b]` channel floats (0–255) —
the canvas API wants css-rgba() strings, not three hex ints.

## Parameters

### hex

`number` \| `undefined`

Packed color int (may be undefined → neutral grey fallback
matching the catalog's default body tint).

## Returns

[`Rgb`](../type-aliases/Rgb.md)

Channel triple.
