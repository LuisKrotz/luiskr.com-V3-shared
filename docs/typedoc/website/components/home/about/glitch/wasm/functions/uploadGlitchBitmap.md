[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/about/glitch/wasm](../README.md) / uploadGlitchBitmap

```ts
function uploadGlitchBitmap(s): void
```

Defined in: website/components/home/about/glitch/wasm.ts:46

Decodes the live portrait URL and uploads the bitmap to the widget —
routed through `decodeImageWASM` so decode happens in the worker pool
with GPU resize hints sized to the canvas's device-px box. Re-called
on srcset drift (the browser swaps density candidates under a live
session). A null bitmap or rejected upload kills the wasm arm and
claims the 2D backend instead.

## Parameters

### s

[`GlitchSession`](../../types/interfaces/GlitchSession.md)

Live session with a mounted widget.

## Returns

`void`
