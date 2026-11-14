[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/model](../README.md) / moveUp

```ts
function moveUp(host, idx): void
```

Defined in: cms/portfolio/model.ts:91

Moves an item one slot earlier — splice-remove + splice-insert keeps
identity so the re-render lands on the same object in a new position.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component holding `items`

### idx

`number`

— current index; 0 returns early (already first)

## Returns

`void`
