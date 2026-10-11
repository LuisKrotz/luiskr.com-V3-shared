[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/boot](../README.md) / dismissStarLoader

```ts
function dismissStarLoader(c): void;
```

Defined in: experiments/star-field/star/boot.ts:129

Fades the loader overlay to transparent then removes it after the CSS
transition completes — removing earlier would clip the fade, removing
never would leave an invisible overlay intercepting pointer events.

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The StarField element.

## Returns

`void`
