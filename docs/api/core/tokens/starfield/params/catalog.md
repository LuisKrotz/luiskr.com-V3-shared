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

### `COMET_ION`

Comet tail palette — the ion (plasma) tail glows blue-white from
CO+ fluorescence under solar UV, while the dust tail scatters plain
sunlight: a warm, dimmer, slightly yellowed streak. The nucleus
itself is among the darkest bodies known (Halley albedo ≈ 0.04).

### `PLUME_ICE`

Cryovolcanic/volcanic plume tints — Enceladus vents water-ice
grains lit ice-blue; Io's plumes are sulfur/SO₂ fallout, a warm
sulphurous gold.

### `TITAN_HAZE`

Titan's tholin photochemical haze — the opaque orange limb glow
overriding the Earth-blue atmosphere tint on its rim shell.

### `ISS`

ISS truss — bright metallic white.

### `ISS_PANEL`

ISS solar arrays — the wings' burnished gold kapton over silicon.

### `ATMO_DAY`

Earth atmosphere fresnel tints — day limb, terminator dusk, night.

### `ATMO_VENUS`

Exoplanet rim tints — TRAPPIST-1c's Venus-like CO₂ shroud (pale
sulfuric amber), Proxima c's ice-giant methane cyan, Proxima b's
thin warm haze over rock. Each pins `atmoColor` so the limb shell
carries the right chemistry instead of Earth's blue.

### `AURORA_JUPITER`

Giant-planet aurora palettes — hydrogen-dominated upper atmospheres
emit UV-blue curtains instead of Earth's oxygen green: Jupiter's
powerful oval reads cyan-white, Saturn's a deep blue, Neptune's a
faint violet (weak far-out field, 47°-tilted dipole).

### `PROXIMA_D`

Per-world Proxima palette — d rides inside the ice line and is a
scorched lava-crust rock; b is the temperate candidate (warm
weathered regolith, possibly ocean-shrouded); c is the distant
mini-Neptune, blue ice over a hydrogen envelope.

### `TRAPPIST_B`

Per-world tints for the seven-planet chain — shared color made every
member read as the same ball. Inner pair scorched rock, mid worlds
through the volatile line into the habitable-zone teal/ocean slate,
outermost icy.

### `BARNARD_PLANET`

Barnard b — hot rocky sub-Earth skimming a red dwarf: dark iron-rich crust.

### `DWARF_SPH`

Dwarf-galaxy tints — spheroidals get a warm old-population wash,
irregulars a cooler young-star haze.

### `BH_JET`

Sagittarius A* relativistic jets — blue synchrotron plasma.

### `SHELL_LOCAL`

Cosmic-hierarchy shells + member speckles.

### `ASTEROID_BELT`

Small-body belts — rocky rubble grey-brown, Kuiper ice blue-white.

### `PALLAS`

Named belt residents — Pallas' pale basaltic surface, Juno's S-type
stony iron, Hygiea's carbonaceous dark, Eros' regolith tanned by
solar wind.

### `HAUMEA`

Kuiper-belt residents — Haumea's crystalline ice crust (tumbled
cigar), Makemake's methane-red tholin frost, Eris' blinding
nitrogen/methane snow, Arrokoth's cold-classical rust lobes.

### `ROCK_STONE`

Belt hero-rock material classes — ordinary chondrite stone,
carbonaceous black, nickel-iron sheen, cometary ice and regolith
dust. Hero rocks pick one seeded class so the belt reads as mixed
debris, not a single material.

### `ROCK_HYDRO`

Hydrated clay minerals — CM-chondrite reddish mudstone.

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
