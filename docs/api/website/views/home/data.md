# `website\views\home\data.ts`

Data loading for &lt;view-home&gt;: three SWR sources fetched

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\home\data.ts`                        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `isFeatured`

Featured detection accepts three sources: explicit boolean/string/1
on the item itself (CMS stores typed values loosely), or membership
in featuredLinks — the set built from components/projects entries
flagged at the canonical source. Either path spans the tile 2 cols.

### `processedItems`

Projects list reshaped for the mosaic. The DB stores portfoliolist
as either an array or a keyed object (locale-dependent), so both
shapes normalize to an array; each item gets a computed `featured`
flag driving the 2-column span in the masonry layout.

### `awardSchemaItems`

Mention rows (awards/press) → carousel ItemList entries — the same
records <mentions-deck> renders, shaped for
generateCarouselItemListSchema so the award strip indexes as a Google
list/carousel. `src` is the CDN-relative badge path the builder
prefixes; the hidden sr-only span is the item's long description.

### `emitHomeJsonLd`

Base route graph (Org + WebSite + WebPage) composed with the
portfolio ItemList and the awards/mentions ItemList — replaces the
graph syncDocumentHead emitted so the WebPage entity survives
alongside the carousel data. Called again when the localized bio lands
so WebPage.description carries the real text instead of the
parse-time site fallback.

### `applyHomeSnapshot`

Applies the pages/home snapshot: store commit, JSON-LD, re-render.

### `loadHomeData`

Loads the three home data sources in parallel via SWR.

### `onHomeStoreUpdate`

Store change → reload all data on locale switch.
