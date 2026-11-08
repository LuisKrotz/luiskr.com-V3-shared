# `shared\scripts\build\generate-search-index.mjs`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\generate-search-index.mjs`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `stripHtml`

stripHtml — CMS descriptions carry markup; previews are plain text.

### `firstText`

`firstText` — first plain-text paragraph inside a project's sections.

### `truncate`

`truncate` — previews cap at 160 chars on a word boundary.

### `mediaRows`

`mediaRowsOf` mirror — labelled media items → {slug,label} in order.

### `titleCase`

`titleCase` — a slug segment becomes a display title fallback.

### `sitemapPaths`

Load a locale's sitemap paths (relative, decoded).

### `starBody`

Star-body display data — `name`/`tagline` per body file (en fallback).

### `classify`

`classify` — resolves a sitemap path into {t,d,k} for `loc`:
home, static pages (slugs), portfolio project, media deep link,
star-field body, docs path.

### `docsEntries`

Docs-portal routes — every manifest file leaf becomes a `/docs/<root>/<rel>`
entry. Canonical strips locale (parsePath declares `/docs/x` for `/<loc>/docs/x`),
so the same un-prefixed set lands in every locale's index.
