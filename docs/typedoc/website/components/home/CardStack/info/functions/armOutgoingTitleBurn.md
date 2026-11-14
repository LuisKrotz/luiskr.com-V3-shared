[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/info](../README.md) / armOutgoingTitleBurn

```ts
function armOutgoingTitleBurn(host): void
```

Defined in: website/components/home/cardstack/info.ts:346

Arms the outgoing front's burn-out BEFORE the pose pass drops
--active — goTo calls it ahead of applyPoses. The flip bottom-anchors
the card's info column instantly (in-flow → absolute bottom:0), so a
post-flip mount records the RELOCATED box ~130px above where the
title visibly stood — the raster then combusts the name on top of
the card's cover image and the burn reads as displaced. Mounting
pre-flip freezes the anchor at the last-lit in-flow geometry: the
burn plays where the title stood and rides the card's deal transform
out, glued. Live sessions just re-aim — a card mid-knit re-consumes
from the knit point.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
