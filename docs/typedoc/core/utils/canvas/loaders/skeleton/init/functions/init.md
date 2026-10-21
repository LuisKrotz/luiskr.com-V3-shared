[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/skeleton/init](../README.md) / init

```ts
function init(host): void
```

Defined in: core/utils/canvas/loaders/skeleton/init.ts:98

Boot: builds the overlay canvas, prefers the wasm artifact (the FIRST-loading crate — this is the loading placeholder itself), falls back to the shared 2D renderer, then the CSS shimmer.

## Parameters

### host

[`SkeletonWebGL`](../../../skeleton-webgl/classes/SkeletonWebGL.md)

## Returns

`void`
