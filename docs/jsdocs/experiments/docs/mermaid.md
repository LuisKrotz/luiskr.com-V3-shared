# `experiments\docs\mermaid.ts`

Diagram rendering for docs payloads — markdown

| | |
|---|---|
| **Source** | `src/experiments\docs\mermaid.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `FONT_SIZE_FALLBACK`

Default font size when the computed style is unparsable.

### `EDGE_RE`

Cheap source scanners feeding the diagram-cost model — counts of each
structural feature, not a parse (the wasm engine still does that).

### `countMatches`

Counts regex matches without allocating a match array.

### `predictDiagramCost`

Scores a diagram's predicted render+layout cost through the ONNX
`diagram-cost` model (WebNN → WebGPU → wasm EP). When the predicted
cost clears DIAGRAM_DEFER_MS the caller yields one task turn before
rendering so a large graph can't long-task the docs view between
blocks. A null score (no runtime/model) means render immediately —
the same behavior as before the model existed.
- `@param` source Raw mermaid source for the block.
- `@returns` Predicted cost in ms, or null when ML is unavailable.

### `yieldTask`

Yields one macrotask turn — cheap cooperative scheduling point.

### `themeJson`

Reads the live theme custom properties + computed type into the
engine's theme JSON — the diagram inherits the project's
ink/surface/accent tokens instead of shipping a palette.

The style is sampled from a mermaid block inside the docs shadow
root, NOT documentElement: the docs page never sets a font on `html`,
so the root's computed `fontFamily` is the UA default (serif) while
the block inherits `.docs`'s `var(--font-primary)` and the rendered
content's real size.
- `@param` style Computed style of a `.docs-mermaid` block.
- `@returns` JSON string for `render_diagram`'s `Theme::from_json`.

### `renderMermaidBlocks`

Renders every unprocessed `.docs-mermaid` block inside `container`
into an inline SVG diagram. Safe to call repeatedly — processed
nodes are marked (`data-processed`), so later payloads don't
re-render earlier diagrams.
- `@param` container The docs-content box holding rendered payload HTML.
