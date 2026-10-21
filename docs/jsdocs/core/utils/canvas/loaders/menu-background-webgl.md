# `core\utils\canvas\loaders\menu-background-webgl.ts`

Fullscreen WebGL background for the nav menu overlay: an

| | |
|---|---|
| **Source** | `src/core\utils\canvas\loaders\menu-background-webgl.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MenuBackgroundWebGL`

WebGL animated background for the mobile burger menu — "Membrane" concept.
Renders fine organic monochrome contour lines (domain-warped fbm isolines)
that slowly breathe, inspired by Iris van Herpen's material studies.
The field materialises from the centre as `u_reveal` eases toward 1 and
dissolves back on release(). Line colour is sampled from --menu-ink /
--menu-ink-2 so it always matches the active theme — monochrome in dark,
water-blues in light; falls back to a CSS moiré layer when WebGL is
unavailable or the shader fails to compile/link.

### `canvas`

- `@param` {HTMLCanvasElement} canvas - fullscreen canvas behind the menu

### `_wasm`

Live WebGPU wasm handle — the preferred backend when it mounts.

### `_wasmFailed`

Latch — a failed wasm mount never retries on this instance.

### `_wasmPending`

In-flight mount — restore() must not double-mount on re-entry.

### `_initGL`

Creates the WebGL context + shader program; falls back to the CSS/DOM path on failure.

### `_tryWasm`

Attempts the WebGPU wasm menu background (~50KB artifact, own
GPUDevice). MANUAL drive: this class keeps its own reveal ease +
loop, so the bridge only initializes the surface. On any failure
the WebGL path runs exactly as before.

### `_triggerFallback`

Switches to the non-WebGL path (CSS moiré layer) — used on context loss or init failure.

### `_releaseGL`

Frees the quad program/buffer and force-loses the context (listener detached first).

### `_parseCssColor`

Parses a CSS colour string (#rgb, #rrggbb, rgb(), rgba()) into a
normalized [r,g,b] float triple for the shader uniform.

### `_sampleTheme`

Samples --menu-ink / --menu-ink-2 into the shader ink colors.

### `start`

Begins the render loop on menu open (see menu-background-loop.ts).

### `release`

Eases the reveal back to 0 so the field dissolves on menu close.

### `purge`

webglPool hook — canvas scrolled offscreen (or the browser trimmed
contexts): tears the GL resources down entirely instead of merely
pausing, freeing the context slot for other surfaces. restore()
recreates them on re-entry.

### `restore`

Recreates the GL context + restarts the loop after an offscreen purge.

### `_animateReveal`

Starts (or restarts mid-flight) a timed reveal ease.

### `_tickReveal`

Advances the reveal ease to the current timestamp.

### `stop`

Stops the rAF loop.

### `_handleResize`

Syncs buffer size + u_res uniform with the viewport.

### `_loop`

rAF callback — draws the animated contour field each frame.

### `_renderFrame`

Renders the noise field; a fixed staticTime renders one settled frame.

### `destroy`

Releases the context, buffers, listeners and rAF handle so the canvas can be GC'd.
