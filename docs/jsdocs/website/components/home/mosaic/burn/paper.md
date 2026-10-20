# `website/components/home/mosaic/burn/paper.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/mosaic/burn/paper.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `readBurnInk`

Resolves the burn palette from the root CSS custom properties — dark
theme publishes a cyan-blue plasma ramp, light theme an airy
paper-fire ramp. Falls back to the fixed canvas inks when the
properties are absent (older stylesheet, non-themed host).

- `@returns` The combustion ink ramp (embers ×3, scorch, smoke).

### (module scope)

Word box for DOM-faithful rasterization — the word's position inside the
title element in CSS px (`y` is the word fragment's bottom edge; the
caller subtracts the descent to land on the baseline).

### `text`

The raw (pre-transform) word as it appears in the text node.

### `x`

Left edge of the word fragment relative to the title box.

### `y`

Bottom edge of the word fragment relative to the title box.

### `titleWordBoxes`

Reads each word's rendered box straight from the DOM via Range rects —
the browser's own line-breaking is the wrap authority. Canvas
`measureText` metrics drift sub-pixel from the layout engine
(letter-spacing accumulation, shaping/hinting differences): the drift
used to push the wrap loop a word early, the extra line drew ABOVE the
bottom-anchored paper's top edge, and the visible title collapsed to
its last word — burning only that fragment (the "title cut to its last
word" bug). Positioning each word at its DOM fragment makes phantom
wraps impossible and also reproduces justified/aligned spacing for
free. Returns null when the API or a usable text node is absent.

- `@param` title The h2 element holding the title text.
- `@returns` Per-word boxes in title-relative CSS px, or null to fall back.

### `rasterizeTitle`

Rasterizes the h2 text into the paper canvas. Words are drawn at their
DOM Range fragment positions (see {@link titleWordBoxes}), so the raster
is pixel-faithful to the rendered title — same wraps, same spacing.
Engines without Range fall back to a measured word-pack matching the
DOM box, drawn bottom-anchored like the overlay's `align-items:
flex-end`.

`cssW`/`cssH` are the title box in CSS px while the paper's backing
store is device px (cssW × dpr): canvas font and measureText units are
CSS px, so the context is scaled cssW→paper.width first — without the
transform the glyphs land at 1/dpr size on hidpi/fractional displays
(the "burn text renders smaller than the title" bug).

- `@param` title The h2 element whose glyphs are re-rendered.
- `@param` paper Offscreen canvas sized in device px.
- `@param` cssW Title box width in CSS px.
- `@param` cssH Title box height in CSS px.
- `@param` ink Pre-capture resolved ink color.

### `analyzePaper`

Reads the rasterized paper's alpha channel to locate each glyph:
columns that carry ink form runs — a space leaves a transparent gap,
so each contiguous run IS one letter (kerned pairs may fuse, which
just makes them burn as a unit). Builds:

- `colInk`: 1 where a paper-x column has any glyph pixel — ember
  spawning and the char band use it so nothing glows in the spaces.
- `letters`: per-run ink bounds (x0..x1, y0..y1) plus a random burn
  speed and ignition delay. Speeds spread 0.55..1.45×, delays up to
  22% of total progress — letters catch at different moments and
  burn at different paces.
- `colLetter`: paper-x → owning letter index; gap columns bind to
  the nearest run so the erase polygon stays coherent across spaces.

Finally every letter's speed is normalized so the SLOWEST ignitor
finishes at ~98% progress — the burn ends with the description's
typing, never after.

- `@param` s The live session — fills letters/colInk/colLetter + work size.

### `syncPaper`

Anchors the canvas once at arm size, then tracks POSITION only. The
card's expand ease animates the h2's `cqw` font-size for ~0.42s after
hover; re-measuring the box every step baked that shrink into the
raster, so the burning glyphs visibly collapsed with the DOM font (the
reported font-reduction bug). Freezing the raster keeps the title the
size it was when it caught fire — only the canvas slides along the
moving box. `lastBox`/`lastPos` signatures skip all work when nothing
moved.

- `@param` s The live session — owns the canvases and DOM elements.
