[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/deck](../README.md) / measure

```ts
function measure(host): void
```

Defined in: website/components/carousel/mentions-deck/deck.ts:118

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

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
