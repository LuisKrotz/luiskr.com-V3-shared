[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-layout](../README.md) / calcMediaScale

```ts
function calcMediaScale(naturalW, naturalH, boundW, boundH): number
```

Defined in: core/utils/wasm/wasm-layout.ts:300

Contain-fit scale for media inside a bounding box, clamped to 1:
min(boundW/naturalW, boundH/naturalH, 1) — the media may shrink to fit
both bounds but is never upscaled past its natural pixel size. This is
the hard guarantee behind the natural-dimension cap: multiplying the
natural dims by the returned scale yields a box that can never exceed
the source file's real pixels, so object-fit: cover inside that box
renders at ≤100% of the source and physically cannot upscale it.
Non-positive inputs yield 0 (callers treat it as "no constraint").

## Parameters

### naturalW

`number`

Source file width in px.

### naturalH

`number`

Source file height in px.

### boundW

`number`

Layout width bound in px.

### boundH

`number`

Layout height bound in px.

## Returns

`number`

Scale factor in [0, 1].
