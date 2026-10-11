[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/frame](../README.md) / rotateStarCamera

```ts
function rotateStarCamera(
   s, 
   dAzimuth, 
   dPolar
): void;
```

Defined in: experiments/star-field/engine/frame.ts:122

Arrow-key orbit — rotates the camera around the controls target in
screen-intuitive steps: left/right change azimuth, up/down change
polar (clamped off the poles so the view can never flip over the top).
Pure spherical math on the offset vector — no three types needed —
and any running fly-to is cancelled so manual control always wins.
The offset is converted to spherical coordinates (r, θ azimuth in the
XZ plane, φ polar from +Y), the deltas are applied, then converted
back to Cartesian around the target.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state (camera + controls required; no-op before boot).

### dAzimuth

`number`

Azimuth delta in radians (left = -, right = +).

### dPolar

`number`

Polar delta in radians (down = -, up = +).

## Returns

`void`
