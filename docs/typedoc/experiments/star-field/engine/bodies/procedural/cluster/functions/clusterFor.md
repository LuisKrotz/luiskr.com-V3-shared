[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/cluster](../README.md) / clusterFor

```ts
function clusterFor(THREE, def): Texture<unknown, TextureEventMap> | undefined
```

Defined in: experiments/star-field/engine/bodies/procedural/cluster.ts:73

Paints the seeded globular-cluster texture — unresolved core glow +
King-sampled star speckles, used by `makeNebulaSprite` when a cluster
catalog entry carries no photo map.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../../types/interfaces/SFBodyDef.md)

Cluster def (`id` seeds the swarm, `color` tints the core).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture for the sprite map, or undefined.
