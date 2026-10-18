# `website/components/media/draw-text/fit.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/media/draw-text/fit.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `availableWidth`

Returns the parent's horizontal content-box width in px — the space the
title is actually allowed to occupy. Falls back to the host's own
clientWidth when the element has no parent (detached / test mounts).

- `@param` host — the draw-text element
- `@returns` available width in px, `0` when unmeasurable

### `widestWord`

Returns the widest word span inside the shadow root in px. Words are
`inline-block` + `nowrap`, so their rect is the true overflow source —
the line itself wraps legally at the space tokens.

- `@param` host — the draw-text element
- `@returns` widest `.draw-text__word` width in px

### `fitText`

Measures and (only when overflowing) scales the host's font size and
letter spacing so the widest word fits the parent's content box.
Clears the inline overrides first so re-measurement is always relative
to the stylesheet ramp. No-ops without the `fit` attribute, without a
measurable box, or when the text already fits.

- `@param` host — the draw-text element

### `fitQueue`

Pending batch of hosts whose fit pass was deferred to the next frame.
A `Set` dedupes repeated triggers (attribute change + observer in the
same task) so each host measures once per flush.

### `fitRafId`

rAF handle for the queued batch — `0` means no flush is scheduled.

### `applyFit`

Applies the computed scale for one host — the write half of the batched
flush, fed by values captured in the read phase so the loop is pure
writes (a getComputedStyle here would re-interleave read → write).

- `@param` host — the draw-text element
- `@param` m — measurements captured in the read phase

### (module scope)

Measurements captured in the flush's read phase for one host.

### `avail`

Parent content-box width in px.

### `widest`

Widest `.draw-text__word` width in px.

### `baseFont`

Host font size at the stylesheet ramp, px.

### `baseSpacing`

Host letter-spacing at the stylesheet ramp, px (normal → 0).

### `measureFit`

Reads every layout/style value applyFit needs for one host — kept in a
single place so the flush's middle phase is pure reads.

- `@param` host — the draw-text element
- `@returns` the host's measurements for the write phase

### `flushFits`

Flushes every queued host in three strict phases — clear all inline
overrides, read all measurements, then write all scales. Running the
passes back-to-back inside one rAF turns the mount-time N × (write →
read → write) layout thrash into a single style/layout/paint cycle.
Hosts disconnected before the flush are skipped via the mounted flag.

### `scheduleFit`

Queues a fit pass for the host on the next animation frame instead of
measuring synchronously. All draw-text siblings mount in the same task
batch; coalescing their fits prevents sequential forced reflows — the
synchronous `fitText` remains available for callers that already hold
a stable layout (and for the test suite's deterministic asserts).

- `@param` host — the draw-text element

### `setupFit`

Installs the fit pipeline for a fitted host: immediate measure, a
ResizeObserver on the parent (the sizing constraint) for breakpoint /
orientation changes, and a one-shot refit once webfonts finish loading
(late font swaps can widen the same word by several percent).

- `@param` host — the draw-text element

### `teardownFit`

Disconnects the fit observer, drops any queued batch entry, and
restores the stylesheet font sizing — called on disconnect and when
the `fit` attribute is removed.

- `@param` host — the draw-text element
