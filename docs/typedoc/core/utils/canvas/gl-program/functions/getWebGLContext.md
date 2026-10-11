[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/gl-program](../README.md) / getWebGLContext

```ts
function getWebGLContext(canvas, attrs?): WebGLRenderingContext | null;
```

Defined in: core/utils/canvas/gl-program.ts:20

Probes the canvas for a WebGL context — prefers `webgl`, falls back to
`experimental-webgl`. Returns null when the browser has no GL support or
when `?debug=webGLMode:fallback` forces the CSS/2D surface (callers then
take their fallback path).

## Parameters

### canvas

`HTMLCanvasElement`

### attrs?

`WebGLContextAttributes`

## Returns

`WebGLRenderingContext` \| `null`
