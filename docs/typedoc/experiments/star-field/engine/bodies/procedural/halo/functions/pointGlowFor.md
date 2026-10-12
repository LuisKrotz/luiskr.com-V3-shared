[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/halo](../README.md) / pointGlowFor

```ts
function pointGlowFor(THREE, def): Texture<unknown, TextureEventMap> | undefined
```

Defined in: experiments/star-field/engine/bodies/procedural/halo.ts:109

Generates the additive halo texture for a point star — a filled
radial glow with a white-hot core and the body's tint in the tail.
Galactic stars never resolve a photosphere at chart distances, so
their whole luminous body is this sprite (no sphere mesh); the
annulus would leave a hollow center with nothing inside it.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../../types/interfaces/SFBodyDef.md)

Star def (color tints the tail, id keys the cache).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Tinted point-glow texture, or undefined.
