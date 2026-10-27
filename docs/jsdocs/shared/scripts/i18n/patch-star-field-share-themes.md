# `shared\scripts\i18n\patch-star-field-share-themes.js`

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-star-field-share-themes.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.    |

## Members

### `STAR_MAP`

Star Field share-capture vocabulary — one entry per locale:
shareGallery — section heading for the capture set on the emitted page.
shareCapture — singular noun for one capture (alt text / figcaption).
searchThemes — localized terms associating star/galaxy image searches
with the portfolio (keywords meta + JSON-LD keywords).
Dialect fallbacks mirror the earth patch: hrk → de, cas → es, riv → es,
gn → es + Guaraní terms, tln → it.
