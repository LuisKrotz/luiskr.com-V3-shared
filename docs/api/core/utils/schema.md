# `core\utils\schema.ts`

JSON-LD structured-data builders (Schema.org entities for

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\schema.ts`                                |
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
- `@param` omitCoverVideo - Skip the cover VideoObject (deep-link watch
- `@returns` Array of Schema.org entities

### `generateBreadcrumbSchema`

BreadcrumbList entity from an ordered crumb trail — positions are
1-based per the spec. Returns null for an empty/absent trail so
callers can spread the result unconditionally.

- `@param` items Ordered crumbs ending at the current page.
- `@param` id Optional entity identifier the page's `breadcrumb` can point at.
- `@returns` BreadcrumbList entity or null.

### `generateRouteSchema`

Base per-route JSON-LD graph — Organization + WebSite (localized
inLanguage) + WebPage + optional BreadcrumbList. Emitted on every
navigation so crawlers never see a stale homepage graph on deep
links; views that own richer entities (project Article, docs
TechArticle) replace or extend this graph once their data resolves.

- `@param` options Route URL/name/description/locale/image/breadcrumb.
- `@returns` JSON-LD entities for updateJsonLd().

### (module scope)

Inputs for the Earth Playground graph — route base + WebApplication declaring the canvas-rendered control surface.

### `url`

Canonical absolute page URL — also the app entity @id base.

### `name`

Localized page name.

### (module scope)

Localized meta description; falls back to the site description.

### (module scope)

Locale code — resolved to BCP-47 via LOCALE_TAGS.

### `features`

Localized labels of every control group, row and action — WebApplication.featureList.

### `generateEarthPlaygroundSchema`

Earth Playground JSON-LD graph — the route base plus a WebApplication
entity whose `featureList` enumerates the whole localized control
surface (the panel is a WebGL canvas at runtime, so the schema is the
crawler-legible form of it). Mirrors the build-time entity emitted by
build-locale-pages.mjs so the post-hydration graph keeps parity with
the served document.

- `@param` options Route URL/name/description/locale + localized feature labels.
- `@returns` JSON-LD entities for updateJsonLd().

### (module scope)

One distribution file for a Dataset entity — absolute URL + encoding format.

### (module scope)

Prepared Dataset input — name/description/credit plus its downloadable files.

### `kind`

Dataset @id slug appended to the index URL (e.g. 'star' → #dataset-star).

### (module scope)

Inputs for the star-field index graph — route base + body ItemList + registry DataCatalog.

### `url`

Canonical absolute index URL — entity @id bases derive from it.

### `name`

Localized page name.

### (module scope)

Localized meta description; falls back to the site description.

### (module scope)

Locale code — resolved to BCP-47 via LOCALE_TAGS.

### `items`

Authored-body deep links — ItemList entries in catalog order.

### (module scope)

Localized heading for the registry DataCatalog (falls back to `name`).

### (module scope)

Prepared registry datasets — omitted when the manifest is unavailable.

### `generateStarIndexSchema`

Star-field index JSON-LD graph — the route base plus an ItemList that
enumerates every authored body deep link and a DataCatalog whose
Datasets point at the registry manifest, shard JSONs and the packed
binary, so the canvas star cloud's underlying 139,563-record catalog
is enumerable without WebGL. Mirrors the build-time entities emitted
by build-locale-pages.mjs for post-hydration parity.

- `@param` options Index URL/name/locale, body items, prepared datasets.
- `@returns` JSON-LD entities for updateJsonLd().

### (module scope)

Inputs for a star-field body dossier graph — route base + Article describing the catalogued object.

### `url`

Canonical absolute body-page URL — Article/object @id bases.

### `indexUrl`

Absolute star-field index URL — isPartOf + crumb target.

### `indexName`

Localized index name (the middle crumb + isPartOf label).

### `name`

Body display name — Article headline.

### (module scope)

Dossier tagline — Article/Thing description.

### (module scope)

Technical dossier facts — emitted as PropertyValue pairs on the object.

### (module scope)

Locale code — resolved to BCP-47 via LOCALE_TAGS.

### `generateStarBodySchema`

Star-field body JSON-LD graph — the route base (with a Home →
Star Field → body crumb) plus an Article whose `about` Thing carries
the dossier's technical facts as PropertyValue pairs. Mirrors the
build-time body entity so hydrated dossier deep links keep the same
structured data the static dossier pages serve.

- `@param` options Body/index URLs, names, tagline, facts, locale.
- `@returns` JSON-LD entities for updateJsonLd().

### `generateProjectSchema`

Complete project-page JSON-LD graph — the route base (Org + WebSite

- WebPage + breadcrumb) plus the project Article, a media ItemList
  whose entries deep-link to the emitted /portfolio/<p>/<media> URLs
  (Google's carousel surface), and one VideoObject per section video
  alongside the cover video the Article builder already emits. When a
  `mediaSlug` deep link is active the graph recenters on that media:
  the WebPage gets the media URL + label + its own asset, a third crumb
  level appears, and a dedicated ImageObject/VideoObject leads the
  graph — matching the static media pages the generator emits.

* `@param` project Localized project translation node.
* `@param` slug Canonical project slug.
* `@param` locale Page locale (defaults to LOCALES.EN).
* `@param` mediaSlug Active media deep-link segment (params.slug).
* `@returns` JSON-LD entities for updateJsonLd().

### (module scope)

Minimal manifest-node shape the docs schema reads — kept structural so `core` never imports from `experiments`.

### `generateDocsSchema`

Generates the docs-portal JSON-LD graph for a resolved docs path:
a `BreadcrumbList` mirroring the on-page crumb trail plus one page
entity — `CollectionPage` for the portal root and folders,
`TechArticle` for file pages (markdown/code/report payloads). English
is the only docs locale, so `inLanguage` is fixed to `en`.

- `@param` docsPath Manifest-relative path ('' → the portal root).
- `@param` node Resolved manifest node (null at the root / on misses).
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

### `setRobotsMeta`

Single authority for the document's `<meta name="robots">` — sets
`noindex, nofollow` when `noindex` is true and the index-rich directive
(`index, follow, max-image-preview:large, max-snippet:-1,
max-video-preview:-1`) when false. Indexable routes keep an explicit
meta instead of none because `max-image-preview:large` is the opt-in
Google/Bing require for large image cards and Discover previews —
the absent-meta default only grants standard-size image previews.
Every surface that can resolve to a non-indexable state must route
through this: the not-found route, missing project snapshots, media
deep-link slugs that fail to resolve in the active locale, and draft
projects (data.noindex). A route that serves content MUST be a 200
whose canonical points at itself; anything else is a soft-404 and must
noindex rather than compete with the real page.

- `@param` noindex Whether the current route must be excluded from indexes.
