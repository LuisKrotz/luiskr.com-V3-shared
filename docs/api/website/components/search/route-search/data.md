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

Group headers for the kind-ordered result buckets.

### `pages`

PAGE bucket header (home + static pages).

### `portfolio`

PROJECT bucket header (portfolio items).

### `experiments`

EXPERIMENT bucket header (playgrounds + references).

### `legal`

LEGAL bucket header (statutory pages).

### (module scope)

The localized UI copy node (pages/not-found.search).

### `found`

"N results found" template — `{n}` is the match count slot.

### `groups`

Per-kind group headers — the docs bucket carries its own
English-only token instead (DOCS_STRINGS.SEARCH_GROUP_LABEL).

### `pager`

Pager region aria-label.

### `prev`

Previous-results-page button label.

### `next`

Next-results-page button label.

### `page`

"Page {a} of {b}" pager status template.

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

### `loadCopy`

`loadCopy` — the localized `pages/<loc>/search` copy node via the same
SWR snapshot flow every other page uses. `done` receives the resolved
node (null when the locale copy is absent) so the caller can re-template
— mirroring `loadCatalog`'s callback contract.

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

Wire entry shape in meta/search-index-*.json — {p,t,d,k,c,i,v}.

### (module scope)

ROUTE_SEARCH_KINDS discriminant — unknown/absent values land PAGE.

### (module scope)

Cover media src — the blur-up thumb variant is built from it.

### (module scope)

Video flag on the cover (1 = the thumb is the poster frame).

### `KIND_SET`

Every declared kind value — validates the wire `c` field.

### `toEntry`

Maps one wire index row to a catalog entry.

### `indexUrl`

The generated search-index URL for a locale (public meta dir).

### `docsIndexUrl`

The shared docs catalog URL — one English-only artifact for all locales.

### `docsRows`

Docs catalog promise — the artifact is locale-independent and the
corpus is English-only, so it resolves once and every locale switch
reuses the same entries. A failed fetch clears the slot so the next
catalog load retries instead of pinning the outage.

### `loadDocsRows`

`loadDocsRows` — fetches (once) the shared docs search index; resolves
to the mapped entries. Only a non-empty artifact pins the slot —
`!ok`, a non-array payload and a rejected fetch all resolve [] AND
reset it, so the next catalog load retries instead of caching an
outage for the rest of the session.

### `loadCatalog`

`loadCatalog` — the locale route catalog comes from the generated
`meta/search-index-<loc>.json` (the sitemap's URL set, enriched per
locale) merged with the shared docs index (English-only, fetched once
and reused across locale switches). When the locale artifact is
absent (dev without a build, offline test env) the embedded catalog —
static pages plus the store/SWR portfoliolist — is the fallback.

- `@param` lang Current locale code.
- `@param` done Receives the complete catalog (never throws).

### `orderByKind`

`orderByKind` — partitions scored hits into kind buckets ordered by
each bucket's best hit: the input arrives score-sorted, so a kind's
first occurrence index IS its group rank. A weak page keyword hit can
no longer outrank a strong project title match just because its kind
used to render first. The sort is stable, so the scorer's ordering
survives inside each bucket; undeclared kinds sort after every bucket.

- `@param` entries Score-ordered hits from the matcher.
- `@returns` The same hits partitioned into best-hit-ordered buckets.

### `groupLabel`

`groupLabel` — a kind's bucket header text. Localized labels come from
the CMS search copy node; the docs bucket always resolves to the
English-only DOCS_STRINGS.SEARCH_GROUP_LABEL token (the corpus exists
only in English, so the label names that in every locale).

- `@param` strings Resolved search copy node.
- `@param` kind The entry kind whose header is needed.
- `@returns` The group header text ('' for undeclared kinds).

### `embeddedFallback`

Embedded fallback path — store rows first, then a pages/home fetch.
