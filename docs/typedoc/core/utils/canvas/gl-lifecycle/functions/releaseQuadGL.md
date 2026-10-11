[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/gl-lifecycle](../README.md) / releaseQuadGL

```ts
function releaseQuadGL(
   canvas, 
   host, 
   onLost?
): void;
```

Defined in: core/utils/canvas/gl-lifecycle.ts:47

Frees the quad program + buffer and force-loses the context. The
`onLost` listener (from watchContextLoss) is detached first so the
asynchronous loss event cannot fire the widget's fallback (or mark
the canvas) during a deliberate teardown — and without preventDefault
no zombie context is ever restored.

## Parameters

### canvas

`HTMLCanvasElement` \| `null`

### host

[`QuadGLResources`](../interfaces/QuadGLResources.md)

### onLost?

`EventListener` \| `null`

## Returns

`void`
