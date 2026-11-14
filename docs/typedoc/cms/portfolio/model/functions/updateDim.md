[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/model](../README.md) / updateDim

```ts
function updateDim(item, prop, idx, val): void
```

Defined in: cms/portfolio/model.ts:36

Writes one dimension cell into an item's `[desktop, mobile]` pair —
legacy items missing the array get it created with the sibling slot
defaulted to the matching token (mobile width or desktop width).

## Parameters

### item

[`PortfolioItem`](../../types/interfaces/PortfolioItem.md)

— the portfolio item to mutate

### prop

`string`

— `'width'` or `'height'`

### idx

`number`

— 0 = desktop slot, 1 = mobile slot

### val

`string`

— the input's raw string value

## Returns

`void`
