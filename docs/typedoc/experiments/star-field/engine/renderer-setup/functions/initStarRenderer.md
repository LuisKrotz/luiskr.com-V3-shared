[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/renderer-setup](../README.md) / initStarRenderer

```ts
function initStarRenderer(s, WebGPURenderer): Promise<boolean>;
```

Defined in: experiments/star-field/engine/renderer-setup.ts:26

Builds + initializes the renderer on `s`. Returns false when the GPU
path is disallowed so bootstrap can bail into the CSS fallback; a WebGPU
init throw clones the canvas (a canvas that failed context creation is
poisoned) and retries with `forceWebGL`.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state bag.

### WebGPURenderer

*typeof* `WebGPURenderer`

The three/webgpu renderer class.

## Returns

`Promise`\<`boolean`\>

Whether a live renderer was attached.
