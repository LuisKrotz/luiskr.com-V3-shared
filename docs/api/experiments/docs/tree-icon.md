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

Shared part classes — stroked ink / filled ink / secondary-ink /
on-tile detail / wordmark text.

### `PAGE`

Page shell + fold classes — stroked page, filled flap.

### `hashName`

Deterministic 32-bit-ish name hash — walks the string with a rolling
multiply-add; the modulus lives in DOCS_UNITS so the spread stays
tuned. Seeds every per-node art variance (paper fan, SMIL phase).

### `sway`

Seconds-per-revolution etc. — art pacing, not layout.

### `draw`

Typing/draw-in — the path strokes itself on over the first stretch of
the loop, holds, then wipes before the next cycle. `pathLength="30"`
normalizes every letterform to the same dash unit so staggered
`begin` offsets read as characters being typed.

- `@param` d Path data.
- `@param` at Begin offset in seconds (stagger).
- `@param` dur Loop duration in seconds.
- `@param` cls Part class (defaults to stroked ink).
- `@returns` The animated path.

### `spin`

Centered slow spin — `dur` seconds per revolution about (cx,cy).

### `cogPath`

Solid cog ring path — `teeth` rectangular teeth stepping out from the
valley radius to the outer radius, the silhouette the reference pack
draws for Rust/env gears (a real gear, not a dashed circle).

- `@param` cx Center x. @param cy Center y.
- `@param` rOut Tooth-tip radius. @param rIn Valley radius.
- `@param` teeth Tooth count. @returns SVG path data.

### `wiggle`

Gentle rotate wiggle — ±deg° about (cx,cy), looping.

### `riseFade`

Rising-and-fading loop — steam, status dots, uplink marks.

### `word`

Bold typewriter wordmark — the reference pack's letterform icons
(JS/TS/GO/PHP/C++/C#/…) are set in a heavy geometric sans filling
~60% of the content width. One tspan per character, each looping a
deep opacity wave staggered a beat apart — each letter dims hard to
a low floor and brightens back, so the pulse travels left→right
across the word (a typewriter carriage sweep, clearly readable at
icon size); `seed` negative-phases the loop so sibling rows never
ripple in lockstep.
Sizing is geometric — translate + a
non-uniform `scale()` gives the sheet's condensed-bold look; the
font itself (family/size/weight) lives on the `-icon-text` SCSS
rule, never inline.

- `@param` text The letters to set.
- `@param` seed Name-hash SMIL phase.
- `@param` sx Horizontal scale — condenses the glyph run (viewBox units).
- `@param` sy Vertical scale — glyph height multiplier.
- `@param` cx Wordmark center x. @param cy Baseline y.
- `@param` dur Loop seconds.
- `@returns` The text node.

### `fx`

One paper sheet in the folder stack, drawn in the reference pack's
two distinct poses. CLOSED folders only show the sheet's top edge —
a thin rounded-rect strip peeking above the body behind the tab,
stacked 0.65 units apart with no printed marks. OPEN folders fan
taller sheets out of the mouth, each inked a different tone
(DOCS_TREE_PAPER_TONES by stack index) and rotated around its base;
the front sheet (i = 0, painted last) carries the bob.

- `@param` seed Folder name hash.
- `@param` i Sheet index — 0 is the front sheet nearest the mouth.
- `@param` open Fanned pose while the folder is open.
- `@param` top True for the front sheet — it gets the bob motion.
- `@returns` The sheet node.

### `sheetShape`

Page-top strip — the reference pack's paper sheet: the two top
corners are gently rounded; the bottom edge sits below the folder
rim where the opaque front flap occludes it, so the sheet reads as
a page standing inside the folder.

- `@param` x Left edge. @param y Top edge. @param w Width.
- `@param` bot Bottom edge — occluded by the front flap's opaque fill.
- `@returns` SVG path data.

### (module scope)

macOS/Windows-style folder silhouette — the raised left tab and the
rounded body are what make the glyph read as a folder at row size.
Closed folders get a full body with the front-face seam; open folders
truncate the back plate at the mouth and swing the front flap
forward — a trapezoid whose bottom edge is wider than the top, the
perspective cue of a cover leaning toward the viewer.

### `FOLDER_BACK`

Closed-folder BACK PLATE — the taller rear wall of the reference
pack's two-piece silhouette: the left side rises straight to the tab
plateau (~30% of the width), an angled shoulder slopes down-right to
the back top edge, and the right wall drops toward the seam. Its
lower half hides behind the front flap's opaque fill.

### `FOLDER_FLAP`

Closed-folder FRONT FLAP — the wide rounded panel overlapping the
back plate's lower half; its top edge is the full-width seam the
reference prints as the flap/body junction, and it juts past the
back wall on the right (the reference's little step). Opaque fill
tucks the paper sheets' bottoms away behind it.

### `FOLDER_BACK_OPEN`

Open folder's back plate — the same rear wall as the closed state,
drawn only down to the mouth line: left wall, tab plateau, shoulder,
and right top edge peek above the swung-forward flap.

### `FOLDER_FLAP_OPEN`

Open folder — the cover swung all the way forward: a trapezoid
splayed wider at the bottom (the reference's lean-toward-the-viewer
perspective) in front of the back plate's rim.

### `folderIcon`

Directory glyph — the reference pack's two-piece wireframe: the
closed folder is a tall back plate (left tab + shoulder) overlapped
by a wider opaque front flap; the open folder is the flap alone as a
forward-leaning trapezoid plus the back wall's left-corner stub.
Children show as paper drawn BETWEEN back wall and flap — closed
folders stack nested page tops rising above the back edge, open
folders fan colored sheets out of the mouth; counts cap at the
TREE_SHEET_CAP_* unit tokens and every sheet's fill is opaque so the
pile nests and the flap occludes it like the reference. The open
flap plays a one-shot swing on mount.

- `@param` node The directory manifest node.
- `@param` open Whether the branch is expanded in the treeview.
- `@returns` The SVG subtree.

### `PAGE_BODY`

Document page outline — the universal file shell (24 viewport),
corners rounded like the reference pack's paper pages.

### `PAGE_FOLD`

Fold seam — the top-left edge of the folded corner triangle.

### `PAGE_FOLD_FILL`

Fold flap fill — the small triangle turned over the page corner.

### `KIND_ART`

kind → SVG subtree painter. Each value draws that filetype's own
glyph INSIDE the shared page silhouette (content zone ≈ x7–17.5,
y8.5–19); `seed` (name hash) phases each glyph's SMIL motion so
sibling rows never animate in lockstep.

### `ts`

TypeScript — the bold TS wordmark plus a blinking block cursor
riding its right edge (the editor caret pulse).

### `js`

JavaScript — the bold JS wordmark plus a blinking underscore
cursor parked at its baseline (the REPL prompt pulse).

### `py`

Python — the two-tone snake: blue upper lobe, yellow lower lobe
(`-icon-alt` inks it from --icon-ink2), eye dots, gentle rock.

### `atom`

JSX/TSX/React — the atom: three orbitals, each in its own
precessing plane (different rates → the electron-orbit weave),
nucleus pulsing in the middle.

### `rs`

Rust — the serrated cog ring spinning around the bold R.

### `go`

Go — the GO wordmark, speed lines streaming in from the left.

### `java`

Java — the coffee cup filling the page: handle right, saucer
line below, two steam wisps rising and fading above.

### `cpp`

C++ — the bold C++ wordmark with a twinkling increment tick —
a small `+` spark flashing at the page's upper right.

### `cs`

C# — the bold C# wordmark with a scan block sweeping back and
forth on the underline track below it (a compile-progress beat).

### `php`

PHP — the bold PHP wordmark flanked by the `<? … ?>` tag's angle
brackets, breathing apart on a slow loop.

### `rb`

Ruby — the faceted gem: flat crown, pointed pavilion, facet
lines, and a twinkle at the top-right corner.

### `sql`

SQL/database — the stacked cylinder: top ellipse, two ring
lines, body; a scan band sweeping down through it.

### `json`

JSON — the curly-brace pair redrawing itself on a staggered loop
while the `"key":value` colon blinks between them in alternating
dots — the structured-data pulse.

### `sass`

Sass — the ribbon S with the underline swash, drawn live.

### `css`

CSS — the shield emblem: tiny "CSS" wordmark above the shield's
top band, the big "3" numeral inside it, and a single dot that
cascades down the shield's left interior in discrete steps —
the stylesheet's cascade made literal.

### `html`

HTML — the same shield emblem: tiny "HTML" wordmark above the
top band, the big "5" numeral inside it, and a row of browser
chrome dots blinking in sequence across the shield's top band.

### `xml`

XML — `<xml>`: breathing angle brackets around the wordmark.

### `md`

Markdown — the bold M beside a down-arrow that plunges into place
on a brisk stamp loop: raised, dropped, held, reset — the M↓ mark
given a readable download beat.

### `img`

Raster image — frame + sun + mountain line; the sun radiates on
a clear pulse.

### `photo`

Photo (jpg) — the same landscape frame but carrying the little
camera glyph bottom-right: the lens iris contracts and opens on
a loop, an aperture breathing (the sheet's jpg).

### `gif`

GIF — the rounded box on two little feet, the GIF wordmark
strobing inside while a frame square hops left→right across the
top of the box in discrete steps — cycling frames.

### `vec`

Vector file — the pen-tool mark: anchor squares at the ends of a
sagging bezier, handles wiggling wide, the nib hanging below
center and bobbing as it inks the curve.

### `yml`

YAML — the {YML} mark: breathing braces around the wordmark.

### `conf`

Config/env — the toothed cog turning slowly, a small padlock
guarding its bottom-right corner (the sheet's .env mark).

### `lock`

Lockfile — padlock, the shackle swaying gently.

### `font`

Font files — the large light 'A' (font-weight drops to 300 via
the --font kind's -icon-text override in the SCSS) over a metrics
baseline guide that draws itself on in a loop.

### `wasm`

WASM — the hexagonal crate + inner diamond, slow spin.

### `test`

Test/spec files — the flask with rising bubbles.

### `cert`

License/notice — the rosette seal + ribbon tails: a scalloped
(dashed) outer ring rotating like a notary stamp, the medallion
heart pulsing, and the ribbon tails swinging on a pendulum wiggle
pivoted at the seal's center.

### `archive`

Archives — the vertical zipper filling the page: two columns of
interlocking teeth down the seam, the slider body + pull tab
riding up and down on a loop.

### `shell`

Shell scripts — the bare `>_` prompt: a chevron that draws on,
the underscore cursor blinking beside it.

### `exe`

Executables — the little window frame: title bar, two chrome
dots, the tiny "exec" wordmark inside and a blinking cursor.

### `dmg`

Disk images — a page-within-page: the small centered document
outline carrying a slowly spinning optical disc on its face.

### `video`

Video/mp4 — the film frame with sprocket holes top and bottom,
the pulsing play triangle inside, and a playhead scrubbing along
the bottom edge then rewinding (the reference's mp4 mark).

### `cam`

QuickTime/mov — the video camera: rounded body with the play
triangle inside, a blinking REC dot at its top-left, and the lens
horn trapezoid on the right.

### `audio`

Audio — a single continuous waveform (zigzag spikes, tall in
the middle) drawn as a dashed line scrolling along itself.

### `note`

Music files — the double beamed eighth-note (two heads, two
stems, one beam) bobbing on the beat (mp3/m4a/flac/aac).

### `web`

Webpage (index.html) — the browser window: chrome bar, traffic
dots, and the page's content lines typing on row by row like a
loading render pass.

### `txt`

Plain text — six lines of varying length typing on row by row.

### `pdf`

PDF — the Acrobat loop ribbon drawing itself on: the knot curls
around its own waist before the tail sweeps out.

### `docx`

Word docs — the W box with the three text lines beside it typing
themselves on row by row.

### `xlsx`

Spreadsheets — the X box with the 2×2 cell grid beside it and a
selection square marching through the quadrants in discrete hops
(a cell cursor roaming the sheet).

### `ppt`

Presentations — the P box with the little pie chart beside it,
the wedge sweeping around the circle like a chart redrawing.

### `csv`

CSV — the `{;}` mark: braces breathing wide around a
semicolon-ish dot pair that flickers alternating (the sheet's
dotted-braces csv glyph).

### `crate`

Packed tarballs — the square crate box carrying a smaller
version of the zip seam inside it.

### `doc`

Default document — page lines typing themselves on.

### `EXT_KIND`

extension → icon kind (lower-cased lookup key).

### `NAME_KIND`

Bare names (no usable extension) that map to authored kinds.

### `kindFor`

The icon kind for a file name — index pages first (webpage glyph),
test/spec compound names, then the extension map, then bare-name
specials, then `doc`.

- `@param` name File display name.
- `@returns` A DOCS_ICON_KINDS value.

### `fileIcon`

File glyph — the shared page silhouette (hairline outline + folded
corner) with the kind's authored glyph inside, classed
`docs-tree-icon--<kind>` so the SCSS inks it.

- `@param` name File display name.
- `@returns` The SVG subtree.

### `treeIcon`

The row icon for one manifest node — directories get the stateful
paper-stack folder, files the kind-keyed pack glyph.

- `@param` node The manifest node the row renders.
- `@param` open Whether a directory row is expanded (file rows ignore it).
- `@returns` The SVG subtree.
