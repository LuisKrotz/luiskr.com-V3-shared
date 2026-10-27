# `shared\scripts\i18n\patch-earth-playground-share-themes.js`

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-earth-playground-share-themes.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.          |

## Members

### `TRANSLATIONS_MAP`

Earth Playground share-capture vocabulary — one entry per locale:
shareGallery — section heading for the capture set on the emitted page.
shareCapture — singular noun for one capture (alt text / figcaption).
searchThemes — localized terms that associate earth-image searches
with the portfolio (keywords meta + JSON-LD keywords).
Dialect fallbacks mirror patch-earth-playground-translations.js:
hrk → de, cas → es, riv → es, gn → es + Guaraní terms, tln → it.
