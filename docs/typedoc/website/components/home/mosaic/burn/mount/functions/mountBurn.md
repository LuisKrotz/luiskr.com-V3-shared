[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/mount](../README.md) / mountBurn

```ts
function mountBurn(cardEl, overlay, titleEl, item): void
```

Defined in: website/components/home/mosaic/burn/mount.ts:67

Mounts the combustion canvas over the title's current box: measures
the h2 and overlay at hover-instant and plays the dissolve exactly
where the glyphs stand. The DOM ink hides as soon as the canvas takes
over, so the card's expand ease running behind it can't double-draw
the title at its moving flex-end position.

## Parameters

### cardEl

`Element`

The expanded mosaic card.

### overlay

`HTMLElement`

The title overlay element (canvas parent).

### titleEl

`HTMLElement`

The h2 whose ink the canvas replaces.

### item

[`MosaicItem`](../../../pack/interfaces/MosaicItem.md)

The card's mosaic item (description length paces the burn).

## Returns

`void`
