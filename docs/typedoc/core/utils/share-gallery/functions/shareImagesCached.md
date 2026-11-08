[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/share-gallery](../README.md) / shareImagesCached

```ts
function shareImagesCached(manifestUrl): string[]
```

Defined in: core/utils/share-gallery.ts:269

Cached share URLs for one manifest — the set the last rotation
loaded ([] until a manifest resolves). Rich-route emitters append
the matching gallery ItemList so re-emitted graphs keep the capture
set instead of dropping it when their own entities rebuild.

## Parameters

### manifestUrl

`string`

site-served share manifest URL

## Returns

`string`[]

the cached share-image URLs (empty when unavailable)
