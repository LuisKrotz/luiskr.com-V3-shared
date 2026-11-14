[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/load](../README.md) / refreshManifestMedia

```ts
function refreshManifestMedia(fig): void
```

Defined in: website/components/media/figure/load.ts:129

Re-resolves the media's URL matrix once the bucket manifest lands and
patches the LIVE shadow DOM — never a wholesale _updateDom, which would
replace the video element and orphan its scoped listeners, pooled
viewport observer, and already-attached <source> children. Proven
description tracks + poster attach directly onto the live video; the
image thumb swaps to its manifest-proven URL when the in-flight pass
had fallen back to the source original.

## Parameters

### fig

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

The mounted media figure.

## Returns

`void`
