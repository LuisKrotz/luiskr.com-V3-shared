[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / fitPeek

```ts
function fitPeek(deckW, w, tier): number
```

Defined in: website/components/home/cardstack/deck.ts:279

Visible cards per side — the deepest offset (≤ tier.PEEK) whose
projected outer edge stays inside the deck half-width × EDGE_ROOM,
never below PEEK_MIN. The fan is symmetric, so one count serves both
sides: on landscape/desktop the left-most card can't reach into the
text column, and on phones EDGE_ROOM > 1 lets the neighbours bleed
off-screen as the swipe hint.

## Parameters

### deckW

`number`

Deck width px.

### w

`number`

Card width px.

### tier

[`CardStackFanTier`](../../../../../../core/tokens/motion/card-stack/interfaces/CardStackFanTier.md)

The active coverflow fan tier.

## Returns

`number`

Cards visible per side.
