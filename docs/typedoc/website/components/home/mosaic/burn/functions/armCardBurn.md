[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/home/mosaic/burn](../README.md) / armCardBurn

```ts
function armCardBurn(
   host, 
   i, 
   item
): void;
```

Defined in: website/components/home/mosaic/burn.ts:968

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

[`HomeMosaic`](../../../HomeMosaic/classes/HomeMosaic.md)

### i

`number`

### item

[`MosaicItem`](../../pack/interfaces/MosaicItem.md)

## Returns

`void`
