# `core\utils\data\footer-links.ts`

Shared footer-link helpers — the locale RSS feed URL +

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\data\footer-links.ts`                     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `FEED_VIEWBOX`

viewBox of the RSS glyph — one declaration for every consumer.

### `feedHrefFor`

Locale RSS feed URL — `/feed.xml` for English, `/<loc>/feed.xml`
otherwise; both are firebase rewrites onto the generated meta feeds.

- `@param` locale active locale code
- `@returns` root-relative feed path for that locale

### `sitemapHrefFor`

Localized sitemap-page URL — `/<sitemap>` for English,
`/<loc>/<localized-slug>` otherwise; mirrors the router's canonical
resolution (CMS slug overrides merged over LANG_SLUGS via routeSlugs).

- `@param` locale active locale code
- `@returns` root-relative sitemap path for that locale

### `animationsHrefFor`

Localized animations-page URL — `/<animations>` for English,
`/<loc>/<localized-slug>` otherwise; same routeSlugs resolution as
the sitemap link.

- `@param` locale active locale code
- `@returns` root-relative animations path for that locale

### `feedGlyph`

Inline RSS glyph — decorative (`aria-hidden`, the anchor's visible text
carries the accessible name). Paints in currentColor so it inherits the
link ink in every theme; the arcs carry the wave class that pulses them
outward on hover/focus (reduced-motion aware in each consumer's SCSS).

- `@param` iconClass class token for the <svg> element
- `@param` waveClass class token applied to each broadcast-arc <path>
- `@returns` the SVG element
