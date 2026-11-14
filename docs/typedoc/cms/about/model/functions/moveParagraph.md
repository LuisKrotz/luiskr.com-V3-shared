[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/model](../README.md) / moveParagraph

```ts
function moveParagraph(host, col, idx, dir): void
```

Defined in: cms/about/model.ts:61

Swaps a paragraph with its neighbor — `dir` is -1 (up) or +1 (down);
out-of-bounds targets return early so the edge buttons are also safe.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

### col

[`BioColumn`](../../types/type-aliases/BioColumn.md)

### idx

`number`

### dir

`number`

## Returns

`void`
