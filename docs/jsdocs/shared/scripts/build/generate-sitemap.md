# `shared\scripts\build\generate-sitemap.js`

Emits the whole crawl surface under `website/public/meta/`:

| | |
|---|---|
| **Source** | `src/shared\scripts\build\generate-sitemap.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `URLSET_XMLNS`

XML namespaces emitted on every <urlset>.

### `capSlug`

Caps a media deep-link slug at MEDIA_SLUG_MAX_LENGTH so
prerendered dist paths stay under Windows MAX_PATH — the cut drops the
trailing partial word (and a dangling hyphen) so the slug always ends
on a hyphen boundary. Byte-identical to the cap in mediaSlugSeq
(core/utils/string.ts) so sitemap <loc>s, emitted pages and the runtime
resolver agree.

### `escXml`

Escapes text for XML element bodies (media titles/descriptions).

### `encLoc`

Percent-encodes a URL for sitemap loc emission — bucket keys can carry
literal spaces/non-ASCII which make RFC-3986-invalid URLs. decodeURI-
first keeps it idempotent (encodeURI escapes '%' itself).

### `titleOf`

Truncates a media title to Google's 100-char video-title bound.

### `mediaItemsOf`

Media items of a project — mirrors `website/views/project/modal.ts`'s
traversal exactly: sections → groups (arrays whose head is NOT a string —
string-head groups are text blocks) → media objects. Every object with a
`src` is a real asset on the page and gets indexed; items with a label
additionally get their own `/portfolio/<slug>/<media>` deep-link URL.

### `mediaRowsOf`

Labelled-media deep links of a project — slug → media item. Distinct
captions can collapse to the same slug, so occurrences after the first
gain `-2`, `-3`, … in document order — byte-identical to mediaSlugSeq
in core/utils/string.ts so every item keeps an indexable URL and the
emitted pages + runtime resolver agree.

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
