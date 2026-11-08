[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/mount](../README.md) / mountBurn

```ts
function mountBurn(cardEl, overlay, titleEl, item, cls, speed, onBurned): boolean
```

Defined in: core/utils/burn/mount.ts:74

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

[`BurnItem`](../../types/interfaces/BurnItem.md)

The card's mosaic item (description length paces the burn).

### cls

[`BurnClasses`](../../types/interfaces/BurnClasses.md)

### speed

`number`

Burn tempo multiplier — 1 is the authored pace, 2 runs
the consume+rebuild twice as fast (card-stack's hover asks for a
quicker burn-out than the mosaic's idle-armed one).

### onBurned

(() => `void`) \| `null`

Fired once when the forward pass consumes the title.

## Returns

`boolean`

Whether the session mounted — false on degenerate boxes or a
missing 2D context so armCardBurn can report "no burn armed".
