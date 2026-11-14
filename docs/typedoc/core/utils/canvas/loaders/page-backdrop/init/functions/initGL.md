[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/page-backdrop/init](../README.md) / initGL

```ts
function initGL(host): void
```

Defined in: core/utils/canvas/loaders/page-backdrop/init.ts:27

Creates the WebGL context + lobe-field program and resolves its
uniforms; any failure (no canvas, context refused, shader/link error,
throw) routes to `_triggerFallback` so the CSS lobes stay authoritative.

## Parameters

### host

[`PageBackdropWebGL`](../../../page-backdrop-webgl/classes/PageBackdropWebGL.md)

the backdrop instance to initialise

## Returns

`void`
