[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/shared](../README.md) / vnoise

```ts
function vnoise(x, y, z): number
```

Defined in: experiments/star-field/engine/bodies/procedural/shared.ts:132

Cheap value-noise 3d for vertex displacement — a three-octave hash of
detuned sines (fundamental 0.55 + octave 0.3 + octave 0.15, wavenumber
ratios ~2.7 and ~4.4) approximating band-limited fbm without a real
gradient-noise import. Output stays in ≈[-1,1]; callers scale by their
crumple amplitude so rock/moon silhouettes dimple deterministically.

## Parameters

### x

`number`

Sample x.

### y

`number`

Sample y.

### z

`number`

Sample z.

## Returns

`number`

Signed noise value ≈[-1,1].
