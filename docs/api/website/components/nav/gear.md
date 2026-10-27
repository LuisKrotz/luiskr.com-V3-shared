# `website\components\nav\gear.tsx`

The settings gear glyph for &lt;app-nav&gt; — a parametric

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\nav\gear.tsx`                   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `pt`

Polar → "x y" pair in the viewBox space (y grows downward, so positive
angles sweep clockwise on screen — matching the arc sweep flag below).

- `@param` r Radius from center.
- `@param` a Angle in radians.
- `@returns` Comma-free "x y" coordinate pair for path data.

### `gearOutlineD`

Builds the closed toothed-ring outline: per tooth a straight rising
flank → tip arc → straight falling flank → valley arc, repeated around
the circle. Tip half-angle (17% of pitch) is narrower than the root
half-angle (31%), which is what makes the teeth trapezoidal like a
real spur gear instead of rounded bumps.

- `@returns` SVG path `d` for the gear silhouette.

### `ringPositions`

Positions evenly spaced on a circle — used for the five lightening
holes (phase -90° puts a hole at top dead center) and the four hub
studs (phase -45° parks them on the diagonals).

- `@param` count Items on the ring.
- `@param` radius Orbit radius.
- `@param` phase Start angle in radians.
- `@returns` [x, y] centers in viewBox units.

### `urlRef`

`url(#…)` paint-server ref — declared once so the wrapper string is never repeated.

### `gearStop`

One gradient stop bound to a paint token — var() must ride in `style`
(presentation attributes can't resolve custom properties), and this
helper keeps the `stop-color:` prelude declared exactly once.

- `@param` offset Stop position 0–1.
- `@param` prop `NAV_GEAR_CSS_PROPS` member.
- `@returns` The <stop> element.

### `GLINT_D`

The specular glint — a short arc hugging the top-left rim (the
brightest catch-light on turned steel). It lives OUTSIDE the rotor
group: the gear spins under a fixed light.

### `renderNavGear`

Renders the machined-steel gear: defs publish the four light ramps,
the rotor group carries the silhouette + machined details that spin,
and the glint arc stays fixed against them.

- `@returns` The gear <svg> for the preferences chip.
