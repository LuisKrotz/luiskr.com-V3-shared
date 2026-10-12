[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/weather](../README.md) / makeAurora

```ts
function makeAurora(THREE, deps, def, time, wind, sunDir?): Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/bodies/weather.ts:371

Aurora curtains — a thin rayed emission OVAL centered on the body's
MAGNETIC pole (the `tilt` offsets the sampling frame by the dipole
angle, so Neptune's wildly offset field draws a swung oval, not a
symmetric polar cap). Two shells stack the curtain: the lower ring
hugs the atmosphere at SHELL_SCALE, an upper ring at SHELL_SCALE2
with poleward-shifted latitude reads as curtain tops standing off
the limb. Longitude fbm provides both the oval's substorm buckling
and the high-frequency curtain rays; the shared wind uniform gates
brightness so a solar storm ignites every aurora-bearing world in
the same frame, and the optional sun-direction uniform dims the
day-side arc (UV emission runs in sunlight — it just doesn't show).

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `aurora` carries the per-body palette,
magnetic tilt, oval latitude and intensity.

### time

Shared time uniform node (updateFx-driven).

#### value

`number`

### wind

\| \{
`value`: `number`;
\}
\| `null`

Shared solar-wind uniform node (updateFx-driven).

### sunDir?

`Vector3`

Shared sun-direction vector when the body registers
one — gates the day-side arc; omit for ungated shells.

## Returns

`Object3D`\<`Object3DEventMap`\> \| `null`
