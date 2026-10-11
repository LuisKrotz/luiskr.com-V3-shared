[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/runtime/updates](../README.md) / getEarthCameraState

```ts
function getEarthCameraState(s): 
  | {
  position: {
     x: number;
     y: number;
     z: number;
  };
  target: {
     x: number;
     y: number;
     z: number;
  };
}
  | null;
```

Defined in: experiments/earth-playground/earth/runtime/updates.ts:237

Current camera position + orbit target, rounded to 2 decimals — used
to persist/restore the view in the playground's settings snapshot.

## Parameters

### s

[`EarthState`](../../state/interfaces/EarthState.md)

## Returns

  \| \{
  `position`: \{
     `x`: `number`;
     `y`: `number`;
     `z`: `number`;
  \};
  `target`: \{
     `x`: `number`;
     `y`: `number`;
     `z`: `number`;
  \};
\}
  \| `null`
