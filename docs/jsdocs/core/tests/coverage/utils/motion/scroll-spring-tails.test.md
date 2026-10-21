# `core\tests\coverage\utils\motion\scroll-spring-tails.test.js`

Coverage for core/utils/motion/scroll-spring.ts — the

| | |
|---|---|
| **Source** | `src/core\tests\coverage\utils\motion\scroll-spring-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

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

### `makeTrack`

Fresh scrollable element — WeakMap-keyed state must not leak between tests.
