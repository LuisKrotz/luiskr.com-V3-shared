[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/data](../README.md) / loadCopy

```ts
function loadCopy(lang, done): void
```

Defined in: website/components/search/route-search/data.ts:155

`loadCopy` — the localized `pages/<loc>/search` copy node via the same
SWR snapshot flow every other page uses. `done` receives the resolved
node (null when the locale copy is absent) so the caller can re-template
— mirroring `loadCatalog`'s callback contract.

## Parameters

### lang

`string`

### done

(`_node`) => `void`

## Returns

`void`
