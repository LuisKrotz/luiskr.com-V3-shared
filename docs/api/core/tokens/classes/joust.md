# `core\tokens\classes\joust.ts`

Joust class tokens — the shared click-to-reveal contract

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\joust.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `JOUST_CLASSES`

Frozen joust class-name map — sole declaration site for these tokens; consumers read members
and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the
token contract immutable at runtime.
