[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/share-gallery](../README.md) / shareGalleryEntity

```ts
function shareGalleryEntity(pageUrl, name, urls, bcp): Record<string, unknown>
```

Defined in: core/utils/share-gallery.ts:132

ImageObject ItemList covering the whole share set — mirrors the
build-time share entities emitted into the static playground
pages so the runtime graph carries the same crawlable gallery.

## Parameters

### pageUrl

`string`

canonical page URL the entities belong to

### name

`string`

localized gallery label

### urls

`string`[]

the full share set

### bcp

`string`

BCP-47 tag for inLanguage

## Returns

`Record`\<`string`, `unknown`\>

ItemList JSON-LD entity
