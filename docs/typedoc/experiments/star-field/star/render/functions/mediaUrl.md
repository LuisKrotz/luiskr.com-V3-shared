[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/render](../README.md) / mediaUrl

```ts
function mediaUrl(src): string
```

Defined in: experiments/star-field/star/render.tsx:92

Resolves a dossier media `src` — absolute http(s) URLs (remote NASA /
Commons streams) pass through untouched; relative paths join under the
module's public-asset root (`/experiments/star-field/media/…`).

## Parameters

### src

`string`

Media entry src from the dossier JSON.

## Returns

`string`

The URL to hand to img/video/audio elements.
