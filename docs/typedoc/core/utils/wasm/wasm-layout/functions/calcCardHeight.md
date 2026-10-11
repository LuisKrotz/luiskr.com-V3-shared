[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-layout](../README.md) / calcCardHeight

```ts
function calcCardHeight(
   colWidth, 
   aspectRatio, 
   padding?
): number;
```

Defined in: core/utils/wasm/wasm-layout.ts:81

Card height for a grid item: column width divided by aspect ratio, plus
padding. A missing/zero ratio falls back to 16:9 so unsized CMS rows
can't produce NaN or zero-height cards.

## Parameters

### colWidth

`number`

The column's width in px.

### aspectRatio

`number`

width/height of the media.

### padding?

`number` = `0`

Extra vertical padding in px.

## Returns

`number`

Card height in px.
