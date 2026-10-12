# `experiments/star-field/engine/types.ts`

Shared types for the star-field engine — the static body

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/types.ts`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

The TSL node-graph namespace (compiled to WGSL/GLSL by the renderer).

### (module scope)

Lazily-loaded node-material context — the renderer is WebGPURenderer
(WebGPU or forced-WebGL backend), whose node pipeline rejects classic
GLSL ShaderMaterials. Every custom-shaded surface (fresnel limbs,
boundary shells, the accretion disc) is therefore built as a node
material: bootstrap injects the TSL namespace and the node material
ctor so the body builders stay pure/mockable.

### `TSL`

The `three/tsl` module namespace.

### `mats`

Node-material constructors re-exported by `three/webgpu`.

### (module scope)

Static catalog entry — everything the scene needs to place a body,
declared once per body in catalog.ts. Orbiting bodies set `orbit` +
`parent`; fixed deep-sky objects set `pos` directly.

### `id`

Body id — matches `public/data/<id>.json` and `data-body` attrs.

### `name`

Display fallback before the dossier JSON loads.

### `kind`

SF_KINDS value — drives badge label + material recipe.

### `group`

SF_GROUPS value — navigator drawer bucket.

### `radius`

Visual radius in scene units (compressed chart, not to scale).

### (module scope)

Orbit radius around `parent` — omit for fixed positions.

### (module scope)

Id of the body it orbits (default: scene origin).

### (module scope)

Orbit angular speed multiplier (0 for fixed bodies).

### (module scope)

Self-rotation speed multiplier.

### (module scope)

Starting angle on the orbit (radians).

### (module scope)

Orbital eccentricity 0–1 — when set, the pivot still sweeps the
angle uniformly but the mesh's radial distance follows the conic
`r = a(1−e²)/(1+e·cos θ)` so the body draws a visible ellipse
(Halley-type comets) instead of the default circle. `orbit` reads
as the semi-major axis and `phase` as the periapsis longitude.

### (module scope)

Axial tilt (radians).

### (module scope)

SF_TEXTURES key material map — omit for procedural bodies.

### (module scope)

SF_COLORS hex for procedural material/emissive tint.

### (module scope)

Limb tint override (SF_COLORS hex) — the fresnel mixes toward this
at the silhouette instead of the default hot `STAR_RIM`. A darker
rim produces limb darkening on resolved star discs (the Sun):
we see deeper hotter layers at centre, cooler gas at the limb.

### (module scope)

Corona activity scale (1 = quiet star) — stretches prominences,
adds eruption plumes and sunspots, and enlarges the corona sprite.
The Sun runs above 1 so its surface reads as an active photosphere.

### (module scope)

Secondary texture for translucent shells (Venus atmosphere, Saturn ring).

### (module scope)

Shell is a flat ring disc (Saturn) rather than an atmosphere sphere.

### (module scope)

Bump/relief map (Earth terrain shading) — lit-materials only.

### (module scope)

Grayscale elevation map — bumpMap gives terrain real depth relief.

### (module scope)

Night-lights emissive map — glows only where the map is lit.

### (module scope)

Atmosphere rim shell (0 = off) — a fresnel-limb translucent sphere
just past the surface whose tint migrates day→dusk→night with the
sun direction (Earth); the value scales the shell's opacity.

### (module scope)

Cloud deck texture — extra translucent sphere one layer up.

### (module scope)

Fixed scene position `[x,y,z]` for non-orbiting deep-sky objects.

### (module scope)

Procedural spiral galaxy — render the seeded Points disc instead of
a flat sprite. `count` is the star-particle target (capped by
`SF_SPIRAL.COUNT_MAX`, divided on mobile) standing in for the
galaxy's true stellar population; `arms` overrides the arm count.
`volumetric` drops the photographic quad entirely (the Milky Way is
viewed from inside — a face-on photo is geometrically false) and
thickens the particle disc; `elliptical` fills a smooth spheroid
for dwarf-spheroidal members that have no spiral structure.

### (module scope)

Disc-thickness multiplier on `SF_SPIRAL.THIN`.

### (module scope)

Arm angular jitter (rad) — overrides `SF_SPIRAL.ARM_JITTER`.

### (module scope)

Spherical stellar-halo fraction (0–1) layered over the disc.

### (module scope)

Heliocentric exclusion bubble radius (chart units) — particles are
resampled away from the Sun's position inside the disc so random
disc stars never overlap the solar-system meshes (Milky Way only).

### (module scope)

Relativistic-jet cones on a black-hole body — bipolar additive
cylinders along the disc normal sized by `SF_BH`.

### (module scope)

Cosmic-hierarchy boundary — a faint translucent shell sphere of
`radius` chart units plus an interior speckle cloud standing in for
member galaxies. Structures are not raycast-pickable (their shell
would swallow every pointer ray); the navigator still flies to them.

### (module scope)

Small-body annulus (asteroid/Kuiper belt) — `inner`/`outer` are the
ring bounds in chart units, `count` the particle budget, `puff` the
vertical half-thickness multiplier on `def.radius`. The def's
`radius` doubles as the camera-framing value on fly-to; the def's
`color` tints the particles. `gapFreq` overrides the Kirkwood-lane
modulation frequency (0 = smooth disc, no resonance gaps).

### (module scope)

Luminosity pulse — slow breathing scale oscillation for variable
stars, pulsars and flaring cores; `period` in seconds, `amp` the
± scale fraction (0.1 = ±10%).

### (module scope)

Climate cycle — oscillates the surface material tint toward
`SF_COLORS.EARTH_ICE` (glaciation winter→summer analogy); `period`
in seconds.

### `dist`

Authored distance label for the hover tooltip — semi-major axis in
AU for Solar-System bodies, light-years for deep-sky objects. Units
are universal abbreviations so the string needs no translation.

### (module scope)

Decorative non-pickable satellites (companion stars, exoplanets) —
orbit this body's mesh; purely visual, no dossier of their own.

### (module scope)

Same conic rule as `SFBodyDef.ecc` — radial distance modulates
around the circular pivot sweep.

### (module scope)

One media asset inside a dossier — the file lives under
`public/media/<id>/` and renders with caption + credit (NASA/ESA/…
attribution is required by the sources' usage terms).

### `src`

Asset path relative to `SF_DATA_BASE`-adjacent media root.

### (module scope)

Localized caption/alt text.

### (module scope)

Credit line (e.g. "NASA/JPL-Caltech/MSSS").

### (module scope)

Poster frame for videos (relative path).

### (module scope)

Provenance signature — when the dossier's source data was acquired
and when this locale's translation was produced (ISO dates), plus
the reference URLs the facts were paraphrased from.

### `acquired`

ISO date the source data/media was downloaded.

### `translated`

ISO date this locale's text was translated/written.

### `locale`

The locale this file serves (`en` for the canonical file).

### (module scope)

Reference URLs the dossier paraphrases (NASA/JPL/Trek/SVS/ESO).

### (module scope)

A named prose section — dossiers with `sections` render the deep
history as titled subsections (formation, exploration, geology, …)
instead of one flat paragraph.

### (module scope)

Lazy-loaded dossier JSON shape — `public/data/<locale>/<id>.json`.
Facts render as a definition list; `history`/`sections` are prose;
`source` credits the data provenance (NASA, ESO, …); `media` is a
curated gallery; `meta` carries the acquisition/translation signature.

### (module scope)

Optional prose subsections for deep-history bodies.

### (module scope)

Downloaded gallery — images, videos, audio recordings.

### (module scope)

Acquisition/translation signature.

### (module scope)

Raw `public/data/<locale>/<id>.json` file shape — each locale folder
ships one self-contained dossier per body so only the active language
downloads; `id`, `kind` and `source` are locale-neutral.

### (module scope)

Locale-neutral proper-named star table shipped inside
`en/milky-way.json` — real HYG catalogue entries (heliocentric
light-years) kept for future labels and the browse index.

### (module scope)

Progress callback — loader overlay message + 0–100 percent.

### (module scope)

Body-approach/select notification — the host fetches the dossier JSON.

### (module scope)

Mutable engine state — one bag threaded through bootstrap/frame/fly so
every stage shares renderer, scene graph, tweens and dispose flags
without a class field soup.

### `canvas`

Persistent canvas the host owns (replaced on renderer retry).

### `renderer`

three.js WebGPURenderer (WebGPU or forced-WebGL backend).

### `world`

Floating-origin world root — every catalog body, cloud and rider
parents under this group instead of the scene directly. The follow
step counter-translates it so the followed anchor sits at the world
origin: rider-mounted bodies translate up to ~16k units/s on the
galactic ring, which would otherwise push all coordinates to ~6.7M
where float32 quantization (±0.5 units) visibly jitters every mesh.
Skybox and lights stay on the scene at the origin — the pin point —
so they always enclose/light whatever the camera follows.

### `sunLight`

Sun stand-in point light — created in the scene at the origin (the
pin point), then re-parented onto the Sun anchor once bodies build
so it keeps illuminating from the Sun's real position whichever
body the floating origin currently pins.

### `nodes`

id → runtime body node record.

### `anchors`

id → center Object3D the camera targets (equals mesh for most).

### `pickables`

Pickable meshes for raycasting.

### `dayNight`

Day/night shader registry — bodies with sun-direction-dependent
shading (night-lights emissive gating, atmosphere rim shells).
Each frame `updateDayNight` writes `dir = normalize(sunPos −
bodyPos)` into the shared vector the material's TSL uniform wraps,
so lights stay dark on the lit hemisphere and the rim migrates
with the terminator.

### `approached`

ids whose dossier was already prefetched — approach fires once.

### `starCloud`

Real-star cloud Points (HYG catalogue field on the Milky Way disc)
— set by star-cloud.ts once the packed binary decodes; kept on
state so destroy() can dispose its geometry/material.

### `starCloudLoading`

Guard flag — the star-cloud fetch fires only once per boot.

### `fly`

Active fly-to tween or null when controls are free.

### `animId`

Active RAF id.

### `disposed`

Set by destroy() — every async stage checks before continuing.

### `failed`

Bootstrap failed or bailed — host swaps in the CSS fallback.

### `reduced`

Reduced-motion flag — pauses the RAF loop.

### `onResize`

Resize listener to detach on destroy.

### `onPointerDown`

Pointer listeners to detach on destroy.

### `downXY`

last pointer-down position for click-vs-drag discrimination.

### `lastT`

Last tick timestamp for dt-based animation.

### `t`

Elapsed scene time (seconds) — drives orbits/spins.

### `hoverId`

Camera hover state — last picked body id for the HUD.

### `hint`

Navigator-hover position hint — while the pointer (or focus) rests
on a catalog row the engine reports the body's projected screen
position every tick, edge-clamped so the hint works at any zoom
level. Plain data, resolved per tick in `trackHover`: catalog ids
carry their `anchor` (live world position) and registry rows carry
their shard `rec` (resolved via `registryWorldPos` in the pinned
frame). Null when no nav row is hovered; takes precedence over
`hoverId` (the pointer is on the drawer, not the canvas).

### `selectedId`

Selected body id (panel open).

### `followId`

Camera-follow anchor — which catalog id the camera rides with when
no fly tween runs. Selections set it to the picked body; the solar
overview sets it to the Sun so the chart holds the solar system
while it orbits inside the galactic disc — without marking a
dossier selection. Null = free camera.

### (module scope)

Lifecycle callbacks from the host.

### (module scope)

Per-frame hover tracking — fires every tick while a body is hovered
with its projected canvas-space pixel position, so the tooltip and
its leader line follow orbiting bodies without DOM thrash. `edge`
marks the projected point as clamped to the canvas edge (object
off-screen or behind) and `angle` carries the outward direction in
degrees for the leader-line arrow.

### (module scope)

Fires once when a frame throws — host swaps to the 2D fallback.

### (module scope)

Per-body runtime node — pivot (orbit rotation), mesh, and its def.

### `pivot`

Object3D that orbits — rotates around the parent's center.

### `mesh`

The pickable mesh/sprite — carries `userData.bodyId`.

### `spinner`

Spin target (mesh or its inner group) for self-rotation.

### (module scope)

Inertial axis lock — a group between the orbit pivot and the mesh
carrying `rotation.z = tilt` and counter-rotated on Y each frame.
Without it the pivot's orbital Y-rotation precesses the spin axis
with the body's position (perpetual solstice); the lock keeps the
axis fixed in the parent frame so the terminator sweeps the
hemispheres over the orbit — real seasons. Only set on directly
orbiting tilted bodies.

### (module scope)

Differential-rotation subgroup — a volumetric galaxy's inner-disc
Points cloud; tickFrame spins it at ROTOR_DIFF× the whole-disc rate
so the core laps the rim the way real rotation curves do.

### `satPivots`

Satellite pivots (decorative companions) — rotate per frame.

### `mesh`

Satellite mesh riding the pivot — modulated when `ecc` is set.

### `orbit`

Semi-major axis (chart units) + eccentricity for elliptical orbits.

### (module scope)

LOD-toggleable secondary geometry — atmosphere shells, ring discs,
satellite pivots; frame.ts hides these
beyond the detail distance so far bodies draw as one primitive.

### (module scope)

Star corona sprite — the seeded streamer texture from
`procedural.coronaFor`; updateFx rotates `material.rotation` and
breathes `material.opacity` so stars shimmer like live suns.

### (module scope)

Active camera fly-to tween — cubic ease-in-out over FLY_MS.

### `t0`

Start time (performance.now snapshot).

### `fromPos`

Camera position at tween start.

### `offset`

Approach offset — destination sits this vector away from the body.

### `fromTgt`

Controls target at tween start.

### `track`

Live body-position getter — rider-mounted anchors keep moving while
the tween runs, so the destination is re-resolved every frame; a
static snapshot would land the camera where the body was at arm
time. Returns null when the anchor is gone (dest frozen at last).

### `last`

Last resolved body position — destination anchor when track yields null.

### (module scope)

Optional follow-up when the tween completes (fire onSelect).
