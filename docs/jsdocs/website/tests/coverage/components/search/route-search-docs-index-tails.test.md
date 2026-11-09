# `website\tests\coverage\components\search\route-search-docs-index-tails.test.js`

Coverage tails for the shared docs catalog in

|                |                                                                                      |
| -------------- | ------------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\search\route-search-docs-index-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                              |

## Members

### `state`

Per-test docs-index reply — swapped before every loadCatalog call.

### `localeRows`

Minimal row the locale catalog returns — only the shape fields matter.

### `docsCalls`

Counts fetch calls against the docs index — the '-docs' URL marks them.

### `catalog`

Promise-wraps the callback-style loadCatalog so tests can await it.
