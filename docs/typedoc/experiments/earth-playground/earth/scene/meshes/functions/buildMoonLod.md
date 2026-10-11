[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/scene/meshes](../README.md) / buildMoonLod

```ts
function buildMoonLod(THREE): Promise<LOD<Object3DEventMap>>;
```

Defined in: experiments/earth-playground/earth/scene/meshes.ts:144

Moon as a 3-level LOD sphere (radius 5, half Earth's visual size at
10× distance — exaggerated vs the real 0.27× so it reads at a glance).
96/48/32-seg meshes swap at 30u/60u camera distance; a faint 0.02
emissive map keeps the dark limb visible.

## Parameters

### THREE

three namespace

#### THREE

`__module`

#### loader

`TextureLoader` \| `null`

## Returns

`Promise`\<`LOD`\<`Object3DEventMap`\>\>
