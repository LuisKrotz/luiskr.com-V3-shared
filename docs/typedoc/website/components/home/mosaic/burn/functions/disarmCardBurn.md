[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/home/mosaic/burn](../README.md) / disarmCardBurn

```ts
function disarmCardBurn(host, i): void;
```

Defined in: website/components/home/mosaic/burn.ts:999

Tears the burn down: kills the raf, removes the canvas + rewrite slot,
and restores the h2's ink. Safe to call on a card that never burned.

## Parameters

### host

[`HomeMosaic`](../../../HomeMosaic/classes/HomeMosaic.md)

### i

`number`

## Returns

`void`
