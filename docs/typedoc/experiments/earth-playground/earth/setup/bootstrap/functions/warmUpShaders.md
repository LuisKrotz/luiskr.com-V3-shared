[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/setup/bootstrap](../README.md) / warmUpShaders

```ts
function warmUpShaders(renderer, s): Promise<void>;
```

Defined in: experiments/earth-playground/earth/setup/bootstrap.ts:33

Pre-compiles the scene's shader programs so the first visible frame doesn't
hitch on JIT. compileAsync failures (driver hiccups, lost device) are
non-fatal — the renderer recompiles lazily on first draw.

## Parameters

### renderer

`WebGPURenderer`

### s

[`EarthState`](../../../runtime/state/interfaces/EarthState.md)

## Returns

`Promise`\<`void`\>
