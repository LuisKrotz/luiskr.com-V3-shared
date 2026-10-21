# `website\components\media\draw-text\gpu.ts`

| | |
|---|---|
| **Source** | `src/website\components\media\draw-text\gpu.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CHAR_F32S`

Char-sheet stride — mirrors rust/text-draw's `CHAR_F32S`.

### `ATLAS_PAD_EM`

Glyph overflow pad (fraction of font-size) — keeps descenders and the 0.12em rise inside the atlas cell.

### (module scope)

Kind-specific wasm surface for the text-draw crate — typed on top of
the generic WasmWidget so calls stay checked.

### `upload_atlas`

Rasterized glyph strip — one cell per char, white-on-transparent.

### `set_chars`

The 12-f32-per-char storage sheet (see file doc).

### `set_ink`

The block's text color.

### `trigger`

Anchors the stagger clock — frame() reports elapsed ms from here.

### `tryGpuDraw`

`tryGpuDraw` — attempts the WebGPU reveal for a just-triggered
element. Called from `startAnimation` after the char spans mount;
resolves silently — on any failure the CSS animation is the render
path (the canvas/class are only applied once the atlas + sheet are
live).
- `@param` host The draw-text element.
- `@param` totalMs Wall-clock span of the reveal (last delay + duration)

### (module scope)

`prepare` — measures the char spans, rasterizes the atlas, and
pushes ink + sheet into the widget. Returns false when nothing
measurable exists (hidden block, zero-size chars — the CSS path
then stays authoritative).
- `@param` host The draw-text element.
- `@param` mounted Live widget handle.
- `@param` contentEl The `.draw-text` content span.
- `@param` chars The per-char spans.
- `@param` canvas The overlay canvas.
- `@returns` True when the widget is armed and triggered.

### `COPY_PITCH`

bytesPerRow alignment required by `copyTextureToBuffer`.

### `BUFFER_COPY_DST`

WebGPU usage/map-mode flag values — the DOM lib types these as plain
numbers (`GPUBufferUsageFlags`/`GPUMapModeFlags`); the global
`GPUBufferUsage`/`GPUMapMode` constant objects only exist on WebGPU
runtimes, so the spec values are declared here instead of touching
`globalThis` (which also keeps the happy-dom tests free of globals).

### `VERIFY_MAX_COVERAGE`

Coverage ceiling for `verifyOverlay` — a glyph block's ink fills a
small fraction of its box; a painted-coverage ratio at/above this
means the draw degenerated into a full-bleed fill (the slab), and
zero means it produced nothing (missing text).

### (module scope)

`verifyOverlay` — arms-check for the GPU path: submits one frame at
the reveal's end state (every char drawn) against the detached
canvas, reads the painted texture back through the shared device,
and accepts the overlay only when the coverage sits inside the
glyph-block envelope (nonzero, non-full-bleed). Runs once per
trigger — the readback is a single mapAsync, never on the frame
path. Returns false on any readback/validation failure so the DOM
reveal remains the render path.
- `@param` mounted Live widget handle.
- `@param` canvas The (not-yet-attached) overlay canvas.
- `@param` probeMs ms past the last char's end — forces full reveal.
- `@returns` True when the probe painted a plausible glyph block.

### `totalMsForProbe`

`totalMsForProbe` — the probe's end-state timestamp: the last
scheduled char's delay + its own duration, the point where every
glyph is fully drawn. Kept separate from the wall-clock `totalMs`
(which adds presentation slack) so the probe measures the real
"all revealed" moment.
- `@param` host The draw-text element.
- `@param` chars The per-char spans.
- `@returns` ms after the reveal's start where all chars are drawn.

### `drive`

`drive` — the MANUAL rAF clock: advances the widget until the last
char lands (or the element tears down), then drops the overlay. The
DOM spans animate in parallel, so finish() is a same-state swap.
The DOM-suppression class lands on the first submitted frame — the
class flip and the canvas's first present composite together, so no
frame ever shows neither paint source (the mount blink).
- `@param` host The draw-text element.
- `@param` mounted Live widget handle.
- `@param` totalMs Reveal span — the overlay disarms after it.
- `@param` contentEl The `.draw-text` content span — receives the

### `finish`

`finish` — the end-state swap: drop the suppression class (the DOM
chars' CSS animation already completed to the same rest state), then
remove the canvas + widget.
- `@param` host The draw-text element.

### `teardownGpuDraw`

`teardownGpuDraw` — disarms the overlay without touching DOM paint:
used by reset()/disconnectedCallback (where the DOM re-renders to
the pending state on its own) and by `finish` (after the class drop).
- `@param` host The draw-text element.
