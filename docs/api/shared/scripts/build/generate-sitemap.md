# `shared\scripts\build\generate-sitemap.js`

Emits the whole crawl surface under `website/public/meta/`:

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\generate-sitemap.js`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DOCS_PATH`

Canonical public root used by the docs manifest routes.

### `URLSET_XMLNS`

XML namespaces emitted on every <urlset>.

### `escXml`

Escapes text for XML element bodies (media titles/descriptions).

### `encLoc`

Percent-encodes a URL for sitemap loc emission — bucket keys can carry
literal spaces/non-ASCII which make RFC-3986-invalid URLs. decodeURI-
first keeps it idempotent (encodeURI escapes '%' itself).

### `encPath`

Encodes a route path one segment at a time so sitemap URLs preserve
separators while safely representing Unicode and reserved characters.

- `@param` {string} routePath Canonical path to encode.
- `@returns` {string} Percent-encoded route path.

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

### `licenseUrlOf`

`<image:license>` element — the locale's own license page; Google
Images surfaces the "Licensable" badge when both image:license (or
schema license metadata) and the page's ImageObject.license agree.

### `cachedShareDims`

Reads the `dims` map of a previously emitted share manifest from
META_DIR — the offline path reuses the cached probe result so an
LK_OFFLINE build doesn't strip intrinsic sizes the runtime wall
already packs against. Missing/partial docs resolve to null.

- `@param` {string} metaDir meta output dir the manifest was written to
- `@param` {string} manifestUrl token MANIFEST_URL (basename resolves)
- `@returns` {Map<string, number[]>|null} capture URL → [w,h], or null

### `shareVideoTags`

`<video:video>` tags for one share set's clip list — a recorded
engine capture dropped under a set's share/ prefix lists on the
playground URLs with the set's first image as thumbnail (Google
requires a poster frame) and the page's localized search themes as
<video:tag>.

### `epShareTagsFor`

Localized <image:image> + <video:video> tags for the whole share
set — titles and captions carry the locale's own earth-image
search themes; recorded clips (when present under the share
prefix) ride the same per-locale vocabulary.

### `sfShareTagsFor`

Localized <image:image> + <video:video> tags for the whole star
share set — titles and captions carry the locale's own star-image
search themes; recorded clips (when present under the share
prefix) ride the same per-locale vocabulary.

### `mediaTagXml`

XML media tags for one media item — image:image or video:video.
`themes` is the parent page's localized searchThemes list: images
get it as <image:caption>, videos as <video:tag> elements. `loc`
resolves the license page the <image:license> badge links.

### `projectPageTags`

Aggregated media tags for a project page — cover + every item,
deduped by resolved asset URL. `loc` binds image:license to the
locale's own license page.

### `readStarBody`

Star-field body dossier JSON for one locale — English fallback
(a missing locale file degrades to the canonical dossier, never a
gap).

### `sfPageThemes`

Localized search-theme list for the star-field page — feeds
<image:caption>/<video:tag> on body deep links.

### `starBodyTagsFor`

Media tags for one star-field body deep link — the dossier's own
credited gallery (Blue Marble, the Orion Earthrise clip, …)
becomes the page's image/video surface so object-media searches
in every language resolve to the dossier itself, not only the
index. A video tag requires a thumbnail: the body's first
dossier image stands in (every video-bearing dossier ships one);
a body with no image emits no video tag rather than an invalid
one.

### `addDocsNode`

Recursively adds each manifest page and its directory descendants.

- `@param` {object} node Scanned docs manifest node.

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

### `FEED_CREATOR`

Feed item author — matches the Person entity in the page JSON-LD.

### `FEED_CATEGORY_CAP`

Cap on <category> elements per item — keeps items compact while
covering every content-derived theme head (the shared identity
tail lands past the cap on long lists, which is intentional).

### `plain`

Strips CMS rich-text markup (tags, <br>, entities) to plain text.

### `firstSectionText`

First plain-text string inside a nested project `sections` tree.

### `bioOf`

Localized channel description — the locale's about bio, else en.

### `feedCategories`

`<category>` elements for one item — deduped, capped theme list.

### `rssItem`

One RSS item with a valid image enclosure or video plus optional
poster, its author, and the owning page's searchThemes as categories.

### `rssDoc`

Full RSS 2.0 document for one locale — pages first, then every
project with its cover media.

### `pageThemes`

Localized searchThemes of one page node, English as fallback.

### `legalDesc`

First authored paragraph of a legal page — falls back to its title.
