[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeStation

```ts
function makeStation(THREE, sat): Object3D
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:632

Crafted-station silhouette — a crewed orbiter (the ISS) is not a ball
of light: a long truss carries a pressurized-module core at centre and
a pair of wide flat solar-array wings at the tips, all in lit
MeshStandardMaterial so the station glints in sunlight and goes dark
through eclipse instead of glowing. All proportions derive from
`sat.radius` so the model shrinks with the solar tier.

## Parameters

### THREE

`__module`

The three.js module.

### sat

Satellite def — `radius` is the core scale unit.

#### radius

`number`

#### color?

`number`

## Returns

`Object3D`

The station group (caller positions it on its pivot).
