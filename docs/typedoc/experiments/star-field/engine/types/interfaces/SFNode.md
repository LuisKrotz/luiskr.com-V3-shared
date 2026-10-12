[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFNode

Defined in: experiments/star-field/engine/types.ts:530

Per-body runtime node — pivot (orbit rotation), mesh, and its def.

## Properties

### def

```ts
def: SFBodyDef
```

Defined in: experiments/star-field/engine/types.ts:531

---

### pivot

```ts
pivot: Object3D
```

Defined in: experiments/star-field/engine/types.ts:533

Object3D that orbits — rotates around the parent's center.

---

### mesh

```ts
mesh: Object3D
```

Defined in: experiments/star-field/engine/types.ts:535

The pickable mesh/sprite — carries `userData.bodyId`.

---

### spinner

```ts
spinner: Object3D
```

Defined in: experiments/star-field/engine/types.ts:537

Spin target (mesh or its inner group) for self-rotation.

---

### lock?

```ts
optional lock?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:547

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

Defined in: experiments/star-field/engine/types.ts:553

Differential-rotation subgroup — a volumetric galaxy's inner-disc
Points cloud; tickFrame spins it at ROTOR_DIFF× the whole-disc rate
so the core laps the rim the way real rotation curves do.

---

### clouds?

```ts
optional clouds?: Object3D<Object3DEventMap>;
```

Defined in: experiments/star-field/engine/types.ts:561

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

Defined in: experiments/star-field/engine/types.ts:567

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

Defined in: experiments/star-field/engine/types.ts:578

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

Defined in: experiments/star-field/engine/types.ts:585

Next scheduled meteor strike time (scene seconds).

---

### satPivots

```ts
satPivots: object[];
```

Defined in: experiments/star-field/engine/types.ts:587

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

Defined in: experiments/star-field/engine/types.ts:607

LOD-toggleable secondary geometry — atmosphere shells, ring discs,
satellite pivots; frame.ts hides these
beyond the detail distance so far bodies draw as one primitive.

---

### corona?

```ts
optional corona?: object;
```

Defined in: experiments/star-field/engine/types.ts:613

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

Defined in: experiments/star-field/engine/types.ts:621

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

Defined in: experiments/star-field/engine/types.ts:623

Invisible pick bubble kept live while `farGlow` shows.
