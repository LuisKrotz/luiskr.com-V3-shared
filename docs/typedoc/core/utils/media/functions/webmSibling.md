[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/media](../README.md) / webmSibling

```ts
function webmSibling(url): string
```

Defined in: core/utils/media.ts:143

Derives the .webm sibling of an .mp4 URL — same convention as
webpSibling: `x.mp4` → `x.webm` and `x.mp4-scaledown-2x.mp4` →
`x.mp4-scaledown-2x.webm`. Returns '' for non-.mp4 input.

## Parameters

### url

`string`

MP4 media URL.

## Returns

`string`

The same URL with .webm instead of .mp4, or '' when not .mp4.
