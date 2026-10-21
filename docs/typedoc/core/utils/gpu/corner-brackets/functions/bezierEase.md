[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/corner-brackets](../README.md) / bezierEase

```ts
function bezierEase(p, x1, y1, x2, y2): number
```

Defined in: core/utils/gpu/corner-brackets.ts:99

`bezierEase` — evaluate cubic-bezier(x1,y1,x2,y2) at progress `p`.
CSS resolves y at the parameter t where x(t)=p — Newton's method on
the x polynomial, four iterations like the WGSL `bez` (the two must
agree pixel-for-pixel or the GPU arm grows on a different clock than
the CSS one it replaces).

## Parameters

### p

`number`

Linear progress 0..1.

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

Control-point coordinates.

## Returns

`number`

Eased progress 0..1.
