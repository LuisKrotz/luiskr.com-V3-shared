# `core\utils\motion\bezier.ts`

Cubic-bezier easing evaluator — the CSS `cubic-bezier(x1,y1,x2,y2)`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\motion\bezier.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `slope`

The curve's derivative dB/ds for one axis — `3(1−s)²·a1 +
6(1−s)s·(a2−a1) + 3s²·(1−a2)`.

- `@param` s Curve parameter 0..1.
- `@param` a1 First control point ordinate.
- `@param` a2 Second control point ordinate.
- `@returns` The axis slope at `s`.

### `cubicBezier`

Builds a `cubic-bezier(x1,y1,x2,y2)` easing function. The endpoints are
pinned to (0,0) and (1,1) like the CSS function — callers keep control
points inside the unit square; out-of-range x clamps to the endpoints.

- `@param` x1 First control point x (0..1).
- `@param` y1 First control point y.
- `@param` x2 Second control point x (0..1).
- `@param` y2 Second control point y.
- `@returns` The easing map `x ∈ [0,1] → y`.

### `ease`

Solves `x(s) = x` for s — Newton-Raphson seeded with x itself, then
bisection when the tangent flattens below NEWTON_MIN_SLOPE (a
near-zero slope makes Newton's step diverge; the curve is still
monotone-in-x for sane control points so bisection always lands).

- `@param` x Progress input 0..1.
- `@returns` The y ordinate of the curve point whose x is `x`.
