[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/scene](../README.md) / setupStarCamera

```ts
function setupStarCamera(
   s, 
   THREE, 
   OrbitControls
): void;
```

Defined in: experiments/star-field/engine/scene.ts:57

Builds the camera + orbit-controls rig at the home/overview pose.
Damping is enabled so drag/momentum reads smooth; the controls target
doubles as the fly-to destination vector.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

### THREE

`__module`

The three.js module.

### OrbitControls

*typeof* `OrbitControls`

The controls class.

## Returns

`void`
