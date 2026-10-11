[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/screenshot](../README.md) / takeStarScreenshot

```ts
function takeStarScreenshot(s): Promise<void>;
```

Defined in: experiments/star-field/engine/screenshot.ts:23

Renders one frame and downloads the canvas as PNG. `toDataURL` throws
on tainted canvases and returns 'data:,' on oversized ones — both fall
back to `toBlob` + an object URL.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

## Returns

`Promise`\<`void`\>
