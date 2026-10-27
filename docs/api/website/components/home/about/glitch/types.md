# `website\components\home\about\glitch\types.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\about\glitch\types.ts`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_DPR_CAP`

Device-pixel cap — corruption resolution beyond 2× is invisible.

### `_PIC_SEL`

Wrapper/img selector pair, resolved fresh each tick (re-render safe).

### `_IMG_SEL`

Live img selector — re-resolved each tick after shadow re-renders.

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

### `_IDLE_BAND_MIN`

Idle tear-band minimum height (frame-height fraction).

### `_IDLE_BAND_MAX`

Idle tear-band maximum height (frame-height fraction).

### `_HOVER_HIT`

Chance a hover frame runs the heavy corruption pass.

### `_HOVER_GRAIN`

Hover grain pixels per frame — dense film grain.

### `_GRAIN_ALPHA`

Grain alpha — film noise sits visibly on the image.

### `_HOVER_RGB_MIN`

Hover RGB ghost bounds in device px.

### `_HOVER_RGB_MAX`

Hover RGB ghost offset ceiling in device px — visible CRT fringe.

### `_HOVER_TEAR`

Hover tear distance bound as a frame-width fraction.

### `_HOVER_BANDS`

Hover band count/height bounds (frame-height fractions).

### `_HOVER_BAND_MIN`

Hover tear-band minimum height (frame-height fraction).

### `_HOVER_BAND_MAX`

Hover tear-band maximum height (frame-height fraction).

### `_HOVER_BLOCKS`

Hover block-tear count/size bounds.

### `_BLOCK_W_MAX`

Block-tear max width (frame-width fraction).

### `_BLOCK_H_MAX`

Block-tear max height (frame-height fraction).

### `_BLOCK_THROW`

Block-tear max duplicate offset (frame-width fraction).

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

### `_SCAN_ALPHA`

Scanline dark-line alpha — a whisper of raster, not a grid.

### `_CHROMA_CHANCE`

Hover-only chroma-noise chance inside the grain loop.

### `_POLL_HZ`

Un-armed retry poll rate in Hz — arms as soon as the portrait decodes.

### `_POS_PCT`

Percent scale for parsing object-position ("50%" → 0.5).

### `_POS_CENTER`

object-position fallback when the keyword parse fails — center.

### (module scope)

Live glitch session parked on `host._glitch`.

### `canvas`

Overlay canvas inside the picture wrapper.

### `ctx`

2D backend context — null while the WebGPU arm mounts and forever
after it succeeds; the rust/glitch shader replaces every painter.

### `w`

Canvas size in device px.

### `dx`

Cover-fit destination rect of the portrait (device px).

### `img`

Live image element — re-resolved after shadow re-renders.

### `srcW`

Natural size the cover rect was computed against — a srcset
candidate swap changes naturalWidth while `complete` stays true,
silently invalidating dx/dy/dw/dh (the stale rect then scales a
wrong-aspect portrait = the "zoomed portrait" bug).

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

### `wasm`

Live rust/glitch widget — the WebGPU render backend. Null while the
mount is in flight or after it fails (the 2D painters run instead).

### (module scope)

Narrowed view of the session for the 2D painters — `frame()` guards on
`s.ctx` once and passes this type down, so every painter keeps a
non-nullable context without per-call checks (the wasm arm never
reaches them).
