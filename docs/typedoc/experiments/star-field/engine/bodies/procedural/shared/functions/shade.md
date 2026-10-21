[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/shared](../README.md) / shade

```ts
function shade(c, k): Rgb
```

Defined in: experiments/star-field/engine/bodies/procedural/shared.ts:64

Scales a channel triple toward white (`k > 0`) or black (`k < 0`) —
crater rims, band highlights and corona streamers all derive from the
body's own palette instead of carrying their own literals.

## Parameters

### c

[`Rgb`](../type-aliases/Rgb.md)

Base channel triple.

### k

`number`

Shift −1..1.

## Returns

[`Rgb`](../type-aliases/Rgb.md)

Shifted triple.
