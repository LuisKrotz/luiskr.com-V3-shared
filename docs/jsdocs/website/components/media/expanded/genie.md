# `website\components\media\expanded\genie.ts`

Expand-modal genie transition — the macOS-style liquid

| | |
|---|---|
| **Source** | `src/website\components\media\expanded\genie.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Viewport-space rect the genie field interpolates between.

### (module scope)

One transition backend — `frame` draws the warp at eased funnel
progress `f` after `dt` seconds; false reports a dead surface so the
driver force-settles instead of latching.

### `frame`

Draws one frame.
- `@param` dt Frame delta seconds.
- `@param` p Eased funnel progress 0..1 — 0 = the modal sheet, 1 = the
- `@returns` False on a dead surface.

### `dispose`

Releases every resource the backend owns (context refs, widget).

### (module scope)

Live session record — stored on `el._genie` so close/destroy paths
can cancel mid-flight.

### `raf`

The pending rAF handle — cancel() stops the clock.

### `content`

The veiled content element (visibility kept on bail-out).

### `renderer`

The active renderer once the backend resolves (null while async-mounting).

### `p`

Eased funnel progress — 0 = modal sheet, 1 = figure funnel.

### `last`

rAF timestamp of the previous frame — dt source.

### `started`

Session start (ms) — the GENIE_TIMING.MAX_MS watchdog.

### `done`

Runs once on settle — open: none (unveil suffices); close: teardown.

### `cancelled`

Set on cancel — the async backend pick short-circuits on it.

### `opening`

True while opening (origin → modal); false on the collapse.

### `measured`

Set once the first tick ran the measure+mount phase — the backend
pick defers there so the rect reads land in a fresh task instead of
interleaving with the caller's mount-task writes (forced-reflow
governance).

### `cb`

The rAF callback — allocated once per session and re-armed every
frame (a per-frame `() => tick(el, s)` closure would allocate at
240Hz, violating the zero-allocation frame budget).

### `landed`

Set once the converged terminal frame (media exactly on the
destination rect) has painted — the next tick tears down. One
composite cycle must elapse between the landing draw and the
overlay removal or the funnel's last mid-flight frame pops
straight to the page: the close-direction "blink".

### `GENIE_DPR_CAP`

Overlay device-pixel cap — a fullscreen transition canvas at raw
devicePixelRatio triples fill cost on dpr-3 phones; 2 keeps the warp
crisp without exceeding the frame budget.

### `fallbackOrigin`

Fallback origin when no figure resolves — a bottom-center dock sliver.

### `figureForUrl`

Resolves the origin figure's element for deep-link opens: walks
the page's `media-figure` elements in document order applying the
same `mediaSlugSeq` numbering the build/deep-link used, and matches
the slug trailing the URL. Returns null when no figure matches —
the caller then falls back to the stored snapshot or the dock point.
- `@param` el The <media-expanded> element (its root scopes the query).
- `@returns` The matching <media-figure> element, or null.

### `figureRectForUrl`

The origin figure's live rect — the element resolved by
`figureForUrl`, measured in viewport CSS px.
- `@param` el The <media-expanded> element.
- `@returns` The figure's viewport rect, or null.

### `sheetRect`

Resolves the sheet rect — the bounded modal card the warp's texture
covers. The `.expand-modal-media-figure` element is the window:
reference-faithful, the funnel carries the opaque card (media +
frame) while the fullscreen glass veil and viewport chrome fade
instead of warping — warping a fullscreen translucent slab read as
a flat "mono block". Missing/zero-sized → the media item, then the
content root, then a centered aspect-fitted rect so the field still
has a valid target.
- `@param` el The <media-expanded> element.
- `@param` content The modal content root (already resolved upstream).
- `@returns` The sheet rect in viewport CSS px.

### `originRect`

Resolves the origin rect — stored click snapshot first (it survives
the page pin), then the live figure for deep-link opens, then the
bottom-center dock point.
- `@param` el The <media-expanded> element.
- `@param` preferLive True on close — re-measure so a resize while the
- `@returns` The origin rect in viewport CSS px.

### `teardownOverlay`

Removes the overlay + unveils the content — the settle/cancel
teardown shared by every exit path. The renderer's dispose() removes
its own canvas; the class sweep catches the dead clone the worker
route can leave in the DOM slot after a failed transfer.
- `@param` s The session.
- `@param` el The <media-expanded> element — shadow scope for the sweep.

### `tick`

The funnel clock — `raw = elapsed/duration` mapped linearly:
`p = opening ? 1−raw : raw`. No global easing — the reference is
linear-time by design; the motion character lives entirely in the
per-row staggered eases (x rows ease-in-out, y rows ease-in so the
collapse accelerates into the card — the dock suck). The open runs
the identical field in time-reverse so both directions share one
liquid surface. dt is clamped to 50ms so a suspended tab resumes
with a finite step instead of a lurch; MAX_MS force-settles
so a wedged rAF can never latch the overlay. On settle the overlay
drops and the content unveils in the same task, then `done` runs
(open: no-op; close: the modal teardown).
- `@param` el The <media-expanded> element.
- `@param` s The session.

### `startGenie`

Starts a genie run: veils the content and arms the eased clock.
Rect measurement, canvas creation and the backend pick (WebGPU
widget when the opt-in layer is enabled and mounts, otherwise the
universal 2D warp) all run inside the first `tick` frame — deferred
so the transition's layout reads land in a fresh task instead of
interleaving with the caller's mount-task writes (write → read →
write → read is the forced-reflow pattern the governance gate
forbids); it also means the warp always measures the modal in its
fully-styled post-mount state.

Contract: returns false only when the transition cannot start at
all (reduced motion, missing shadow/content) — the caller then runs
its instant/CSS fallback. Once true is returned the session owns the
outcome: a backend that dies before the first frame resolves to
`done` (open: instant unveil; close: instant teardown) rather than
latching.
- `@param` el The <media-expanded> element.
- `@param` opening True for open (origin → modal), false for close.
- `@param` done Settle callback — open: no-op; close: modal teardown.
- `@returns` False when the transition cannot start — caller falls back.

### `measureAttach`

The first-frame measure+mount phase — runs inside `tick`'s rAF task
where the transition's rect/dpr/viewport reads are the task's first
reads. Measures the field, creates the overlay canvas, picks the
backend and attaches it to the session.
- `@param` el The <media-expanded> element.
- `@param` s The live session (opening flag carried on it).

### `attach`

Attaches a resolved backend mid-flight — the spring has already
progressed, so the warp picks up seamlessly. A dead/null backend
resolves the run to `done` (instant unveil/teardown) rather than
latching the overlay. Each backend owns its canvas and removes it
inside dispose().
- `@param` renderer The backend, or null when none could initialize.

### `makeCanvas`

The overlay canvas factory — fullscreen, device-px capped, and
already in the shadow (the worker route needs it in the DOM before
transferToOffscreen).

### `canvas2d`

The universal 2D backend — acquires the context and wraps the
strip-warp renderer. Null when the canvas refuses a 2D context or
the renderer construction throws — a hard throw here must never
latch the veil, so construction is wrapped; on failure the canvas
is dropped and the session resolves to `done` via attach(null).

### `startGenieOpen`

Open transition — warps the media from the clicked figure's rect
into the modal's media box.
- `@param` el The <media-expanded> element.
- `@param` done Settle callback (the unveil already happened internally).
- `@returns` False when the transition cannot start — caller falls back.

### `startGenieClose`

Close transition — collapses the media from the modal box back into
the origin figure.
- `@param` el The <media-expanded> element.
- `@param` done Settle callback — the modal teardown (URL/dialog/scroll).
- `@returns` False when the transition cannot start — caller falls back.

### `cancelGenie`

Cancels a live session — the overlay drops and the content unveils
immediately; `done` does NOT run (the caller keeps control).
- `@param` el The <media-expanded> element.
