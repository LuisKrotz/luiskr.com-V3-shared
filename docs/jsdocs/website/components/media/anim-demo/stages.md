# `website\components\media\anim-demo\stages.tsx`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\stages.tsx`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DEMO_COVER_STEM`

The demo cover-image stem (bucket path, extensionless — the ladder composes rungs).

### `_MENU_ITEMS`

Demo menu item count — mirrors the real nav's four primary routes.

### `_SHEEN_TILES`

Demo ring-sheen tile count — a row small enough to read the traveling sheen.

### `demoCanvas`

A decorative demo canvas — every animated surface the stage mounts is
aria-hidden: the record's own dt/dd text is the a11y contract, the
canvas is pure demonstration.

- `@param` extra Extra classes sizing the canvas (icon/frame variants).
- `@returns` The canvas element.

### `stageContent`

The staged DOM for one ANIMATION_IDS entry — the element(s) the
matching driver mounts its animation onto. Unknown ids get an empty
stage (the record still renders its text; only the demo area is bare).

- `@param` id ANIMATION_IDS entry (the record key).
- `@returns` Stage node for the demo, or null.
