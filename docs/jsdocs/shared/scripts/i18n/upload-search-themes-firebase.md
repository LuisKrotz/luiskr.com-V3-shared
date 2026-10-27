# `shared\scripts\i18n\upload-search-themes-firebase.js`

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\upload-search-themes-firebase.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.    |

## Members

### `db`

upload-search-themes-firebase.js — pushes ONLY the `searchThemes`
key of every page node and every project to Firebase RTDB, so the
live translations gain the keyword vocabulary added by
patch-all-pages-search-themes.js without re-uploading whole pages
(the per-node write keeps unrelated authored content untouched).

Usage: node shared/scripts/i18n/upload-search-themes-firebase.js
Requires: firebase CLI logged in (same convention as
upload-star-field-firebase.js — `firebase database:set <path> <file> -f`).

### `push`

Writes `data` to `rtdbPath` via the Firebase CLI, through a temp file.
