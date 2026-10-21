[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / updateLod

```ts
function updateLod(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:63

Detail level-of-detail — toggles each node's secondary geometry
(shells, satellite pivots, the near-field star group) by camera
distance so remote bodies draw as one primitive. Orbit radius counts
toward `size` so a body's ring stays visible while the camera is
still inside it. Galactic stars carry a `farGlyph` point glow that
swaps with the near-field group — point glyph at chart distances,
real photosphere on approach — the mirror of the solar collapse.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
