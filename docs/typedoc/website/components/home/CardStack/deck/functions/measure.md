[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / measure

```ts
function measure(host): void
```

Defined in: website/components/home/cardstack/deck.ts:305

Measures the deck region and publishes the card box + tier: the card
width is the tier's CARD_SHARE of the deck width, capped so its height
(width × CARD_H_RATIO) stays inside HEIGHT_SHARE of the stage height —
the deck's own box, clamped to the stage budget the VIEWPORT actually
leaves it: the section is min-height 100dvh, so when the chrome (title
header, info column, foot) needs more than the window the section
overflows and the deck's measured height lies about the room available.
The stage budget subtracts the space above and below the deck inside
the section from the viewport, so the card shrinks on short windows
instead of holding a constant height while the page scrolls.
Pre-paint/hidden contexts report zero rects → the viewport width
stands in for the deck width and the height cap is skipped.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
