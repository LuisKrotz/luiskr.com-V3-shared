# `website\tests\coverage\pages\sitemap-map-data-tails.test.js`

Coverage tail for views/sitemap/map-data — the sitemap

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\pages\sitemap-map-data-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.           |

## Members

### `projectUrl`

Portfolio URL builder — `/portfolio/<slug>` under EN, `/<loc>/…` else.

### `EN_PROJECT`

Minimal two-locale projects fixture — the BR labels differ so
per-locale media slugs exercise the translation path; media srcs are
identical so the index-alignment check passes.

### `mediaGroup`

Finds the media group — the first mosaic group (precedes playgroundMedia).
