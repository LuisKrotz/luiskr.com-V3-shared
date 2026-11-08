# `core\tests\coverage\utils\motion\expand-spring-tails.test.js`

Coverage for core/utils/motion/expand-spring.ts — the

|                |                                                                    |
| -------------- | ------------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\utils\motion\expand-spring-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.          |

## Members

### `rafQueue`

Pending rAF callbacks — index is the returned handle minus 1.

### `now`

Virtual clock (ms) fed to the queued callbacks.

### `pump`

Runs `frames` rAF ticks, advancing the virtual clock by `dt` ms each.
Callbacks re-armed during a tick land in the next queue.

- `@param` {number} frames Ticks to pump.
- `@param` {number} dt Virtual frame delta in ms.

### `makeEl`

Fresh element with a mocked rect — happy-dom reports 0 for every box
so the chase's px measurement comes from a controllable `_h` field,
and an inline `style.height` written by the spring reflects back.

- `@param` {number} natural The element's rest height when unconstrained.
