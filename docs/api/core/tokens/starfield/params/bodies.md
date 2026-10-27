# `core\tokens\starfield\params\bodies.ts`

Per-body feature tuning — the Sgr A* black-hole composite

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\params\bodies.ts`              |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

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

### `SF_BELT_ROCK`

Belt hero rocks — seeded irregular meshes riding each belt so the
annulus reads as real varied debris (ice, metal, carbon, stone, dust;
fragments through large bodies) instead of uniform glowing points.
Sizes are fractions of the annulus width; every rock owns a Keplerian
pivot (`speed ∝ 1/√r`) plus a tumble rate, both riding the shared
satPivots update.

### `COUNT`

Hero rocks per belt — fewer than before but each one is now a
high-tessellation mesh: the annulus reads as a crowded debris
field at fly-in distance without the vertex-memory blowup that
96 ultra-dense geometries would cost (~3M tris per belt).

### `DETAIL`

Mesh tessellation — icosahedron detail for regular rocks and
tetrahedron detail for fragments. `detail` is EDGE segments:
icosahedron detail 24 → 20·25² = 12.5k tris/rock (~600k per belt)
so silhouettes hold a continuous curve at fly-in zoom with no
readable polygon edges; fragments stay coarser (sharp shard
planes are their look — tetra detail 10 → 4·11² = 484 tris).

### `MID_FREQ`

Mid/micro relief octaves — a single low-frequency noise pass makes
every rock a smooth blob, so displacement stacks three octaves:
the macro crumple (1×) sets the silhouette, `MID_FREQ ×` adds the
lumpy potato bumps real asteroids carry, and `FINE_FREQ ×` grains
the surface at regolith scale.

### `TEX_W`

Class-texture canvas (px) — 512×256 equirect, 16× the pixel count
of the original 128×64 strip so crater rims and mineral veins
resolve as texture detail instead of smearing into noise.

### `TEX_GRAIN`

Per-class feature counts, scaled to the hi-res canvas.

### `SIZE_MIN`

Rock radius as a fraction of annulus width — fragments at MIN,
regular bodies in the mid band, BIG_FRAC of rocks promoted to the
large-body range (Ceres-class stand-ins, still far under planets).
Kept small: a hero rock must read as a boulder drifting past, never
as a planet-scale body crossing the frame.

### `BIG_FRAC`

Large-body fraction + their size ceiling (× annulus width).

### `FRAGMENT_FRAC`

Collision-fragment fraction — tetrahedral shards, smallest rocks.

### `JITTER`

Vertex jitter — per-axis displacement fraction (0–1) applied to
every vertex, so each rock is a unique irregular potato/shard
instead of a sphere or a repeated cookie-cutter lump.

### `JITTER_FRAG`

Fragments deform harder — broken shards, not rounded potatoes.

### `CLASS_STONE`

Material-class mix — probabilities sum with the metal remainder
to 1: ordinary stony (chondrite) dominates, carbonaceous +
hydrated + dusty bodies next, then ice, and nickel-iron holds
what remains. The class picks drive both the painted texture and
the material response (metal glints, ice refracts).

### (module scope)

(remainder → metal ≈ 0.16)

### `SPIN_MIN`

Tumble rates in rad/s — fragments spin fastest (collision
fragments do); asteroid rotations run minutes-to-hours.

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

### `SOLAR_FAR`

Solar-tier collapse — beyond this heliocentric camera distance the
whole planetary diagram (±150 units to the Kuiper rim) subtends too
little to resolve, so every solar body hides and the Sun swaps its
photosphere for the same flat point glow the neighborhood stars
wear: from Proxima's range (~1 060 units) the real solar system is
a single bright star, never a resolved cluster. The threshold sits
well clear of the belt so normal fly-throughs never trigger it.

### `SF_COMET`

Comet rendering — a `SF_KINDS.COMET` body is a dark irregular nucleus
wrapped in a sublimated gas/dust envelope (coma) trailing two tails.
The ion tail is a long narrow streak pointing straight anti-sunward
(the solar wind entrains plasma along field lines); the dust tail is
shorter, wider and lags the radius vector because grains keep some
orbital momentum — it tilts off the anti-sunward line and fans out.
Both tails are PARTICLE STREAMS rooted at the nucleus — `THREE.Points`
clouds of soft-glow grains, never quads — whose length and opacity
scale with heliocentric proximity: sublimation scales steeply with
solar flux, so the tail ignites at periapsis and dies on the outbound
leg. Lengths are multiples of the nucleus radius (Halley ≈ 0.2 units
→ ~6.4-unit ion stream), so the proportions read correctly at chart
scale where an honest ~10⁸-km tail would cross the whole map.

### `COMA_SCALE`

Coma sprite diameter × nucleus radius — the sublimated envelope.

### `COMA_OPACITY`

Coma opacity at periapsis — thins with the same factor as tails.

### `COMA_FLOOR`

Coma brightness floor — an inactive nucleus still vents a faint
background coma; only the tails fully die.

### `ION_LEN`

Ion tail length as a multiple of the nucleus radius — the plasma
stream reaches well past the coma before it disperses.

### `DUST_LEN`

Dust tail — shorter, broader, lagging the radius vector.

### `DUST_TILT`

Dust-tail lag angle (rad) — grains trail the comet's orbit, so the
fan tilts off the anti-sunward line.

### `ACTIVE_FRAC`

Periapsis window — fraction of the periapsis→apoapsis span inside
which sublimation runs hard enough to grow tails. Solar flux falls
as 1/r², so the thaw front collapses quickly on the outbound leg:
`active = clamp(((rMin + span·ACTIVE_FRAC) − r) / (span·ACTIVE_FRAC))`
raised to `GAMMA`, and the tail clouds unmount (`visible=false`)
below `TAIL_OFF`. Halley sublimates measurably out to ~3 AU against
an 0.59–35 AU orbit → ~9% window; 0.3 reads correctly at chart scale
where the tail should die before the orbit leaves the inner system.

### `PTS_CORE`

Particle counts — each tail is TWO `Points` layers: `PTS_CORE`
small bright grains forming the dense axial stream and `PTS_HALO`
large dim grains forming the diffuse gas sheath around it. ~640
grains per comet ≈ a few draw calls total — far cheaper than the
displaced-geometry alternatives and the only primitive whose
silhouette can never render a hard edge.

### `PSZ_CORE`

Grain sizes (× nucleus radius) — core grains are tight sparks,
halo grains are big soft blobs whose overlap fakes the gas volume.
Under additive blending each grain contributes a fraction of its
footprint, so the grains run large: a sparse cloud of small
sprites reads as confetti, not gas.

### `DUST_PSIZE`

Dust grains ride slightly larger than ion plasma.

### `SPREAD_ION`

Column spread — the half-width at the root (× radius) and the
downstream fan factor: `spread(d) = SPREAD·(1 + GROW·d)` so the
column opens as grains drift anti-sunward (solar-wind dispersion).
Dust disperses far wider than the field-locked ion stream.

### `WID_FLOOR`

`WID_FLOOR` keeps a residual spread when the tail shrinks toward
apoapsis (the column thins but never pinches to a zero-width line).

### `SHEATH_W`

Sheath layer — wider spread and lower opacity than the core it
wraps (`SHEATH_W` × spread, `OP_HALO` × opacity); `HALO_SLOW`
slows its grains (outer gas drags behind the entrained spine).

### `RATE_ION_LO`

Emission rates — per-particle lifecycle `d = frac(phase + t·rate)`
in cycles/scene-second. Ion plasma streams fast (magnetically
entrained, ~5–20 s to cross), dust grains creep (~15–70 s). Each
particle seeds a rate inside its layer's range so the stream never
marches in lockstep.

### `DIM_LO`

Per-grain brightness floor (`DIM_LO`) and lateral wobble — each
grain rides a seeded sine `sin(t·WOBF + phase)·WOB_AMP·spread·(0.25+0.75d)`
growing downstream (turbulence amplifies as the column thins);
`WOBF_LO/HI` spread the wobble frequencies so the column shimmers
instead of sloshing.

### `SZ_LO`

Grain footprint — `SZ_LO` is the per-grain seeded size floor
(`sz[i] ∈ [SZ_LO, 1]` × layer size), `SZ_BASE + SZ_GROW·d` swells a
grain's quad as it drifts downstream — dispersing gas expands, so
the column stays fused (overlapping soft blobs) all the way to the
ragged tip instead of thinning into separated dots.

### `PTS_RAMP`

Brightness envelope along a grain's life `d` — a smoothstep ramp
over the first `PTS_RAMP` fraction (fresh grains glow in rather
than pop), then `(1−d)^PTS_FADE` so every grain dies at its own
distance: the tip dissolves grain-by-grain into a ragged comb.
`FADE` stays shallow — a steep falloff starves the mid-tail and
the stream reads as a stub behind the coma.

### `ZFLAT`

Vertical flattening — the z spread is `ZFLAT` × the in-plane
spread (the tail sheet is thinner than it is wide, like a real
dust sheet seen edge-on).

### `GAIN`

HDR grain gain — vertex colors are written as `rgb·envelope·GAIN`:
values >1 push overlapping additive grains into saturation, which
is what fuses a sparse cloud into a continuous glowing column —
without it each grain stays a faint gray speck and the tail reads
as confetti instead of gas.

### `WIND_K`

Solar-wind gust coupling — grain brightness scales by
`1 − WIND_K + WIND_K·windNorm` so a storm visibly surges the
stream (katsushika-style brightness waves down the tail).

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
frame dissolves into space instead of showing a hard border. Under
additive blending the mask is the ONLY edge control, so the inner
two-fifths stays full-strength and the outer ~62% of every still is
pure melt — galaxies and nebulae dissolve into the star field with
no detectable rim.

### `MASK_LOBE_DIST`

Nebula lobe-mask scatter — distance band, lobe radius band, and the
per-lobe alpha range (base + jitter).

### `RING_V`

V coordinate sampling the ring strip's center row (radius = U).

### `RING_INNER`

Saturn ring radii as body-radius multiples (matches ring texture).

### `RING_STRIP_W`

Procedural ring strip — ringed bodies without a photo texture
(Uranus, Neptune) get a seeded banded strip painted at build time:
`RING_STRIP_*` sizes the radius-indexed canvas, `RING_BANDS` seeds
the tenuous ring count, `RING_BAND_W`/`RING_ALPHA_*` shape each
narrow dusty band. Uranus's real system is 13 razor-thin dark
rings; the painter biases thin + faint so it reads as a charcoal
sketch, not Saturn's bright bands.

### `HALO_SCALE`

Additive halo sprite diameter as a multiple of the star's radius —
the eased tail (see `_HALO_T*` in procedural.ts) makes the outer
third invisible, so 3.6 keeps the glow hugging the limb without
ballooning into the bounded-ball look a wide linear ramp gives.

### `CORONA_SCALE`

Corona sprite diameter as a multiple of the star's radius — the
prominence layer hugs the limb (the wide atmospheric glow belongs
to the halo sprite), so it stays well under HALO_SCALE.

### `HALO_OPACITY`

Halo sprite opacity — kept under 1 so the limb stays crisp.

### `POINT_RADIUS`

Galactic-star photosphere clamp (world units) — at honest chart
distances every star beyond the solar tier is an unresolvable point
of light: 0.003 u subtends under a degree even at the nearest fly-to
standoff, so no marker can render as a planet-like ball adjacent to
another body. The authored `def.radius` still sizes the luminosity
halo, the pick proxy and the fly-to standoff — only the sphere,
its corona and its satellites shrink to the point.

### `STAR_RIM_FALLOFF`

Fresnel exponent on the luminous-sphere shader — how tightly the rim
hugs the limb. ~2.2 keeps a bright core with a hot narrow bloom;
satellites use the looser value so their small discs stay soft.

### `CLOUD_SCALE`

Earth's cloud shell rides this multiple above the surface sphere.

### `EMISSIVE_INT`

City-lights emissive on the night side — the map is black except
lit land, so a moderate intensity glows only where the texture is.

### `NIGHT_LO`

Night-lights dusk band — `dot(worldNormal, sunDir)` smoothstep
edges gating the emissive node: fully dark below NIGHT_LO, fully
lit above NIGHT_HI, so city lights fade in through twilight and
never glow on the lit hemisphere.

### `ATMO_SCALE`

Earth atmosphere rim shell — `ATMO_SCALE` lifts the fresnel shell
just past the cloud deck, `ATMO_POW` tightens the limb falloff,
`ATMO_ALPHA` the base opacity. `DAY_*`/`DUSK_*` are the
`dot(worldNormal, sunDir)` smoothstep edges driving the day/dusk/
night tint migration across the terminator.

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
proxy bubble rides inside its mesh for raycasts.

### `PICK_PROXY`

Pick-proxy radius multiplier — the invisible raycast sphere is
PICK_PROXY × the body's true radius (never a fixed size), so honest
stellar-scale bodies stay tappable without a fake giant bubble that
would swallow neighbours at their real distances.

### `GALAXY_DISC`

Photo-disc diameter as a multiple of the catalog radius.

### `SF_SPIKE`

Diffraction-spike starburst — the telescope-optics cross that rides
bright stars. Spikes are soft elliptical gradients (never stroked
lines), seeded-rotated per star so no two crosses align. Kept as its
own bag since the sprite is a separate layer from halo + corona.

### `SPIKE_SCALE`

Spike sprite diameter as a multiple of the star's authored radius —
like the halo it tracks luminosity, not the clamped point sphere,
so catalog giants throw longer crosses than dwarfs. Sits a step
beyond HALO_SCALE so the spike tips pierce the glow edge.

### `SPIKE_OPACITY`

Sprite opacity — under HALO_OPACITY so it reads as optics, not gas.

### `SPIKE_RAYS`

Spike ray count — 6 throws the hexagonal cross of a real segmented
mirror (JWST), plus a faint second cross at SPIKE_ROT2 for depth.

### `SPIKE_ROT2`

Second cross angular offset (radians fraction of a full turn).

### `SPIKE_LEN2`

Second cross reach multiplier vs the primary rays.

### `SPIKE_THIN`

Ray ellipse minor-axis width as a fraction of the half-sprite.

### `SPIKE_CORE`

Center knot radius as a fraction of the half-sprite.

### `SPIKE_JITTER`

Rotation jitter added to the seeded base angle (radians).

### `SF_NEBULA_DEPTH`

Nebula depth layering — a parallax echo + wide underlay glow composed
under the photo sprite so a nebula reads as a volume of gas at
different depths instead of one flat billboard. The *_RATE/_FREQ/_WAVE
members drive the ambient-life pass in updateFx: each layer swirls
(SpriteMaterial.rotation is a UV-space turn, so the feathered photo
churns in place rather than orbiting) and breathes opacity on detuned
sines; rates are seeded from the body id so no two nebulae churn alike.

### `ECHO_SCALE`

Echo layer scale multiplier over the photo sprite.

### `ECHO_OPACITY`

Echo layer opacity — ghost of the photo rotated off-axis.

### `UNDER_SCALE`

Underlay glow scale multiplier — the wide light-field behind.

### `UNDER_OPACITY`

Underlay glow opacity.

### `SWIRL_MIN`

Slowest layer swirl rate (rad/scene-second) — real nebular flows
move at ~10 km/s over light-year spans, so the chart suggests the
churn with sub-centi-radian rotation rather than a visible spin.

### `SWIRL_SPREAD`

Seeded spread added to SWIRL_MIN — per-nebula swirl variance.

### `ECHO_RATE`

Echo counter-rotation factor — negative sign makes the ghost layer shear against the photo.

### `UNDER_RATE`

Underlay drift factor — the widest layer barely turns.

### `OP_WAVE`

Opacity shimmer amplitude (fraction of opBase) + detuned frequency.

### `BREATHE_AMP`

Whole-sprite breathing — ±fraction scale swell like gas pressure waves.
