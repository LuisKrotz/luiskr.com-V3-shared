# `core/tokens/starfield/params/catalog.ts`

Catalog-facing parameters — well-known body ids and the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/starfield/params/catalog.ts`             |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SUN`

Heliocentric anchor — the deep-field cloud mounts on the Sun.

### `SF_COLORS`

Procedural material palette — hex colors for bodies with no real imagery.
Star tints follow spectral class (G yellow-white, B blue, M red);
nebula/galaxy hues are emissive accents on a dark sprite.

### `HALLEY`

Halley's nucleus — icy dust, faint cyan-white.

### `ISS`

ISS truss — bright metallic white.

### `ATMO_DAY`

Earth atmosphere fresnel tints — day limb, terminator dusk, night.

### `DWARF_SPH`

Dwarf-galaxy tints — spheroidals get a warm old-population wash,
irregulars a cooler young-star haze.

### `BH_JET`

Sagittarius A* relativistic jets — blue synchrotron plasma.

### `SHELL_LOCAL`

Cosmic-hierarchy shells + member speckles.

### `ASTEROID_BELT`

Small-body belts — rocky rubble grey-brown, Kuiper ice blue-white.

### `STAR_BLUE`

Star-cloud spectral ramp — B-V index stops for the real HYG field.

### `EXOPLANET_PT`

Deep-field kind tints — exoplanet hosts warm, far-field DSOs cool.

### `BODY_NEUTRAL`

Neutral body grey — fallback base tint for procedural surfaces when
a catalog def carries no `color` (rare; satellites/loose bodies).

### `SUN_LIGHT`

White sunlight point-light at the scene origin.

### `STAR_RIM`

Photosphere limb tint — hot near-white that melts into the halo.

### `STAR_LIMB`

Darkened limb — real photospheres show limb darkening (we see
deeper, hotter layers at disc centre; the limb is higher, cooler
gas). Stars that carry a `rim` def tint mix toward this deep amber
at the silhouette instead of the default hot rim, so a resolved
disc darkens at the edge the way the Sun does in H-alpha imagery.

### `STAR_FLARE`

Hα eruption tint — prominence/ejecta plasma glows in hydrogen
alpha, a saturated orange-red distinct from the photosphere's
gold, so flares and arc prominences read as hot gas, not paint.

### `GLOW_INNER`

Glow ramp stops — canvas gradient needs literal rgba strings.
