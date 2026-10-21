# `shared\scripts\i18n\patch-animation-descriptions.js`

Seeds the animated-element accessibility descriptions into

| | |
|---|---|
| **Source** | `src/shared\scripts\i18n\patch-animation-descriptions.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `APP_LABELS`

Route/nav label for the animations-reference hub — APP.animations.

### `PAGES`

Hub page chrome — pages.animations.{title,description} per locale.
 `description` doubles as the page intro paragraph and the meta/SERP
 snippet, so it names exactly what the records carry.

### `SLUGS`

Per-locale slug for the animations-reference route — mirrors
 `LANG_SLUGS[loc].animations` in core/locale/lang-slugs.ts so the CMS
 slug-override table carries the full key set.

### `setPath`

Sets `obj`'s leaf at a dot-path, creating intermediate containers.
