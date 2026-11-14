# `experiments\star-field\tests\star-field.test.js`

Module integrity suite for the star-field experiment —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\star-field.test.js`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `moduleRoot`

Repo root for the star-field module — the data fixtures live under public/data.

### `dataDir`

Locale-catalog data dir — one subdirectory per supported locale.

### `enDir`

English catalog dir — the canonical reference other locales are checked against.

### `LOCALE_DIRS`

Every locale dir except the shared `index` (shard manifest, not a locale).

### `DOSSIER_KEYS`

Required keys every dossier file must carry — schema contract per body.
