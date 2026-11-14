# `experiments\docs\mermaid.ts`

Diagram rendering for docs payloads — markdown

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\mermaid.ts`                       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `FONT_SIZE_FALLBACK`

Default font size when the computed style is unparsable.

### `PRINT_ROTATE_RATIO`

Aspect ratio (w/h) at which a print diagram earns the rotated slot —
anything wider reads better quarter-turned to full page height than
shrunk to the portrait content width.

### `EDGE_RE`

Cheap source scanners feeding the diagram-cost model — counts of each
structural feature, not a parse (the wasm engine still does that).

### `NODE_RE`

Node-shape opener — any `[`, `(`, or `{` begins a node declaration.

### `NEST_RE`

Nested subgraph keyword — bumps the bracket-depth heuristic.

### `SELF_RE`

Self-edge — `A -> A` adds visual noise the layout already implies.

### `countMatches`

Counts regex matches without allocating a match array.

### `predictDiagramCost`

Scores a diagram's predicted render+layout cost through the ONNX
`diagram-cost` model (wasm EP — the slug is in ML_WASM_EP_MODELS so
the session never issues GPU pipeline-compile IPCs while the docs
scene compiles its own shaders). When the predicted
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

### `printThemeJson`

Paper-palette theme JSON for `render_diagram` — the print mirror's
diagrams must read as press ink on paper, not the screen's
dark-on-dark scheme: foreground and lines go `--print-ink`, node
fills go `--print-paper`, and the accent stays the project accent
so colored highlights survive in grayscale-optional output. Colors
resolve from `documentElement` (the print vars are root-level token
declarations, resolvable outside print media).

- `@param` style Computed style of the block — carries the doc's font.
- `@returns` JSON string for the wasm theme argument.

### `renderMermaidBlocksForPrint`

Re-renders every `.docs-mermaid` block inside the print mirror with
the paper theme — the mirror clone carries either the screen-palette
SVG (processed blocks, source stashed in `data-mermaid-src`) or the
raw source text (a print fired mid-render), and neither belongs on
paper as-is. Blocks whose source can't render keep whatever they
cloned — the escaped source text still reads as documentation.

- `@param` container The `article.reader-content` mirror (or clone) to
