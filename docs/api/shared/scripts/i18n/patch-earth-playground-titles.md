# `shared\scripts\i18n\patch-earth-playground-titles.js`

One-shot migration: rewrites each locale's

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-earth-playground-titles.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.    |

## Members

### `TRANSLATIONS_MAP`

Earth Playground query-aligned titles + descriptions — one entry per
locale. `title` feeds <title>/h1/breadcrumbs/WebPage.name and now
carries each locale's own "earth simulation" phrasing (the page's
single strongest on-page signal for that query); `description`
leads with the same term so the meta description snippet matches.
Dialect fallbacks mirror patch-earth-playground-share-themes.js:
hrk → de, cas → es (voseo), riv → es (voseo), gn → es + Guaraní
mix (as the locale's own content already does), tln → it.
