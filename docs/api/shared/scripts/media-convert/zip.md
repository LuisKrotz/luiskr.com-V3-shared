# `shared\scripts\media-convert\zip.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media-convert\zip.js`               |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Minimal ZIP archive writer (DEFLATE via node:zlib) — no external deps.
Produces a standard .zip readable by the OS, Chrome and archive tools.

### `buildZip`

- `@param` {Array<{name: string, data: Buffer}>} files
- `@returns` {Buffer} zip archive
