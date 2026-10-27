[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/load](../README.md) / resolveMediaSources

```ts
function resolveMediaSources(fig): void
```

Defined in: website/components/media/figure/load.ts:39

Builds the media's CDN URL matrix on init: [poster, webm, mp4] per tier
for videos (full size + VIDEO_SCALE'd fallback — the browser walks the
<source> list until one resolves, so webm-first means "use webm when it
exists, mp4 otherwise"), or the thumb URL for images.

## Parameters

### fig

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

## Returns

`void`
