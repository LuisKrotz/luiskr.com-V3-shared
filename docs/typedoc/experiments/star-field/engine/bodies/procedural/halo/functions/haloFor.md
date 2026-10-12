[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/halo](../README.md) / haloFor

```ts
function haloFor(THREE, def): Texture<unknown, TextureEventMap> | undefined
```

Defined in: experiments/star-field/engine/bodies/procedural/halo.ts:66

Generates the additive halo sprite texture for a luminous body — a
tinted annulus whose transparent center keeps the photosphere crisp
while the limb bleeds warm light into space.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../../types/interfaces/SFBodyDef.md)

Star def (color tints the ring, id keys the cache).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Tinted annulus texture, or undefined.
