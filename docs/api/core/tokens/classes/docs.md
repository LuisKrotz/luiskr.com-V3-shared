# `core\tokens\classes\docs.ts`

Docs-portal class tokens — BEM block `docs` + modifiers.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\docs.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DOCS_CLASSES`

Frozen docs class-name map — sole declaration site for these tokens;
consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.

### `DOCS_TREE_GROUP`

Section-group row modifier — the four disclosure rows (Source /
Docs / Architecture / Reports) that parent the flat root buckets.

### `DOCS_GRID_GROUP`

Portal-root section wrapper — one per disclosure group, each its
own card grid under a real group heading.

### `DOCS_MAP`

The right-hand map column — interactive alternative nav surface.

### `DOCS_MAP_STAGE`

Canvas seat inside the column OR the zoom dialog — the persistent
scene node re-parents here on every render.

### `DOCS_MAP_HEAD`

Map header row — caption + zoom trigger.

### `DOCS_MAP_ZOOM`

Zoom trigger — opens the centered glass modal.

### `DOCS_MAP_ZOOM_ICON`

The ⤢ glyph inside the zoom trigger — wrapped in a span so hover
can transform it (bare text nodes take no transform).

### `DOCS_MAP_MODAL`

Fullscreen overlay behind the zoom dialog — the glass backdrop.

### `DOCS_MAP_CLOSE_AREA`

Fullscreen click-catcher between backdrop and dialog — the
expand-modal close-area pattern.

### `DOCS_MAP_DIALOG`

The centered glass dialog hosting the enlarged scene.

### `DOCS_MAP_CLOSE_BOTTOM`

Bottom close button under the dialog content — the expand-modal
close-bottom pattern (labelled, corner-bracket styled).

### `DOCS_MAP_LOADING`

In-stage loading veil — covers the canvas seat while the scene's
async graph build (worker layout → mesh/label upload) is in flight.

### `DOCS_MAP_LOADING_SPIN`

Spinner ring inside the map loading veil.

### `DOCS_MAP_LOADING_LABEL`

Status caption under the map loading spinner.

### `DOCS_NAV_PANEL`

Combobox dropdown container — the toggle's aria-controls target
(merged crumbs row + treeview); the sticky left column ≥1281px.

### `DOCS_NAV_CRUMBS`

Crumb row cloned inside the combobox dropdown — the merged
tree+breadcrumb surface shown ≤1280px (the main crumb bar hides).

### `DOCS_TREE_ICON`

Per-row node icon — the animated SVG glyph (folder/file by ext).

### `DOCS_TREE_CHEVRON`

Per-row disclosure chevron — dir rows carry the arrow glyph,
file rows an empty spacer so every icon column stays aligned.

### `DOCS_TREE_PAPER`

Paper sheet peeking out of a folder glyph — count ∝ children.

### `DOCS_TREE_PAPER_TONES`

Per-sheet ink modifiers for the open folder's fanned papers —
the reference pack colors each sheet differently
(red/blue/green/purple), applied by index modulo the list.

### `DOCS_ICON_LINE`

Stroked icon part — inked with the kind's `--icon-ink`.

### `DOCS_ICON_FILL`

Filled icon part — inked with the kind's `--icon-ink`.

### `DOCS_ICON_TILE`

Icon backdrop tile — a light kind-tinted wash behind the glyph.

### `DOCS_ICON_PAGE`

File page shell — the folded-corner document silhouette every file
icon is drawn on; `-fold`/`-flap` parts hang off it.

### `DOCS_ICON_ON`

Letterform/detail drawn on a filled tile — reads paper-colored.

### `DOCS_ICON_ALT`

Secondary-ink strokes — two-tone glyphs (the python tail).

### `DOCS_ICON_TEXT`

Wordmark text inside a page — the shield labels ("HTML"/"CSS").

### `DOCS_ICON_GLINT`

Rim-light glint — the bright segment orbiting each icon's outline
stroke (the reference pack's traveling shine), inked from the
icon's `--icon-ink` lifted toward white.

### `DOCS_ICON_KINDS`

File-kind names — `${DOCS_TREE_ICON}--${kind}` modifier classes
pick each filetype's ink in the docs SCSS.

### `FOLDER`

Directory glyph — the `--folder` modifier pins the folder's gold
currentColor as `--icon-ink` so shared pack parts (the sheen
sweep) ink themselves correctly inside a folder svg.

### `DOCS_LOADER`

Boot loader overlay — stays up until the portal's first usable state.

### `DOCS_INDEX`

Complete-document index nav — offscreen + content-visibility skipped.
