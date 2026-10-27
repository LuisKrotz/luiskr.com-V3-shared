# `core\locale\ui-text.ts`

Runtime translation accessors: resolve a dotted key against

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\locale\ui-text.ts`                              |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_dig`

Digs a dotted path ('a.b.c') into a possibly-partial object; null-safe.
The `cur == null → undefined` guard on each reduce step is what makes
missing intermediate nodes safe — `dig({}, 'a.b.c')` returns undefined
instead of throwing on the second key read. Translation dictionaries are
sparse during boot, so every lookup funnels through here.

### (module scope)

Structural view of the live `lang` store slice — the three fetched nodes.

### `appText`

Resolves a UI string from the live APP dictionary (store.lang.app, loaded
from Firebase for the current locale) with the English snapshot as fallback.

- `@param` path dotted path, e.g. 'media.preview' or 'pref.devTools.showGrid'

### `componentText`

Same lookup for the components dictionary (store.lang.components).

### `indexedText`

Resolves an indexed a11y template (`a11y.section` / `a11y.carousel` /
`a11y.paragraph`) and substitutes the `{index}` placeholder with the
1-based ordinal — the hidden navigation headings that let assistive-tech
users jump straight to a section, carousel, or paragraph. Templates keep
the placeholder so translators position the number freely.

- `@param` path dotted APP path, e.g. A11Y_UI_KEYS.A11Y_SECTION
- `@param` index 1-based ordinal inserted at the {index} placeholder
- `@returns` the localized label, e.g. 'Section 2' / 'Seção 2'

### `routeSlugs`

Route slugs for a locale: CMS-editable overrides (translations/<loc>/slugs,
loaded into store.lang.slugs) merged over the build-time LANG_SLUGS defaults.

- `@param` lang locale code, e.g. 'br'

### `rightsText`

Localized copyright line for the site footers — resolves
`source-code.rights` through the live-then-fallback dictionaries and
substitutes the `{year}` placeholder with the current calendar year so
the stored translation never goes stale.

- `@returns` e.g. 'Copyright © 2026 Luis Krötz'

### `rightsParts`

Segmented copyright line for the site footers — the same resolved
`rightsText()` split around the © glyph and the year so renderers can
wrap those two tokens in emphasis markup without hardcoding where the
translation places them. `post` carries any suffix after the year
(empty today, kept for translation freedom); when either anchor is
missing the whole line lands in `pre` and renders unsegmented.

- `@returns` {pre, copy, mid, year, post} — render as
