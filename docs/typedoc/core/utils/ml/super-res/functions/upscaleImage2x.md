[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/ml/super-res](../README.md) / upscaleImage2x

```ts
function upscaleImage2x(img, run?): Promise<ImageBitmap | null>
```

Defined in: core/utils/ml/super-res.ts:55

Runs the 2× super-resolution model over a confirmed-but-low-quality
source. Pixel flow: scratch canvas → RGBA readback → NCHW float32
(0–1) → ORT inference → ImageData at 2× → ImageBitmap ready for
`gpuAccel.processBitmapGPU`. Resolves null on every failure arm —
missing canvas/2d, oversized input, no runtime, bad output length —
so the caller's confirmed rung is never at risk.

## Parameters

### img

`Drawable` \| `null`

The best confirmed source element.

### run?

`RunModel` = `runMlModel`

Injectable model runner — defaults to the ORT engine.

## Returns

`Promise`\<`ImageBitmap` \| `null`\>

The 2× bitmap, or null when enhancement isn't possible.
