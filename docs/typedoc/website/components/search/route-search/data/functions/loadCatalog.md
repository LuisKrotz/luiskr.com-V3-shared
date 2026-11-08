[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/data](../README.md) / loadCatalog

```ts
function loadCatalog(lang, done): void
```

Defined in: website/components/search/route-search/data.ts:418

`loadCatalog` — the locale route catalog comes from the generated
`meta/search-index-<loc>.json` (the sitemap's URL set, enriched per
locale) merged with the shared docs index (English-only, fetched once
and reused across locale switches). When the locale artifact is
absent (dev without a build, offline test env) the embedded catalog —
static pages plus the store/SWR portfoliolist — is the fallback.

## Parameters

### lang

`string`

Current locale code.

### done

(`_entries`) => `void`

Receives the complete catalog (never throws).

## Returns

`void`
