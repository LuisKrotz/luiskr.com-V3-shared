[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/figure/load](../README.md) / loadHighRes

```ts
function loadHighRes(fig): Promise<void>
```

Defined in: website/components/media/figure/load.ts:184

Thumb → high-res quality ladder. Detached Image probes climb the
manifest-proven rungs (q50 → q75 → raw original → uncompressed) — webp
first, jpg on 404 (the "if webp exists" check is the request itself, no
manifest round-trip); every confirmed tier republishes the same high
layer's src, so the painted box upgrades in place and can never tear.
The 4096²-pixel budget gates the GPU texture upload only — oversized
sources still fetch and decode (the browser owns that memory), so a
big file can never pin its card on the blurred thumb.
Errors mark loaded anyway — a broken image must not pin the skeleton
shimmer forever.

## Parameters

### fig

[`MediaFigure`](../../../MediaFigure/classes/MediaFigure.md)

## Returns

`Promise`\<`void`\>
