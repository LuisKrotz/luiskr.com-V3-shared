# `core/tokens/classes/animations.ts`

Animations-reference view class tokens — grouped subset of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/classes/animations.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ANIMATIONS_CLASSES`

Frozen animations-reference class-name map — sole declaration site for
these tokens; consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.
