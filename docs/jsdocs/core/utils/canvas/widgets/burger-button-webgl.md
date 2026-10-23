# `core\utils\canvas\widgets\burger-button-webgl.ts`

WebGL menu icon for the nav burger button: four rounded

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\burger-button-webgl.ts`    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SUPERSAMPLE`

Backing-store supersample factor on top of the capped DPR — a 34px
icon renders at ~136–272 buffer px so the CSS downsample adds a
second AA pass. The shader divides by it to recover the "close px"
basis the shared close-paint library is authored in.

### `LIQUID_RATE_PER_S`

Liquid pour speed, per second — matches CloseButtonWebGL's 1.6%/frame
at 60fps so the open-state water fill pours at the same rate every
close button does (~1s to fill on hover, same on drain).

### `ROT_RATE_PER_S`

X-spin speed, per second — matches CloseButtonWebGL's 4%/frame at
60fps so the half-turn lands near the end of the pour.

### `CLICK_TIME_OFF`

Timestamp that disables the click shockwave (far past sentinel).

### `BurgerButtonWebGL`

WebGL liquid menu icon for the burger button.
Renders four rounded squares that drift with a liquid idle, pool toward
the center on hover/focus, and morph into the close X when the menu
opens (setOpen). Adapts to the current theme: dark icon in light mode,
bright icon in dark mode.

### `canvas`

- `@param` {HTMLCanvasElement} canvas - icon canvas inside the nav burger button
- `@param` {Function} onClick - optional click handler (the canvas becomes

### `_frameTick`

Bound per-frame tick — allocated once so the pooled re-arm never allocs.

### `_hover`

Smoothed hover convergence — pointer enter/leave + focus/blur drive the target.

### `_open`

Smoothed menu-open morph — setOpen drives the target.

### `_liquid`

Close-state liquid pour (u_liquid) — the turquoise water fill every
close button shows on hover. Target follows hover ONLY while the
menu is open, so the fill never pre-charges behind the closed icon.

### `_rot`

Close-state X rotation (u_rot) — the half-turn the real close
button's X performs while its liquid fills on hover.

### `_clickT`

Seconds since startTime of the last press — drives the click shockwave.

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
