[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/modal](../README.md) / openMediaModal

```ts
function openMediaModal(c, originFigure?): void
```

Defined in: website/components/media/figure/modal.ts:69

Opens media modal.

## Parameters

### c

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

— the component

### originFigure?

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

— optional figure the genie measures instead of
`c`: a clone-click opens the REAL twin's modal (clones are inert,
the event can only be forwarded to the real element), but the warp
must start from the rect the user actually clicked — the twin's
figure can sit off-viewport at a different strip position, which
would fly the sheet in from nowhere and read as the carousel
jumping. Everything else (media, slug, trigger) stays the twin's.

## Returns

`void`
