[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/paper](../README.md) / syncPaper

```ts
function syncPaper(s): void
```

Defined in: website/components/home/mosaic/burn/paper.ts:331

Anchors the canvas once at arm size, then tracks POSITION only. The
card's expand ease animates the h2's `cqw` font-size for ~0.42s after
hover; re-measuring the box every step baked that shrink into the
raster, so the burning glyphs visibly collapsed with the DOM font (the
reported font-reduction bug). Freezing the raster keeps the title the
size it was when it caught fire — only the canvas slides along the
moving box. `lastBox`/`lastPos` signatures skip all work when nothing
moved.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — owns the canvases and DOM elements.

## Returns

`void`
