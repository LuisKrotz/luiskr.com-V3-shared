[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeAtmoShell

```ts
function makeAtmoShell(THREE, deps, def, sunDir): Object3D
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:370

Atmosphere rim shell — a fresnel-limb translucent sphere just past
the surface whose tint migrates with the sun direction: deep blue on
the night limb, bright scattering blue on the day limb, and a warm
amber band through the terminator (rayleigh→mie analogy). Opacity
also dims on the night side so the rim reads thinnest where the air
is unlit. `updateDayNight` keeps the shared `sunDir` vector current.

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors (bootstrap-injected).

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `def.atmosphere` scales the base opacity.

### sunDir

`Vector3`

Shared sun-direction vector (mutated per frame).

## Returns

`Object3D`
