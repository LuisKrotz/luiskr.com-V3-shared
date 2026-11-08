[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/card-stack](../README.md) / CARD\_STACK\_LAYOUT

```ts
const CARD_STACK_LAYOUT: Readonly<{
  PEEK_MIN: 1
  Z_STRIDE: 10
  CARD_W_MIN: 200
  CARD_W_MAX: 1400
  ENTER_RISE: 0.08
  FAN_LIFT: -40
  INDEX_SCROLL_RATIO: 0.8
  CARD_W_FALLBACK: 460
  DRAG_SLOP: 6
  DRAG_THRESHOLD: 0.22
  FLICK_VEL: 0.35
  FRONT_EPS: 0.5
  FRONT_SCALE: 1.18
  AUTOPLAY_MS: 10000
  TIMER_INSET: 2
  PAD: 2
  EAGER_TILES: 2
  BURN_SPEED: 2
  STACKED_DECK_PAD: 0.1
  FAN_DIM_STEP: 0.1
  FAN_DIM_FLOOR: 0.32
}>
```

Defined in: core/tokens/motion/card-stack.ts:389

Coverflow constants shared by every tier — the per-card pose numbers
are computed in JS (cardstack/deck.ts) and written as inline
transform/opacity/z-index; these plus CARD_STACK_TIERS are the sole
declaration site for the fan geometry.
