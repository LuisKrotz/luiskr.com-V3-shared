# `core/tokens/starfield/params.ts`

Star-field engine parameters — camera rig, fly-to tween

| | |
|---|---|
| **Source** | `src/core/tokens/starfield/params.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `FAR`

Far plane — the chart spans ~50k units to the observable-universe
boundary shell; the camera at max zoom looks across twice that, so
the frustum reaches ~4× the shell radius. 24-bit depth buffers stay
precise to ~NEAR×1e6, so NEAR=0.5 keeps the ratio inside that bound.

### `HOME_X`

Home/overview pose — frames the shrunken solar tier (Neptune at
 ~21 units) with the neighborhood shell still in frame.

### `SF_MOTION`

Fly-to tween + idle drift timing (ms / scene-units per second).

### `FLY_MS`

Camera flight duration on body select — long enough to read as a glide.

### `DAMPING`

Controls damping factor per frame (OrbitControls.enableDamping).

### `ORBIT_SPEED`

Base orbit angular speed (rad/s) multiplied by each body's speed field.

### `SPIN_SPEED`

Base self-rotation speed (rad/s) multiplied by each body's spin field.

### `SF_APPROACH`

Lazy-dossier trigger distance — the JSON for a body prefetches when the
camera comes within `approachPad + body.radius * approachScale` units,
so big bodies arm their data earlier than small ones.

### `SF_ZOOM`

Orbit-controls zoom bounds — clamps how far the camera can dolly:
MIN keeps a close approach above the body surface; MAX frames the
whole cosmic hierarchy — Milky Way, the Local Group neighbourhood and
the supercluster/observable-universe shells — and stops just inside
the boundary so the chart never zooms into empty space.

### `SF_SCALE`

Astronomical scale tiers — the chart is a multi-scale diagram, not a
linear map: 20 orders of magnitude separate Neptune's orbit from the
observable universe, so distance compresses in three documented tiers
while every direction stays astronomically true.

  Galactic tier  — 1 unit = 100 ly; the Milky Way disc (radius 520
                   units ≈ 52 000 ly) and its satellite dwarfs sit at
                   real scale relative to each other. The Sun rests at
                   267 units ≈ 26 700 ly from the disc centre.
  Local-Group    — beyond 1 Mly the scale drops to 800 ly/unit so M31
  tier             lands ~11 900 units out (true direction kept).
  Cosmic tier    — beyond 10 Mly the scale drops to 20 000 ly/unit;
                   superclusters and the observable-universe boundary
                   shell clamp onto the far field (~46k units) inside
                   the skybox.

### `GALACTIC_LY`

Light-years per chart unit inside the galactic tier.

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

Milky Way disc radius in light-years (~52 000 ly → 520 chart units at
the galactic tier). The disc center sits `SUN_GC_LY` down −X so the
Sun lands at its true 0.51 galactocentric radius inside the disc.

### `NEIGHBORHOOD_INNER`

Neighborhood-band placement — authored bodies closer than ~3 000 ly
collapse to sub-unit chart radii under the exaggerated solar system,
so near stars/nebulae keep their true galactic direction but ride a
legibility band between INNER and INNER+BAND units before the
honest compressed radius takes over. The inner edge sits ~10× past
the shrunken solar tier (~30 units) so the Sun's system floats in a
real void instead of a crowded star field.

### `SOLAR_SCALE`

Solar-tier legibility shrink — the catalog authors AU-scale bodies
at diagram size (Sun radius 12 = a 1 200-ly body at the galactic
tier — larger than honestly-scaled dwarf spheroidals, the "Sun
bigger than a galaxy" offense). Multiplied into every SOLAR def's
radius/orbit/belt/satellite sizes so the whole system lands inside
~30 units: still diagram-exaggerated, now smaller than the least
dwarf galaxy.

### `SF_BH`

Black-hole feature tuning — Sgr A* renders as a layered relativistic
object: the event-horizon sphere, a thin photon ring, a hot accretion
torus plus a swirl of orbiting plasma particles, and twin polar jets.
All sizes are multiples of the catalog `radius` so the dossier value
stays the single source of truth.

### `PHOTON_RING`

Photon-sphere ring radius (× radius) — the bright thin ring.

### `DISC_INNER`

Accretion disc inner/outer radii (× radius).

### `SWIRL_COUNT`

Orbiting plasma particles inside the disc and their point size.

### `JET_LEN`

Bipolar jet: half-length and base radius (× radius).

### `JET_TIP`

Jet tip radius (× radius) — keeps the beam collimated.

### `JET_OPACITY`

Jet opacity — a whisper, not a lightsaber. Sgr A*'s outflow is
radio-faint optically; at chart scale the beams only hint the disc
poles. Vertex fade multiplies it to nothing by mid-beam.

### `GLOW_SCALE`

Warm glow sprite behind the hole (× radius) and its opacity — kept
tight so the additive stack (disc + photon + jets + glow) doesn't
wash the whole frame to cream at fly-in distance.

### `PHOTON_TUBE`

Photon-ring torus tube thickness (× radius) and opacity.

### `DISC_OPACITY`

Smooth accretion annulus opacity under the particle swirl.

### `DISC_SEGMENTS`

Ring tessellation of the accretion annulus mesh.

### `DISC_LANE_FLOOR`

Dust-lane math (disc node shader) — two detuned ring harmonics
multiply into irregular dark absorption bands. `LANE_FLOOR` keeps
the lanes translucent instead of cutting solid black; `LANE_AMP`
is the modulation depth around it.

### `DISC_LANE_ANG_A`

Lane harmonic frequencies — angular/radial for wave A and B.

### `DISC_CORE_EXP`

Radial heat exponent — ISCO edge blinding, rim fading to dust.

### `DISC_A_FLOOR`

Alpha envelope — floor keeps the outer dust faintly lit.

### `SWIRL_PUFF`

Swirl vertical puff (× radius) and inner-thickness bias.

### `SWIRL_CORE_R`

Swirl vertex ramp — near-white at the ISCO edge dimming to amber at
the rim, which is what produces the glowing-ring silhouette.

### `SF_BELT`

Small-body belts (asteroid + Kuiper) — the seeded Points annulus each
`kind: belt` catalog entry renders. Radii live on the def itself
(belt.inner/belt.outer); these tokens own particle size, opacity and
the default vertical half-thickness fraction.

### `PX`

Particle sprite size in px — small enough to read as rubble.

### `OPACITY`

Overall belt opacity — translucent so orbits read through it.

### `PUFF`

Default vertical half-thickness as a fraction of the annulus width
when the def omits `belt.puff` — real belts are thin but not flat.

### `ALBEDO_JITTER`

Per-particle brightness variation — vertex colors jitter ±this so
the annulus reads as mixed albedos (dark C-types vs bright S-types)
rather than a uniform dotted ring.

### `GAP_FREQ`

Kirkwood-style gap frequency for the asteroid belt — the density
modulation `sin(r·GAP_FREQ)` carves resonance lanes; the Kuiper belt
passes a def-level 0 to keep its smooth classical disc.

### `GAP_DEPTH`

Gap depth — fraction of particles rejected inside a lane (0–1).

### `SF_STRUCTURE`

Cosmic-hierarchy structures — boundary shells and member speckles for
the Local Group, superclusters and the observable universe. Shells are
huge translucent spheres (camera sits inside or outside depending on
zoom) and the speckle clouds inside them stand in for member galaxies.

### `SEGMENTS`

Shell sphere tessellation — low, it is a boundary hint not a body.

### `SHELL_OPACITY`

Shell rim brightness at grazing angles — kept low because additive
 rims still stack into a visible film when the camera sits inside a
 huge boundary (e.g. interstellar-neighborhood).

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

### `SF_KEYS`

Arrow-key view rotation — radians per keypress applied around the
controls target; POLAR clamps keep the camera off the poles.

### `SF_LOD`

Detail level-of-detail — secondary geometry (atmosphere shells, ring
discs, satellite companions) renders only while the
camera is within `PAD + size * SCALE` of the body's anchor, so distant
bodies draw as a single primitive like a streaming game world.

### `DEEP_REVEAL`

Deep-tier reveal — while the camera sits inside the local bubble
(this many chart units from the solar barycenter) black holes,
external galaxies, dwarf galaxies and hierarchy shells do not draw
at all: from the Sun's neighborhood the galactic centre is a radio
point source, not a resolvable object. The volumetric Milky Way disc
is exempt — it is the sky band the camera is embedded in. The value
sits just past the neighborhood band edge (300 + 300) so one zoom
tier out of home reveals the galactic hierarchy.

### `SF_DETAIL`

Photographic-surface tuning — the real-imagery rendering layer for
planets and deep-sky objects. Photo masks feather a source image's
rectangular edge into transparency so NASA/ESA stills composite into
the black scene; `MASK_PX` caps the composite canvas (source images
run 1–6k px but are viewed at tens of screen px). Ring UVs are
remapped radially (`RING_V` samples the strip's center row) because
RingGeometry ships planar UVs but the Saturn strip is radius-indexed.
`HALO_SCALE` sizes the additive star-glow sprite against the body's
drawn radius; `CLOUD_*`/`EMISSIVE_*` tune Earth's layered maps.

### `MASK_PX`

Composite canvas edge cap (px) for masked photo textures.

### `MASK_INNER`

Radial feather — the alpha ramp starts at this fraction of the
half-extent and reaches zero at the corner, so the photo's square
frame dissolves into space instead of showing a hard border.

### `RING_V`

V coordinate sampling the ring strip's center row (radius = U).

### `RING_INNER`

Saturn ring radii as body-radius multiples (matches ring texture).

### `HALO_SCALE`

Additive halo sprite diameter as a multiple of the star's radius.

### `HALO_OPACITY`

Halo sprite opacity — kept under 1 so the limb stays crisp.

### `STAR_RIM_FALLOFF`

Fresnel exponent on the luminous-sphere shader — how tightly the rim
hugs the limb. ~2.2 keeps a bright core with a hot narrow bloom;
satellites use the looser value so their small discs stay soft.

### `CLOUD_SCALE`

Earth's cloud shell rides this multiple above the surface sphere.

### `EMISSIVE_INT`

City-lights emissive on the night side — the map is black except
lit land, so a moderate intensity glows only where the texture is.

### `BUMP_SCALE`

Terrain bump depth — the elevation map's grayscale gradient offsets
the shading normal; at globe scale only a whisper of relief reads
correctly (full-scale units would spike the limb into noise).

### `SPARKLE_FRAC`

Fraction of the galaxy particle budget kept for sparkle points.

### `SPARKLE_PX`

Sparkle point size (px) — slightly fatter than the dust field so
 foreground stars sparkle against the photo disc.

### `PICK_MIN`

Minimum pickable radius (world units) — a body sphere smaller than
this subtends only a few pixels at the home camera, so an invisible
proxy bubble of this radius rides inside its mesh for raycasts.

### `GALAXY_DISC`

Photo-disc diameter as a multiple of the catalog radius.

### `SF_SPIRAL`

Procedural spiral-galaxy point cloud — Gaia-style star distribution:
`COUNT` points spread over `ARMS` logarithmic arms plus a bulge, sized
by `POINT_PX`; `WIND` is the arm winding tightness and `THIN` the disc
thickness ratio. One Points draw call per galaxy — the "all stars"
layer beneath the named catalog markers.

### `COUNT_MAX`

Per-galaxy particle count ceiling — `spiralDisc.count` may ask less.

### `MOBILE_DIVISOR`

Mobile particle divisor — caps GPU buffers on small viewports.

### `MOBILE_WIDTH`

Viewport width (px) below which the mobile divisor applies.

### `VOLUMETRIC_OPACITY`

Volumetric galaxies (the Milky Way) are viewed from inside — keep
the particle layer faint and thin so it reads as a stellar disc/band
instead of an opaque glowing ball that fills half the screen.

### `INNER_SPIN_R`

Rotating inner-disc fraction (× radius) — volumetric galaxies split
their particle fill at this radius: the inner region carries the
`spin` revolution around the galactic centre while the outer disc
(which contains the carved heliocentric bubble) stays put so the
Sun's exclusion zone never sweeps stars through the solar system.
Real galactic rotation is differential anyway — inner material laps
the rim, so a spinning core inside a still outer disc is the honest
read. 0.3 keeps the rotors well inside the Sun's 0.51 ring.

### `DUST_COUNT`

Volumetric dust lanes — the Great Rift. Large soft dark points laid
along the arm gaps with NORMAL blending so they absorb the lit disc
behind them; additive blending can't darken, so dust gets its own
cloud at a fraction of the star budget.

### `DUST_PX`

Dust point size (world units) — fat soft occluders, not pinpricks.

### `DUST_OPACITY`

Dust alpha — high enough to visibly rift the band, low enough to keep it translucent.

### `DUST_R_MIN`

Lane bands sit at these radius fractions of the disc.

### `BULGE`

Fraction of points inside the central bulge (rest go to the arms).

### `CORE_PHOTO`

Core-glow sprite opacity over the photographic disc (whisper bloom).

### `CORE_GLOW`

Core-glow sprite opacity on the procedural fallback disc.

### `CORE_R`

Per-point color ramp — hot amber bulge → dusty pale-violet rim,
 matching the real Milky Way's warm dust lane palette (pure blue
 edges read as a grey fog from inside the disc).

### `HALO_RADIUS`

Stellar-halo radius (× disc radius) for `spiralDisc.halo` layers.

### `ELLIPSE_RADIAL`

Elliptical-dwarf distribution — radial profile length (× radius),
vertical squash, and the core→rim brightness ramp.

### `ELLIPSE_EDGE`

Rim fade start — fraction of the filled volume's outer extent where
per-point brightness begins its smooth roll-off to zero. Without it
the density cutoff reads as a hard ball boundary instead of a haze
that dissolves into the sky.

### `SUN_BUBBLE`

Heliocentric exclusion bubble (chart units) carved out of a
`spiralDisc.bubble` galaxy's particle fill around the solar system —
keeps random disc stars from overlapping the Sun/planet meshes while
staying far smaller than the ~267-unit galactocentric gap, so the
Sun still reads as embedded in the disc. Sized past the shrunken
Kuiper edge (~30 units under SOLAR_SCALE) with margin.

### `SF_STAR_CLOUD`

Real star-cloud layer — HYG/Hipparcos catalogued stars (78k, mag ≤ 9,
heliocentric light-years) decoded from a packed Float32 binary and
drawn as one Points call at the Sun's true galactocentric position on
the Milky Way disc, so zooming toward the disc reveals real stellar
density rather than a stylized sprite. The proper-named subset lives
in the milky-way dossier JSON (`namedStars`) for future labelling.

### `FILE`

Lazy asset under the module data root (Float32 x,y,z,mag,ci,kind ×N).

### `STRIDE`

Record stride per object in the binary (x,y,z,mag,ci,kind).

### `MAX_STARS`

Safety bound on the record count read from the binary header.

### `UNITS_PER_LY`

Chart units per light-year — the galactic tier scale (SF_SCALE.
GALACTIC_LY) so real stars sit at true scale inside the volumetric
Milky Way disc: the ~3 000-ly HYG bubble spans ~60 units around the
Sun and resolves on zoom.

### `SUN_GC_LY`

Sun's galactocentric radius in light-years (ring offset on the disc).

### `POINT_PX`

Point size (px) — magnitude-attenuated in the shader-free material.

### `LOD_DIST`

Camera distance beyond which the cloud hides — disc carries the read.

### `CI_LOW`

B-V color-index ramp stops — below LOW reads blue-white, above RED red.

### `MAG_BIAS`

Magnitude → brightness curve: `BIAS − mag·SLOPE`, floor `FLOOR`.

### `FAR_CLAMP`

Far-field radius clamp (chart units) — deep-sky objects keep their
true sky direction but compress onto this shell when their real
distance exceeds it, so NGC galaxies stay visible inside the
Local-Group zoom bound instead of sitting at unreachable radii.

### `KIND_STAR`

Kind tags in the packed record (`kind` float).

### `REGISTRY_ACQUIRED`

Provenance + distance formatting for the 139k registry — ACQUIRED
is the ISO date the HYG/Exoplanet-Archive/OpenNGC source data was
pulled; MLY is the light-year cutoff above which distances render
in millions (keeps far-field DSO labels readable).

### `SRC_HYG`

Provenance strings shown on synthesized record panels.

### `SHARD_SIZE`

Registry index geometry — `public/data/index/` ships one JSON
manifest plus `<kind>-NNN.json` shards of SHARD_SIZE records each;
a body id's global rank decodes to shard/slot by pure division.

### `REGISTRY_KINDS`

Registry kinds in shard-scan order for incremental search.

### `SEARCH_LIMIT`

Cap on collected matches per registry search (UI page bound).

### `PAGE_SIZE`

Directory rows rendered before the "load more" affordance.

### `FLY_OFFSET`

Camera stand-off (chart units) when flying to a registry object —
point sources have no radius so the offset is fixed; the zoom
clamp still bounds how close OrbitControls lets the camera get.

### `SF_BODY_IDS`

Catalog body ids referenced outside the catalog itself.

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

### `GLOW_INNER`

Glow ramp stops — canvas gradient needs literal rgba strings.

### `SF_FALLBACK`

2D fallback starfield — painted once into a plain canvas when the WebGL
engine can't boot. Density/seed constants so the no-GPU surface still
reads as the same chart instead of a black void.

### `STAR_DENSITY`

One star per N² css px of surface area.

### `STAR_MAX`

Hard cap so 8K displays don't allocate thousands of arcs.

### `STAR_SIZE_MAX`

Brightest star radius in css px (most stars draw smaller).

### `GLINT_RATIO`

Fraction of stars that get a diffraction-cross glint.

### `BAND_STARS`

Extra micro-stars densified along the milky band.

### `BAND_TILT`

Band slope (dy/dx) across the viewport.

### `BAND_WIDTH`

Band thickness as a fraction of viewport height.

### `DIM_ALPHA`

Alpha ceiling for the dimmest quartile of field stars.

### `SF_SCENE`

Skybox sphere + starfield scales.

### `SKYBOX_RADIUS`

Skybox sphere radius — wraps the whole multi-tier chart (the
observable-universe shell clamps at ~46k units, the skybox must sit
beyond it or the panorama would clip through the boundary).

### `AMBIENT_INT`

Fill-light intensity — kept low so the sun point light owns the
terminator and planets shade with real day/night contrast instead of
reading flat (a high ambient lifts the unlit hemisphere to nearly
the lit-side brightness and washes out every texture).

### `SUN_INT`

Sun point-light intensity at the scene origin (no decay).
