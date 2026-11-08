[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/data/footer-links](../README.md) / sitemapHrefFor

```ts
function sitemapHrefFor(locale): string
```

Defined in: core/utils/data/footer-links.ts:48

Localized sitemap-page URL — `/<sitemap>` for English,
`/<loc>/<localized-slug>` otherwise; mirrors the router's canonical
resolution (CMS slug overrides merged over LANG_SLUGS via routeSlugs).

## Parameters

### locale

`string`

active locale code

## Returns

`string`

root-relative sitemap path for that locale
