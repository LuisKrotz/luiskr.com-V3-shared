# `website\views\sitemap\Sitemap.tsx`

&lt;view-sitemap&gt; — the localized /sitemap page: the full

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\sitemap\Sitemap.tsx`                 |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One playground page node's share fields as fetched per locale.

### (module scope)

Localized per-capture label ("Earth render"/"Star render").

### (module scope)

One fetched share manifest — only the fields the index consumes.

### (module scope)

Absolute screenshot URLs under the set's share/ prefix.

### (module scope)

Absolute recorded-clip URLs under the same prefix.

### (module scope)

Capture URL → intrinsic [w,h] probed at manifest build time —
packs the media wall at the capture's real aspect.

### `ViewSitemap`

The ViewSitemap — sitemap page class.

### `_page`

Fetched pages.sitemap node (title/intro/group labels).

### `_projects`

Fetched translations/<loc>/projects maps, one per locale —
portfolio titles come from the display locale's map; media leaf
slugs need every locale's translated labels.

### `_projectsLoaded`

Whether the all-locales projects fetch already ran — unlike the
page node it covers every language, so it loads once, not per
locale switch.

### `_shareManifests`

Fetched share manifests — locale-free, loaded once.

### `_sharesLoaded`

Whether the two share-manifest fetches already ran.

### `_playPages`

Fetched playground page nodes — refetched per locale for the
localized shareCapture labels.

### `_lastLocale`

Locale the page node was fetched for — refetched on switches.

### `_openGroups`

Open collapsible groups, keyed by their stable SitemapGroupKey —
media branches start closed so hundreds of media cards mount only
on first open.

### `_spinKey`

Group key the user just toggled — its chevron stamps the one-shot
spin class on the very next render (the view re-creates nodes per
render, so a transition can't replay; the keyframe animates the
newborn node). Consumed + cleared inside render so a stray
rerender doesn't restamp the animation.

### `_wallW`

Measured wall width the packs were computed at — repack trigger.

### `_packedCache`

Packed-wall memo per group signature (key|width|count) — repacks
only when the wall width or the item count actually changed.

### `_ro`

Host ResizeObserver driving repacks on real width changes.

### `_openBeforePrint`

Pre-print `_openGroups` snapshot — afterprint restores the user's
disclosure state so the print prep's expand-all doesn't leak into
the live screen session.

### (module scope)

Lifecycle: releases the wall ResizeObserver + the print hooks.

### (module scope)

Print-prepare answer — the adapter's walk runs right after this
event, so every collapsible media group must be open NOW: closed
groups mount no children at all, which would print an empty media
branch. The user's open set is snapshotted for afterprint, then the
full tree re-renders with every group expanded.

### (module scope)

Restores the user's disclosure state after the print sheet closes.

### (module scope)

Reloads the sitemap page node + projects on locale switch.

### (module scope)

Fetches translations/<loc>/pages/sitemap + /projects (SWR).

### (module scope)

The share sets the tree consumes — manifest URL lists plus each
set's localized per-capture label from its playground page node.

### (module scope)

Measures the wall's content width (the index nav's — wide groups
span its full grid) and repacks when it moved past the epsilon.
Called by the host ResizeObserver and before a group opens so the
first painted wall is already sized correctly.

### (module scope)

The packed wall for one mosaic group — memoized per group key at the
measured wall width (recomputing a ~500-tile skyline on every render
would stack the whole pack inside each _updateDom pass).

- `@param` group The mosaic group node.
- `@returns` The packed tile geometry, or null while unmeasurable.

### (module scope)

Flips a collapsible group open/closed. Measuring BEFORE the flip
lets the first opened wall paint at its real width instead of
packing at the estimate and shifting.

- `@param` key The group's stable SitemapGroupKey.

### (module scope)

One packed media card — the title link FIRST (DOM order = visual
top caption overlay), then the media layer, then the locale chips
(bottom overlay). Media resolves to <media-figure> (progressive
thumb → manifest-proven quality ladder; videos autoplay muted in
viewport) or a plain lazy <img> for share captures, which have no
mozjpeg ladder to climb — the file IS the full-quality source.

- `@param` node The media page node.
- `@param` style The tile's packed position/size style object.

### (module scope)

JSX template — h1 + intro, then the DOM link index: nested groups →
pages → locale/media chips, every anchor SPA-routed on plain clicks.
Collapsible groups (media walls) mount their children on first open.
