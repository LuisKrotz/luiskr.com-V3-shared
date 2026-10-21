# `experiments\star-field\engine\catalog\solar.ts`

Solar-system tier — the Sun, planets, moons, dwarf

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\catalog\solar.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SOLAR_RAW`

Solar-system bodies — compressed orbits so all eight planets fit inside
a single readable sweep around the Sun, then shrunken by
SF_SCALE.SOLAR_SCALE (see `shrinkSolar` above). The literal is typed
before mapping so `pos` keeps its tuple shape through the transform.

Spacing is eccentricity-aware: every adjacent pair keeps a clear limb
gap even at worst-case conjunction (inner body's aphelion vs outer
body's perihelion), so Mars can never crowd Earth's orbit the way a
tighter compression allowed. Saturn clears Jupiter by its full ring
extent (radius × RING_OUTER), and the asteroid belt sits between
Mars's aphelion and Jupiter's perihelion like the real 2.06–3.27 AU
band. Ryugu and Bennu intentionally cross Earth/Mars orbits — they are
real near-Earth asteroids and read as flyby specks.

### `SOLAR`

Solar tier at render scale — every def run through `shrinkSolar`.
