[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-layout](../README.md) / calcColsForWidth

```ts
function calcColsForWidth(vw): number;
```

Defined in: core/utils/wasm/wasm-layout.ts:232

Home-mosaic column count for a viewport width — the legacy stepped
table (1–7 columns); kept alongside MOSAIC_COLS which callers should
prefer for new layout work.

## Parameters

### vw

`number`

Viewport width in px.

## Returns

`number`

Column count 1–7.
