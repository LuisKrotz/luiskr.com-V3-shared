[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/spiral](../README.md) / makeSpiralGalaxy

```ts
function makeSpiralGalaxy(
   THREE, 
   def, 
   texMap, 
   glowTex, 
   mobile?
): object;
```

Defined in: experiments/star-field/engine/spiral.ts:263

Builds a spiral galaxy node: tilted group containing the photographic
disc (or the seeded procedural spiral when no photo resolved), a soft
sparkle layer of foreground stars for depth, a warm additive core
sprite for the bulge glow, and an invisible sphere carrying
`userData.bodyId` so picking/hover work against a real mesh.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../types/interfaces/SFBodyDef.md)

Catalog galaxy entry (radius = disc radius, tilt = disc
tilt, `spiralDisc.count` = particle target standing in for the true
stellar population — capped by `COUNT_MAX` and quartered on mobile).

### texMap

  \| `Map`\<`string`, `Texture`\<`unknown`, `TextureEventMap`\>\>
  \| `undefined`

Loaded texture map keyed by URL — the body's `texture`
resolves through it; a missing/absent entry keeps the procedural path.

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-gradient glow texture (may be undefined).

### mobile?

`boolean` = `false`

Whether to apply the mobile divisor (small viewport).

## Returns

`object`

`{ group, pick, points, rotor }` — the tilted spin target, the
pickable mesh, the static outer sparkle/cloud Points, and (volumetric
spinning galaxies only) the inner-disc rotor group whose rotation.y
revolves the core around the galactic center without sweeping the
carved heliocentric bubble through the solar system.

### group

```ts
group: Object3D;
```

### pick

```ts
pick: Object3D;
```

### points

```ts
points: Points;
```

### rotor?

```ts
optional rotor?: Object3D<Object3DEventMap>;
```
