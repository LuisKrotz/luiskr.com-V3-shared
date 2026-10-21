# `core\utils\motion\spring.ts`

Shared chase-spring integrator — a damped spring

| | |
|---|---|
| **Source** | `src/core\utils\motion\spring.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Minimal chase-spring state — the field names are the contract the
widget classes already carry (`currentP`/`targetP` + `velP`).

### `currentP`

Current position (track units).

### `velP`

Spring velocity (track units per second).

### `targetP`

Chase target (track units).

### `springStep`

Advances one integration step: accelerates toward `targetP` under
stiffness `k` and damping `c`, then snaps to the stop once both the
gap and the velocity fall under the settle epsilons — without the
snap an underdamped spring rings sub-pixel forever.
- `@param` s The chase state — mutated in place (zero allocation).
- `@param` k Spring stiffness (ωn²).
- `@param` c Spring damping (2ζωn).
- `@param` dt Integration step in seconds (clamped upstream).
- `@param` epsSettle Settle epsilon in the state's units — the slider
- `@param` epsVel Velocity settle epsilon (state units/s) — see epsSettle.
