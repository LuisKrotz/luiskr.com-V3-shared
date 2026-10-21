[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/comet](../README.md) / makeComet

```ts
function makeComet(THREE, def, texMap, glowTex): object
```

Defined in: experiments/star-field/engine/bodies/comet.ts:239

Builds the comet composite: an irregular, nearly-black nucleus (the
real Halley albedo is ~0.04 — one of the darkest known bodies), a
soft additive coma sprite hugging it, and the ion + dust particle
tails. The nucleus mesh becomes the node's `mesh`/`spinner` so it
tumbles normally; coma rides inside it (a symmetric billboard is
indifferent to spin); the tails mount on `center` where local +x is
permanently anti-sunward. Each tail is two particle layers — a tight
bright core stream and a wide dim sheath — so the column reads as a
volume of gas with a dense spine, not a painted band.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `radius` sizes the nucleus AND every tail
dimension (length, spread, grain size all scale off it);
`ecc`/`orbit` drive the periapsis→apoapsis gating in updateFx.

### texMap

`Map`\<`string`, `Texture`\<`unknown`, `TextureEventMap`\>\>

Loaded texture map (a comet with a real nucleus map
uses it; Halley falls back to the seeded dark-ice surface).

### glowTex

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

Shared radial-glow texture — used for the coma sprite
AND as each tail particle's soft round map.

## Returns

`object`

`{ mesh, coma, ion, dust, ionGas, dustGas }` — the pickable
nucleus group, the coma sprite, and the four `Points` tail layers
the caller mounts on `center` and records on `node.comet`
(ion/ionGas = core+sheath of the ion stream; dust/dustGas likewise).

### mesh

```ts
mesh: Object3D
```

### coma

```ts
coma: Object3D
```

### ion

```ts
ion: Object3D
```

### dust

```ts
dust: Object3D
```

### ionGas

```ts
ionGas: Object3D
```

### dustGas

```ts
dustGas: Object3D
```
