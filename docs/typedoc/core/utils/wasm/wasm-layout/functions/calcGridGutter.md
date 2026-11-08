[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-layout](../README.md) / calcGridGutter

```ts
function calcGridGutter(vw): number
```

Defined in: core/utils/wasm/wasm-layout.ts:275

Content-grid gutter per viewport breakpoint — the GRID_GAP step table
($gap-* / %MAXAREA contract) resolved by the same floor lookup. JS
layout math that must match the CSS grid (mosaic wall estimates) uses
this instead of the smaller RESPONSIVE_PADDING ladder.

## Parameters

### vw

`number`

Viewport width in px.

## Returns

`number`

Gutter px on each side of the content column.
