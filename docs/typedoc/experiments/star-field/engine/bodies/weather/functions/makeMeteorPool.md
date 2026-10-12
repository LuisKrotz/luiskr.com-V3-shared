[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/weather](../README.md) / makeMeteorPool

```ts
function makeMeteorPool(THREE, def, glowTex): object[]
```

Defined in: experiments/star-field/engine/bodies/weather.ts:697

Meteor flash pool — `SF_METEOR.POOL` additive glow sprites parented
to the cratered body's mesh, all dormant (opacity 0). updateFx fires
a slot at a random surface point when `meteorNext` elapses and fades
it over `SF_METEOR.LIFE`, so a body like Callisto reads as still
being bombarded — matching the "saturated with craters" dossier —
instead of standing geologically dead.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry (meteors-flagged).

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-glow texture for the flash map.

## Returns

`object`[]
