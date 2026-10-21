# `core\utils\schema.ts`

JSON-LD structured-data builders (Schema.org entities for

| | |
|---|---|
| **Source** | `src/core\utils\schema.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Award/press item as handed to the ItemList builder — label/title are display names, link/slug feed the target URL.

### (module scope)

Cover basename (no extension) under the CDN `covers/` folder.

### (module scope)

Ordered crumb for the BreadcrumbList builder — display name + absolute item URL.

### (module scope)

Inputs for the per-route base graph (Org + WebSite + WebPage + BreadcrumbList).

### `url`

Canonical absolute page URL — also the WebPage @id base.

### `name`

Localized page name (what the SERP shows).

### (module scope)

Localized meta description; falls back to the site description.

### (module scope)

Locale code ('br', 'de', …) — resolved to BCP-47 via LOCALE_TAGS.

### (module scope)

primaryImageOfPage URL; defaults to the global share image.

### (module scope)

Ordered crumbs ending at this page — emits BreadcrumbList when ≥2.

### (module scope)

Media descriptor inside project `sections` (and the project cover).

### (module scope)

Project translation slice the Article/VideoObject builders read — cover drives both image variants and the optional VideoObject.

### `generateWebsiteSchema`

Generates WebSite and Organization schema for the homepage.
- `@returns` JSON-LD entities

### `generateCarouselItemListSchema`

Generates an ItemList matching Google Carousel rich results guidelines —
`position` is 1-based per the spec, and `image` is only emitted when the
item carries a src (an absent property beats an empty one for parsers).
- `@returns` ItemList entity, or null when there is nothing to list.

### (module scope)

Recursively walks project `sections` (nested arrays of text strings
and media descriptors) yielding every node that carries a `src`. The
generator shape keeps traversal total — media descriptors are leaf
objects, so a matched node is yielded rather than descended into.

### `firstSectionText`

First text string in the nested sections array — the same paragraph
the project view promotes to the meta description, reused here so
Article/VideoObject descriptions match the emitted page text.

### `videoObjectFor`

VideoObject entity for one media descriptor — contentUrl/embedUrl
point at the CDN mp4 and thumbnailUrl at its jpg poster, the two
URLs Google's video crawler needs to index the asset.

### `generateProjectArticleSchema`

Generates an Article and cover VideoObject graph for a project detail
page. The Article `image` carries the real CDN asset — the full
uncompressed mozjpg for image covers, the video poster for video
covers — since the hypothetical aspect-ratio variants (-16x9/-4x3/
-1x1) never existed on the bucket and 404'd for crawlers.
- `@param` project - Project translation data
- `@param` slug - Project URL slug
- `@param` locale - Page locale (defaults to LOCALES.EN)
- `@returns` Array of Schema.org entities

### `generateBreadcrumbSchema`

BreadcrumbList entity from an ordered crumb trail — positions are
1-based per the spec. Returns null for an empty/absent trail so
callers can spread the result unconditionally.
- `@param` items Ordered crumbs ending at the current page.
- `@param` id    Optional @id the page entity's `breadcrumb` can point at.
- `@returns` BreadcrumbList entity or null.

### `generateRouteSchema`

Base per-route JSON-LD graph — Organization + WebSite (localized
inLanguage) + WebPage + optional BreadcrumbList. Emitted on every
navigation so crawlers never see a stale homepage graph on deep
links; views that own richer entities (project Article, docs
TechArticle) replace or extend this graph once their data resolves.
- `@param` options Route URL/name/description/locale/image/breadcrumb.
- `@returns` JSON-LD entities for updateJsonLd().

### `generateProjectSchema`

Complete project-page JSON-LD graph — the route base (Org + WebSite
+ WebPage + breadcrumb) plus the project Article, a media ItemList
whose entries deep-link to the emitted /portfolio/<p>/<media> URLs
(Google's carousel surface), and one VideoObject per section video
alongside the cover video the Article builder already emits. When a
`mediaSlug` deep link is active the graph recenters on that media:
the WebPage gets the media URL + label + its own asset, a third crumb
level appears, and a dedicated ImageObject/VideoObject leads the
graph — matching the static media pages the generator emits.
- `@param` project Localized project translation node.
- `@param` slug    Canonical project slug.
- `@param` locale  Page locale (defaults to LOCALES.EN).
- `@param` mediaSlug Active media deep-link segment (params.slug).
- `@returns` JSON-LD entities for updateJsonLd().

### (module scope)

Minimal manifest-node shape the docs schema reads — kept structural so `core` never imports from `experiments`.

### `generateDocsSchema`

Generates the docs-portal JSON-LD graph for a resolved docs path:
a `BreadcrumbList` mirroring the on-page crumb trail plus one page
entity — `CollectionPage` for the portal root and folders,
`TechArticle` for file pages (markdown/code/report payloads). English
is the only docs locale, so `inLanguage` is fixed to `en`.
- `@param` docsPath Manifest-relative path ('' → the portal root).
- `@param` node     Resolved manifest node (null at the root / on misses).
- `@returns` JSON-LD entities for updateJsonLd().

### `updateJsonLd`

Dynamically updates the JSON-LD script graph in the document head.
Maintains exactly one `<script type="application/ld+json">` node — an
array payload is wrapped in a `@graph` container so a single script can
carry the whole entity set (the form Google's parsers prefer), and
`textContent` (not innerHTML) writes it since JSON must not go through
the HTML parser. Passing `null`/`undefined` REMOVES the node — routes
that own a page-scoped graph (docs TechArticle, project Article) clear
it on teardown so the entity never leaks onto the next route.
- `@param` graph Entity or entity array; null/undefined removes the node.
