# `website\components\search\route-search\data.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\search\route-search\data.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One catalog row — the fields the scorer and the row renderer read.

### `path`

Canonical localized URL to push on activate.

### `title`

Row title.

### `preview`

One-line "what's inside" preview.

### `keywords`

Match keywords (searchThemes + slug + title words).

### `kind`

ROUTE_SEARCH_KINDS discriminant.

### `thumb`

Cover thumbnail URL (projects only; '' otherwise).

### (module scope)

The localized UI copy node (pages/not-found.search).

### (module scope)

A home portfoliolist row — the fields this catalog consumes.

### (module scope)

Loose shape of a pages/* fallback node — only the fields read here.

### `page`

Reads a fallback page node with a loose shape.

### `themes`

Search-themes list for a page node — empty array when absent.

### `searchStrings`

The `search` copy node — live translation first, English fallback
snapshot second. The node lives under `pages/search`:
`{ title, description, link, search }`.

### `locPrefix`

Locale prefix — '' for English, '/br' etc. for every other locale.

### `staticEntries`

The static half of the catalog: home + section anchors + legal pages +
experimental surfaces + the docs portal. Titles resolve through the
same appText/componentText sources route meta uses, so a locale switch
renames the rows identically to the page titles themselves.

- `@param` lang Current locale code.
- `@returns` Static route entries in menu order.

### `projectEntries`

The portfolio half — one `/portfolio/<link>` entry per row in the home
portfoliolist, hydrated with the row's label/description/cover.
Accepts the CMS node in either shape it can arrive (array or keyed
object — Firebase serializes arrays as objects on some paths).

- `@param` items Raw portfoliolist rows.
- `@param` lang Current locale code.
- `@returns` Project route entries in list order.

### `portfolioRows`

Normalizes the portfoliolist node — array or keyed object.

### (module scope)

Wire entry shape in meta/search-index-<loc>.json — {p,t,d,k}.

### `indexUrl`

The generated search-index URL for a locale (public meta dir).

### `loadCatalog`

`loadCatalog` — the full ~1100-route locale catalog comes from the
generated `meta/search-index-<loc>.json` (the sitemap's URL set,
enriched per locale). When the artifact is absent (dev without a
build, offline test env) the embedded catalog — static pages plus
the store/SWR portfoliolist — is the fallback.

- `@param` lang Current locale code.
- `@param` done Receives the complete catalog (never throws).

### `embeddedFallback`

Embedded fallback path — store rows first, then a pages/home fetch.
