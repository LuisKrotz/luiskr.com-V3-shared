# `core\utils\gpu\ring-fill.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\gpu\ring-fill.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `TILE_F32S`

Tile-sheet stride — mirrors rust/ring-fill's `TILE_F32S`.

### `FILL_SECONDS`

Perimeter draw duration — the light tip travels the whole border.

### (module scope)

Kind-specific wasm surface for the ring-fill crate — typed on top of
the generic WasmWidget so calls stay checked.

### `set_tiles`

Per-button sheet — 8 f32s: center x,y · radius · progress · phase · pad×3 (device px).

### `set_colors`

Track + fill + head rgba 0-1 + hairline half-width (device px).

### (module scope)

Live ring-fill overlay — the return surface callers hold.

### `setProgress`

Set one button's fill target (0 collapsed, 1 filled); eases over FILL_SECONDS.

### `refresh`

Re-measure buttons + repush the sheet NOW (list re-renders).

### `destroy`

Tear down canvas/widget/observers/listeners.

### `mountRingFill`

`mountRingFill` — overlays one instanced ring canvas on the results
list. Returns null when the surface can't mount (no GPU, no
IntersectionObserver, reduced motion) — the SVG rings stay.

- `@param` container The positioned ancestor the canvas fills
- `@param` tilesSelector Class selector for the ringed go buttons.
- `@param` canvasClass Overlay canvas class (the `:has()` gate keys on it).
- `@returns` A session handle, or null when nothing was mounted.

### `dirty`

True while geometry may be stale (resize/re-render).

### `progress`

Per-tile eased progress — Float32Arrays keep the hot loop allocation-free.

### `resheet`

Re-measures every button against the container box and repushes the
sheet + backing size. Progress values are preserved across
re-measures (the sheet is rebuilt, not the animation state).

- `@param` surface The live widget handle.

### `step`

Advances every tile's progress toward its target by `dt` seconds
(linear ease — matches the CSS transition timing). Returns true
while any tile is still animating so the caller keeps the clock
running; the sheet is repushed each animating frame.

- `@param` dt Frame delta in seconds.
- `@param` surface The live widget handle (resheet source).
- `@returns` True while animation is in flight.

### `tick`

The MANUAL rAF clock — resheets while dirty, eases, then draws.

### `poke`

Schedules the next frame when idle (dirty flips, progress changes).

### `markDirty`

Marks geometry stale — list re-renders and resizes funnel here.
