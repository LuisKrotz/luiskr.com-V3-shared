[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/gl-strip](../README.md) / mountDocsGlStrip

```ts
function mountDocsGlStrip(canvas, host): DocsGlHandle | null;
```

Defined in: experiments/docs/gl-strip.ts:52

Mounts the animated strip on `canvas`.

## Parameters

### canvas

`HTMLCanvasElement`

Target canvas (already sized by CSS; backing store syncs
  to devicePixelRatio each resize).

### host

`HTMLElement`

Element receiving the `docs-gl-fallback` class on loss.

## Returns

[`DocsGlHandle`](../interfaces/DocsGlHandle.md) \| `null`

Handle with destroy(), or null when WebGL is unavailable.
