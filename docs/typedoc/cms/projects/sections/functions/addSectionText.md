[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/sections](../README.md) / addSectionText

```ts
function addSectionText(host, sIdx): void
```

Defined in: cms/projects/sections.ts:94

Pushes an empty paragraph into the text half (`[0]`) of a section —
`ensureSectionShape` first normalizes any legacy object form.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `currentProject`

### sIdx

`number`

— zero-based section index

## Returns

`void`
