[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie-texture](../README.md) / buildGenieSheet

```ts
function buildGenieSheet(content, dpr): GenieSheet | null
```

Defined in: website/components/media/expanded/genie-texture.ts:223

Bakes the bounded modal card into an offscreen canvas — the sheet
the genie funnel warps. The extent is the media-figure rect (the
"window" — reference-faithful): its opaque frame, rounded clip,
placeholder and media item, all figure-local. The fullscreen glass
veil and viewport chrome stay out of the texture and fade under
`.expand-modal-genie-veil` while the funnel flies. One layout pass
(batched rect + style reads), one canvas, ~a dozen draw calls; the
result is a stable texture so the per-frame work stays a pure strip
resample. The texture long edge caps at GENIE_WARP.TEX_MAX_PX —
enough sharpness for a 700ms warp without an unbounded framebuffer.

## Parameters

### content

`HTMLElement`

The modal content root (the figure lives inside it).

### dpr

`number`

The overlay's device-pixel cap (already clamped).

## Returns

[`GenieSheet`](../interfaces/GenieSheet.md) \| `null`

The sheet record, or null when the card has no box or the
canvas refuses a 2D context (the warp then ghosts).
