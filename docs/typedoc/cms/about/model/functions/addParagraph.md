[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/model](../README.md) / addParagraph

```ts
function addParagraph(host, col): void
```

Defined in: cms/about/model.ts:41

Appends an empty paragraph to a bio column — the input rows write by
index, so pushing an empty string creates the new row's bound slot.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData`

### col

[`BioColumn`](../../types/type-aliases/BioColumn.md)

— `'col1'` (left) or `'col2'` (right)

## Returns

`void`
