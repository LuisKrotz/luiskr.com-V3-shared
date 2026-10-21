# `core\utils\gpu\divider-sheen.ts`

| | |
|---|---|
| **Source** | `src/core\utils\gpu\divider-sheen.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Kind-specific wasm surface for the divider-sheen crate — typed on
top of the generic WasmWidget so calls stay checked.

### `set_colors`

Push the hairline + band colors (rgba 0-1, computed style).

### (module scope)

Live mount state — the rAF loop + IO gate + the pending-mount flag
so a disconnect during the artifact fetch still tears down cleanly.

### `handle`

The widget handle once init resolves (null while pending/failed).

### `pending`

True between `mountWebGpuWidget` call and its resolution.

### `failed`

True once the mount attempt finished without a widget.

### `canvas`

The overlay canvas (removed on destroy).

### `io`

The IntersectionObserver gating mount + the loop.

### `raf`

Live rAF id, 0 when the loop is idle.

### `last`

Last frame timestamp for dt.

### `visible`

True while the hr is on screen (drives the loop).

### `dead`

True after destroy — every async path short-circuits on it.

### `pushDividerColors`

Resolves the divider's two colors from live CSS vars — the crate
never sees `var()`: `--border-color` feeds the hairline,
`--color-accent` the traveling band. Alpha is 1 for both (the CSS
gradient carries no alpha — the opacity is baked into the stops).
- `@param` hr The divider element (vars resolve in its shadow scope).

### `mirrorDividerBox`

Mirrors the `<hr>`'s box onto the overlay canvas — the canvas is an
absolutely-positioned sibling, so it resolves its offsets against
the same offsetParent the `<hr>`'s `offset*` properties report:
copying left/top/width/height lands the overlay pixel-identically.
The `<hr>` stays `visibility: hidden` (never `display: none`), so
this stays measurable on every resize. Backing size is device px.
- `@param` hr The divider element.
- `@param` m The live mount state.

### `tickDivider`

The loop tick — dt in seconds; self-schedules while the divider is
visible. A widget returning false (stale surface) disarms the loop
permanently; the canvas keeps its last frame painted until destroy.
- `@param` m The live mount state.

### `pumpDivider`

Starts the loop if it is idle — the IO + visibilitychange paths
funnel here so there is exactly one clock at all times.
- `@param` m The live mount state.

### `stopDivider`

Stops the loop — IO exit / tab-hidden / destroy paths.
- `@param` m The live mount state.

### `mountDividerSheen`

Mounts the divider-sheen widget over an `<hr>` divider. Returns a
disposer that releases the widget, the overlay canvas, the IO, and
the rAF — call it from the host component's `onDestroy` (and call
again on re-render: `_updateDom` swaps the `<hr>` node, so the old
mount's canvas + observer must go with it).
- `@param` hr The divider element (`aria-hidden` already — the canvas
- `@param` canvasClass The overlay canvas's class token — the
- `@returns` Teardown function; safe to call more than once.
