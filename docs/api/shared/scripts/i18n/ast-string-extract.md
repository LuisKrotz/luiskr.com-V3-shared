# `shared\scripts\i18n\ast-string-extract.js`

AST-based static analysis tool to detect repeated non-syntactic string literals

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\ast-string-extract.js`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `scanDirectory`

`scanDirectory` — recursive .js/.jsx collector over a source root.
Skips node_modules and compiled wasm dirs; also skips the
constants/token modules, which ARE the string dictionary —
scanning them would report every token as a "repeated string".

### `extractStrings`

`extractStrings` — the report body: scans every file, walks each
AST for StringLiteral nodes, buckets them by literal value, then
prints the top repeated strings and writes the full inventory JSON.
