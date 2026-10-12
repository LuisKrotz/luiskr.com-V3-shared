[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / updateGalaxyClouds

```ts
function updateGalaxyClouds(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:176

Volumetric galaxy cloud fade — the Milky Way's particle disc is
viewed from inside. Without distance attenuation the hundreds of
thousands of additive points stack into an opaque glowing ball that
swallows the view; fade them down while the camera is embedded, and
ramp up as the camera pulls back far enough to read the disc as a
whole. Only volumetric clouds carry the marker.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
