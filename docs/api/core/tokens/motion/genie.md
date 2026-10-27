# `core\tokens\motion\genie.ts`

Expand-modal genie-warp tunables — the macOS-style liquid

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\genie.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `STRIPS`

Strip tessellation cap — the scratch arrays size to STRIPS+1. The
per-frame band count is adaptive: sheet height ÷ STRIP_TARGET_PX,
floored at MIN_STRIPS and capped here. 256 bounds the buffers and
the worst-case draw cost; typical viewports land near 180 bands.

### `STRIP_TARGET_PX`

Target band height (CSS px) — the strip pitch. ≈5px per band keeps
the funnel's sloped walls raster-smooth on a 900px sheet (180
parallelogram draws ≈ 3.2ms of setTransform+drawImage on mid-range
hardware — inside the 4.16ms desktop frame slice); the previous
fixed 96 strips stair-stepped the walls at ~9px pitch.

### `MIN_STRIPS`

Floor band count — very small sheets still get enough rows for the
staggered field to read as a continuous funnel instead of a
handful of sliding bands.

### `STAGGER_X`

Horizontal stagger — each row's x-clock starts at
(1−ty)·STAGGER_X of the run, so the figure-facing edge leads and
the far edge trails. 0.65 is the reference value: deep enough for
the walls to read as a liquid S-curve, shallow enough that the
trailing edge never feels abandoned.

### `STAGGER_Y`

Vertical stagger — same trick on the y-clock. Kept small (0.2 in
the reference): the collapse stays mostly uniform vertically while
the leading edge dips into the card first.

### `GLOW_START`

Dock-flash window — the radial white burst at the figure's center
starts when funnel progress passes 0.75 and eases out (1−(1−t)²)
to GLOW_ALPHA as the sheet lands. Matches the reference's last
quarter accent.

### `GLOW_ALPHA`

Dock-flash peak alpha — subtle white bloom, never a hard flash.

### `GLOW_RADIUS_FRAC`

Dock-flash radius as a fraction of the figure's short edge — the
reference uses a fixed 55px around a 50px icon; scaling by the
card keeps the bloom proportional on large media figures.

### `MIN_BAND_PX`

Minimum drawn band height (CSS px). Contiguous bands can collapse
to zero/negative height where the funnel neck inverts the strip
order mid-flight; bands under it skip the draw (a sub-pixel sliver
is invisible anyway).

### `EDGE_OVERDRAW_PX`

Per-band overdraw (CSS px) on the parallelogram strip pass — each
band's quad is extended by this on its right wall and floor so the
antialiased seams between neighbours never open sub-pixel cracks
along the funnel's diagonal walls (opaque texture, so the double
paint is invisible).

### `TEX_MAX_PX`

Sheet-texture long-edge cap (device px) — the composited modal
surface bakes at min(dpr, TEX_MAX_PX / longest edge). 2560 keeps a
1440p sheet at ~1.8× (crisp through the 700ms warp) without an
unbounded framebuffer on dpr-3 mobile.

### `GENIE_TIMING`

Progress driver — a duration clock over linear time. `p = opening ?
1−raw : raw`: the close runs 0→1 (modal → figure) and the open
evaluates the identical field in time-reverse — the literal reverse
animation macOS plays on restore — so both directions share one
liquid surface. No global easing curve: the reference is linear-time
by design — the motion character lives entirely in the per-row
staggered eases (x rows ease-in-out, y rows ease-in so the suck
accelerates into the card).

### `OPEN_MS`

Open run duration (ms).

### `CLOSE_MS`

Close run duration (ms) — slightly longer, the suck needs runway.

### `DT_MAX_S`

Per-frame integration step cap (seconds) — a suspended tab resumes
with a finite dt so the driver's frame ticks never lurch.

### `MOUNT_MS`

Async GPU-mount budget (ms) — the WebGPU/Rust backend mounts
off-tick (wasm instantiate + shader compile); under throttle that
can outlast the whole transition and the watchdog would settle
before the first frame — the "blink" failure mode. The 2D backend
runs the identical field and attaches instantly, so the mount is
raced: GPU wins when it resolves inside this window, otherwise 2D
owns the run and the late renderer is disposed.

### `MAX_MS`

Hard cap on the run (ms) — a wedged rAF or a pathological clock
can never latch the overlay; past this the session force-settles
and hands control back to the modal.

### `GENIE_FALLBACK`

Timing fallbacks — the degraded paths when the canvas route cannot
run (reduced motion, missing 2D context, widget mount failure).

### `OPEN_MS`

Open veil duration (ms) when the genie cannot play — matches the
legacy `modal-zoom-in` keyframe time so the fallback keeps the old
rhythm.

### `CLOSE_MS`

Close duration (ms) — matches the legacy `modal-zoom-out` keyframe
and the existing teardown delay in expanded/close.ts.
