[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/schema](../README.md) / emitStarIndexJsonLd

```ts
function emitStarIndexJsonLd(c): void
```

Defined in: experiments/star-field/star/schema.ts:123

Emits the index graph — route base + authored-body ItemList +
registry DataCatalog. The item names prefer the loaded locale table
and fall back to the authored catalog names; the manifest fetch is
the registry's own lazy promise so the graph arrives whenever the
catalog data does, at zero extra network cost once cached.

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The view.

## Returns

`void`
