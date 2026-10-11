[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/structures](../README.md) / makeStructure

```ts
function makeStructure(
   THREE, 
   deps, 
   def, 
   glowTex?
): Object3D;
```

Defined in: experiments/star-field/engine/bodies/structures.ts:177

Builds one hierarchy structure: a low-poly fresnel-rim boundary
sphere plus the optional interior speckle volume. The rim material
makes the shell read as a soap bubble — only the silhouette glows,
face-on area adds nothing — so nested shells can never stack into
a flat film over the sky (the BackSide wash bug), and the boundary
blends into the black instead of cutting a hard disc. Every child's
raycast is stubbed so the shell can never eat a pointer hit meant
for bodies inside it.

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors (bootstrap-injected).

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `structure.radius` sets the shell size.

### glowTex?

`Texture`\<`unknown`, `TextureEventMap`\>

Unused (kept for maker-signature symmetry).

## Returns

`Object3D`

The structure group.
