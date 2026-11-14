[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/parallax](../README.md) / PARALLAX

```ts
const PARALLAX: Readonly<{
  DECK_Y: -160
  DECK_FOOT_Y: 120
  ABOUT_MAIN_Y: 96
  ABOUT_TEXT_Y: -56
  CONTACT_Y: -64
  AWARDS_Y: -88
  WRITE_EPSILON: 0.5
}>
```

Defined in: core/tokens/motion/parallax.ts:18

Frozen home-parallax parameter map — sole declaration site for these
numbers; consumers import members rather than re-declaring literals.

Each amplitude is the translateY magnitude (px) a layer reaches at
progress ±1 — i.e. when its centre sits one transit-range above or
below the viewport centre. Positive values TRAIL the scroll (the
layer moves slower than the page → reads as depth); a negative value
LEADS it (counter-drift).
