[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/loader](../README.md) / dismissDocsLoader

```ts
function dismissDocsLoader(view): void;
```

Defined in: experiments/docs/loader.ts:46

Fades the loader overlay to transparent, then removes it after the CSS
transition completes — removing earlier would clip the fade, removing
never would leave an invisible overlay intercepting pointer events.

## Parameters

### view

[`ViewDocs`](../../Docs/classes/ViewDocs.md)

The ViewDocs element.

## Returns

`void`
