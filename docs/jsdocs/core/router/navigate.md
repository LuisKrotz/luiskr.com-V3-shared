# `core\router\navigate.ts`

| | |
|---|---|
| **Source** | `src/core\router\navigate.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ANCHOR_SCROLL_DELAY`

ms to wait before scrolling to an anchored route's marker element.

### `isCmsPath`

The CMS is a separate document/app (cms/index.html) — /cms and /admin
are hard navigations so the CMS boots in isolation. In production the
firebase.json rewrites cover this; in dev Vite resolves /cms to the
CMS document directly. The clean /cms path keeps index.html out of the
address bar — the rewrite stays internal to hosting.

### `setMetaContent`

Writes `content` into one head <meta> selected by `selector`; no-ops when
absent. Exported for views that resolve their title asynchronously
(project data lands after navigation) and must keep the social mirrors
in step.

### `setMetaDescription`

Pushes a resolved description into every description-bearing head meta —
description, og:description, twitter:description, DC.Description and
og:image:alt (the share card's alt text mirrors the snippet). Views call
this after their localized content node resolves, since route parsing
runs before the per-locale data chunks land.

### `syncDocumentHead`

document.title + canonical <link> sync for the resolved route — extended
to the social/url mirrors (og:title, twitter:title, DC.Title, og:url,
twitter:url) so every head tag agrees with the active route instead of
keeping the homepage values the shell booted with. `meta.canonical`
normalizes alias URLs (e.g. /portfolio/brazilian-leather → /portfolio/cicb);
`meta.description` feeds the description metas via setMetaDescription.

### `buildRouteJsonLd`

Base JSON-LD entities for a resolved route — exported so views whose
localized descriptions resolve post-navigation (home/about) can
re-emit the graph with the real description instead of the parse-time
fallback, and so rich views can append entities to the same base.
`canonicalOverride` lets syncDocumentHead pass the URL it already
computed for the <link canonical> so both stay identical.
- `@param` to Resolved route descriptor.
- `@param` canonicalOverride Canonical URL; recomputed from `to` when absent.
- `@param` description Description override (post-fetch localized text).
- `@returns` JSON-LD entity array for updateJsonLd().

### `syncScroll`

Anchored routes (#about/#contact) wait 300ms — long enough for the
home view's dynamic chunk to mount its shadow DOM — then
deepQuerySelector pierces that shadow to find the marker element.
All other routes hard-reset to top so the new view doesn't inherit
the previous page's scroll depth.

### (module scope)

Runs the redirect-capable before hooks; resolves true when nav proceeds.

### (module scope)

Full navigation pipeline — the space-playground chunk is preloaded
when navigated to, since it's excluded from the idle route warmer
for size.
