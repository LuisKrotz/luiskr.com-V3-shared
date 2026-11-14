[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/mentions-deck](../README.md) / MENTIONS\_DECK\_LAYOUT

```ts
const MENTIONS_DECK_LAYOUT: Readonly<{
  ANCHOR_FRAC: 0.5
  GAP_RATIO: 0.05
  FADE_FRAC: 0.5
  FADE_FRAC_MOBILE: 0
  FILL_MIN: 3
  FILL_FLOOR: 0.85
  Z_STRIDE: 10
  CARD_W_MIN: 270
  CARD_W_MAX: 312
  CARD_W_VW: 0.25
  CARD_W_VW_MOBILE: 0.72
  CARD_W_MIN_MOBILE: 240
  CARD_H_RATIO: 0.64
  DECK_H_RATIO: 1.24
  CARD_W_FALLBACK: 300
  DRAG_SLOP: 6
  DRAG_THRESHOLD: 0.22
  FLICK_VEL: 0.35
  FRONT_EPS: 0.5
  AUTOPLAY_MS: 2000
}>
```

Defined in: core/tokens/motion/mentions-deck.ts:20

Strip geometry for <mentions-deck> — all per-card pose numbers are computed in
JS (mentions-deck/deck.ts) and written as inline transform/opacity/z-index;
these constants are the sole declaration site for the strip curve. The
mention deck is a flat centered band: the front card anchors at the deck's
horizontal center and neighbours extend at a small margin in both
directions — no tilt, drop or scale, so the row reads as one continuous
strip. Wide decks dissolve cards out as they approach the deck edge —
a card is never abruptly cut by the boundary. Narrow (mobile) decks
instead run a peek layout: the dissolve lane collapses to 0 and
neighbours clip at the boundary at full opacity, so partial cards
show on both sides of the front card.
