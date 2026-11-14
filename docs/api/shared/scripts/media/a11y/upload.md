# `shared\scripts\media\a11y\upload.mjs`

Co-located artifact writer — uploads generated .vtt/.txt

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\a11y\upload.mjs`              |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `A11Y_MIME`

Content types per generated artifact kind.

### `CACHE_CONTROL`

Immutable cache — generated files are content-stable once written.

### (module scope)

Uploads one text artifact to a prefix-relative key.

- `@param` {string} key Key relative to `public/_v3/` (e.g. `a/b/x.vtt`).
- `@param` {string} body UTF-8 file body.
- `@param` {string} mime Content-Type (an A11Y_MIME member).
- `@returns` {Promise<'uploaded'|'exists'|'failed'>}
