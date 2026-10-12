# `website/components/home/about/glitch/fx.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/about/glitch/fx.ts`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `coverRect`

Computes the cover-fit DESTINATION rect for the portrait at the given
canvas size — mirrors `object-fit: cover` AND the element's
`object-position`, read live from computed style so the canvas copy
always frames the portrait exactly the way the DOM <img> does.

The draw uses the whole-image form `drawImage(img, dx, dy, dw, dh)`
rather than a source crop on purpose: for srcset images selected via
`x` density descriptors, `naturalWidth`/`naturalHeight` report
DENSITY-CORRECTED units (intrinsic pixels ÷ descriptor) while
drawImage's source rect expects intrinsic pixels — a crop computed
from `naturalWidth` reads a fraction of the bitmap = the "zoomed
corner" bug at DPR ≠ 1. Destination-rect cover sidesteps the two
unit systems entirely: the browser maps the full image (any intrinsic
size) into the rect.

- `@param` img Decoded portrait element.
- `@param` size Output square edge in canvas (device) px.
- `@param` ox Canvas-space X origin of the square viewport.
- `@param` oy Canvas-space Y origin of the square viewport.

### `buildChannel`

Renders a channel-isolated copy of the portrait: the image is drawn
cover-fit, then a pure-channel ink is multiplied over it so only that
RGB channel survives. Two offsets of these under 'lighter' produce a
true chromatic split.

- `@param` s The session the channel copy is sized/drawn from.
- `@param` mask The pure-channel ink (CANVAS_STRINGS.CHANNEL_*).

### `buildScanlines`

Builds the scanline tile — 1px dark raster line every period.

### `clipCircle`

Clips every corruption to the portrait's circle.

### `drawBase`

Clears the frame and draws the undistorted portrait (circle-clipped).

### `sliceShift`

Lost-sync band tears: horizontal slices of the just-drawn frame are
re-blitted shifted a few px sideways — the image tears locally but never
dislocates as a whole. Idle tears are hair-thin; hover tears reach VHS
scale.

### `blockTear`

Packet-loss blocks (hover only): small rects duplicated at a horizontal
offset — pixels appear twice rather than sliding, like dropped
macroblocks in a damaged MPEG stream.

### `drawSplitBase`

Chromatic aberration — replaces the base draw on split frames. The red
and cyan channel canvases are complementary: (R,0,0)+(0,G,B) sums back
to the exact source under 'lighter', so compositing them at opposing
offsets reproduces the portrait WITH the CRT fringe. Drawing them over
an already-composited base would double the exposure (2×R,2×G,2×B →
white blowout) — so this is the frame's base, never an overlay.

### `rollBar`

VHS rolling band (hover only): a tall strip re-blitted slightly torn and
brightened, sweeping slowly down the frame like bad vertical hold.

### `trackBar`

VHS tracking bar (hover only): a thin bright strip at a fixed-ish
jittered height — the white tracking line at the tape head switch.

### `invertFlash`

One-frame near-total inversion — the classic bad-signal flash.

### `scanlines`

CRT raster lines via a repeated tile, jittered vertically each frame.

### `grain`

Film grain — scattered single-pixel speckle. Idle frames get sparse
black/white dust; hover frames get dense grain plus chroma noise
(red/cyan speckle like color noise on aged tape).

### `frame`

One frame: base redraw → gated corruption pass → raster artifacts.
