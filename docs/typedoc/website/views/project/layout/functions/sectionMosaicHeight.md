[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/layout](../README.md) / sectionMosaicHeight

```ts
function sectionMosaicHeight(c, section): string
```

Defined in: website/views/project/layout.ts:143

Pre-pack height reservation for a section's mosaic wall — runs the same
skyline packer the component uses at the predicted wall width (viewport
minus both grid gutters, the %MAXAREA contract) so the wrapper's
--media-mosaic-height min-height equals the final box and deferred
mosaics land without a layout shift. '' for non-mosaic sections —
an empty inline value removes the custom property entirely.

## Parameters

### c

[`ViewProject`](../../Project/classes/ViewProject.md)

The ViewProject instance (unused — facade signature).

### section

[`SectionChild`](../../types/type-aliases/SectionChild.md)[]

One section's children; the media array is detected by shape.

## Returns

`string`

'Npx' estimate, or '' when the section keeps the carousel.
