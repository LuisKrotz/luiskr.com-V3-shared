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
~60% of the content width. One tspan per character, each looping an
opacity ripple staggered a beat apart — each letter dims to a low
floor and brightens back, so the word stays legible in every frame
(a cinemagraph-strength shimmer, not letters vanishing); `seed`
negative-phases the loop so sibling rows never ripple in lockstep.
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

### `paperSheet`

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

### `FOLDER_BODY_CLOSED`

macOS/Windows-style folder silhouette — the raised left tab and the
rounded body are what make the glyph read as a folder at row size.
Closed folders get a full body with the front-face seam; open folders
truncate the back plate at the mouth and swing the front flap
forward — a trapezoid whose bottom edge is wider than the top, the
perspective cue of a cover leaning toward the viewer.

### `folderIcon`

Directory glyph — a single-stroke wireframe like the reference pack:
the rounded body + raised tab outline (closed) or the truncated back
plate + swung-forward flap trapezoid (open). Children show as paper:
closed folders peek page tops above the back edge, open folders fan
colored sheets out of the mouth; counts cap at the TREE_SHEET_CAP_*
unit tokens. The flap plays a one-shot swing on mount so the open
transition reads as motion.

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

TypeScript — the bold TS wordmark typing itself on.

### `js`

JavaScript — the bold JS wordmark, same typewriter reveal.

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

C++ — the bold C++ wordmark typing on.

### `cs`

C# — the bold C# wordmark typing on.

### `php`

PHP — the bold PHP wordmark typing on.

### `rb`

Ruby — the faceted gem: flat crown, pointed pavilion, facet
lines, and a twinkle at the top-right corner.

### `sql`

SQL/database — the stacked cylinder: top ellipse, two ring
lines, body; a scan band sweeping down through it.

### `json`

JSON — the large pair of curly braces breathing apart.

### `sass`

Sass — the ribbon S with the underline swash, drawn live.

### `css`

CSS — the shield emblem: tiny "CSS" wordmark above the shield's
top band, the big "3" numeral centered inside it.

### `html`

HTML — the same shield emblem: tiny "HTML" wordmark above the
top band, the big "5" numeral centered inside it.

### `xml`

XML — `<xml>`: breathing angle brackets around the wordmark.

### `md`

Markdown — the bold M with the down-arrow dropping beside it.

### `img`

Raster image — frame + sun + mountain line; the sun radiates.

### `photo`

Photo (jpg) — the same landscape frame but carrying the little
camera glyph bottom-right instead of the sun (the sheet's jpg).

### `gif`

GIF — the rounded box on two little feet, the GIF wordmark
strobing inside like cycling frames.

### `vec`

Vector file — the pen-tool mark: anchor squares at the ends of a
sagging bezier, handles wiggling, the nib hanging below center.

### `yml`

YAML — the {YML} mark: breathing braces around the wordmark.

### `conf`

Config/env — the toothed cog turning slowly, a small padlock
guarding its bottom-right corner (the sheet's .env mark).

### `lock`

Lockfile — padlock, the shackle swaying gently.

### `font`

Font files — the large light 'A' (font-weight drops to 300 via
the --font kind's -icon-text override in the SCSS).

### `wasm`

WASM — the hexagonal crate + inner diamond, slow spin.

### `test`

Test/spec files — the flask with rising bubbles.

### `cert`

License/notice — the rosette seal + ribbon tails.

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

Video/mp4 — the film frame with sprocket holes top and bottom and
the pulsing play triangle inside (the reference's mp4 mark).

### `cam`

QuickTime/mov — the video camera: rounded body with the play
triangle inside, lens horn trapezoid on the right.

### `audio`

Audio — a single continuous waveform (zigzag spikes, tall in
the middle) drawn as a dashed line scrolling along itself.

### `note`

Music files — the double beamed eighth-note (two heads, two
stems, one beam) bobbing on the beat (mp3/m4a/flac/aac).

### `web`

Webpage (index.html) — the browser window: chrome bar, traffic
dots and the page's content lines.

### `txt`

Plain text — six lines of varying length typing on row by row.

### `pdf`

PDF — the Acrobat loop ribbon drawing itself on: the knot curls
around its own waist before the tail sweeps out.

### `docx`

Word docs — the W box with the three text lines beside it.

### `xlsx`

Spreadsheets — the X box with the 2×2 cell grid beside it.

### `ppt`

Presentations — the P box with the little pie chart (circle +
one wedge) beside it.

### `csv`

CSV — the `{;}` mark: breathing braces around a semicolon-ish
dot pair (the sheet's dotted-braces csv glyph).

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
