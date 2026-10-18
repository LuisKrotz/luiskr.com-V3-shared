# `website/public/wasm/diagram/luiskr_diagram.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/public/wasm/diagram/luiskr_diagram.js`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `render_diagram`

Renders a mermaid diagram source to an SVG string.

`source` — the raw fence content (first word selects the family).
`theme_json` — `{"font": "...", "fontSize": 14, "fg": "#…", "bg":
"#…", "line": "#…", "accent": "#…"}` — the bridge maps live CSS
custom properties into this so diagrams follow the active theme.

Returns `<svg …>…</svg>` or a `JsValue` error the caller shows as a
devWarn while restoring the source block (fail-soft contract).

- `@param` {string} source
- `@param` {string} theme_json
- `@returns` {string}
