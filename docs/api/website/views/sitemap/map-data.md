# `website\views\sitemap\map-data.ts`

Data model for &lt;view-sitemap&gt; — builds the site link

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\sitemap\map-data.ts`                 |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One node of the sitemap link tree — groups, pages and leaves.

### `label`

Visible label — group name, page title, locale code or filename.

### `href`

Navigation target — empty on the synthetic root and on groups.

### `depth`

Tree depth (0 root, 1 group, 2 page, 3 leaf).

### `children`

Child nodes — empty on leaves.

### `dir`

True on group + page nodes (the layout's "dir" flag).

### (module scope)

Locale code when the leaf is a localized page variant.

### (module scope)

Descriptive tooltip — the media object's CMS label.

### (module scope)

Card media payload — present only on media-bearing page nodes
(project media + playground share captures).

### (module scope)

Group renders collapsed; the children mount on first open.

### (module scope)

Group children lay out as a packed media-card wall (the skyline
masonry), not the stacked page list.

### (module scope)

Group spans the full index grid and flows its page rows into
multi-column tracks — long flat lists (portfolio) stop reading
as one tall single column.

### (module scope)

Stable group id (SitemapGroupKey) — locale-proof identity for the
view's open-state map and aria-controls region ids. Set on every
group node; page/leaf nodes leave it undefined.

### (module scope)

One card's media payload — the view resolves `kind` to its element:
'figure' mounts <media-figure> (the progressive thumb→ladder loader;
`src` is the extensionless CDN stem, folder already joined), 'img'
mounts a plain lazy <img> at the absolute capture URL (playground
share screenshots have no mozjpeg ladder — the file IS the source).

### `kind`

Renderer pick — 'figure' | 'img'.

### `src`

'figure': extensionless stem relative to the CDN base.
'img': the absolute file URL.

### (module scope)

Video flag — figure videos autoplay muted in viewport.

### (module scope)

Intrinsic [w,h] from the CMS record — drives mosaic packing.

### (module scope)

Expand-modal affordance (project media only).

### (module scope)

`pages.sitemap` CMS node — title/intro/group labels per locale.

### (module scope)

Group keys in `pages.sitemap.groups` — the seven section branches.

### `GROUP_LABEL_FALLBACKS`

English group-label fallbacks — used only while the CMS node loads.

### (module scope)

One CMS media record inside a project's cover/sections.

### (module scope)

Extensionless CDN stem inside the project folder.

### (module scope)

Video rows resolve to .mp4; stills to .jpg.

### (module scope)

The CMS caption — the leaf's tooltip.

### (module scope)

Intrinsic [w,h] — mosaic packing + the figure's aspect box.

### (module scope)

Whether the figure may open the expand modal.

### (module scope)

The `translations/<loc>/projects/<slug>` node shape consumed here.

### (module scope)

The fetched `translations/<loc>/projects` map (slug → project).

### (module scope)

The fetched projects maps for every locale (locale → slug →
project) — the media branch derives each item's per-locale deep-link
slug from that locale's translated labels.

### (module scope)

One playground share-capture manifest the view fetched
(`/meta/<experiment>-share.json`) plus the localized per-capture
label (`pages.<experiment>.shareCapture`). `images`/`videos` hold
absolute CDN file URLs — the build emits one row per capture.

### (module scope)

Absolute screenshot URLs under the set's share/ prefix.

### (module scope)

Absolute recorded-clip URLs under the same prefix.

### (module scope)

Capture URL → intrinsic [w,h] probed at manifest build time —
drives the wall's packed-card aspect (absent → generic box).

### (module scope)

Display-locale per-capture label ("Earth render"/"Star render").

### (module scope)

The two share sets — keyed by their playground branch.

### (module scope)

Earth Playground share captures.

### (module scope)

Star Field share captures.

### `PAGE_ROWS`

One {label, slug-key} row of the static pages branch — every row is a
first-class route slug, so per-locale hrefs come from routeSlugs.

### `localeTail`

Locale-prefixed URL for a raw path tail — `portfolio/x` under 'br'
becomes `/br/portfolio/x`; the English form stays unprefixed.

- `@param` tail Path without leading slash.
- `@param` locale Locale code.
- `@returns` Root-relative localized path.

### `slugHref`

Localized URL for a slug-table key — `routeSlugs` merges CMS slug
overrides over the build-time LANG_SLUGS table.

- `@param` key LANG_SLUGS route key.
- `@param` locale Locale code.
- `@returns` Root-relative localized path.

### `tailSlug`

Last path segment of a link — portfolio entries store 'portfolio/x'
tails (or full '/portfolio/x' paths); the bare slug is what the
locale prefix needs.

- `@param` link Stored link value.
- `@returns` Bare trailing slug.

### `localeLeaves`

The localized leaf rows under a page node — one per supplied locale.

### `pageNode`

A page node — label + current-locale href, with one locale leaf per
supplied locale.

- `@param` labelText Visible page name.
- `@param` hrefFor Locale → URL builder.
- `@param` locales Locales the page exists in (docs is English-only).
- `@returns` The depth-2 page node.

### `legalLeafHref`

Re-targets a stored legal link onto another locale — the CMS stores
the current locale's paths; other locales rebuild from the slug tail
through their own slug table.

- `@param` link Stored legal link path.
- `@param` locale Target locale.
- `@returns` Localized legal path.

### `projectNodes`

Portfolio project rows — built from the fetched `projects` map
({slug → {title, cover, folder, sections}}), never the home-only
portfoliolist store slot (which is empty off the home route).

- `@param` projects The `translations/<loc>/projects` map.
- `@returns` Page nodes, one per project, each with 16 locale leaves.

### `sectionsMedia`

The ordered section media items of one project — the same
section → group → item traversal views/project/modal.ts walks, so
per-locale lists stay index-aligned (only src-bearing items count,
exactly like the modal's `label && item.src` gate).

- `@param` project The project record.
- `@returns` Flat media rows in document order.

### `allMedia`

The full media row list of one project — cover first (it is the
page's first visual, at scroll top), then the section items in
document order.

- `@param` project The project record.
- `@returns` Cover + section media rows.

### `mediaSlug`

Canonical deep-link slug for one media item — `mediaSlugSeq` against
the project's per-locale `seen` map, the identical convention
modal.ts + the build emit use, so `<label>-2` ordinals never drift.
The cover and unlabeled rows get no slug (the modal only sequences
labeled section items).

- `@param` item The media record.
- `@param` cover True for the cover row — never slug-addressable.
- `@param` seen The per-(project, locale) slug sequence map.
- `@returns` The canonical slug, or '' when not modal-addressable.

### `mediaItemNodes`

One media page-block — `<project>: <label>` (label already starting
with the project title is used as-is; missing labels fall back to the
file name) with one locale leaf per language. Each leaf deep-links to
the media in THAT locale (`/<loc>/portfolio/<slug>/<media-slug>`,
derived from that locale's translated labels — the modal auto-opens
on hit); rows that are not modal-addressable fall back to the
localized project page, and the leaf's tooltip shows the item's
caption in that leaf's language.

- `@param` projectsByLocale All locales' projects maps.
- `@param` slug The project slug.
- `@param` current The display locale (drives the block's own href).
- `@returns` Depth-2 page nodes, one per media item of the project.

### `shareHrefFor`

One share capture's deep-link leaf target — captures live on their
playground route (there is no per-capture page), so every leaf points
at the localized playground URL.

- `@param` slugKey The playground route slug key.
- `@returns` The locale → href builder.

### `shareStem`

Strips an absolute share-capture URL back to the extensionless CDN
stem <media-figure> consumes — `experiments/…/share/foo.mp4` →
`experiments/…/share/foo`. The figure re-appends its own poster/webm/
mp4 grammar, manifest-gated so only proven variants are requested —
that is what keeps a missing poster frame off the wire (the old raw
<img> requested it blind and rendered the broken-image glyph).

- `@param` url Absolute capture URL from the share manifest.
- `@returns` CDN_BASE-relative stem (unknown prefixes pass through).

### `shareMediaNodes`

Playground share-capture media nodes — one card per screenshot/clip
under each experiment's share/ prefix, titled `<Playground>: <capture
label> N`, linking back to the localized playground route. Images
carry 'img' payloads (absolute URLs, no ladder exists); videos carry
'figure' payloads on the stripped stem so they inherit viewport
autoplay + manifest-gated sources.

- `@param` title The playground's display-locale title.
- `@param` input The fetched share set + localized capture label.
- `@param` slugKey The playground route slug key.
- `@param` current The display locale (drives the block's own href).
- `@returns` Depth-2 page nodes, one per capture.

### `buildSitemapTree`

Builds the full sitemap link tree — group labels come from the
`pages.sitemap` node the view fetched (live locale first, bundled EN
snapshot via FALLBACK_PAGES when absent); portfolio + media rows come
from the per-locale `projects` maps the view fetched (the display
locale's map labels the rows; every locale's map feeds the media
leaf slugs).

- `@param` page The fetched `pages.sitemap` CMS node, when available.
- `@param` projectsByLocale All locales' `translations/<loc>/projects` maps.
- `@param` shares The fetched playground share-capture sets (the
- `@returns` The synthetic root node; children are the section groups.
