[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/webgl-mode](../README.md) / webglContextDead

```ts
function webglContextDead(canvas): boolean
```

Defined in: core/utils/canvas/webgl-mode.ts:113

Whether `canvas` holds a context binding that is lost and could NOT be
revived — the signature of a real GPU eviction. Distinct from an
intentional `loseContext()` (which `webglContext()` restores on demand,
so this probe resolves false) and from a WebGL-less device (getContext
returns null — also false, since a canvas swap would fail identically).
True means the element's binding is permanently dead and the caller
should replace the canvas rather than retry it.

## Parameters

### canvas

`HTMLCanvasElement` \| `null`

The canvas whose bound context to probe.

## Returns

`boolean`

True when the bound context is unrestorably lost.
