[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [core/safari/patches/media-figure/image-load](../README.md) / safariLoadHighRes

```ts
function safariLoadHighRes(el): void;
```

Defined in: core/safari/patches/media-figure/image-load.ts:24

Safari loadHighRes: requests the Q50 (medium) variant instead of the
uncompressed source — iOS Safari hard-fails canvas/decode on images
above ~4096px and the Q100 asset frequently exceeds texture memory.

## Parameters

### el

[`SafariPatchableEl`](../../../../types/interfaces/SafariPatchableEl.md)

## Returns

`void`
