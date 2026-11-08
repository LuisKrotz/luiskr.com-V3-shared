# `core\tokens\motion\related.ts`

Related-projects accordion-list timing/geometry tokens —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\related.ts`                       |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `VISIBLE_COUNT`

Cards expanded in the list viewport at once — the conveyor keeps
exactly this many items unfolded; the rest sit in zero-height
(grid-template-rows 0fr) slots until a manual step folds them in.

### `RELATED_TIMING`

Related-list motion tokens. Sole declaration site — consumers import
members from this frozen map rather than re-declaring the literals.

### `REORDER_DELAY`

Collapsed-node reorder watchdog (ms). Sized just past the .6s
grid-template-rows fold so a manually folded item finishes
collapsing before it is appended (at zero height, invisibly) to
the list tail — the same watchdog pattern
CAROUSEL_TIMING.TELEPORT_DELAY uses for clone→real jumps.
