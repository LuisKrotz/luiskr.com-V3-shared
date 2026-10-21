[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/expanded/genie-texture](../README.md) / fitContain

```ts
function fitContain(sw, sh, box, out): void
```

Defined in: website/components/media/expanded/genie-texture.ts:106

Contain-fits a source into a box — mirrors the media item's
`object-fit: scale-down` so the baked frame lands exactly where the
letterboxed pixels live (not stretched across the item's box). The
`, 1)` in the scale is the scale-down half of the contract: a source
smaller than its box draws at natural size, never upscaled — the same
guarantee the modal's CSS gives the live element.
Writes into `out` (a scratch rect — no allocation per call).

## Parameters

### sw

`number`

Source pixel width.

### sh

`number`

Source pixel height.

### box

[`GenieRect`](../../genie/interfaces/GenieRect.md)

The item's content-local box.

### out

[`GenieRect`](../../genie/interfaces/GenieRect.md)

Scratch rect receiving the fitted draw box.

## Returns

`void`
