[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/deck](../README.md) / stripPose

```ts
function stripPose(s, len, w, step, edge?, fadeSpan?): MentionPose
```

Defined in: website/components/carousel/mentions-deck/deck.ts:71

The strip pose for signed offset `s` — a flat, centered row: every card
sits at s·step px from the deck-center anchor, aligned on one baseline
(no tilt/drop/scale — the strip reads as a continuous band) with a
small margin between neighbours. Opacity rides the edge distance: a
card fully inside the deck rect is opaque, then dims out over
fadeSpan px as it crosses the edge (wide decks pass w × FADE_FRAC —
invisible by the time its center leaves). The dim alone would still
slice the card mid-fade at the overflow boundary, so the deck's mask
gradient (sized to the same lane — see applyPoses) spatially dissolves
everything into the edge: the strip never shows a cut card. A fadeSpan
of 0 (mobile peek layout) skips the dissolve instead — the card stays
fully opaque while any pixel is inside the deck and drops only once
fully out, so partial neighbours show at full color under the clip.
Invisible cards leave the pointer/a11y tree.

## Parameters

### s

`number`

Signed ring offset (0 = front).

### len

`number`

Deck length — drives the z-index ladder.

### w

`number`

Card width px.

### step

`number`

Card step in px (card width + inter-card margin).

### edge?

`number` = `Number.POSITIVE_INFINITY`

Px from the anchor to the deck's edge (half the deck width
when the anchor is centered); +∞ skips the fade for detached poses.

### fadeSpan?

`number` = `...`

Edge-dissolve lane px — defaults to the wide-deck
FADE_FRAC span; 0 gives the mobile binary visibility (no dim).

## Returns

[`MentionPose`](../../types/interfaces/MentionPose.md)

The pose record for the DOM write.
