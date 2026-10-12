# `experiments/star-field/engine/catalog/solar.ts`

Solar-system tier — the Sun, planets, moons, dwarf

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/catalog/solar.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SOLAR_RAW`

Solar-system bodies — compressed orbits so all eight planets fit inside
a single readable sweep around the Sun, then shrunken by
SF_SCALE.SOLAR_SCALE (see `shrinkSolar` above). The literal is typed
before mapping so `pos` keeps its tuple shape through the transform.

### `SOLAR`

Solar tier at render scale — every def run through `shrinkSolar`.
