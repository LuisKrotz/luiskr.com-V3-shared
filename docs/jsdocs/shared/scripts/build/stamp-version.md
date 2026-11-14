# `shared\scripts\build\stamp-version.mjs`

Build-time version/build-id stamper wired into build.mjs.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\stamp-version.mjs`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `ROOT`

Repo root — this file sits at shared/scripts/build/.

### `readEnvLines`

Reads .env as a line list (empty file → empty list). CRLF is normalized
to LF up front — Windows editors/git checkouts can leave \r on the
values, which would defeat the key match and the rc-* regex.

- `@returns` {string[]} raw .env lines

### `writeEnvLines`

Writes the line list back to .env with a single trailing newline —
trailing blank lines are stripped first so rewrites don't accumulate
empty rows at the tail.

- `@param` {string[]} lines env lines to persist
- `@returns` {void}

### `setEntry`

Rewrites `KEY=value` in place or appends it when the key is absent.

- `@param` {string[]} lines env line list (mutated)
- `@param` {string} key env key
- `@param` {string} value new value
- `@returns` {boolean} true when the file content actually changed

### `sync`

Mirrors package.json#version into VITE_APP_VERSION (pre-build).

### `bump`

Increments VITE_BUILD_ID's patch; seeds rc-1.0.0 when absent (post-build).
