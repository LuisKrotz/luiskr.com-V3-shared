# `website\tests\coverage\pages\sitemap-map-data-tails.test.js`

Coverage tail for views/sitemap/map-data — the sitemap

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\pages\sitemap-map-data-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.           |

## Members

### `S`

Slash char alias — path literals below stay readable without escapes.

### `projectUrl`

Portfolio URL builder — `/portfolio/<slug>` under EN, `/<loc>/…` else.

### `EN_PROJECT`

Minimal two-locale projects fixture — the BR labels differ so
per-locale media slugs exercise the translation path; media srcs are
identical so the index-alignment check passes.

### `BR_PROJECT`

Portuguese project fixture — media rows cover the unlabeled/video arms.

### `projectsByLocale`

Per-locale project maps — the sitemap builder iterates locales over these.

### `mediaGroup`

Finds the media group — the first mosaic group (precedes playgroundMedia).
