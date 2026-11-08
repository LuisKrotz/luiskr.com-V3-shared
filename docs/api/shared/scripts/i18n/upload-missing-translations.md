# `shared\scripts\i18n\upload-missing-translations.js`

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\upload-missing-translations.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.  |

## Members

### `DRY_RUN`

upload-missing-translations.js — fills every key that exists in the
build-time `database.json` snapshot but is absent from live Firebase RTDB,
for all 16 locales. The diff walks each locale tree and pushes the
_shallowest_ missing subtree (a whole absent node uploads in one write;
partially-present nodes descend until the missing leaf). Leaf values that
differ from live are reported but NEVER overwritten — live CMS edits stay
authoritative.

Usage:
node shared/scripts/i18n/upload-missing-translations.js # pushes
node shared/scripts/i18n/upload-missing-translations.js --dry # plan only

Requires: firebase CLI logged in (same convention as
upload-search-themes-firebase.js — `firebase database:set <path> <file> -f`).

### `fetchLive`

GETs a public RTDB node as JSON (translations are world-readable).

### `push`

Writes `data` to `rtdbPath` via the Firebase CLI, through a temp file.

### `diff`

Recursively collects the missing subtrees and differing leaves of `snap`
against `live`. A subtree missing at `live` lands in `missing` whole —
its children are never enumerated. A present-but-different scalar/array
lands in `differs` (reported, never written).
