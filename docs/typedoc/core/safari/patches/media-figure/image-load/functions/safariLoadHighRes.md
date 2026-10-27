[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/safari/patches/media-figure/image-load](../README.md) / safariLoadHighRes

```ts
function safariLoadHighRes(el): void
```

Defined in: core/safari/patches/media-figure/image-load.ts:30

Safari loadHighRes: requests the Q50 (medium) variant instead of the
uncompressed source — the medium tier is the decode-safe asset for
WebKit's ~4096px image ceiling, so every source (however large the
original) gets a real high-res paint instead of a permanent thumb.
The URL is emission-encoded exactly like load.ts's path — raw
concatenation breaks on bucket keys carrying spaces/non-ASCII, which
Safari resolves to a 404 where Chromium tolerated the literal.

## Parameters

### el

[`SafariPatchableEl`](../../../../types/interfaces/SafariPatchableEl.md)

## Returns

`void`
