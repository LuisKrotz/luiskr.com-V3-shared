# `core/utils/gpu/ring-sheen.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/utils/gpu/ring-sheen.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `TILE_F32S`

Tile-sheet stride — mirrors rust/ring-sheen's `TILE_F32S`.

### (module scope)

Kind-specific wasm surface for the ring-sheen crate — typed on top
of the generic WasmWidget so calls stay checked.

### `set_tiles`

Per-tile sheet — 8 f32s: rect x,y,w,h · radius · phase · pad×2 (device px).

### `set_colors`

Ring edge + sheen core rgba 0-1 + hairline half-width (device px).

### (module scope)

Live ring-sheen overlay — the return surface callers hold.

### `refresh`

Re-measure tiles + repush the sheet NOW (host-driven repacks).

### `destroy`

Tear down canvas/widget/observers/listeners.

### `mountRingSheen`

`mountRingSheen` — overlays one instanced ring canvas on a tile
container. Returns null when the surface can't mount (no GPU, no
IntersectionObserver, reduced motion) — the CSS rings stay.

- `@param` container The positioned ancestor the canvas fills
- `@param` tilesSelector Class selector for the ringed tiles.
- `@param` canvasClass Overlay canvas class (the `:has()` gate keys on it).
- `@returns` A session handle, or null when nothing was mounted.

### `dirty`

True while tile geometry may be stale (transition/resize/repack).

### `resheet`

Re-measures every tile against the container box and repushes the
sheet + backing size. Colors refresh too — theme flips restyle the
ring vars without a remount.

- `@param` surface The live widget handle (callers run post-mount or post-guard).

### `tick`

The MANUAL rAF clock — resheets while dirty, then draws.

### `poke`

Schedules the next frame when idle (dirty flips, visibility return).

### `transitionLive`

Whether a tile transition is currently animating (keeps resheets flowing — top/left moves never fire ResizeObserver).

### `markDirty`

Marks the sheet stale — tile transitions + resizes both funnel here.
