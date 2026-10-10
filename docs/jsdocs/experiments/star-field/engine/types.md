# `experiments/star-field/engine/types.ts`

Shared types for the star-field engine — the static body

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/types.ts` |
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

Axial tilt (radians).

### (module scope)

SF_TEXTURES key material map — omit for procedural bodies.

### (module scope)

SF_COLORS hex for procedural material/emissive tint.

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

### (module scope)

Whether to draw the orbit guide ring.

### `dist`

Authored distance label for the hover tooltip — semi-major axis in
AU for Solar-System bodies, light-years for deep-sky objects. Units
are universal abbreviations so the string needs no translation.

### (module scope)

Decorative non-pickable satellites (companion stars, exoplanets) —
orbit this body's mesh; purely visual, no dossier of their own.

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

### `nodes`

id → runtime body node record.

### `anchors`

id → center Object3D the camera targets (equals mesh for most).

### `pickables`

Pickable meshes for raycasting.

### `rings`

Orbit rings so destroy can dispose their geometry.

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

### `selectedId`

Selected body id (panel open).

### (module scope)

Lifecycle callbacks from the host.

### (module scope)

Per-frame hover tracking — fires every tick while a body is hovered
with its projected canvas-space pixel position, so the tooltip and
its leader line follow orbiting bodies without DOM thrash.

### (module scope)

Per-body runtime node — pivot (orbit rotation), mesh, and its def.

### `pivot`

Object3D that orbits — rotates around the parent's center.

### `mesh`

The pickable mesh/sprite — carries `userData.bodyId`.

### `spinner`

Spin target (mesh or its inner group) for self-rotation.

### `satPivots`

Satellite pivots (decorative companions) — rotate per frame.

### (module scope)

LOD-toggleable secondary geometry — atmosphere shells, ring discs,
satellite pivots and the orbit guide ring; frame.ts hides these
beyond the detail distance so far bodies draw as one primitive.

### (module scope)

Active camera fly-to tween — cubic ease-in-out over FLY_MS.

### `t0`

Start time (performance.now snapshot).

### `fromPos`

Camera position at tween start.

### `toPos`

Camera destination.

### `fromTgt`

Controls target at tween start.

### `toTgt`

Controls target destination (body center).

### (module scope)

Optional follow-up when the tween completes (fire onSelect).
