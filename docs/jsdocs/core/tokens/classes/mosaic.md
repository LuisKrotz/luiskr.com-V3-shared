# `core\tokens\classes\mosaic.ts`

Home mosaic grid class tokens — token group.

| | |
|---|---|
| **Source** | `src/core\tokens\classes\mosaic.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `HOME_MOSAIC_CLASSES`

Frozen home mosaic class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `HOME_MOSAIC_ITEM_BURNING`

Set on the card while its title burn session runs — silences the
 border sheen so only the combustion reads as the hover effect.

### `HOME_MOSAIC_IMG_PLACEHOLDER`

Progressive-cover layers — intrinsic-size SVG reserves the painted
 box, LQIP first paint, then the display ladder fades in over it.

### `HOME_MOSAIC_IMG_LOADED`

Published on the high layer's `load` — the CSS crossfade trigger.

### `HOME_MOSAIC_BTN_CANVAS`

WebGPU overlay canvas for the corner-bracket widget on card CTAs.

### `HOME_MOSAIC_RING_CANVAS`

WebGPU overlay canvas for the instanced border-sheen rings.
