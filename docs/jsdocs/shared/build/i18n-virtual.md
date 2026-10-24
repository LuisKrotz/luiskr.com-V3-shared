# `shared\build\i18n-virtual.mjs`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\build\i18n-virtual.mjs`                     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `i18nFallbackPlugin`

Build-time snapshot of the English UI copy (APP + components + not-found)
from database.json: the single source of truth for every fallback string
in the bundle. CMS edits flow through Firebase at runtime; this snapshot
only guarantees the UI never renders an empty label.

- `@param` {object} opts Options.
- `@param` {string} opts.root Repo root containing database.json.
- `@returns` {import('vite').Plugin} The plugin instance.

### `i18nBootPlugin`

Per-locale snapshots of database.json emitted as lazy chunks:
virtual:i18n-boot/<locale>/core → APP, components, pages
virtual:i18n-boot/<locale>/projects → projects
The site renders from these immediately (static-first) and revalidates
against Firebase in the background (see core/utils/data/db.ts).

- `@param` {object} opts Options.
- `@param` {string} opts.root Repo root containing database.json.
- `@returns` {import('vite').Plugin} The plugin instance.
