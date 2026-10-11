[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFBodyDef

Defined in: experiments/star-field/engine/types.ts:37

Static catalog entry — everything the scene needs to place a body,
declared once per body in catalog.ts. Orbiting bodies set `orbit` +
`parent`; fixed deep-sky objects set `pos` directly.

## Properties

### id

```ts
id: string;
```

Defined in: experiments/star-field/engine/types.ts:39

Body id — matches `public/data/<id>.json` and `data-body` attrs.

***

### name

```ts
name: string;
```

Defined in: experiments/star-field/engine/types.ts:41

Display fallback before the dossier JSON loads.

***

### kind

```ts
kind: string;
```

Defined in: experiments/star-field/engine/types.ts:43

SF_KINDS value — drives badge label + material recipe.

***

### group

```ts
group: string;
```

Defined in: experiments/star-field/engine/types.ts:45

SF_GROUPS value — navigator drawer bucket.

***

### radius

```ts
radius: number;
```

Defined in: experiments/star-field/engine/types.ts:47

Visual radius in scene units (compressed chart, not to scale).

***

### orbit?

```ts
optional orbit?: number;
```

Defined in: experiments/star-field/engine/types.ts:49

Orbit radius around `parent` — omit for fixed positions.

***

### parent?

```ts
optional parent?: string;
```

Defined in: experiments/star-field/engine/types.ts:51

Id of the body it orbits (default: scene origin).

***

### speed?

```ts
optional speed?: number;
```

Defined in: experiments/star-field/engine/types.ts:53

Orbit angular speed multiplier (0 for fixed bodies).

***

### spin?

```ts
optional spin?: number;
```

Defined in: experiments/star-field/engine/types.ts:55

Self-rotation speed multiplier.

***

### phase?

```ts
optional phase?: number;
```

Defined in: experiments/star-field/engine/types.ts:57

Starting angle on the orbit (radians).

***

### ecc?

```ts
optional ecc?: number;
```

Defined in: experiments/star-field/engine/types.ts:65

Orbital eccentricity 0–1 — when set, the pivot still sweeps the
angle uniformly but the mesh's radial distance follows the conic
`r = a(1−e²)/(1+e·cos θ)` so the body draws a visible ellipse
(Halley-type comets) instead of the default circle. `orbit` reads
as the semi-major axis and `phase` as the periapsis longitude.

***

### tilt?

```ts
optional tilt?: number;
```

Defined in: experiments/star-field/engine/types.ts:67

Axial tilt (radians).

***

### texture?

```ts
optional texture?: string;
```

Defined in: experiments/star-field/engine/types.ts:69

SF_TEXTURES key material map — omit for procedural bodies.

***

### color?

```ts
optional color?: number;
```

Defined in: experiments/star-field/engine/types.ts:71

SF_COLORS hex for procedural material/emissive tint.

***

### shellTexture?

```ts
optional shellTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:73

Secondary texture for translucent shells (Venus atmosphere, Saturn ring).

***

### shellRing?

```ts
optional shellRing?: boolean;
```

Defined in: experiments/star-field/engine/types.ts:75

Shell is a flat ring disc (Saturn) rather than an atmosphere sphere.

***

### normalTexture?

```ts
optional normalTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:77

Bump/relief map (Earth terrain shading) — lit-materials only.

***

### bumpTexture?

```ts
optional bumpTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:79

Grayscale elevation map — bumpMap gives terrain real depth relief.

***

### emissiveTexture?

```ts
optional emissiveTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:81

Night-lights emissive map — glows only where the map is lit.

***

### cloudTexture?

```ts
optional cloudTexture?: string;
```

Defined in: experiments/star-field/engine/types.ts:83

Cloud deck texture — extra translucent sphere one layer up.

***

### pos?

```ts
optional pos?: [number, number, number];
```

Defined in: experiments/star-field/engine/types.ts:85

Fixed scene position `[x,y,z]` for non-orbiting deep-sky objects.

***

### spiralDisc?

```ts
optional spiralDisc?: object;
```

Defined in: experiments/star-field/engine/types.ts:96

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
count: number;
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

***

### jets?

```ts
optional jets?: boolean;
```

Defined in: experiments/star-field/engine/types.ts:116

Relativistic-jet cones on a black-hole body — bipolar additive
cylinders along the disc normal sized by `SF_BH`.

***

### structure?

```ts
optional structure?: object;
```

Defined in: experiments/star-field/engine/types.ts:123

Cosmic-hierarchy boundary — a faint translucent shell sphere of
`radius` chart units plus an interior speckle cloud standing in for
member galaxies. Structures are not raycast-pickable (their shell
would swallow every pointer ray); the navigator still flies to them.

#### radius

```ts
radius: number;
```

#### speckles?

```ts
optional speckles?: number;
```

***

### belt?

```ts
optional belt?: object;
```

Defined in: experiments/star-field/engine/types.ts:132

Small-body annulus (asteroid/Kuiper belt) — `inner`/`outer` are the
ring bounds in chart units, `count` the particle budget, `puff` the
vertical half-thickness multiplier on `def.radius`. The def's
`radius` doubles as the camera-framing value on fly-to; the def's
`color` tints the particles. `gapFreq` overrides the Kirkwood-lane
modulation frequency (0 = smooth disc, no resonance gaps).

#### inner

```ts
inner: number;
```

#### outer

```ts
outer: number;
```

#### count

```ts
count: number;
```

#### puff?

```ts
optional puff?: number;
```

#### gapFreq?

```ts
optional gapFreq?: number;
```

***

### pulse?

```ts
optional pulse?: object;
```

Defined in: experiments/star-field/engine/types.ts:138

Luminosity pulse — slow breathing scale oscillation for variable
stars, pulsars and flaring cores; `period` in seconds, `amp` the
± scale fraction (0.1 = ±10%).

#### period

```ts
period: number;
```

#### amp

```ts
amp: number;
```

***

### cycle?

```ts
optional cycle?: object;
```

Defined in: experiments/star-field/engine/types.ts:144

Climate cycle — oscillates the surface material tint toward
`SF_COLORS.EARTH_ICE` (glaciation winter→summer analogy); `period`
in seconds.

#### period

```ts
period: number;
```

***

### dist

```ts
dist: string;
```

Defined in: experiments/star-field/engine/types.ts:150

Authored distance label for the hover tooltip — semi-major axis in
AU for Solar-System bodies, light-years for deep-sky objects. Units
are universal abbreviations so the string needs no translation.

***

### satellites?

```ts
optional satellites?: object[];
```

Defined in: experiments/star-field/engine/types.ts:155

Decorative non-pickable satellites (companion stars, exoplanets) —
orbit this body's mesh; purely visual, no dossier of their own.

#### radius

```ts
radius: number;
```

#### orbit

```ts
orbit: number;
```

#### speed

```ts
speed: number;
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

#### ecc?

```ts
optional ecc?: number;
```

Same conic rule as `SFBodyDef.ecc` — radial distance modulates
 around the circular pivot sweep.
