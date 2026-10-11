[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/bodies-scene](../README.md) / buildStarBodies

```ts
function buildStarBodies(
   s, 
   THREE, 
   deps, 
   defs, 
   texMap, 
   glowTex
): void;
```

Defined in: experiments/star-field/engine/bodies-scene.ts:394

Builds every catalog body into the scene graph: pivots for orbiting
bodies (rotation.y = phase + t·speed), fixed groups for `pos` bodies,
satellites and shells, then registers the node, anchor
and pickable in the state maps.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../types/interfaces/SFNodeDeps.md)

### defs

readonly [`SFBodyDef`](../../types/interfaces/SFBodyDef.md)[]

Catalog entries.

### texMap

`Map`\<`string`, `Texture`\<`unknown`, `TextureEventMap`\>\>

Loaded texture map keyed by URL.

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared glow texture for sprites/discs (may be undefined).

## Returns

`void`
