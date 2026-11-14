[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/sections](../README.md) / ensureSectionShape

```ts
function ensureSectionShape(host, sIdx): void
```

Defined in: cms/projects/sections.ts:39

In-place normalize for a section the event handlers are about to
index into — guarantees `sections[sIdx]` is the `[texts, media]`
tuple before a `data-tidx`/`data-midx` write lands on it.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `currentProject`

### sIdx

`number`

— section index to normalize

## Returns

`void`
