[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/model](../README.md) / removeParagraph

```ts
function removeParagraph(host, col, idx): void
```

Defined in: cms/about/model.ts:52

Drops the paragraph at `idx` from a bio column and re-renders the list.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData`

### col

[`BioColumn`](../../types/type-aliases/BioColumn.md)

— `'col1'` (left) or `'col2'` (right)

### idx

`number`

— zero-based paragraph index

## Returns

`void`
