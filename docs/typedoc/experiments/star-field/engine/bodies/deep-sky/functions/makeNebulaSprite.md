[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/deep-sky](../README.md) / makeNebulaSprite

```ts
function makeNebulaSprite(
   THREE, 
   def, 
   texMap, 
   glowTex, 
   lobes?
): Sprite;
```

Defined in: experiments/star-field/engine/bodies/deep-sky.ts:35

Billboard sprite for nebulae and star clusters — the real photo on a
camera-facing sprite with feathered edges and source aspect ratio
preserved. Additive blending + tint only on the procedural fallback,
where the glow texture stands in for imagery.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry (texture = photo URL, color = fallback tint).

### texMap

`TexMap`

Loaded texture map keyed by URL.

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-gradient glow texture (may be undefined).

### lobes?

`number` = `0`

## Returns

`Sprite`
