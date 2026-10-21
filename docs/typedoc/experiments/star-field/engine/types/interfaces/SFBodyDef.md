[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFBodyDef

Defined in: experiments/star-field/engine/types.ts:45

Static catalog entry — everything the scene needs to place a body,
declared once per body in catalog.ts. Orbiting bodies set `orbit` +
`parent`; fixed deep-sky objects set `pos` directly.

## Properties

### id

```ts
id: string
```

Defined in: experiments/star-field/engine/types.ts:47

Body id — matches `public/data/<id>.json` and `data-body` attrs.

---

### name

```ts
name: string
```

Defined in: experiments/star-field/engine/types.ts:49

Display fallback before the dossier JSON loads.

---

### kind

```ts
kind: string
```

Defined in: experiments/star-field/engine/types.ts:51

SF_KINDS value — drives badge label + material recipe.

---

### group

```ts
group: string
```

Defined in: experiments/star-field/engine/types.ts:53

SF_GROUPS value — navigator drawer bucket.

---

### radius

```ts
radius: number
```

Defined in: experiments/star-field/engine/types.ts:55

Visual radius in scene units (compressed chart, not to scale).

---

### orbit?

```ts
optional orbit?: number;
```

Defined in: experiments/star-field/engine/types.ts:57

Orbit radius around `parent` — omit for fixed positions.

---

### parent?

```ts
optional parent?: string;
```

Defined in: experiments/star-field/engine/types.ts:59

Id of the body it orbits (default: scene origin).

---

### speed?

```ts
optional speed?: number;
```

Defined in: experiments/star-field/engine/types.ts:61

Orbit angular speed multiplier (0 for fixed bodies).

---

### spin?

```ts
optional spin?: number;
```

Defined in: experiments/star-field/engine/types.ts:63

Self-rotation speed multiplier.

---

### phase?

```ts
optional phase?: number;
```

Defined in: experiments/star-field/engine/types.ts:65

Starting angle on the orbit (radians).

---

### inc?

```ts
optional inc?: number;
```

Defined in: experiments/star-field/engine/types.ts:74

Orbital inclination about the parent's x-axis (radians) — tilts the
whole orbit plane, not the body. Real multi-planet systems share
near-coplanar planes but are never perfectly aligned; small nonzero
values break the edge-on straight-line illusion while still reading
as a resonant chain. Written to `pivot.rotation.x` at build so it
survives the per-frame `rotation.y` orbit sweep.

---

### ecc?

```ts
optional ecc?: number;
```

Defined in: experiments/star-field/engine/types.ts:82

Orbital eccentricity 0–1 — when set, the pivot still sweeps the
angle uniformly but the mesh's radial distance follows the conic
`r = a(1−e²)/(1+e·cos θ)` so the body draws a visible ellipse
(Halley-type comets) instead of the default circle. `orbit` reads
as the semi-major axis and `phase` as the periapsis longitude.

---

### tilt?

```ts
optional tilt?: number;
```

Defined in: experiments/star-field/engine/types.ts:84

Axial tilt (radians).

---

### texture?

```ts
optional texture?: string;
```

Defined in: experiments/star-field/engine/types.ts:86

SF_TEXTURES key material map — omit for procedural bodies.

---

### color?

```ts
optional color?: number;
```

Defined in: experiments/star-field/engine/types.ts:88

SF_COLORS hex for procedural material/emissive tint.

---

### rim?

```ts
optional rim?: number;
```

Defined in: experiments/star-field/engine/types.ts:95

Limb tint override (SF_COLORS hex) — the fresnel mixes toward this
at the silhouette instead of the default hot `STAR_RIM`. A darker
rim produces limb darkening on resolved star discs (the Sun):
we see deeper hotter layers at centre, cooler gas at the limb.

---

### activity?

```ts
optional activity?: number;
```

Defined in: experiments/star-field/engine/types.ts:101

Corona activity scale (1 = quiet star) — stretches prominences,
adds eruption plumes and sunspots, and enlarges the corona sprite.
The Sun runs above 1 so its surface reads as an active photosphere.

---

### shellTexture?

```ts
optional shellTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:103

Secondary texture for translucent shells (Venus atmosphere, Saturn ring).

---

### shellRing?

```ts
optional shellRing?: boolean;
```

Defined in: experiments/star-field/engine/types.ts:109

Shell is a flat ring disc rather than an atmosphere sphere — with
no `shellTexture` a seeded procedural band strip is painted instead
(Uranus/Neptune's thin dusty arcs), so any body can carry rings.

---

### ringInner?

```ts
optional ringInner?: number;
```

Defined in: experiments/star-field/engine/types.ts:116

Ring radii as body-radius multiples — default to Saturn's strip
(SF_DETAIL.RING_INNER/OUTER); ice giants override with their honest
narrower spans (Uranus's rings hug 1.6–2.0 R, not Saturn's wide
plate).

---

### ringOuter?

```ts
optional ringOuter?: number;
```

Defined in: experiments/star-field/engine/types.ts:117

---

### ringBands?

```ts
optional ringBands?: number;
```

Defined in: experiments/star-field/engine/types.ts:124

Procedural band count override for `ringStripFor` — default
SF_DETAIL.RING_BANDS; real systems differ wildly (Jupiter 4 faint
rings, Uranus 13 razor-thin arcs, Neptune 5 dusty arcs) so the
catalog pins the honest count per body.

---

### normalTexture?

```ts
optional normalTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:126

Bump/relief map (Earth terrain shading) — lit-materials only.

---

### bumpTexture?

```ts
optional bumpTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:128

Grayscale elevation map — bumpMap gives terrain real depth relief.

---

### emissiveTexture?

```ts
optional emissiveTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:130

Night-lights emissive map — glows only where the map is lit.

---

### atmosphere?

```ts
optional atmosphere?: number;
```

Defined in: experiments/star-field/engine/types.ts:136

Atmosphere rim shell (0 = off) — a fresnel-limb translucent sphere
just past the surface whose tint migrates day→dusk→night with the
sun direction (Earth); the value scales the shell's opacity.

---

### cloudTexture?

```ts
optional cloudTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:138

Cloud deck texture — extra translucent sphere one layer up.

---

### pos?

```ts
optional pos?: [number, number, number];
```

Defined in: experiments/star-field/engine/types.ts:140

Fixed scene position `[x,y,z]` for non-orbiting deep-sky objects.

---

### spiralDisc?

```ts
optional spiralDisc?: object;
```

Defined in: experiments/star-field/engine/types.ts:151

Procedural spiral galaxy — render the seeded Points disc instead of
a flat sprite. `count` is the star-particle target (capped by
`SF_SPIRAL.COUNT_MAX`, divided on mobile) standing in for the
galaxy's true stellar population; `arms` overrides the arm count.
`volumetric` drops the photographic quad entirely (the Milky Way is
viewed from inside — a face-on photo is geometrically false) and
thickens the particle disc; `elliptical` fills a smooth spheroid
for dwarf-spheroidal members that have no spiral structure.

#### count

```ts
count: number
```

#### arms?

```ts
optional arms?: number;
```

#### volumetric?

```ts
optional volumetric?: boolean;
```

#### elliptical?

```ts
optional elliptical?: boolean;
```

#### thick?

```ts
optional thick?: number;
```

Disc-thickness multiplier on `SF_SPIRAL.THIN`.

#### jitter?

```ts
optional jitter?: number;
```

Arm angular jitter (rad) — overrides `SF_SPIRAL.ARM_JITTER`.

#### halo?

```ts
optional halo?: number;
```

Spherical stellar-halo fraction (0–1) layered over the disc.

#### bubble?

```ts
optional bubble?: number;
```

Heliocentric exclusion bubble radius (chart units) — particles are
resampled away from the Sun's position inside the disc so random
disc stars never overlap the solar-system meshes (Milky Way only).

---

### jets?

```ts
optional jets?: boolean;
```

Defined in: experiments/star-field/engine/types.ts:173

Relativistic-jet cones on a black-hole body — bipolar additive
cylinders along the disc normal sized by `SF_BH`.

---

### structure?

```ts
optional structure?: object;
```

Defined in: experiments/star-field/engine/types.ts:186

Hierarchy structure — `radius` sizes the volume, `speckles` the
interior point cloud, `shell: false` suppresses the boundary sphere
(speckle-only landmarks: a fresnel bubble at chart scale reads as a
fake wall, while the member cloud marks the region honestly).

#### radius

```ts
radius: number
```

#### speckles?

```ts
optional speckles?: number;
```

#### shell?

```ts
optional shell?: boolean;
```

---

### belt?

```ts
optional belt?: object;
```

Defined in: experiments/star-field/engine/types.ts:195

Small-body annulus (asteroid/Kuiper belt) — `inner`/`outer` are the
ring bounds in chart units, `count` the particle budget, `puff` the
vertical half-thickness multiplier on `def.radius`. The def's
`radius` doubles as the camera-framing value on fly-to; the def's
`color` tints the particles. `gapFreq` overrides the Kirkwood-lane
modulation frequency (0 = smooth disc, no resonance gaps).

#### inner

```ts
inner: number
```

#### outer

```ts
outer: number
```

#### count

```ts
count: number
```

#### puff?

```ts
optional puff?: number;
```

#### gapFreq?

```ts
optional gapFreq?: number;
```

---

### pulse?

```ts
optional pulse?: object;
```

Defined in: experiments/star-field/engine/types.ts:201

Luminosity pulse — slow breathing scale oscillation for variable
stars, pulsars and flaring cores; `period` in seconds, `amp` the
± scale fraction (0.1 = ±10%).

#### period

```ts
period: number
```

#### amp

```ts
amp: number
```

---

### cycle?

```ts
optional cycle?: object;
```

Defined in: experiments/star-field/engine/types.ts:207

Climate cycle — oscillates the surface material tint toward
`SF_COLORS.EARTH_ICE` (glaciation winter→summer analogy); `period`
in seconds.

#### period

```ts
period: number
```

---

### weather?

```ts
optional weather?: boolean;
```

Defined in: experiments/star-field/engine/types.ts:214

Procedural weather — replaces the static `cloudTexture` deck with
the full `weather.ts` field: evolving coverage, jet streams, ITCZ
monsoon band, hurricane vortices, seasonal snow lines, volcanic
ash plumes and matching surface cloud shadows (Earth).

---

### aurora?

```ts
optional aurora?:
  | boolean
  | {
  color?: number;
  colorLow?: number;
  tilt?: number;
  lat?: number;
  intensity?: number;
  south?: boolean;
};
```

Defined in: experiments/star-field/engine/types.ts:227

Aurora shell — a thin rayed emission OVAL centered on the magnetic
pole (not the spin pole), driven by the shared solar-wind uniform
so solar storms light every aurora-bearing body at once (Earth,
Jupiter, Saturn, Neptune). Pass `true` for the default Earth-green
oxygen palette, or a config object for per-body physics:
`color`/`colorLow` are the curtain-top/lower-edge emissions,
`tilt` the magnetic dipole's offset from the spin axis (radians —
Neptune's is ~0.82 rad ≈ 47°), `lat` the oval's |lat| center and
`intensity` a brightness multiplier (Jupiter > Earth > Saturn >
Neptune, matching real emitted power).

#### Union Members

`boolean`

---

##### Type Literal

```ts
{
  color?: number;
  colorLow?: number;
  tilt?: number;
  lat?: number;
  intensity?: number;
  south?: boolean;
}
```

##### color?

```ts
optional color?: number;
```

##### colorLow?

```ts
optional colorLow?: number;
```

##### tilt?

```ts
optional tilt?: number;
```

##### lat?

```ts
optional lat?: number;
```

##### intensity?

```ts
optional intensity?: number;
```

##### south?

```ts
optional south?: boolean;
```

False → boreal oval only (Earth); default shows both poles.

---

### flares?

```ts
optional flares?: boolean;
```

Defined in: experiments/star-field/engine/types.ts:242

Solar flares — limb prominence sprites on the photosphere edge that
breathe and stretch outward with the shared solar-wind cycle (Sun).

---

### constellation?

```ts
optional constellation?: object;
```

Defined in: experiments/star-field/engine/types.ts:253

LEO constellation shell — `count` point glints sharing one inclined
orbital plane at `orbit`× radius, sweeping as a unit (the Starlink
swarm; `orbit` multiplies `def.radius`). An `id`/`name` pair turns
the whole shell into a dossier-backed pick target like a catalogued
companion: an invisible pick bubble at the shell radius registers
the swarm in `pickables`/`nodes`/`anchors` so clicking the glint
annulus (but not the planet it wraps — the proxy loses to any real
mesh hit along the ray) opens the near-orbit dossier.

#### count

```ts
count: number
```

#### orbit

```ts
orbit: number
```

#### id?

```ts
optional id?: string;
```

#### name?

```ts
optional name?: string;
```

---

### meteors?

```ts
optional meteors?: boolean;
```

Defined in: experiments/star-field/engine/types.ts:261

Meteor strikes — airless cratered bodies still take impacts; a
pooled flash sprite fires at a random surface point every
`SF_METEOR.INTERVAL`-ish seconds (updateFx). For bodies whose
dossier describes ongoing bombardment — the flash makes the
crater record readable as a live process.

---

### irregular?

```ts
optional irregular?: object;
```

Defined in: experiments/star-field/engine/types.ts:272

Irregular rubble-pile body — replaces the perfect SphereGeometry
with a seeded noise-crumpled icosahedron: each vertex displaces
along its own normal by `vnoise(unit+offset)·amp·radius` and the
whole solid stretches along `axes` (triaxial proportions, default
seeded mild). For moons whose dossier JSON describes a lumpy
captured asteroid (Phobos, Deimos) rather than a hydrostatic ball —
the silhouette carries the physics (tidal stripping, rubble
re-accretion) the sphere could never show.

#### amp

```ts
amp: number
```

Crumple depth as a fraction of the body radius (0–1).

#### axes?

```ts
optional axes?: [number, number, number];
```

Triaxial proportions [x, y, z] — the body's three radii normalized to x=1 (Phobos ≈ [1, 0.81, 0.67]).

---

### surface?

```ts
optional surface?: string;
```

Defined in: experiments/star-field/engine/types.ts:285

Procedural-surface recipe pin — one of `SF_SURFACES` (`rock`,
`ice`, `gas`, `lava`, `ocean`). The painter's kind bias still seeds
the grain, but the recipe forces the read: a molten Proxima d can
never draw water bands, an oceanic TRAPPIST-1e always carries seas.
Absent → seeded pick inside the kind's palette as before.

---

### dist

```ts
dist: string
```

Defined in: experiments/star-field/engine/types.ts:291

Authored distance label for the hover tooltip — semi-major axis in
AU for Solar-System bodies, light-years for deep-sky objects. Units
are universal abbreviations so the string needs no translation.

---

### satellites?

```ts
optional satellites?: object[];
```

Defined in: experiments/star-field/engine/types.ts:301

Companion bodies orbiting this body's mesh — the representation for
a galactic star's planetary system (TRAPPIST-1 b–h, Epsilon Eridani
b) and for crafted orbiters (the ISS). Entries render inside the
host's LOD `detail` set so a system's planets only resolve once the
camera is inside the approach distance; `ecc`/`phase` carry the
real conic. An entry carrying `id`/`name` registers as a pickable
dossier body like any catalog world.

#### radius

```ts
radius: number
```

#### orbit

```ts
orbit: number
```

#### speed

```ts
speed: number
```

#### color?

```ts
optional color?: number;
```

#### texture?

```ts
optional texture?: string;
```

#### phase?

```ts
optional phase?: number;
```

#### id?

```ts
optional id?: string;
```

Dossier-backed pick id — when set, the companion registers as a
real node (anchor + pick proxy) so a close-up click resolves to a
lazy `public/data/<locale>/<id>.json` dossier like any catalog
body. Anonymous companions stay decorative and unpickable.

#### name?

```ts
optional name?: string;
```

Display name for the dossier-backed companion.

#### station?

```ts
optional station?: boolean;
```

Crafted-station flag — renders the companion as a lit truss +
solar-panel model (the ISS silhouette) instead of the default
fresnel glow ball, so crewed orbiters read as built objects,
not second moons.

#### ecc?

```ts
optional ecc?: number;
```

Same conic rule as `SFBodyDef.ecc` — radial distance modulates
around the circular pivot sweep.

---

### atmoColor?

```ts
optional atmoColor?: number;
```

Defined in: experiments/star-field/engine/types.ts:333

Atmosphere tint override (SF_COLORS hex) — the rim shell normally
migrates Earth's day/dusk/night palette; bodies with a chemically
different sky (Titan's tholin haze) pin the limb to their own hue.

---

### plumes?

```ts
optional plumes?: object;
```

Defined in: experiments/star-field/engine/types.ts:341

Cryovolcanic/volcanic plume system — animated geyser/volcano vents
that throw ejecta sprites into space (Enceladus' south-polar tiger
stripes, Io's scattered sulfur plumes). `polar` clusters the vents
around the south pole; `color` tints the jets (water-ice vs
sulfur), `height` overrides the reach as a body-radius multiple.

#### count?

```ts
optional count?: number;
```

Vent count — defaults to `SF_PLUME.VENTS`.

#### polar?

```ts
optional polar?: boolean;
```

True → vents cluster at the south pole (Enceladus tiger stripes).

#### color?

```ts
optional color?: number;
```

Plume tint (SF_COLORS hex) — ejecta particle color.

#### height?

```ts
optional height?: number;
```

Jet reach × body radius — defaults to `SF_PLUME.HEIGHT`.
