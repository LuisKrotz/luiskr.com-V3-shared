[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/belt](../README.md) / makeBelt

```ts
function makeBelt(
   THREE, 
   def, 
   glowTex
): Points;
```

Defined in: experiments/star-field/engine/bodies/belt.ts:44

Builds the seeded particle annulus for a `kind: belt` catalog entry —
the asteroid belt between Mars and Jupiter, the Kuiper belt beyond
Neptune. Returns the Points object that becomes the node's mesh; its
`raycast` is a no-op by contract (non-pickable detail).

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `def.belt` carries inner/outer/count/puff,
  `def.color` tints the particles, `def.id` seeds the LCG.

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared soft-disc sprite texture (may be undefined).

## Returns

`Points`
