# `experiments/star-field/engine/catalog.ts`

The star-field body catalog — one static SFBodyDef per

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/catalog.ts` |
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

### `nbr`

Neighborhood-band placement — bodies inside ~3 000 ly compress to
sub-unit chart radii (Proxima's 4.2 ly → 0.04 units, inside the
exaggerated solar system), so near objects keep their true galactic
direction but ride a monotonic legibility band between
NEIGHBORHOOD_INNER and INNER+BAND units. Beyond the band the honest
compressed radius takes over, so distant bodies stay truthful.
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
SF_SCALE.SOLAR_SCALE keeps the planets visitable while making the Sun
smaller than the least dwarf galaxy and leaving a real void between
the Kuiper edge (~30 units) and the neighborhood band (300+).
`radius`, `orbit`, `belt` bounds and `satellites` all shrink together
so internal proportions stay authored. Exported so coverage tails can
pin every arm — no current solar def carries satellites, but the arm
keeps a future moon-bearing def honest.
- `@param` def Solar-tier body at authored diagram scale.
- `@returns` Copy with every spatial field scaled by SOLAR_SCALE.

### `SOLAR_RAW`

Solar-system bodies — compressed orbits so all eight planets fit inside
a single readable sweep around the Sun, then shrunken by
SF_SCALE.SOLAR_SCALE (see `shrinkSolar` above). The literal is typed
before mapping so `pos` keeps its tuple shape through the transform.

### `SOLAR`

Solar tier at render scale — every def run through `shrinkSolar`.

### `MILKY_WAY`

Milky Way neighborhood — famous nearby systems at their real galactic
(l, b, distance) coordinates through `nbr`: the honest multi-tier
compression collapses sub-3000-ly distances to sub-unit radii, so near
stars ride the monotonic neighborhood band instead of collapsing onto
the Sun. `satellites` dress each system with orbiting companions.

### `NEBULAE`

Nebulae + globular clusters — billboard sprites at real galactic (l, b,
distance); objects under ~3 000 ly ride the neighborhood band while
far-field members (Tarantula in the LMC, Omega Centauri in the halo)
land at their true compressed radii.

### `GALAXIES`

The three grand spirals — the Milky Way renders as a seeded volumetric
particle galaxy (never a face-on photo: we are inside it), centered at
MW_CENTER so the Sun lands on its true 0.51 galactocentric ring with a
heliocentric exclusion bubble keeping disc particles off the solar
system. Sagittarius A* parents onto the disc center so its accretion
composite inherits the galactic tilt. Andromeda and Triangulum land at
their true (l, b) directions on Local-Group-tier distances (~11.9k /
~12.8k units).

### `LOCAL_GROUP`

Local Group dwarf + satellite galaxies — the ~30 small members that
orbit the Milky Way and Andromeda, placed at real galactic (l, b,
distance) through `gpos`. Milky Way satellites inside ~1 Mly stay on
the honest galactic tier (LMC ~1 630, SagDEG ~810 units); the M31
subgroup and the scattered dIrrs land on the Local-Group tier beyond
~10k units. Drawn as seeded elliptical point smudges — warm for the
old-population spheroidals, cool for the star-forming irregulars.

### `HIERARCHY`

Cosmic-hierarchy boundary structures — translucent shells + member
speckle clouds marking the chart's nesting scales: the interstellar
neighborhood around the Sun, the Local Group volume enclosing every
dwarf, the named superclusters at their true directions on the cosmic
tier, the Laniakea basin that contains them all, and the observable-
universe rim clamped onto the far-field boundary. Never raycast —
they are navigator/fly-to landmarks only.

### `SF_CATALOG`

Full catalog — the order the navigator drawer lists groups in.

### `SF_GROUP_ORDER`

Ordered group keys for the navigator drawer sections.

### `sfCatalogByGroup`

Groups catalog entries by SF_GROUPS key — the navigator renders one
section per key with the body's display name on a focusable button.
- `@returns` group key → defs in catalog order
