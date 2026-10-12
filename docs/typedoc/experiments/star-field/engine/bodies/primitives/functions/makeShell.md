[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeShell

```ts
function makeShell(THREE, def, shellTexture, parent, texMap): Object3D
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:377

Translucent shell layer — Venus's haze atmosphere and Saturn's ring get
a secondary texture-mapped surface parented to the main mesh. Returns
the created Object3D so the caller can register it as LOD detail.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry.

### shellTexture

`string`

Shell texture URL — narrowed non-null by the caller's
`if (def.shellTexture)` guard.

### parent

The primary mesh the shell rides on.

#### add

### texMap

`Map`\<`string`, `Texture`\<`unknown`, `TextureEventMap`\>\>

Loaded texture map keyed by URL.

## Returns

`Object3D`
