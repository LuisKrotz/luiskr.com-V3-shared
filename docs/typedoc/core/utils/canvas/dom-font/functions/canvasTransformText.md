[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/dom-font](../README.md) / canvasTransformText

```ts
function canvasTransformText(text, transform): string;
```

Defined in: core/utils/canvas/dom-font.ts:84

Applies a computed `text-transform` to raw text content. Canvas
`fillText` draws strings verbatim — a title styled
`text-transform: uppercase` would rasterize in its source casing.
`capitalize` uppercases the first letter after each word boundary.

## Parameters

### text

`string`

Raw textContent.

### transform

`string`

The computed text-transform keyword.

## Returns

`string`

The text as the DOM actually renders it.
