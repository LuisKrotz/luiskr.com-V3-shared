[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural](../README.md) / coronaFor

```ts
function coronaFor(THREE, def): Texture<unknown, TextureEventMap> | undefined;
```

Defined in: experiments/star-field/engine/bodies/procedural.ts:368

Generates a seeded star-corona sprite — the "alive" layer that turns
a lit disc into a sun: a warm photosphere glow, seeded radial
streamers at uneven lengths, and a few flare knots. The sprite
rotates slowly in `updateFx` so the streamers shimmer.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Star def (color = streamer tint, id = seed).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture for the corona sprite map, or undefined.
