[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/plumes](../README.md) / makePlumes

```ts
function makePlumes(
  THREE,
  def,
  glowTex
): {
  group: Object3D
  vents: object[]
} | null
```

Defined in: experiments/star-field/engine/bodies/plumes.ts:100

Builds the plume group for a `def.plumes` body: per-vent jet + puff
sprites under one group the caller parents to the body mesh (jets
inherit surface spin, so vents stay fixed over their terrain scars —
Enceladus' geysers track the tiger stripes as the moon rotates).

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `plumes` config + radius scale the vents.

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-glow texture for the sprites.

## Returns

\| \{
`group`: `Object3D`;
`vents`: `object`[];
\}
\| `null`

`{ group, vents }` — null without a glow texture.
