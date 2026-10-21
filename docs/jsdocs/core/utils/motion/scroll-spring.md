# `core\utils\motion\scroll-spring.ts`

Scroll-position chase spring — the shared driver both

| | |
|---|---|
| **Source** | `src/core\utils\motion\scroll-spring.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Live spring state for one track — extends the shared chase triple
(currentP/velP/targetP in px) with loop bookkeeping. `raf` doubles
as the running flag (0 = idle).

### `raf`

Pending rAF id — 0 while the loop is stopped.

### `last`

Timestamp (ms) of the previous tick — 0 marks the first frame.

### `elapsed`

Wall-clock runtime (ms) for the MAX_MS watchdog.

### `onSettle`

Fired once when the spring settles or is force-settled.

### `states`

Per-track spring states — WeakMap so detached tracks never leak.

### `tickSpring`

Runs one spring tick: integrates the px chase, writes the track's
scrollLeft, and either re-arms or settles (snap to target + class
lift + onSettle). Kept as a closure over (track, state) so the rAF
body itself allocates nothing per frame.
- `@param` track The scrolling element.
- `@param` s The track's spring state.
- `@param` animClass Class lifted on settle.
- `@param` ts rAF timestamp (ms).

### `springScrollTo`

Spring-scrolls `track` to `target` scrollLeft. Mid-flight retargets
preserve velocity (the organic part — a rapid double-tap nav curves
onto the new course instead of restarting). When a spring is already
live only the target/onSettle update — the loop keeps its frame cadence.
- `@param` track The scrolling element (the carousel track).
- `@param` target Target scrollLeft (px).
- `@param` animClass Track modifier class that disables CSS snap+smooth
- `@param` onSettle Called once on settle — normal completion path for
- `@param` instant Reduced-motion / no-animation escape: writes the

### `cancelSpringScroll`

Cancels a live spring — user-input takeover (wheel/touch): the track
stays wherever the spring left it and mandatory snap re-engages from
the lifted class. The caller's onSettle is dropped — a cancelled nav
must not fire its teleport.
- `@param` track The scrolling element.
- `@param` animClass The modifier class to lift.
