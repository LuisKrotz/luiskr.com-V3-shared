[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/load](../README.md) / releaseDomBlobs

```ts
function releaseDomBlobs(fig): void
```

Defined in: website/components/media/figure/load.ts:273

Releases every display-sized object URL a figure still holds — called
from onDestroy so the blob store can't grow across route changes. An
img that already consumed its blob keeps the decoded bitmap (revocation
only blocks new fetches), so painted layers are unaffected.

## Parameters

### fig

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

The figure being torn down.

## Returns

`void`
