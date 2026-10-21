[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/diagram/luiskr\_diagram](../README.md) / render\_diagram

```ts
function render_diagram(source, theme_json): string
```

Defined in: website/public/wasm/diagram/luiskr\_diagram.d.ts:15

Renders a mermaid diagram source to an SVG string.

`source` — the raw fence content (first word selects the family).
`theme_json` — `{"font": "...", "fontSize": 14, "fg": "#…", "bg":
"#…", "line": "#…", "accent": "#…"}` — the bridge maps live CSS
custom properties into this so diagrams follow the active theme.

Returns `<svg …>…</svg>` or a `JsValue` error the caller shows as a
devWarn while restoring the source block (fail-soft contract).

## Parameters

### source

`string`

### theme\_json

`string`

## Returns

`string`
