# `shared\build\docs\highlight.mjs`

Build-time syntax highlighter for the docs portal's code

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\build\docs\highlight.mjs`                   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `span`

Wrap a token in its span class.

### `KW_C`

Keyword sets per language family. A word hits `kwd` when listed,
`fun` when followed by `(`, `typ` when capitalized.

### `LANG`

Per-extension language spec.

### `scanC`

Scan a C-style language: comments, quoted strings, numbers,
identifiers classified keyword/function/type, punctuation runs.

### `scanJson`

JSON: keys → typ, string values → str, numbers → lit, consts → kwd.

### `scanKv`

YAML/TOML/INI/ENV: keys → typ, values → str/lit, comments → com.

### `scanMarkup`

HTML/XML: tags, attributes, comments, doctype, text.

### `scanCss`

CSS/SCSS: comments, strings, at-rules, props, values, colors.

### `highlightCode`

Highlight a code payload.

- `@param` {string} src Raw file text.
- `@param` {string} ext Lower-cased extension without the dot.
- `@returns` {string} HTML with `syn-*`-classed spans (prettify naming).
