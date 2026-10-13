# `shared/scripts/build/build-locale-pages.mjs`

Emits per-locale, per-route static index.html files into

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/build/build-locale-pages.mjs`                         |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `esc`

Escape a string for use inside an HTML attribute or text node.

### `toDescription`

Strips markup from a translated rich-text string and compacts it into a
meta-description-sized plain-text snippet (≤160 chars, cut at a word
boundary). &nbsp; entities decode to regular spaces so the tag can sit
in a content attribute.

### `writeCompressed`

Brotil + gzip siblings next to each emitted index.html (Firebase serves them).

### `localize`

Rewrites the English shell into a localized document.

- `@param` {string} html - post-loader dist/index.html source
- `@param` {object} o
- `@param` {string} o.bcpLang - BCP-47 tag for <html lang> + og:locale alt
- `@param` {string} o.ogLocale - og:locale value (xx_YY)
- `@param` {string} o.title - document + social title
- `@param` {string} o.description - meta description text
- `@param` {string} o.url - canonical absolute URL for this page
- `@param` {Array<{bcp:string,url:string}>} o.alternates - hreflang rows

### `buildLocalePages`

Generates all localized pages under `distDir`. When `template` is omitted
the post-loader dist/index.html is read from disk; when provided (the
build orchestrator's in-memory copy) the localized root document is
returned so the caller can run its own compress/SW-stamp pass.

- `@param` {string} distDir - absolute dist path
- `@param` {string} [template] - shell HTML; defaults to dist/index.html on disk
- `@returns` {{html: string, written: number, locales: number}} localized root html + counts

### `t`

Per-locale lookup with English fallback (mirrors runtime appText).

### `routesFor`

Route table: path-suffix → title + canonical-equivalent alternates path.

### `syncFirebaseRewrites`

Regenerates the `hosting.rewrites` block in firebase.json so the public
locale URLs (`/br`, `/br/sobre`, …) keep serving the pages now emitted
under `dist/langs/<loc>/…`. Firebase rewrite destinations are single
files — no glob capture — so the table enumerates every route the same
way `routesFor` does. Preserves every non-rewrite hosting key and the
meta/CMS/SPA-catch-all entries declared in `STATIC_REWRITES`.

### `META_FILE_REWRITES`

Rewrites that sit before the locale table — meta files moved into
public/meta/ keep their root URLs through these entries. Per-locale
sitemap files and localized agent-readable files (robots/urllist/llms/
ai-catalog under /meta/<loc>/) keep their `/<loc>/<file>` URLs.

### `SPA_REWRITES`

CMS + SPA catch-all — always last.
