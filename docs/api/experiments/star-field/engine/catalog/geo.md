# `experiments\star-field\engine\catalog\geo.ts`

Shared chart-geometry helpers for the catalog — galactic-

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\catalog\geo.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `gpos`

Galactic-coordinate placement — every deep-sky body lands on its real
galactic (l, b) direction at the multi-tier compressed distance, in the
same tilted frame the Milky Way particle disc and the deep-field cloud
render. Directions stay astronomically true; only radii compress.

- `@param` l Galactic longitude in degrees.
- `@param` b Galactic latitude in degrees.
- `@param` dLy Heliocentric distance in light-years.
- `@returns` `[x, y, z]` chart position in scene units.

### `MW_CENTER`

Milky Way disc center — the Sun sits at the scene origin and its true
26 700-ly galactocentric distance lands the disc center 267 units
down −X (the `sfGalacticVec` axis map puts l=0 at −X), so the solar
system renders embedded inside the disc at its real half-radius ring
instead of floating beside a face-on photo.

### `MW_RADIUS`

Milky Way disc radius in chart units — 52 000 ly at the galactic tier.

### `M31_L`

Andromeda's real galactic coordinates — shared by the M31 def and the
Local Group shell, whose boundary centers on the MW↔M31 midpoint.

### `M31_POS`

Andromeda's compressed chart position — ~11.9k units toward l=121°.

### `shrinkSolar`

Solar-tier shrink — every AU-scale body authored below is diagram-size
(a 12-unit Sun would mass 1 200 ly at the galactic tier — bigger than
honestly-scaled dwarf spheroidals). Multiplying the whole tier by
SF_SCALE.SOLAR_SCALE lands the Sun's drawn disc at 0.024 units — under
Proxima's true 0.042-unit distance, so no star renders inside the
photosphere — and the whole system inside ~0.23 units, honest ordering
against the stellar neighbourhood at the cost of planet specks that
only the fly-to/zoom tier reveals.
`radius`, `orbit`, `belt` bounds and `satellites` all shrink together
so internal proportions stay authored. Exported so coverage tails can
pin every arm — no current solar def carries satellites, but the arm
keeps a future moon-bearing def honest.

- `@param` d Solar-tier body at authored diagram scale.
- `@returns` Copy with every spatial field scaled by SOLAR_SCALE.
