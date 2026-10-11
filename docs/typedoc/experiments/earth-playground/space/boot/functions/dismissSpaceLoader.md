[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/boot](../README.md) / dismissSpaceLoader

```ts
function dismissSpaceLoader(c): void;
```

Defined in: experiments/earth-playground/space/boot.ts:101

Fades the loader overlay to transparent, then removes it after the CSS
transition completes — removing earlier would clip the fade, removing
never would leave an invisible overlay intercepting pointer events.

## Parameters

### c

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The SpacePlayground element.

## Returns

`void`
