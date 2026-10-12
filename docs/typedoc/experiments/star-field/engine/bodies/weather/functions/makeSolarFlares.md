[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/weather](../README.md) / makeSolarFlares

```ts
function makeSolarFlares(THREE, def, glowTex): object[]
```

Defined in: experiments/star-field/engine/bodies/weather.ts:630

Solar limb flares — `FLARE_N` seeded prominence sprites rooted at the
photosphere edge of the Sun's equatorial band. updateFx scales them by
`wind × sin⁴(phase + t·rate)` so eruptions breathe with the activity
cycle and spike outward when storms hit.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry (Sun).

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-glow texture for the sprite maps.

## Returns

`object`[]

Flare records for the node's `flares` list.
