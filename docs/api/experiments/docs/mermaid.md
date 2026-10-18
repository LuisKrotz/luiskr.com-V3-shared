# `experiments/docs/mermaid.ts`

Diagram rendering for docs payloads — markdown

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/docs/mermaid.ts`                       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `FONT_SIZE_FALLBACK`

Default font size when the computed style is unparsable.

### `themeJson`

Reads the live theme custom properties + computed type into the
engine's theme JSON — the diagram inherits the project's
ink/surface/accent tokens instead of shipping a palette.

- `@param` style Computed style of the docs root (carries the theme vars).
- `@returns` JSON string for `render_diagram`'s `Theme::from_json`.

### `renderMermaidBlocks`

Renders every unprocessed `.docs-mermaid` block inside `container`
into an inline SVG diagram. Safe to call repeatedly — processed
nodes are marked (`data-processed`), so later payloads don't
re-render earlier diagrams.

- `@param` container The docs-content box holding rendered payload HTML.
