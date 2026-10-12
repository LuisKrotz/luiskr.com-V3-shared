[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeSphere

```ts
function makeSphere(
  THREE,
  deps,
  def,
  texMap,
  sunDir?
): Mesh<SphereGeometry, Material<MaterialEventMap>, Object3DEventMap>
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:120

Sphere + material for a solid body — textured when the catalog maps one,
tinted procedural otherwise. Stars/systems use the fresnel-limb node
material (they emit their own light); planets and smaller get lit
MeshStandard. When `sunDir` is passed (day/night registry vector) the
body upgrades to `MeshStandardNodeMaterial` so the emissive layer can
be gated by the sun direction — city lights never glow on the lit
hemisphere.

## Parameters

### THREE

`__module`

The three.js module.

### deps

[`SFNodeDeps`](../../../types/interfaces/SFNodeDeps.md)

TSL namespace + node-material ctors.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry.

### texMap

`Map`\<`string`, `Texture`\<`unknown`, `TextureEventMap`\>\>

Loaded texture map keyed by URL.

### sunDir?

`Vector3`

Shared sun-direction vector (mutated per frame by
`updateDayNight`) — gates the emissive map through `emissiveNode`.

## Returns

`Mesh`\<`SphereGeometry`, `Material`\<`MaterialEventMap`\>, `Object3DEventMap`\>
