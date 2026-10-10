# `core/tokens/classes/mosaic.ts`

Home mosaic grid class tokens — token group.

| | |
|---|---|
| **Source** | `src/core/tokens/classes/mosaic.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `HOME_MOSAIC_CLASSES`

Frozen home mosaic class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `HOME_MOSAIC_ITEM_BURNING`

Set on the card while its title burn session runs — silences the
 border sheen so only the combustion reads as the hover effect.
