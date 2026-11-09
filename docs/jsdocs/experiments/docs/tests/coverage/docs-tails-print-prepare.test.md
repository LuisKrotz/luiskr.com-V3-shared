# `experiments\docs\tests\coverage\docs-tails-print-prepare.test.js`

Coverage tails for ViewDocs._onPrintPrepare — the printprepare

|                |                                                                        |
| -------------- | ---------------------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\coverage\docs-tails-print-prepare.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                |

## Members

### `docsRoute`

Route-record factory for the docs portal — params.docsPath carries the sub-path.

### `firePrepare`

Dispatches the print-prepare event the view listens for — exercises the pre-print mirror build.

### `mkArticle`

Builds a reader mirror with a sentinel child the assertions diff on.
