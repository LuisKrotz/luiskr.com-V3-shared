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

Mosaic title combustion — the REAL burn pipeline (utils/burn) armed
on a one-card demo surface: raster, consume front, ember particles,
<draw-text> rewrite, then the un-burn rebuild — the hover/un-hover
choreography replayed on the cycle.

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

### `_GENIE_CLASSES`

The GenieClasses contract satisfied by the demo's own classes.

### `mountGenieDemo`

Genie modal — the real genieEnter/genieLeave helper driving a mini
backdrop + dialog: the origin dot's rect is committed as
store.modalOrigin each cycle, exactly like a trigger button would,
then the real warp plays between the enter/leave modifiers.

- `@param` ctx The demo context — host supplies the `$` contract.
- `@returns` Teardown — stops the cycle and clears the origin.
