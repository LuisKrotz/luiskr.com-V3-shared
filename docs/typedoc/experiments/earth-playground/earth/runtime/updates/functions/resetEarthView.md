[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/runtime/updates](../README.md) / resetEarthView

```ts
function resetEarthView(s): void;
```

Defined in: experiments/earth-playground/earth/runtime/updates.ts:255

Restore the default framing: OrbitControls.reset() replays saveState()
(captured at bootstrap), then fov/position/target are pinned to
DEFAULT_SP_GUI.CAMERA in case the saved state drifted.

## Parameters

### s

[`EarthState`](../../state/interfaces/EarthState.md)

## Returns

`void`
