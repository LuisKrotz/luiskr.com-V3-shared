[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural](../README.md) / surfaceFor

```ts
function surfaceFor(THREE, def): Texture<unknown, TextureEventMap> | undefined;
```

Defined in: experiments/star-field/engine/bodies/procedural.ts:327

Generates a seeded equirect surface texture for an untextured solid
body — planets, moons, dwarf planets and rocky exoplanet satellites
all get a distinct surface instead of a flat tint. Returns undefined
when no 2d context exists so the caller keeps the plain material.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Body def (color = base tint, id = seed).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture for `material.map`, or undefined.
