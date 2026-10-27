[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/policy](../README.md) / prefersScaledVideo

```ts
function prefersScaledVideo(mediaWidth, boxWidthCssPx): boolean
```

Defined in: core/utils/media/policy.ts:126

Whether the `-scaledown-2x` video tier already over-resolves the
rendered box — scaled sources are half-resolution, so when
`box × DPR ≤ source ÷ 2` the full stream is guaranteed waste. A 0
box width (first render, before layout) falls back to the viewport
width — still a safe upper bound since a figure never exceeds it.

## Parameters

### mediaWidth

`number`

Intrinsic video width in px.

### boxWidthCssPx

`number`

Rendered box width in CSS px (0 = pre-layout).

## Returns

`boolean`

True when the scaled tier should be offered first.
