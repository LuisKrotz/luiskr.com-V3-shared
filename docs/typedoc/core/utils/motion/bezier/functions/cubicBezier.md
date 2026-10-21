[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/bezier](../README.md) / cubicBezier

```ts
function cubicBezier(x1, y1, x2, y2): (x) => number
```

Defined in: core/utils/motion/bezier.ts:52

Builds a `cubic-bezier(x1,y1,x2,y2)` easing function. The endpoints are
pinned to (0,0) and (1,1) like the CSS function — callers keep control
points inside the unit square; out-of-range x clamps to the endpoints.

## Parameters

### x1

`number`

First control point x (0..1).

### y1

`number`

First control point y.

### x2

`number`

Second control point x (0..1).

### y2

`number`

Second control point y.

## Returns

The easing map `x ∈ [0,1] → y`.

(`x`) => `number`
