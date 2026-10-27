# `core\tokens\starfield\params\scale.ts`

Astronomical-scale and hierarchy-structure parameters —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\params\scale.ts`               |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `GALACTIC_LY`

Light-years per chart unit inside the galactic tier (1 ly = 250 chart units).

### `GALACTIC_BREAK`

Galactic→Local-Group break distance in light-years.

### `LOCAL_GROUP_LY`

Light-years per unit between the two breaks.

### `LOCAL_GROUP_BREAK`

Local-Group→cosmic break distance in light-years.

### `COSMIC_LY`

Light-years per unit in the cosmic tier.

### `COSMIC_CLAMP`

Observable-universe boundary shell — far-field clamp in units.

### `MW_TILT`

Milky Way disc tilt (radians) — the one shared frame lean applied by
the particle disc, the deep-field cloud, and every authored body
placed through `sfGalacticPos`, so all layers share one galaxy plane.

### `MW_DISC_LY`

Milky Way disc radius in light-years (~52 000 ly → 13 000 000 chart units at
the galactic tier). The disc center sits `SUN_GC_LY` down −X so the
Sun lands at its true 0.51 galactocentric radius inside the disc.

### `CO_ROTATE_R`

Galactic co-rotation radius (chart units, heliocentric) — covers the
Milky Way disc so the solar system, the named-star neighborhood,
nebulae, and the deep-field cloud orbit the galactic centre as one
structure, while extragalactic structures stay world-fixed.

### `SOLAR_SCALE`

Solar-tier diagram scale — 1 preserves the authored planetary system
dimensions (Sun radius 12, Earth orbit 39, Neptune orbit 106, Kuiper belt 150) cleanly within its own domain without shrinking bodies to sub-pixels.

### `SF_STRUCTURE`

Cosmic-hierarchy structures — boundary shells and member speckles for
the Local Group, superclusters and the observable universe. Shells are
huge translucent spheres (camera sits inside or outside depending on
zoom) and the speckle clouds inside them stand in for member galaxies.

### `SEGMENTS`

Shell sphere tessellation — low, it is a boundary hint not a body.

### `SHELL_OPACITY`

Shell rim brightness at grazing angles — a whisper: the boundary
must read as a faint meniscus at extreme grazing angles only, never
as a painted ball. Additive rims still stack into a visible film
when the camera sits inside a huge boundary (e.g.
interstellar-neighborhood), so this stays far under the speckle
opacity the member-galaxy field carries.

### `SHELL_RIM`

Fresnel exponent — higher tightens the rim to a hairline bubble
edge; lower spreads a broad halo inward.

### `FADE_IN`

Shell fade-in band (× radius) — the camera must pull back to at least
FADE_IN·r before the boundary becomes visible, ramping to full at
FADE_OUT·r. This hides the inside of every hierarchy bubble while the
viewer is deep within it (the giant cream-ball / soap-bubble bug).

### `SPECKLE_COUNT`

Member-galaxy speckle count inside cluster/supercluster volumes.

### `SPECKLE_PX`

Speckle size (world units) — small enough that thousands of members
read as a point field at cosmic zoom, not an additive fog.

### `SPECKLE_DIM`

Per-speckle brightness floor — jitters up to 1.0 like a galaxy field.

### `SPECKLE_FILL`

Speckle radius fraction of the shell — members keep off the skin.

### `SPECKLE_FLATTEN`

Speckle volume flattening — galaxy clusters and superclusters are
flattened filament/sheet-like collections, not uniform spheres. The Y
axis is squashed by this factor to break the "disco ball" look.

### `SPECKLE_CONCENTRATE`

Speckle radial concentration — lower exponents push members toward the
center (dense core + sparse outskirts); 1.0 is uniform volume.
