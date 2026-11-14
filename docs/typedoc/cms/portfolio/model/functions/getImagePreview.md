[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/model](../README.md) / getImagePreview

```ts
function getImagePreview(imgName): string
```

Defined in: cms/portfolio/model.ts:21

Resolves a portfolio item's `image` field to a previewable URL —
absolute URLs pass through (already-hosted assets), bare filenames
compose against the CDN covers prefix + `.jpg` and run through
`encodeMediaUrl` for the media worker's token format.

## Parameters

### imgName

`string` \| `undefined`

— stored filename or absolute URL, may be undefined

## Returns

`string`

preview URL, or empty string when nothing is set
