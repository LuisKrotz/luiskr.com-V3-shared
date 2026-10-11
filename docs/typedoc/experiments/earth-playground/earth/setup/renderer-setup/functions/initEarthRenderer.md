[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/setup/renderer-setup](../README.md) / initEarthRenderer

```ts
function initEarthRenderer(s, WebGPURenderer): Promise<boolean>;
```

Defined in: experiments/earth-playground/earth/setup/renderer-setup.ts:22

Builds + initializes the renderer on `s`. Probes WebGPU first; a failed
init swaps in a fresh canvas clone (a canvas that failed context
creation is poisoned) and retries with forceWebGL.

## Parameters

### s

[`EarthState`](../../../runtime/state/interfaces/EarthState.md)

### WebGPURenderer

*typeof* `WebGPURenderer`

## Returns

`Promise`\<`boolean`\>
