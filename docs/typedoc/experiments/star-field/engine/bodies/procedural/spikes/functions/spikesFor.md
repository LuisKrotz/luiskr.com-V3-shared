[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/spikes](../README.md) / spikesFor

```ts
function spikesFor(THREE, def): Texture<unknown, TextureEventMap> | undefined
```

Defined in: experiments/star-field/engine/bodies/procedural/spikes.ts:70

Generates a seeded diffraction-spike sprite — six primary rays (the
hexagonal cross of a segmented mirror) plus a fainter, shorter second
cross rotated a quarter-turn offset so the burst reads optical, not
drawn. A tight center knot anchors the burst on the photosphere.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../../types/interfaces/SFBodyDef.md)

Star def (color = spike tint, id = seed).

## Returns

`Texture`\<`unknown`, `TextureEventMap`\> \| `undefined`

A CanvasTexture for the spike sprite map, or undefined.
