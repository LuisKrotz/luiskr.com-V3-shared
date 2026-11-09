# `experiments\docs\tests\view\view-docs-docs-route-resolution.test.js`

Split from view-docs.test.js — covers the "docs route resolution" describe.

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tests\view\view-docs-docs-route-resolution.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                   |

## Members

### `_makePayload`

Doc-payload factory matching the docs loader's shape; per-test overrides merge in.

### `_docsRoute`

Route-record factory for the docs portal — params.docsPath carries the sub-path.
