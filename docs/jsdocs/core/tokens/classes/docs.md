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

### `DOCS_MAP`

The right-hand map column — interactive alternative nav surface.

### `DOCS_MAP_STAGE`

Canvas seat inside the column OR the zoom dialog — the persistent
scene node re-parents here on every render.

### `DOCS_MAP_HEAD`

Map header row — caption + zoom trigger.

### `DOCS_MAP_ZOOM`

Zoom trigger — opens the centered glass modal.

### `DOCS_MAP_MODAL`

Fullscreen overlay behind the zoom dialog (dismiss target).

### `DOCS_MAP_DIALOG`

The centered glass dialog hosting the enlarged scene.

### `DOCS_MAP_CLOSE`

Dialog close control.

### `DOCS_NAV_PANEL`

Combobox dropdown container — the toggle's aria-controls target
(merged crumbs row + treeview); the sticky left column ≥1281px.

### `DOCS_NAV_CRUMBS`

Crumb row cloned inside the combobox dropdown — the merged
tree+breadcrumb surface shown ≤1280px (the main crumb bar hides).

### `DOCS_TREE_ICON`

Per-row node icon — the animated SVG glyph (folder/file by ext).

### `DOCS_TREE_COUNT`

Child-count badge drawn inside the folder glyph.

### `DOCS_LOADER`

Boot loader overlay — stays up until the portal's first usable state.

### `DOCS_INDEX`

Complete-document index nav — offscreen + content-visibility skipped.
