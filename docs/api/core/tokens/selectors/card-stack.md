# `core\tokens\selectors\card-stack.ts`

Card-stack deck selector tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\selectors\card-stack.ts`                 |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `CARD_STACK_SELECTORS`

Frozen card-stack selector map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `CARD_STACK_HEADER`

The section's "SELECTED WORK" header row — a chrome row the stage
budget subtracts in measure().

### `CARD_STACK_AUTOPLAY`

The autoplay play/pause transport in the foot nav.

### `CARD_STACK_CARD_INFO`

The in-card copy column (title + description + CTA) inside a
stacked card — the content box the fit observer watches so
injected copy re-runs the stage-cap fit.

### `CARD_STACK_CARD_INFO_DESC`

The in-card description slot — its <draw-text> writer re-arms on
every front change (stacked tiers animate the body text per card).

### `CARD_STACK_NAV_INDEX_NUM`

Live position text inside the nav-index button.

### `CARD_STACK_FOOT`

The controls row (hint + prev/dots/index/next nav) — the chrome row
below the deck the stage budget subtracts in measure().
