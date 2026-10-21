[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeSatellites

```ts
function makeSatellites(THREE, deps, def, mesh, texMap): object[]
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:691

Decorative companion satellites — small unlit spheres on child pivots;
`sat.station` swaps the glow ball for the crafted truss-and-panels
model (ISS). Plain companions carry the same fresnel-limb material as
before but now modulated by a surface — the satellite's own photo
(`sat.texture`, preloaded with the host's maps) or a seeded
`surfaceFor` equirect keyed on `host:sat:index`, so companion worlds
are textured bodies too, not bare glow dots. `satPivots` returns the
{pivot,speed,phase} records frame.ts rotates.

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

### texMap

`Map`\<`string`, `Texture`\<`unknown`, `TextureEventMap`\>\>

Loaded texture map keyed by URL.

## Returns
