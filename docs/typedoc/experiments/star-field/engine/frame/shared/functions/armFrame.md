[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/shared](../README.md) / armFrame

```ts
function armFrame(V, C?): void
```

Defined in: experiments/star-field/engine/frame/shared.ts:46

Stores the real Vector3 (+ optional Color) constructors — bootstrap
calls this after the lazy three import so the frame modules never
import three itself. The Color pair pre-builds the glaciation tint
ramp so the per-frame cycle lerps without allocating.

## Parameters

### V

[`Vec3Ctor`](../type-aliases/Vec3Ctor.md)

The three.js Vector3 class.

### C?

[`ColorCtor`](../type-aliases/ColorCtor.md)

The three.js Color class (optional — tests may omit it).

## Returns

`void`
