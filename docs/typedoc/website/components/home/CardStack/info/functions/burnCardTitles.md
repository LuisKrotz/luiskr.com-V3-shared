[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/info](../README.md) / burnCardTitles

```ts
function burnCardTitles(host): void
```

Defined in: website/components/home/cardstack/info.ts:233

The in-card paper-burn on stacked tiers — the front card's title
knits IN (the loop runs dir −1 from prog 1: deposit motes rebuild
the glyphs, then teardown hands the pristine raster back to the DOM
ink), and the card that just left the front burns OUT (the default
forward consume) as it slides into the pile. Live sessions flip
direction rather than stack: a card mid-knit that loses the front
re-consumes from the knit point, and a consumed session knits back
when its card returns. Reduced motion or a degenerate box leaves
the title's plain ink.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
