[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeSatellites

```ts
function makeSatellites(THREE, deps, def, mesh): object[]
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:511

Decorative companion satellites — small unlit spheres on child pivots;
`sat.station` swaps the glow ball for the crafted truss-and-panels
model (ISS). `satPivots` returns the {pivot,speed,phase} records
frame.ts rotates.

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `satellites` lists the companions.

### mesh

The host body mesh — pivots attach to it to orbit.

#### add

## Returns
