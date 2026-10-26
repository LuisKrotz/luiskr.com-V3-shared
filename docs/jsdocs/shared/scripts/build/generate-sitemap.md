# `shared\scripts\build\generate-sitemap.js`

Emits the whole crawl surface under `website/public/meta/`:

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\generate-sitemap.js`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `URLSET_XMLNS`

XML namespaces emitted on every <urlset>.

### `escXml`

Escapes text for XML element bodies (media titles/descriptions).

### `encLoc`

Percent-encodes a URL for sitemap loc emission — bucket keys can carry
literal spaces/non-ASCII which make RFC-3986-invalid URLs. decodeURI-
first keeps it idempotent (encodeURI escapes '%' itself).

### `titleOf`

Truncates a media title to Google's 100-char video-title bound.

### `mediaTagXml`

XML media tags for one media item — image:image or video:video.

### `projectPageTags`

Aggregated media tags for a project page — cover + every item,
deduped by resolved asset URL.

### `sitemapDoc`

Emits one `<urlset>` document for `urls`, media tags included.

### `localeUrlsOf`

URLs owned by one locale — `/<loc>` plus its localized routes, portfolio
deep links and star-field bodies.

### `localizedLlms`

Localized llms.txt — swaps the intro line for the locale's about text.

### `localizedCatalog`

Localized ai-catalog — entry URLs get the /<loc> prefix (docs stay EN).
