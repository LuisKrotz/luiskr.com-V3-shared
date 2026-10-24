# `experiments\docs\tree-icon.tsx`

Animated SVG row icons for the docs treeview — a real

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\tree-icon.tsx`                    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `VIEW_BOX`

SVG viewport box shared by every row icon (unit-agnostic square).

### `L`

Shared part classes — stroked ink / filled ink / on-tile detail.

### `hashName`

Deterministic 32-bit-ish name hash — walks the string with a rolling
multiply-add; the modulus lives in DOCS_UNITS so the spread stays
tuned. Seeds every per-node art variance (paper fan, SMIL phase).

### `sway`

Seconds-per-revolution etc. — art pacing, not layout.

### `paperSheet`

One paper sheet in the folder stack — a page rect peeking above the
back plate. Per-sheet x/lift fan-out is seeded by the folder's name
hash so every folder's papers sit differently.

- `@param` seed Folder name hash.
- `@param` i Sheet index in the stack (0 = lowest).
- `@param` open Lifted pose while the folder is open.
- `@param` top True for the stack's top sheet — it gets the bob motion.
- `@returns` The sheet node.

### `FOLDER_BODY_CLOSED`

macOS/Windows-style folder silhouette — the raised left tab and the
rounded body are what make the glyph read as a folder at row size.
Closed folders get a full body with the front-face seam; open folders
truncate the back plate at the mouth and swing the front flap
forward — a trapezoid whose bottom edge is wider than the top, the
perspective cue of a cover leaning toward the viewer.

### `folderIcon`

Directory glyph — back plate + tab, a stack of paper sheets whose
visible count equals min(children, TREE_SHEET_CAP), the front face
(closed) or a swung-forward flap (open). The flap plays a one-shot
swing on mount so the open transition reads as motion. The sheet
count IS the artwork: 0 sheets = empty, a full stack = a heavy
folder — no numeral badge.

- `@param` node The directory manifest node.
- `@param` open Whether the branch is expanded in the treeview.
- `@returns` The SVG subtree.

### `tile`

Language tile (TS/JS) — filled rounded square + block letterforms.

### `KIND_ART`

kind → SVG subtree painter. Each value draws that filetype's own
silhouette inside the shared 24×24 viewport; `seed` (name hash)
phases each glyph's SMIL motion so sibling rows don't animate in
lockstep.

### `ts`

TypeScript — blue tile + block TS.

### `js`

JavaScript — yellow tile + block JS (J hook + S).

### `json`

JSON — the braces breathing apart around a center dot.

### `sass`

Sass — the ribbon S with the underline swash, drawn live.

### `css`

CSS — the shield silhouette + three bars (the 3-shelf mark).

### `html`

HTML — the </> chevrons + center slash, breathing open/closed.

### `md`

Markdown — the real mark: rounded frame + M + the ↓ arrow.

### `img`

Raster image — frame + sun + mountain line; the sun radiates.

### `vec`

Vector file — pen nib, handle arms, node dots (the .svg mark).

### `yml`

YAML — stacked key dashes; the value lines drift.

### `conf`

Config — the gear, in a slow perpetual turn.

### `lock`

Lockfile — padlock, the shackle swaying gently.

### `font`

Font files — the 'A' letterform with baseline feet.

### `wasm`

WASM — the hexagonal crate + inner diamond, slow spin.

### `test`

Test/spec files — the flask with rising bubbles.

### `cert`

License/notice — the rosette seal + ribbon tails.

### `archive`

Archives — the parcel: box, lid flap, carry handle.

### `shell`

Shell scripts — the terminal: prompt chevron + blinking cursor.

### `video`

Video — film frame, sprocket dashes, pulsing play head.

### `audio`

Audio — the waveform bars, bobbing as one body.

### `doc`

Default document — the folded page with drifting text lines.

### `EXT_KIND`

extension → icon kind (lower-cased lookup key).

### `NAME_KIND`

Bare names (no usable extension) that map to authored kinds.

### `kindFor`

The icon kind for a file name — test/spec compound names first,
then the extension map, then bare-name specials, then `doc`.

- `@param` name File display name.
- `@returns` A DOCS_ICON_KINDS value.

### `fileIcon`

File glyph — the kind's authored silhouette inside the shared
viewport, classed `docs-tree-icon--<kind>` so the SCSS inks it.

- `@param` name File display name.
- `@returns` The SVG subtree.

### `treeIcon`

The row icon for one manifest node — directories get the stateful
paper-stack folder, files the kind-keyed pack glyph.

- `@param` node The manifest node the row renders.
- `@param` open Whether a directory row is expanded (file rows ignore it).
- `@returns` The SVG subtree.
