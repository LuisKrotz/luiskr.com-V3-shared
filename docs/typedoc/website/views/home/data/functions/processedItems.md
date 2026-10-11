[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [website/views/home/data](../README.md) / processedItems

```ts
function processedItems(view): PortfolioItem[];
```

Defined in: website/views/home/data.ts:48

Projects list reshaped for the mosaic. The DB stores portfoliolist
as either an array or a keyed object (locale-dependent), so both
shapes normalize to an array; each item gets a computed `featured`
flag driving the 2-column span in the masonry layout.

## Parameters

### view

[`ViewHome`](../../Home/classes/ViewHome.md)

## Returns

[`PortfolioItem`](../../types/interfaces/PortfolioItem.md)[]
