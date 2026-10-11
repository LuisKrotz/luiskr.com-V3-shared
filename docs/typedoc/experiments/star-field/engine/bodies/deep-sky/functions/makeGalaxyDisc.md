[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/deep-sky](../README.md) / makeGalaxyDisc

```ts
function makeGalaxyDisc(
   THREE, 
   def, 
   texMap, 
   glowTex, 
   localTilt?
): Mesh;
```

Defined in: experiments/star-field/engine/bodies/deep-sky.ts:94

Tilted photographic disc for an external galaxy — the real image on a
plane lying in the body's disc plane, edge-feathered so it melts into
the skybox. The group's tilt (`def.tilt`) still applies; the spin
field rotates the photo in-plane, reading as the galaxy's true
rotation. Non-photo defs keep the soft glow disc.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog galaxy entry.

### texMap

`TexMap`

Loaded texture map keyed by URL.

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-gradient glow texture (may be undefined).

### localTilt?

`number`

Extra tilt in radians — callers whose parent group
already applies `def.tilt` (the spiral galaxy node) pass 0 so the
disc only lays flat into the group's local XZ plane.

## Returns

`Mesh`
