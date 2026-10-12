[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/shared](../README.md) / blob

```ts
function blob(ctx, w, h, x, y, r, inner, outer): void
```

Defined in: experiments/star-field/engine/bodies/procedural/shared.ts:103

Soft radial blob fill — the shared paint primitive: mottle patches,
craters, gas lobes and flare knots are all radial gradients punched
into the canvas at a point.

## Parameters

### ctx

`CanvasRenderingContext2D`

2d context.

### w

`number`

### h

`number`

### x

`number`

Center x.

### y

`number`

Center y.

### r

`number`

Blob radius px.

### inner

`string`

Inner-stop css color.

### outer

`string`

Outer-stop css color (usually alpha 0).

## Returns

`void`
