[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie-gpu](../README.md) / mountGenieGpu

```ts
function mountGenieGpu(canvas, el, from, to, opening, sheet?): Promise<GenieRenderer | null>
```

Defined in: website/components/media/expanded/genie-gpu.ts:158

Attempts the WebGPU/Rust genie backend on the overlay canvas.
MANUAL drive — the genie driver's own eased clock owns `frame(dt)`
pacing so both backends render identical progress sequences.

## Parameters

### canvas

`HTMLCanvasElement`

The overlay canvas (device-px sized by the driver).

### el

[`MediaExpanded`](../../../MediaExpanded/classes/MediaExpanded.md)

The <media-expanded> element — media source/dimensions.

### from

[`GenieRect`](../../genie/interfaces/GenieRect.md)

Origin rect, viewport CSS px.

### to

[`GenieRect`](../../genie/interfaces/GenieRect.md)

Destination rect, viewport CSS px.

### opening

`boolean`

True on open, false on the collapse.

### sheet?

[`GenieSheet`](../../genie-texture/interfaces/GenieSheet.md) \| `null`

The composited modal sheet — uploaded as the warp
texture when present (the media-file decode stands in otherwise).

## Returns

`Promise`\<[`GenieRenderer`](../../genie/interfaces/GenieRenderer.md) \| `null`\>

The renderer wrapping the widget handle, or null on any
capability/artifact/init failure (the driver falls back to 2D).
