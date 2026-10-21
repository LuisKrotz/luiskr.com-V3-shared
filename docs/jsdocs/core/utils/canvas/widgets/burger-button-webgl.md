# `core\utils\canvas\widgets\burger-button-webgl.ts`

WebGL menu icon for the nav burger button: four rounded

| | |
|---|---|
| **Source** | `src/core\utils\canvas\widgets\burger-button-webgl.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `BurgerButtonWebGL`

WebGL liquid menu icon for the burger button.
Renders four rounded squares that drift with a liquid idle, pool toward
the center on hover/focus, and morph into the close X when the menu
opens (setOpen). Adapts to the current theme: dark icon in light mode,
bright icon in dark mode.

### `canvas`

- `@param` {HTMLCanvasElement} canvas - icon canvas inside the nav burger button
- `@param` {Function} onClick - optional click handler (the canvas becomes

### `_hover`

Smoothed hover convergence — pointer enter/leave + focus/blur drive the target.

### `_open`

Smoothed menu-open morph — setOpen drives the target.

### `_prevT`

Previous frame's t — the approach easings consume dt, not absolutes.

### `_initGL`

Creates the WebGL context + shader program; falls back to the CSS/DOM path on failure.

### `_initGLReal`

The synchronous WebGL bootstrap — context, program, quad, uniform handles.

### `_triggerFallback`

Switches to the non-WebGL path (CSS class on the host / Canvas2D) — used on context loss or init failure.

### `_checkResize`

Re-syncs the drawing buffer to the canvas's CSS box × devicePixelRatio
(capped at 2). Only reallocates when the rounded size actually changed,
and repaints one frame immediately when the RAF loop isn't running —
in reduced-motion static mode a resize would otherwise leave the
cleared buffer blank until the next state change.

### `setOpen`

Menu-open driver — the nav calls this on toggle/close so the pooled
droplet morphs into the close X (and back). With no running loop
(reduced motion, pre-start) the state snaps and repaints once.
- `@param` open Whether the menu overlay is open.

### `_setHover`

Hover-convergence driver — pointer enter/leave and focus/blur feed it.

### `_settleNow`

Snaps the smoothed state to its targets and repaints — the static path.

### `_start`

Chooses reduced-motion static render vs the rAF loop.

### `_drawFrame`

Renders one frame at time t (seconds) — shared by the RAF loop and the
static reduced-motion path. u_dark is re-evaluated per frame from the
live DOM classes (dark theme OR nav-on-dark over the contact band) so
the icon recolors instantly on theme/scroll changes with no listener.
- `@param` {number} t - seconds since construction

### `_loop`

rAF callback — repaints each frame while running.

### `purge`

webglPool hook — offscreen: stops the loop and releases the GL
context entirely; restore() rebuilds it on re-entry so offscreen
widgets never hold context slots.

### `restore`

Recreates the GL context and resumes the loop after an offscreen purge.

### `destroy`

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.
