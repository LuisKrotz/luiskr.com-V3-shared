[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/frame](../README.md) / armFrame

```ts
function armFrame(V, C?): void;
```

Defined in: experiments/star-field/engine/frame.ts:42

Stores the real Vector3 (+ optional Color) constructors — bootstrap
calls this after the lazy three import so frame.ts never imports three
itself. The Color pair pre-builds the glaciation tint ramp so the
per-frame cycle lerps without allocating.

## Parameters

### V

() => `object`

The three.js Vector3 class.

### C?

(`hex?`) => `object`

The three.js Color class (optional — tests may omit it).

## Returns

`void`
