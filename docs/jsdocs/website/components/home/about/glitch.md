# `website/components/home/about/glitch.ts`

| | |
|---|---|
| **Source** | `src/website/components/home/about/glitch.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_DPR_CAP`

Device-pixel cap — corruption resolution beyond 2× is invisible.

### `_PIC_SEL`

Wrapper/img selector pair, resolved fresh each tick (re-render safe).

### `_IDLE_HIT`

Chance an idle frame runs a small tear/fringe burst.

### `_IDLE_GRAIN`

Idle grain pixels per frame — sparse film dust.

### `_IDLE_RGB`

Idle RGB fringe bound in device px — sub-pixel shimmer.

### `_IDLE_TEAR`

Idle tear distance bound as a frame-width fraction.

### `_IDLE_BANDS`

Idle slice-band count + height bounds (frame-height fractions).

### `_HOVER_HIT`

Chance a hover frame runs the heavy corruption pass.

### `_HOVER_GRAIN`

Hover grain pixels per frame — dense film grain.

### `_GRAIN_ALPHA`

Grain alpha — film noise sits visibly on the image.

### `_HOVER_RGB_MIN`

Hover RGB ghost bounds in device px.

### `_HOVER_TEAR`

Hover tear distance bound as a frame-width fraction.

### `_HOVER_BANDS`

Hover band count/height bounds (frame-height fractions).

### `_HOVER_BLOCKS`

Hover block-tear count/size bounds.

### `_TRACK_H`

VHS tracking bar — thin brightened horizontal strip.

### `_INVERT_CHANCE`

Chance per hover frame of an inversion flash.

### `_ROLL_H`

Rolling-bar height as a fraction of frame height.

### `_ROLL_SPEED`

Rolling-bar sweep speed (frame-heights per second).

### `_SCAN_PERIOD`

Scanline row period in device px + alpha.

### `_CHROMA_CHANCE`

Hover-only chroma-noise chance inside the grain loop.

### `_POLL_HZ`

Un-armed retry poll rate in Hz — arms as soon as the portrait decodes.

### `_POS_PCT`

Percent scale for parsing object-position ("50%" → 0.5).

### (module scope)

Live glitch session parked on `host._glitch`.

### `canvas`

Overlay canvas inside the picture wrapper.

### `w`

Canvas size in device px.

### `sx`

Cover-fit source crop of the portrait.

### `img`

Live image element — re-resolved after shadow re-renders.

### `srcW`

Natural size the cover crop was computed against — a srcset
 candidate swap changes naturalWidth while `complete` stays true,
 silently invalidating sx/sy/sw/sh (the stale crop then slices a
 corner of the larger bitmap = the "zoomed portrait" bug).

### `red`

Precomputed red / cyan channel canvases for the RGB split.

### `scan`

Scanline tile canvas (1×_SCAN_PERIOD) used as a repeat pattern.

### `t`

Elapsed seconds — drives the rolling bar.

### `raf`

Pending rAF handle.

### `active`

True while the loop should keep running.

### `hover`

Intensity — idle ambient or full VHS under hover.

### `tick`

Frame counter — paces un-armed retry polls.

### `ro`

Wrapper ResizeObserver — the CSS canvas is width:100%, so any post-arm
 layout change (resize, grid reflow, mosaic expand above) would stretch
 the stale device-px raster into a zoomed/cropped portrait without it.

### `coverCrop`

Computes the cover-fit crop rect for the source image at the given
output size — mirrors `object-fit: cover` AND the element's
`object-position`, read live from computed style so the canvas copy
always frames the portrait exactly the way the DOM <img> does
(e.g. a photo whose face sits right-of-center would otherwise crop
the middle of the source and render the face shifted).

### `buildChannel`

Renders a channel-isolated copy of the portrait: the image is drawn
cover-fit, then a pure-channel ink is multiplied over it so only that
RGB channel survives. Two offsets of these under 'lighter' produce a
true chromatic split.

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

### `sizeSession`

Sizes the canvas + caches cover crop, channel ghosts and scan tile.

### `picWrap`

The live picture wrapper inside the shadow root, if rendered.

### `observeResize`

Watches the picture wrapper for geometry changes: the session's device-px
canvas is pinned to `width:100%`, so it must be re-rastered whenever the
CSS box moves (resize, grid reflow, sibling expand) — otherwise the stale
raster stretches into a zoomed/cropped portrait. Skips no-op callbacks.
- `@param` s Live glitch session (rebuilds cover crop + channel ghosts).
- `@param` wrap The wrapper element to observe.
- `@returns` The armed observer, or null where RO isn't available.

### `liveImg`

The live decoded portrait, if the current DOM node is usable —
duck-typed because instanceof HTMLImageElement isn't reliable across
realms (happy-dom exposes the class only on the window it created).

### `armGlitch`

Arms the session: builds the overlay canvas + context against the live
wrapper. Bails quietly when the image isn't decoded, the wrapper is
zero-size, the 2D context is unavailable, or motion is reduced — the
<img> remains as the static fallback. Idempotent — returns true when a
session is already running.

### `healSession`

Re-homes the session after a shadow re-render: the old wrapper/img were
discarded, so the canvas is re-appended to the fresh wrapper and the
geometry + channel ghosts are rebuilt against the new image node.

### `tick`

Self-maintaining tick — always running while mounted:
  no session      → retry the arm at ~4 Hz (covers lazy image decode
                    and the first render landing before data).
  session detached→ heal against the fresh wrapper/img (re-render-safe).
  healthy session → draw the frame.

### `poll`

The un-armed half of the loop: polls at ~4 Hz until the portrait has
decoded enough to arm, then hands off to the session's own raf chain.

### `disarmGlitch`

Stops the loop and removes the overlay.

### `attachGlitch`

Binds the always-on glitch: starts the arm poll immediately (the effect
runs ambient interference as soon as the portrait decodes — no hover
needed) and the delegated hover handlers that only flip the intensity
flag. Listeners live on the shadow root, so they survive _updateDom
re-renders.
