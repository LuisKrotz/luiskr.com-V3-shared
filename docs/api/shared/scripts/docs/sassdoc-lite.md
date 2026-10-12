# `shared/scripts/docs/sassdoc-lite.mjs`

Security-focused replacement for the unmaintained `sassdoc`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/docs/sassdoc-lite.mjs`                                |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `esc`

HTML-escapes every byte of user-originated text before emission.

### (module scope)

Recursively lists `.scss` files under `dir` (self-similar tree walk).

### `classify`

Classifies the code line that follows a `///` block into the sassdoc
item taxonomy and extracts the declared name.

### `parseBlock`

Splits a `///` block into prose lines and structured `@tag` lines.
Supported tags: `@param`, `@return`, `@output`, `@deprecated` —
everything else is preserved as a raw tag line so nothing is dropped.

### `parseFile`

Parses one .scss file into its documented item list.

### `renderItem`

Renders one documented item as an escaped definition block.
