[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFNode

Defined in: experiments/star-field/engine/types.ts:338

Per-body runtime node — pivot (orbit rotation), mesh, and its def.

## Properties

### def

```ts
def: SFBodyDef;
```

Defined in: experiments/star-field/engine/types.ts:339

***

### pivot

```ts
pivot: Object3D;
```

Defined in: experiments/star-field/engine/types.ts:341

Object3D that orbits — rotates around the parent's center.

***

### mesh

```ts
mesh: Object3D;
```

Defined in: experiments/star-field/engine/types.ts:343

The pickable mesh/sprite — carries `userData.bodyId`.

***

### spinner

```ts
spinner: Object3D;
```

Defined in: experiments/star-field/engine/types.ts:345

Spin target (mesh or its inner group) for self-rotation.

***

### satPivots

```ts
satPivots: object[];
```

Defined in: experiments/star-field/engine/types.ts:347

Satellite pivots (decorative companions) — rotate per frame.

#### pivot

```ts
pivot: Object3D;
```

#### mesh

```ts
mesh: Object3D;
```

Satellite mesh riding the pivot — modulated when `ecc` is set.

#### speed

```ts
speed: number;
```

#### phase

```ts
phase: number;
```

#### orbit

```ts
orbit: number;
```

Semi-major axis (chart units) + eccentricity for elliptical orbits.

#### ecc?

```ts
optional ecc?: number;
```

***

### detail?

```ts
optional detail?: Object3D<Object3DEventMap>[];
```

Defined in: experiments/star-field/engine/types.ts:362

LOD-toggleable secondary geometry — atmosphere shells, ring discs,
satellite pivots; frame.ts hides these
beyond the detail distance so far bodies draw as one primitive.

***

### corona?

```ts
optional corona?: object;
```

Defined in: experiments/star-field/engine/types.ts:368

Star corona sprite — the seeded streamer texture from
`procedural.coronaFor`; updateFx rotates `material.rotation` and
breathes `material.opacity` so stars shimmer like live suns.

#### material

```ts
material: object;
```

##### material.rotation

```ts
rotation: number;
```

##### material.opacity

```ts
opacity: number;
```

#### rate

```ts
rate: number;
```

#### phase

```ts
phase: number;
```
