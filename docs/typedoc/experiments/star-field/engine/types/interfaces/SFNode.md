[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFNode

Defined in: experiments/star-field/engine/types.ts:646

Per-body runtime node — pivot (orbit rotation), mesh, and its def.

## Properties

### def

```ts
def: SFBodyDef
```

Defined in: experiments/star-field/engine/types.ts:647

---

### pivot

```ts
pivot: Object3D
```

Defined in: experiments/star-field/engine/types.ts:649

Object3D that orbits — rotates around the parent's center.

---

### mesh

```ts
mesh: Object3D
```

Defined in: experiments/star-field/engine/types.ts:651

The pickable mesh/sprite — carries `userData.bodyId`.

---

### spinner

```ts
spinner: Object3D
```

Defined in: experiments/star-field/engine/types.ts:653

Spin target (mesh or its inner group) for self-rotation.

---

### center?

```ts
optional center?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:664

Body-system center — the group that carries the orbit radius
(`position.x = def.orbit`) and hosts everything that must share the
body's location but NOT its orientation: the axis-lock group, the
bare mesh, satellite pivots and constellation swarms. It never
rotates itself, so children orbit the body's center in the pivot
frame instead of inheriting surface spin or lock counter-rotation.
For orbiting bodies this is also the eccentric-orbit target —
frame.ts rewrites its `position.x` with the conic radius.

---

### lock?

```ts
optional lock?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:674

Inertial axis lock — a group between the orbit pivot and the mesh
carrying `rotation.z = tilt` and counter-rotated on Y each frame.
Without it the pivot's orbital Y-rotation precesses the spin axis
with the body's position (perpetual solstice); the lock keeps the
axis fixed in the parent frame so the terminator sweeps the
hemispheres over the orbit — real seasons. Only set on directly
orbiting tilted bodies.

---

### rotor?

```ts
optional rotor?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:680

Differential-rotation subgroup — a volumetric galaxy's inner-disc
Points cloud; tickFrame spins it at ROTOR_DIFF× the whole-disc rate
so the core laps the rim the way real rotation curves do.

---

### clouds?

```ts
optional clouds?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:688

Cloud-deck shell — Earth's cloud sphere rides inside `mesh` so it
inherits surface spin; with `def.weather` the deck is the
procedural field (jets/storms/snow evolve in the shader via the
shared `fxTime` uniform), and updateFx still adds its legacy
differential drift for static-texture decks.

---

### flares?

```ts
optional flares?: object[];
```

Defined in: experiments/star-field/engine/types.ts:694

Solar limb flares — prominence sprites from `makeSolarFlares`;
updateFx scales/opacities them by `solarWind × sin⁴(t·rate+phase)`
so eruptions breathe and spike outward when a storm hits.

#### sprite

```ts
sprite: Object3D
```

#### rate

```ts
rate: number
```

#### phase

```ts
phase: number
```

#### base

```ts
base: number
```

---

### meteorPool?

```ts
optional meteorPool?: object[];
```

Defined in: experiments/star-field/engine/types.ts:705

Meteor flash pool — `SF_METEOR.POOL` sprites parented to the mesh,
recycled across strikes so impact flashes never allocate per frame;
`meteorNext` schedules the next strike (scene seconds).

#### sprite

```ts
sprite: Object3D
```

#### t0

```ts
t0: number
```

Strike start time (scene seconds) — drives the fade curve.

#### active

```ts
active: boolean
```

---

### meteorNext?

```ts
optional meteorNext?: number;
```

Defined in: experiments/star-field/engine/types.ts:712

Next scheduled meteor strike time (scene seconds).

---

### satPivots

```ts
satPivots: object[];
```

Defined in: experiments/star-field/engine/types.ts:714

Satellite pivots (decorative companions) — rotate per frame.

#### pivot

```ts
pivot: Object3D
```

#### mesh

```ts
mesh: Object3D
```

Satellite mesh riding the pivot — modulated when `ecc` is set.

#### speed

```ts
speed: number
```

#### phase

```ts
phase: number
```

#### orbit

```ts
orbit: number
```

Semi-major axis (chart units) + eccentricity for elliptical orbits.

#### ecc?

```ts
optional ecc?: number;
```

#### spin?

```ts
optional spin?: number;
```

Self-tumble rate — belt hero rocks spin their own mesh on top of
the orbit sweep so debris reads as tumbling rubble, not rails.

---

### detail?

```ts
optional detail?: Object3D<Object3DEventMap>[];
```

Defined in: experiments/star-field/engine/types.ts:734

LOD-toggleable secondary geometry — atmosphere shells, ring discs,
satellite pivots; frame.ts hides these
beyond the detail distance so far bodies draw as one primitive.

---

### volPoints?

```ts
optional volPoints?: Object3D<Object3DEventMap> | null;
```

Defined in: experiments/star-field/engine/types.ts:741

Volumetric-galaxy Points cache — `updateGalaxyClouds` resolves the
`userData.volumetric` child once and parks the handle here so the
per-frame fade never re-walks `mesh.children` (a `.find` call
allocates its predicate closure every frame otherwise).

---

### corona?

```ts
optional corona?: object;
```

Defined in: experiments/star-field/engine/types.ts:747

Star corona sprite — the seeded streamer texture from
`procedural.coronaFor`; updateFx rotates `material.rotation` and
breathes `material.opacity` so stars shimmer like live suns.

#### material

```ts
material: object
```

##### material.rotation

```ts
rotation: number
```

##### material.opacity

```ts
opacity: number
```

#### rate

```ts
rate: number
```

#### phase

```ts
phase: number
```

---

### farGlow?

```ts
optional farGlow?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:755

Interstellar-collapse glyph — a flat point-glow sprite riding the
pivot beside the real mesh, plus its own pick proxy. updateLod
shows them (and hides the sphere) once the camera passes
SF_LOD.SOLAR_FAR so the whole solar tier reads as a single bright
star like every other sun in the neighborhood. Solar stars only.

---

### farPick?

```ts
optional farPick?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:757

Invisible pick bubble kept live while `farGlow` shows.

---

### farGlyph?

```ts
optional farGlyph?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:766

Galactic-star far glyph — the flat point-glow sprite a point star
wears at chart distances. updateLod hides it while the node's
near-field group (real photosphere sphere + annulus halo + corona +
flares, parked on `detail`) resolves on approach, so the star reads
as an unresolvable point from range and as its spectral class up
close.

---

### nebula?

```ts
optional nebula?: SFNebulaFx;
```

Defined in: experiments/star-field/engine/types.ts:772

Living-nebula animation record — parked on the sprite's userData by
`makeNebulaSprite` (`SF_USER_NEBULA`) and lifted here so updateFx
can churn the depth layers each frame.

---

### comet?

```ts
optional comet?: object;
```

Defined in: experiments/star-field/engine/types.ts:782

Comet tail/coma animation record — updateFx reads the live conic
radius off `center.position.x` (frame.ts writes it for `ecc`
orbits) and re-drives each tail's particle field between `rMin`
(periapsis — full stream) and `rMax` (apoapsis — near-invisible
stub), reproducing how sublimation scales with solar flux. Each
`Points` layer carries its seeded grain field in
`userData.gasPts` — the record only needs the object handles.

#### ion

```ts
ion: Object3D
```

Ion-tail particle layers (core stream + diffuse sheath).

#### ionGas

```ts
ionGas: Object3D
```

#### dust

```ts
dust: Object3D
```

Dust-tail particle layers (core stream + diffuse sheath).

#### dustGas

```ts
dustGas: Object3D
```

#### coma

```ts
coma: Object3D
```

Coma glow sprite hugging the nucleus.

#### rMin

```ts
rMin: number
```

Periapsis/apoapsis distances (chart units) — the scale window.

#### rMax

```ts
rMax: number
```

#### comaScale

```ts
comaScale: object
```

Resting coma scale captured at build, multiplied by the factor.

##### comaScale.x

```ts
x: number
```

##### comaScale.y

```ts
y: number
```

---

### plumes?

```ts
optional plumes?: object[];
```

Defined in: experiments/star-field/engine/types.ts:803

Cryovolcanic plume system — per-vent jet + cycling puff sprite
records built by `makePlumes`; updateFx rises each puff along its
vent direction, expands and fades it, and recycles it — continuous
eruption with zero per-frame allocation.

#### jet

```ts
jet: Object3D
```

Steady tapered-cone jet rooted at the vent (shimmering column).

#### puff

```ts
puff: Object3D
```

Rising ejecta puff cycling outward along `dir`.

#### dir

```ts
dir: object
```

Unit vent direction (body-local) — the ejecta axis.

##### dir.x

```ts
x: number
```

##### dir.y

```ts
y: number
```

##### dir.z

```ts
z: number
```

#### phase

```ts
phase: number
```

Seeded cycle phase (0–1) and rate multiplier.

#### rate

```ts
rate: number
```

#### radius

```ts
radius: number
```

Body radius (spawn height) and jet reach (world units).

#### height

```ts
height: number
```

#### width

```ts
width: number
```

Puff base width (world units) — grows as it rises.

#### sunDir?

```ts
optional sunDir?: Vector3;
```

Shared body-local sun direction — the dayNight registry fills it
each frame; updateFx dots it against `dir` so vents only jet when
the sun lights their hemisphere (Elysium-dark vents go smudge).
