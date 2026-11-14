[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/paper](../README.md) / syncPaper

```ts
function syncPaper(s): void
```

Defined in: core/utils/burn/paper.ts:456

Anchors the canvas once at arm size AND arm position — the raster
burns exactly where the glyphs stood when they caught fire. The
card's expand ease animates the h2's `cqw` font-size for ~0.42s after
hover; re-measuring the box every step baked that shrink into the
raster, so the burning glyphs visibly collapsed with the DOM font
(the reported font-reduction bug). Freezing the raster keeps the
title the size it was when it caught fire.

Position stays frozen too: hosts ease layout during the session —
the dealt pile's heights grow with the front card's typing and the
bottom-anchored copy columns slide — and chasing those boxes made
the raster visibly drift (the "burn moves in Y on mobile" defect).
The DOM ink is hidden the whole session, so the only correct anchor
is where the title stood at arm time. Hosts that publish
`cls.ITEM_BURNED` opt into live position tracking — their CSS
relocates the title box at the consume beat and the same session
replays the consume front in reverse at the new anchor.
`lastBox`/`lastPos` signatures skip all work when nothing moved.

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
