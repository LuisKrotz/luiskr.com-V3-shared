[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural](../README.md) / gasFor

```ts
function gasFor(THREE, def): Texture<unknown, TextureEventMap> | undefined;
```

Defined in: experiments/star-field/engine/bodies/procedural.ts:465

Generates a seeded wispy nebula-gas texture for photo-less nebulae
and clusters — a union of soft colored lobes (derived from the
catalog tint, pushed hot at the cores) with dark absorption wisps
punched through, so the body reads as sculpted gas rather than a
uniform glow disc. Returns undefined without a 2d context.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Nebula def (color = gas tint, id = seed).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture for the sprite map, or undefined.
