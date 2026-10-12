[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeStarHalo

```ts
function makeStarHalo(THREE, def, glowTex, flat?): Sprite
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:334

Additive halo sprite behind a luminous body — stars and the Sun glow
like point sources on a real long-exposure frame instead of rendering
as flat colored balls. Kept off the LOD `detail` list: a star's glow
IS its far-field representation.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry (color tints the halo).

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-gradient glow texture (may be undefined).

### flat?

`boolean`

Point-star mode — a filled core glow (no photosphere behind
it); default annulus leaves a transparent cut for the ball's limb.

## Returns

`Sprite`
