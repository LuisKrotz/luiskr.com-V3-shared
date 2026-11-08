# `core\tokens\motion\mentions-deck.ts`

Mentions-deck strip geometry + timing tokens — grouped subset

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\mentions-deck.ts`                 |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ANCHOR_FRAC`

Front-card anchor as a fraction of deck width — 0.5 centers the active
card; the strip extends symmetrically to both edges.

### `GAP_RATIO`

Inter-card margin as a fraction of card width — the small gap that
separates neighbours in the strip.

### `FADE_FRAC`

Edge-dissolve span as a fraction of card width — a card dims over
this distance while crossing the deck edge, reaching opacity 0 by
the time its center leaves the canvas. The same span sizes the
deck's mask-gradient dissolve lane (--mentions-deck-fade), so the
boundary itself fades to 0 and no card is ever visibly cut.

### `FADE_FRAC_MOBILE`

Edge-dissolve span on mobile decks — 0 disables the dissolve: the
mask lane collapses to the clip edge and a card stays fully opaque
while any pixel is inside the deck, so partial neighbours peek at
full color instead of dimming into a vignette.

### `FILL_MIN`

Minimum ring length that may fit its full strip inside the deck —
shorter rings keep the width clamp and center what they have.

### `FILL_FLOOR`

Lower bound the fill-fit may shrink to, as a fraction of CARD_W_MIN —
below it the ring can't fit at a readable width and the clamp stands
(extra cards dissolve at the edges instead).

### `Z_STRIDE`

z-index stride between depth layers.

### `CARD_W_MIN`

Card width floor (px) on small viewports.

### `CARD_W_MAX`

Card width cap (px) on wide viewports — the fill-fit may exceed it
when the ring is too short to span the deck otherwise.

### `CARD_W_VW`

Card width as a fraction of the deck width when unclamped.

### `CARD_W_VW_MOBILE`

Card width as a fraction of the deck width on mobile decks — ~72%
leaves an even sliver of each neighbour peeking past the clip edge,
so the strip advertises more cards on both sides of the front.

### `CARD_W_MIN_MOBILE`

Card width floor (px) on mobile decks — the readability bound under
the vw fraction on the narrowest phones.

### `CARD_H_RATIO`

Card height as a multiple of its width — landscape cards (~1.56:1).

### `DECK_H_RATIO`

Deck region height as a multiple of card height — headroom so card
shadows never clip against the deck's overflow edge.

### `CARD_W_FALLBACK`

Fallback card width (px) when layout is unmeasurable (pre-paint).

### `DRAG_SLOP`

Drag distance (px) before a gesture commits to the deck (versus a
vertical page scroll).

### `DRAG_THRESHOLD`

Drag fraction of one step that triggers a nav on release.

### `FLICK_VEL`

Flick velocity (px/ms) that carries a short drag to the next card.

### `FRONT_EPS`

px tolerance for "offset ≈ front" — class/ARIA front detection.

### `PAD`

Zero-pad width for the card ordinals ('01', '08').

### `AUTOPLAY_MS`

Autoplay dwell per front card (ms) — 10s matches the retired footer
carousel's ambient pace; gated on ≥50% visibility + reduced-motion.
