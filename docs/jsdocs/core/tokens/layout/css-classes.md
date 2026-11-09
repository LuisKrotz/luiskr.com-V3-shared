# `core\tokens\layout\css-classes.ts`

Width-class registry for breakpoint-scoped stylesheet

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\layout\css-classes.ts`                   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

A cumulative-stylesheet width class.

### `WIDTH_CLASS_RANK`

Class → rank (mobile 0 … wide 3). Ordering is load-bearing: a picked
tier is the highest-ranked key whose gate the viewport satisfies.

### `WIDTH_CLASS_GATES`

Class → matchMedia query that first makes the class reachable — the
lowest member breakpoint of the class. Mirrors
`WIDTH_CLASSES[].gate` in shared/build/css-classes.mjs.
