[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/catalog](../README.md) / sfCatalogByGroup

```ts
function sfCatalogByGroup(): Map<string, SFBodyDef[]>;
```

Defined in: experiments/star-field/engine/catalog.ts:1567

Groups catalog entries by SF_GROUPS key — the navigator renders one
section per key with the body's display name on a focusable button.

## Returns

`Map`\<`string`, [`SFBodyDef`](../../types/interfaces/SFBodyDef.md)[]\>

group key → defs in catalog order
