[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/card-stack](../README.md) / CARD\_STACK\_TIERS

```ts
const CARD_STACK_TIERS: readonly CardStackTier[]
```

Defined in: core/tokens/motion/card-stack.ts:147

Coverflow tiers, widest first — deck.ts picks the first tier whose
MIN_VW the viewport meets (the portrait tablet tier additionally needs
a taller-than-wide viewport). MIN_VW values mirror the `layout-*`
breakpoints the card-stack partials use (768 / 1280 / 1440 / 1920).
