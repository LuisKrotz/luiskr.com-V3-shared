# `shared/build/docs/redact.mjs`

Secret scrubbing for the public source-code viewer.

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/shared/build/docs/redact.mjs`                                       |
| **UX surface** | Vite machinery every module build consumes — never shipped to a browser. |

## Members

### `SECRET_PATTERNS`

Credential-shaped literal patterns. Each is replaced with a fixed-width
redaction marker so displayed line/column structure stays intact.

### `REDACTED`

Single redaction token — fixed width keeps alignment legible.

### `redactSource`

Masks credential-shaped literals in a source string.

- `@param` {string} code Raw file contents.
- `@returns` {string} Contents safe to ship to the browser.
