[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/data](../README.md) / syncNonLocalizedToAllLangs

```ts
function syncNonLocalizedToAllLangs(host): Promise<void>
```

Defined in: cms/portfolio/data.ts:108

Propagates the non-localized fields (image, link, featured, dimensions)
to every other locale — localized `label`/`description` are preserved
from each target's existing row, matched by list position. Also writes
the featured flags into each locale's `related/projects` node.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component holding the source `items`

## Returns

`Promise`\<`void`\>
