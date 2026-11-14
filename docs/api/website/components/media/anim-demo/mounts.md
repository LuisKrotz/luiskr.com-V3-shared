# `website\components\media\anim-demo\mounts.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\mounts.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_CARD_SEL`

The card selector arm/disarmCardBurn resolves (index 0 — one demo card).

### `_BURN_CLASSES`

The BurnClasses contract satisfied by the demo's own classes.

### `mountBurnDemo`

Card-stack title combustion — the REAL burn pipeline (utils/burn)
armed on a one-card demo surface: raster, consume front, ember
particles, <draw-text> rewrite, then the un-burn rebuild — the
consume/rebuild choreography the card-stack's project names play on
every deal-through, replayed on the cycle.

- `@param` ctx The demo context — host supplies the `$` contract.
- `@returns` Teardown — stops the cycle and disarms any live session.

### `mountDividerDemo`

Footer divider sheen — the real `<hr>` fallback paint (authored in
anim-demo.scss) plus the WebGPU overlay attempt; the mount no-ops
without a GPU so the CSS band always plays.

- `@param` ctx The demo context (stage owns the hr).
- `@returns` Teardown — destroys the widget mount when it exists.

### `mountRingSheenDemo`

Tile ring sheen — real tiles carrying the authored ring CSS plus the
WebGPU instanced overlay attempt on the row container.

- `@param` ctx The demo context (stage owns the tiles row).
- `@returns` Teardown — destroys the sheen session when it mounted.

### `mountBracketsDemo`

Action-button corner brackets — the authored ::before/::after L-brackets
expanding on the hover modifier (the production fallback path), plus the
WebGPU widget attempt keyed on the same class contract.

- `@param` ctx The demo context (stage owns the button).
- `@returns` Teardown — stops the hover cycle and destroys the mount.

### `mountGenieDemo`

Genie lightbox warp — the REAL expanded/genie strip-warp renderer
replayed on a mini lightbox: the media box liquid-funnels into the
origin card on the close beat and restores on the open beat, over the
production GENIE_TIMING clock (p = opening ? 1−raw : raw), the
landed-frame discipline, and the veil token hiding the unwarped
content while the overlay canvas owns the paint. The 2D backend is
universal — WebGPU is never required — so the demo is a 1:1 replica
of the real lightbox transition on every surface. Frame scheduling
rides the shared framePool (scroll-settled like production); the
open/close alternation lives on the long beat.

- `@param` ctx The demo context — stage carries the mini lightbox
- `@returns` Teardown — cancels the cycle/frame loop, drops the overlay,

### `dropOverlay`

Disposes the renderer and removes the overlay canvas, if present.

### `halt`

Cancels the armed frame and drops the overlay — the run is halted.

### `settle`

Converged-settle: drop the overlay and leave the rest state — an
open run unveils the real content; a close run keeps it veiled (the
lightbox stays "closed", the origin card alone paints).

### `attach`

First-frame attach — mirrors `measureAttach`: rect reads land inside
the rAF task, the sheet bakes once per mount (the renderer's media
slot restamps live on decode), the overlay canvas mounts sized to
the stage at the production dpr cap, and the close veil lands at
attach so the content paints until the warp can take over.

- `@returns` False when no 2D context exists — the run settles instantly.

### `tick`

One frame tick — attaches on first run, draws, re-arms or settles.
The pump timestamp is the clock (production parity: the rAF arg is
a DOMHighResTimeStamp on the same timescale as performance.now()).

- `@param` now The pump's frame timestamp (ms).

### `run`

Starts one warp run in the given direction — any in-flight run is
halted first so back-to-back beats never double the overlay.

- `@param` dir True to fly figure→media (open), false media→figure (close).
