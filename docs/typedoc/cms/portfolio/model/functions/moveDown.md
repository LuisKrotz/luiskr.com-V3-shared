[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/model](../README.md) / moveDown

```ts
function moveDown(host, idx): void
```

Defined in: cms/portfolio/model.ts:105

Moves an item one slot later — splice-remove + splice-insert at
`idx + 1`; last-position index returns early.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component holding `items`

### idx

`number`

— current index

## Returns

`void`
