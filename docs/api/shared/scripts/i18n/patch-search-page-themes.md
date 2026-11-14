# `shared\scripts\i18n\patch-search-page-themes.js`

One-shot migration: injects a localized `searchThemes`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-search-page-themes.js`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `TRANSLATIONS_MAP`

Search page searchThemes — one localized vocabulary per locale so the
/search surface carries the metadata the indexation gate requires of
every CMS page node. Dialect fallbacks mirror the other patch
scripts: hrk → de, cas/riv → es, gn → es + Guaraní terms, tln → it.
