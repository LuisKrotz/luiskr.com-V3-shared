# `website\components\media\anim-demo\dom.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\dom.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_AURA_TILES`

Tile selector the real aura session rings — the nav's two strip chips.

### `_LOADER_STEPS`

Loader counter steps the demo writes into the readout (percent text).

### `mountLoaderDemo`

Intro-loader demo — the percent readout counts 0→100 on coarse
beats while the staged rings/fill sweep in CSS (keyframes own the
smooth interpolation, JS only writes the coarse text like the real
loader's percent ticker).

- `@param` ctx The demo context (stage owns the counter span).
- `@returns` Teardown — stops the counter cycle.

### `mountMenuDemo`

Nav menu demo — toggles the open modifier so the staged items play
the real menu's staggered rise/fade entrance and exit.

- `@param` ctx The demo context (stage owns the menu column).
- `@returns` Teardown — stops the open/close cycle.

### `mountToastDemo`

Site-toast demo — alternates the staged pill between the slide/fade
entrance and the exit states, the same choreography a real
notification item plays.

- `@param` ctx The demo context (stage owns the toast item).
- `@returns` Teardown — stops the in/out cycle.

### `mountRelatedTilesDemo`

Related-tile reveal demo — walks the staged tiles' hover modifier
one index per beat so the lift rises tile-by-tile like the related
list's staggered scroll reveal.

- `@param` ctx The demo context (stage owns the tile row).
- `@returns` Teardown — stops the stagger cycle.

### `mountDrawDemo`

DrawText demo — resets then re-triggers the element so the
letter-drawing replay loop mirrors the real heading's reveal.

- `@param` ctx The demo context (stage owns the <draw-text> element).
- `@returns` Teardown — stops the replay cycle.

### `mountProgressBarDemo`

Route progress-bar demo — walks the staged bar through the real
nprogress choreography: crawl (active) → complete (done) → reset,
on long beats so each phase reads.

- `@param` ctx The demo context (stage owns the bar element).
- `@returns` Teardown — stops the phase cycle.

### `mountGlowDemo`

Body-glow demo — the staged glow surface drifts entirely in CSS
(the ::before wash mirrors the document-level glow); mounted for
completeness so the registry covers every id.

- `@param` _ctx The demo context — unused, no JS state to drive.

### `mountSkeletonDemo`

Skeleton-shimmer demo — the staged placeholders carry the shared
skeleton classes whose shimmer sweeps in CSS; no JS state to drive.

- `@param` _ctx The demo context — unused.

### `mountMediaDemo`

Media-progressive demo — the real <media-figure> mounts its own
decode/progressive lifecycle; no JS state to drive.

- `@param` _ctx The demo context — unused.

### `mountAuraDemo`

Nav icon-aura demo — mounts the real `mountRingFill` WebGPU session
on the stage's strip and cycles `setProgress` across the two chips
(the real hover path, automated). Where the widget layer is off the
session is null and the fallback alternates the armed modifier so the
static SVG comet-trail cue still sweeps — the production appearance
every non-WebGPU viewer sees.

- `@param` ctx The demo context (stage owns the strip + chips).
- `@returns` Teardown — stops the cycle, destroys the aura session.

### `mountTransitionDemo`

View-transition demo — alternates the gone modifier between the two
staged panes so the outgoing "page" fades out as the incoming one
fades in, the #view-outlet cross-fade in miniature.

- `@param` ctx The demo context (stage owns the pane pair).
- `@returns` Teardown — stops the cross-fade cycle.

### `mountSearchDemo`

Route-search demo — toggles the loading modifier so the staged field
alternates idle ↔ scoring-in-flight (spinning glyph + bouncing dots).

- `@param` ctx The demo context (stage owns the field).
- `@returns` Teardown — stops the loading cycle.

### `mountModalLoadingDemo`

Expand-modal loading demo — toggles the ready modifier so the staged
lightbox alternates spinner ↔ shimmer-sweep, the loading lifecycle
the real lightbox plays while the full-size asset decodes.

- `@param` ctx The demo context (stage owns the modal panel).
- `@returns` Teardown — stops the loading cycle.

### `mountFeedWaveDemo`

Footer feed-wave demo — prepends the real `feedGlyph` svg (dot +
two wave arcs) into the staged feed link and points it at the locale
feed URL; the arcs' opacity pulse itself ripples in CSS.

- `@param` ctx The demo context (stage owns the feed link).
