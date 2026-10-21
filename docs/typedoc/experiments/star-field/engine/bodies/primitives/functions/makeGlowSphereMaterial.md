[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeGlowSphereMaterial

```ts
function makeGlowSphereMaterial(THREE, deps, colorHex, tex, rimTint, falloff): Material
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:80

Luminous-sphere node material — a star's disc must not read as a flat
polygon. The fresnel rim `(1 − |view·n|)^falloff` mixes the body's
color/texture toward the limb tint and dips the alpha at the extreme
silhouette, so the photosphere dissolves into its additive halo
instead of cutting a hard circle against the sky. Built as a
MeshBasicNodeMaterial — the WebGPURenderer node pipeline rejects
classic GLSL ShaderMaterials.

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors (bootstrap-injected).

### colorHex

`number` \| `undefined`

Core tint (def.color; SUN_LIGHT fallback).

### tex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Optional photosphere texture — modulates the core.

### rimTint

`number`

Limb color (hot rim for stars, muted for moons).

### falloff

`number`

Fresnel exponent — higher keeps a tight bright core.

## Returns

`Material`
