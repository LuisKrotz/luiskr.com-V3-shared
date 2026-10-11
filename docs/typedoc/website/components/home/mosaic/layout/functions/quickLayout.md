[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/home/mosaic/layout](../README.md) / quickLayout

```ts
function quickLayout(host): void;
```

Defined in: website/components/home/mosaic/layout.ts:42

Synchronous layout pass for urgent repaints. Same packing math as
layout() but skips the WASM round-trip so the DOM never waits on a
worker. See layout() for the packing geometry notes.

## Parameters

### host

[`HomeMosaic`](../../../HomeMosaic/classes/HomeMosaic.md)

## Returns

`void`
