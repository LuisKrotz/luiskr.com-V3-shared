[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / projectedEdge

```ts
function projectedEdge(a, w, tier): number
```

Defined in: website/components/home/cardstack/deck.ts:253

Screen-space x (px from the deck centre) of the outer edge of the card
at offset `a` on the right side, after the perspective divide.

The card's outer edge sits at its centre x plus the half-width turned
by rot: X = x + (w/2)·cos(rot), Z = depth − (w/2)·sin(rot) (the turn
sends the outer edge back). The deck's perspective P = PERSPECTIVE·w
with its origin at the deck centre — the cards' own anchor — projects
it to X·P / (P − Z); Z ≤ 0 so the edge only ever pulls inward.

## Parameters

### a

`number`

Unsigned ring offset.

### w

`number`

Card width px.

### tier

[`CardStackFanTier`](../../../../../../core/tokens/motion/card-stack/interfaces/CardStackFanTier.md)

The active coverflow fan tier.

## Returns

`number`

The projected outer-edge x in px.
