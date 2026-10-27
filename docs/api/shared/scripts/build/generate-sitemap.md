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

### `themesOf`

Localized search-theme list for one CMS node — every page/project
carries `searchThemes` (patch-all-pages-search-themes.js); the list
feeds <image:caption> and <video:tag> so image/video search indexes
the asset under the page's own query vocabulary.

### `themeCaption`

`<image:caption>` element for a theme list — '' when empty.

### `videoThemeTags`

`<video:tag>` elements for a theme list — Google accepts ≤32 tags.

### `epShareTagsFor`

Localized <image:image> tags for the whole share set — titles and
captions carry the locale's own earth-image search themes.

### `sfShareTagsFor`

Localized <image:image> tags for the whole star share set — titles
and captions carry the locale's own star-image search themes.

### `mediaTagXml`

XML media tags for one media item — image:image or video:video.
`themes` is the parent page's localized searchThemes list: images
get it as <image:caption>, videos as <video:tag> elements.

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

### `robotsDoc`

Emits root or localized crawl policy with its sitemap discovery URL.

### `bioOf`

Localized channel description — the locale's about bio, else en.

### `rssItem`

One RSS item with a valid image enclosure or video plus optional poster.

### `rssDoc`

Full RSS 2.0 document for one locale — pages first, then every
project with its cover media.

### `legalDesc`

First authored paragraph of a legal page — falls back to its title.
