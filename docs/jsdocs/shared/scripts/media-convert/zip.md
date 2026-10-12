# `shared/scripts/media-convert/zip.js`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/media-convert/zip.js`                                 |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### (module scope)

Minimal ZIP archive writer (DEFLATE via node:zlib) — no external deps.
Produces a standard .zip readable by the OS, Chrome and archive tools.

### `buildZip`

- `@param` {Array<{name: string, data: Buffer}>} files
- `@returns` {Buffer} zip archive
