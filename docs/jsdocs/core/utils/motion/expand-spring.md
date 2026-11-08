# `core\utils\motion\expand-spring.ts`

Height chase spring — drives an element's inline

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\motion\expand-spring.ts`                  |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Live spring state for one element — the chase triple plus loop bookkeeping.

### `raf`

Live frame id — 0 when idle.

### `tick`

Bound tick — allocated once per spring so re-arms never alloc.

### `last`

Timestamp of the last integrated frame (ms).

### `elapsed`

Watchdog clock (ms) — force-settles if rAF starves.

### `onSettle`

Fired once when the spring settles or is force-settled.

### `states`

Per-element spring states — WeakMap so detached elements never leak.

### (module scope)

Runs one spring tick: integrates the px chase, writes the element's
inline height, and either re-arms or settles (snap to target +
onSettle). Kept as a closure over (el, state) so the rAF body itself
allocates nothing per frame.

- `@param` el The element being expanded.
- `@param` s The element's spring state.
- `@param` ts rAF timestamp (ms).

### `springExpandTo`

Spring-drives `el`'s height toward `target` px. Mid-flight retargets
preserve velocity — a result list that grows again before settling
curves onto the new course instead of restarting. When a spring is
already live only the target/onSettle update — the loop keeps its
frame cadence.

- `@param` el The element whose height chases the target.
- `@param` target Target height in px (`scrollHeight` for natural growth).
- `@param` onSettle Called once on settle — the caller's completion path
- `@param` instant Reduced-motion escape: writes the target directly,
- `@param` write Optional per-frame render hook receiving the px chase
- `@param` from Optional explicit start position — composited reveals

### `cancelExpandSpring`

Cancels a live expansion — the element stays wherever the spring left
it and the caller's onSettle is dropped (a cancelled open must not
commit `hidden`). Used on disconnect so no frames outlive the node.

- `@param` el The element whose spring should die.
