# `shared/scripts/build/generate-sitemap.js`

Emits the whole crawl surface under `website/public/meta/`:

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/build/generate-sitemap.js`                            |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `sitemapDoc`

Emits one `<urlset>` document for `urls`.

### `localeUrlsOf`

URLs owned by one locale — `/<loc>` plus its localized, playground and portfolio routes.

### `localizedLlms`

Localized llms.txt — swaps the intro line for the locale's about text.

### `localizedCatalog`

Localized ai-catalog — entry URLs get the /<loc> prefix (docs stay EN).
