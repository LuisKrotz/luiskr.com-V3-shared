[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeShell

```ts
function makeShell(THREE, def, shellTexture, parent, texMap): Object3D
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:551

Translucent shell layer — Venus's haze atmosphere and the giant
planets' rings get a secondary texture-mapped surface parented to
the main mesh. A ringed body with no authored texture (Uranus,
Neptune) falls back to `ringStripFor`'s seeded dusty bands; radii
default to Saturn's strip but `def.ringInner`/`ringOuter` pin the
honest per-body span. Returns the created Object3D so the caller can
register it as LOD detail.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry.

### shellTexture

`string` \| `undefined`

Shell texture URL — undefined for procedural rings.

### parent

The primary mesh the shell rides on.

#### add

### texMap

`Map`\<`string`, `Texture`\<`unknown`, `TextureEventMap`\>\>

Loaded texture map keyed by URL.

## Returns

`Object3D`
