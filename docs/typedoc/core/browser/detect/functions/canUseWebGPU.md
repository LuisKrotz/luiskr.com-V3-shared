[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/browser/detect](../README.md) / canUseWebGPU

```ts
function canUseWebGPU(): boolean;
```

Defined in: core/browser/detect.ts:87

True when the engine may expose a usable WebGPU adapter. The check is
`!== false` (not `=== true`) because undefined means "no data" — absence
of the quirk flag must not disable WebGPU for unlisted engines.

## Returns

`boolean`

Whether the WebGPU init path should run.
