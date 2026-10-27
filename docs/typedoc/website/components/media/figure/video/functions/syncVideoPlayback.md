[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/video](../README.md) / syncVideoPlayback

```ts
function syncVideoPlayback(fig): void
```

Defined in: website/components/media/figure/video.ts:97

Store change → start/stop playback to match autoplay + visibility.
An open expand modal, nav menu, or preferences/language dialog puts
the page behind a covering layer — background videos must pause
(decoding + compositing them under the overlay is pure waste and
their frames shimmer through the glass). The modal's own <video> is
not a media-figure, so only page figures gate here; on close this
sync re-runs and autoplay+visible videos resume.

## Parameters

### fig

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

## Returns

`void`
