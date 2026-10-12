[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/weather](../README.md) / makeWeatherClouds

```ts
function makeWeatherClouds(
  THREE,
  deps,
  def,
  cloudTex,
  sunDir,
  surfaceMat,
  time
): Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/bodies/weather.ts:284

Builds the living cloud deck + applies the matching surface shadow —
a lit MeshStandardNodeMaterial so the deck takes real sun shading
(bright limb, dark night side, true terminator) instead of the old
additive white wash. `surfaceMat` gets a colorNode multiplying the
day-side diffuse by `1 − SHADOW·density` so thick weather visibly
dims the ground beneath it. The shared `fxTime` uniform drives field
evolution (updateFx writes it once per frame).

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry (radius sizes the shell).

### cloudTex

`Texture`

Loaded 8k cloud map (coverage steering).

### sunDir

`Vector3`

Shared day/night sun-direction vector.

### surfaceMat

`unknown`

The body's surface material (node path only).

### time

Shared scene-time uniform node (`s.fxTime`).

#### value

`number`

## Returns

`Object3D`\<`Object3DEventMap`\> \| `null`
