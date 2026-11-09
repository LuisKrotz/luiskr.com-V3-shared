# `shared\scripts\i18n\patch-sitemap-page.js`

One-shot migration: seeds the sitemap page's copy into

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-sitemap-page.js`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `LABELS`

Sitemap page copy — writes `APP.sitemap` (SECTION_UI_KEYS.SITEMAP, the
footer link label) and `pages.sitemap` (title + description + intro +
group names) into every locale so <legal-footer>/<awards-mentions> and
<view-sitemap> read in the visitor's language. "Sitemap" itself stays
untranslated where the loanword is standard (de/hrk/nl); `ru` is
Cyrillic per the site-wide directive; dialects follow their own
spelling (hrk Hunsrik, riv Riverense, tln Talian, gn Guaraní).

Idempotent — re-running rewrites the same leaves. Upload the APP +
pages nodes to Firebase separately (the live dictionary wins over
this snapshot).

### `DESCRIPTIONS`

Localized meta description + intro line for pages.sitemap.

### `GROUPS`

Localized names of the sitemap tree's branch groups.
