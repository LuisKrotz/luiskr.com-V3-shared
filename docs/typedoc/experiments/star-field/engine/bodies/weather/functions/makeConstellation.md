[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/weather](../README.md) / makeConstellation

```ts
function makeConstellation(THREE, def): Object3D<Object3DEventMap> | null
```

Defined in: experiments/star-field/engine/bodies/weather.ts:561

Starlink-class constellation — a `count`-point cloud on one inclined
orbital shell: each satellite is a single lit pixel glinting as it
laps the planet, and the whole shell precesses as a unit on its
pivot (frame.ts rotates it like a satellite pivot). Raycast is
stubbed so the swarm can never steal a body click.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `constellation` carries count/orbit.

## Returns

`Object3D`\<`Object3DEventMap`\> \| `null`
