[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/paper](../README.md) / syncPaper

```ts
function syncPaper(s): void
```

Defined in: core/utils/burn/paper.ts:358

Anchors the canvas once at arm size, then tracks POSITION only. The
card's expand ease animates the h2's `cqw` font-size for ~0.42s after
hover; re-measuring the box every step baked that shrink into the
raster, so the burning glyphs visibly collapsed with the DOM font (the
reported font-reduction bug). Freezing the raster keeps the title the
size it was when it caught fire — only the canvas slides along the
moving box. `lastBox`/`lastPos` signatures skip all work when nothing
moved.

Knit sessions (dir −1) get one exception: the SAME font transition
means an arm-time raster freezes mid-transition letterforms, and the
deposit motes knit glyphs that pop back to the live DOM ink at
teardown — the "chunks when font style changes" report. A knit
re-rasterizes whenever the computed-font signature drifts, so the
knit continuously morphs toward the final ink and the handoff is
shape-identical.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The live session — owns the canvases and DOM elements.

## Returns

`void`
