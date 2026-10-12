[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/star-surface](../README.md) / starSurfaceFor

```ts
function starSurfaceFor(THREE, def): Texture<unknown, TextureEventMap> | undefined
```

Defined in: experiments/star-field/engine/bodies/procedural/star-surface.ts:54

Generates a seeded equirect photosphere texture for a luminous body —
hundreds of small offset granulation cells modulate the star's tint
so the sphere reads as a boiling photosphere (convection granules)
rather than a smooth egg; the fresnel material modulates this map
into the limb tint at grazing angles, which stands in for limb
darkening + refraction. Returns undefined without a 2d context.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../../types/interfaces/SFBodyDef.md)

Star def (color = photosphere tint, id = seed).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture for the glow-sphere's color modulate, or undefined.
