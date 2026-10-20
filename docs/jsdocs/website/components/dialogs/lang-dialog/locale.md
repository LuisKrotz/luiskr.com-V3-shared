# `website/components/dialogs/lang-dialog/locale.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/dialogs/lang-dialog/locale.ts`  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `localeUrl`

`localeUrl` — the pure half of a locale switch: resolves the current
route's URL in `newLang` without committing anything. Rendered as the
lang options' `href` so translated routes are real links (crawlable,
open-in-new-tab); `applyLang` pushes the same path on plain clicks.

- `@param` newLang Target locale code (EN yields the unprefixed root).
- `@returns` The localized path for the current route.

### `applyLang`

Applies the chosen locale: commits the language + rewrites the URL.
