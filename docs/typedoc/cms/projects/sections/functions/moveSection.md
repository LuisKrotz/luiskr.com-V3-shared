[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/sections](../README.md) / moveSection

```ts
function moveSection(host, sIdx, dir): void
```

Defined in: cms/projects/sections.ts:78

Swaps a section with its neighbor — `dir` is -1 (up) or +1 (down);
out-of-bounds targets return early so the edge buttons are safe.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `currentProject`

### sIdx

`number`

— zero-based section index

### dir

`number`

— -1 or +1

## Returns

`void`
