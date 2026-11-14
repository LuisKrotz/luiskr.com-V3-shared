# `shared\scripts\i18n\patch-project-dates.js`

Seeds `date` + `modified` on every project node in every

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-project-dates.js`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `nodeHash`

Stable fingerprint of a project node — sha256 over the canonical JSON
with the date fields stripped, so re-running after a patch never
counts the migration itself as a content change.
