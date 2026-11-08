# `core\tokens\selectors\mentions-deck.ts`

Mentions-deck selector tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\selectors\mentions-deck.ts`              |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MENTIONS_DECK_SELECTORS`

Frozen mentions-deck selector map — sole declaration site for these tokens;
consumers read members and never re-declare the strings (zero-hardcoding
rules 4–5). Object.freeze makes the token contract immutable at runtime.
