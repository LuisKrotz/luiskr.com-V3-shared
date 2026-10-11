[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/black-hole](../README.md) / makeBlackHole

```ts
function makeBlackHole(
   THREE, 
   deps, 
   def, 
   glowTex
): object;
```

Defined in: experiments/star-field/engine/bodies/black-hole.ts:260

Assembles the full Sagittarius A* composite: black horizon sphere,
additive photon torus, hot accretion annulus, seeded plasma swirl
(returned as `spin` — the node's rotating layer), optional bipolar
jets, and a warm lensing glow. Everything lives in the local XZ
plane / ±Y normal, which inside the Milky Way's tilted group is the
galactic plane and poles.

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors (bootstrap-injected).

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry (`kind: blackHole`; `jets` adds the cones).

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-gradient glow texture (may be undefined).

## Returns

`object`

`{ group, spin }` — scene node + per-frame rotation target.

### group

```ts
group: Object3D;
```

### spin

```ts
spin: Object3D;
```
