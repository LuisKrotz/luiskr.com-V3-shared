# `core\tokens\classes\mentions-deck.ts`

Mentions-deck class tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\mentions-deck.ts`                |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MENTIONS_DECK_CLASSES`

Frozen mentions-deck class-name map — sole declaration site for these
tokens; consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.

### `MENTIONS_DECK_TITLE`

"Some mentions" section heading above the fanned cards.

### `MENTIONS_DECK_DECK`

The fanned deck region — pointer/swipe surface.

### `MENTIONS_DECK_DECK_DRAGGING`

Modifier on the deck while a drag gesture is live — kills CSS
transitions so transforms track the pointer 1:1.

### `MENTIONS_DECK_CARD_ACTIVE`

Front-card modifier — the light surface + enabled link state.

### `MENTIONS_DECK_CARD_TEXT`

Award/mention copy block (CMS description markup).

### `MENTIONS_DECK_HINT`

"Drag or swipe…" affordance copy.
