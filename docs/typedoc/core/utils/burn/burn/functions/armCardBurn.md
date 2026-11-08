[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/burn](../README.md) / armCardBurn

```ts
function armCardBurn(host, i, item, cls, cardSel, speed?, onBurned?): boolean
```

Defined in: core/utils/burn/burn.ts:83

Arms the burn on card `i`: inserts the rewrite slot, then mounts the
combustion canvas IMMEDIATELY — the user expects the dissolve the
moment the pointer lands, not after the card's expand ease. The
canvas is measured against the title's hover-instant box and plays
the burn where the glyphs stood while the card grows behind it (the
h2's ink is hidden as soon as the canvas takes over, so the moving
DOM title never shows through). Reduced motion skips the canvas
entirely — the title swap happens instantly.

## Parameters

### host

[`BurnHost`](../../types/interfaces/BurnHost.md)

The <home-mosaic> component instance.

### i

`number`

The card index inside the mosaic data set.

### item

[`BurnItem`](../../types/interfaces/BurnItem.md)

The card's mosaic item (label drives the rewrite slot).

### cls

[`BurnClasses`](../../types/interfaces/BurnClasses.md)

### cardSel

`string`

### speed?

`number` = `1`

Burn tempo multiplier — 1 is the authored pace, higher
runs a quicker burn-out (card-stack's hover asks for 2×).

### onBurned?

(() => `void`) \| `null`

Fired once when the forward pass consumes the title —
hosts stage their next beat off it (the description writer starts
only after the burn-out). Fires synchronously on the reduced-motion
instant path.

## Returns

`boolean`

Whether a burn actually armed (canvas mounted, instant
relocate, or live session re-based) — false when the card/title
can't be found so the caller can run its own fallback beat.
