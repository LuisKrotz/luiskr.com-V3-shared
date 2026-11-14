# `shared\scripts\media-convert\zip.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media-convert\zip.js`               |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Minimal ZIP archive writer (DEFLATE via node:zlib) — no external deps.
Produces a standard .zip readable by the OS, Chrome and archive tools.

### `crc32`

`crc32` — the ZIP integrity checksum over the UNCOMPRESSED data
(the spec stores it beside both compressed and raw sizes).

- `@param` buf File bytes.
- `@returns` The 32-bit CRC.

### `dosDateTime`

`dosDateTime` — the ZIP format's packed MS-DOS timestamp fields:
time = h·2¹¹ + m·2⁵ + s/2 (2-second resolution — the format is
that old), date = (year−1980)·2⁹ + month·2⁵ + day.

- `@param` d The timestamp (default: now).
- `@returns` {time, date} — two uint16s for the header fields.

### `buildZip`

- `@param` {Array<{name: string, data: Buffer}>} files
- `@returns` {Buffer} zip archive
