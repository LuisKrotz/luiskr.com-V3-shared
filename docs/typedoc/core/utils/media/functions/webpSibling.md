[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/media](../README.md) / webpSibling

```ts
function webpSibling(url): string
```

Defined in: core/utils/media.ts:135

Derives the .webp sibling of a .jpg URL — the compressed-variant naming
convention replaces only the extension, so the webp sits beside the
original at the same path ("if webp exists" is decided by the request,
no manifest lookup). Returns '' for non-.jpg input so callers can
conditionally render a <source>.

## Parameters

### url

`string`

JPG media URL.

## Returns

`string`

The same URL with .webp instead of .jpg, or '' when not .jpg.
