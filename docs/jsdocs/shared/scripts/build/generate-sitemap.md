# `shared/scripts/build/generate-sitemap.js`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/build/generate-sitemap.js`                            |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `sitemapDoc`

Emits one `<urlset>` document for `urls`.

### `localeUrlsOf`

URLs owned by one locale — `/<loc>` plus its localized + playground routes.

### `localizedLlms`

, /docs/** — the docs
// portal is English-only by design); every other locale sitemap lists only
// its own /<loc>/… routes. sitemap.xml becomes the index document.
const sharedUrls = allUrls.filter((u) => !/^\/[a-z]{2,5}(\/|$)/.test(u) || u === '/')
const enUrls = sharedUrls
const translations = fs.existsSync('database.json')
? JSON.parse(fs.readFileSync('database.json', 'utf-8')).translations || {}
: {}
const llmsTemplate = fs.readFileSync(path.join(META_DIR, 'llms.txt'), 'utf-8')

/** Localized llms.txt — swaps the intro line for the locale's about text.

### `localizedCatalog`

Localized ai-catalog — entry URLs get the /<loc> prefix (docs stay EN).
