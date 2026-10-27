# `core\tokens\selectors\loader.ts`

Intro loader selector tokens — grouped subset of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\selectors\loader.ts`                     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `LOADER_SELECTORS`

Frozen loader selector map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
