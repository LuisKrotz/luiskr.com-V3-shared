[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/sitemap/map-data](../README.md) / buildSitemapTree

```ts
function buildSitemapTree(page?, projectsByLocale?, shares?): SitemapNode
```

Defined in: website/views/sitemap/map-data.ts:548

Builds the full sitemap link tree — group labels come from the
`pages.sitemap` node the view fetched (live locale first, bundled EN
snapshot via FALLBACK_PAGES when absent); portfolio + media rows come
from the per-locale `projects` maps the view fetched (the display
locale's map labels the rows; every locale's map feeds the media
leaf slugs).

## Parameters

### page?

[`SitemapPageNode`](../interfaces/SitemapPageNode.md) \| `null`

The fetched `pages.sitemap` CMS node, when available.

### projectsByLocale?

[`SitemapProjectsByLocale`](../type-aliases/SitemapProjectsByLocale.md) = `{}`

All locales' `translations/<loc>/projects` maps.

### shares?

[`SitemapShares`](../interfaces/SitemapShares.md) = `{}`

The fetched playground share-capture sets (the
playground-media branch's items).

## Returns

[`SitemapNode`](../interfaces/SitemapNode.md)

The synthetic root node; children are the section groups.
