[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/sections](../README.md) / removeSection

```ts
function removeSection(host, sIdx): void
```

Defined in: cms/projects/sections.ts:63

Deletes a section after a numbered confirm — the splice reindexes
later sections, so the render+rebind refreshes every `data-idx`.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `currentProject`

### sIdx

`number`

— zero-based section index

## Returns

`void`
