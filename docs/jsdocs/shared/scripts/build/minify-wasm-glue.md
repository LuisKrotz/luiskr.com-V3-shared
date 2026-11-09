# `shared\scripts\build\minify-wasm-glue.mjs`

Minifies the committed wasm-pack JS glue under

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\minify-wasm-glue.mjs`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `minifyGlueFile`

Minify one glue file in place; returns [beforeBytes, afterBytes].

### `main`

Walk <slug>/ dirs, minify each *.js glue file, log the savings.
