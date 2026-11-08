[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/mount](../README.md) / handleVideoError

```ts
function handleVideoError(c, event): void
```

Defined in: website/components/media/figure/mount.ts:42

Releases the loading shimmer and removes a broken video poster.

## Parameters

### c

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

Media figure whose loading state changes.

### event

`Event`

Error event from the video element.

## Returns

`void`

Nothing; the failed poster is removed when present.
