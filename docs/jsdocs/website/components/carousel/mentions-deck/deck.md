# `website\components\carousel\mentions-deck\deck.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\mentions-deck\deck.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_lastS`

Last pose-pass signed offset per card element — a card whose offset
jumped by more than half the ring teleported across the strip (the
nav/drag crossed the ±len/2 seam) and must land without a transition
sweep. Keyed by element so a re-rendered card starts a fresh baseline.

### `ringSigned`

Signed ring distance of `d` modulo `len`, normalized into (-len/2, len/2]
so the shortest strip direction wins — fractional `d` (mid-drag) passes
through unchanged in magnitude.

- `@param` d Raw index difference (may be fractional, any sign).
- `@param` len Deck length.
- `@returns` Signed ring offset.

### `stripPose`

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

- `@param` s Signed ring offset (0 = front).
- `@param` len Deck length — drives the z-index ladder.
- `@param` w Card width px.
- `@param` step Card step in px (card width + inter-card margin).
- `@param` edge Px from the anchor to the deck's edge (half the deck width
- `@param` fadeSpan Edge-dissolve lane px — defaults to the wide-deck
- `@returns` The pose record for the DOM write.

### `measure`

Measures the deck region and publishes `_cardW/_cardH/_step/_anchor`
and `_fadeSpan` — the card box is the fill-fit when the whole ring
(cards + margins) lands inside the deck at a readable width, else the
viewport clamp (CARD_W_VW between floor/cap; decks under the 768 rung
use the MOBILE pair so a sliver of each neighbour stays on screen).
`_step` carries the inter-card margin, `_anchor` is the deck's
horizontal center (doubling as the edge distance the dissolve
measures against), and `_fadeSpan` is the edge-dissolve lane — card
width × FADE_FRAC on wide decks, 0 on mobile so partial neighbours
peek at full opacity instead of dimming into a vignette.
Pre-paint/hidden contexts report zero rects → the clamp runs against
viewportWidth().

- `@param` host The MentionsDeck element.

### `padNum`

Zero-padded ordinal — "01", "08" — printed in each card's top corner.

### `applyPoses`

Writes every card's pose for the current virtual front `f` — derived
from `activeIdx - _dragX/_step`, so a live drag slides the whole strip
continuously and `activeIdx` alone reproduces the rest pose. Card width/
height write once per measure() (_sizesDirty); the --active class and
a11y flags ride the same pass. Runs inside the gesture rAF — reads are
cached fields, writes are transform/opacity/zIndex/visibility only.

- `@param` host The MentionsDeck element.

### `updateChrome`

Refreshes the non-pose chrome after a nav — the dot --active flags and
each card's aria-hidden/tabindex so off-strip cards leave the tab order
and AT tree.

- `@param` host The MentionsDeck element.
