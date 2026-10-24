# `experiments\docs\tree-icon.tsx`

Animated SVG row icons for the docs treeview — the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tree-icon.tsx`                    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `VIEW_BOX`

SVG viewport box shared by every row icon (unit-agnostic square).

### `sheet`

One animated "paper" line inside a folder glyph — a dash-drifting
stroke whose phase comes from the name hash, so stacked sheets don't
pulse in lockstep. The sheet COUNT is the visible part of the
item-amount contract; this animates it.

- `@param` seed Name hash — deterministic per folder.
- `@param` idx Sheet index — staggers phase/duration.
- `@param` y Baseline y of the sheet line.
- `@returns` The animated <line> node.

### `folderIcon`

Directory glyph — the Ignition-style folder: a back plate + tab when
closed, a gaped back plate + sheared front flap when open. Sheets
inside the mouth scale with children.length (capped) and a corner
badge carries the exact count, so fullness reads at a glance.

- `@param` node The directory manifest node.
- `@param` open Whether the branch is expanded in the treeview.
- `@returns` The SVG subtree.

### `fileIcon`

File glyph — a page with a folded corner, the extension tag inside
(uppercased, 4-glyph cap) and a thread whose dash/phase come from the
EXTENSION hash, so identical extensions share one deterministic
artwork and every extension reads as its own icon.

- `@param` name File display name (the extension splits off the last dot).
- `@returns` The SVG subtree.

### `treeIcon`

The row icon for one manifest node — directories get the stateful
folder glyph, files the extension-keyed page glyph.

- `@param` node The manifest node the row renders.
- `@param` open Whether a directory row is expanded (file rows ignore it).
- `@returns` The SVG subtree.
