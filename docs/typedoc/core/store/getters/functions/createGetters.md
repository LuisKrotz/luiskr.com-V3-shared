[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/store/getters](../README.md) / createGetters

```ts
function createGetters(store): StoreGetters;
```

Defined in: core/store/getters.ts:18

Builds the getter map bound to `store`. Each entry is a thin arrow over
`store.state` — evaluated lazily per call so subscribers always read the
post-mutation snapshot, never a captured copy.

## Parameters

### store

[`Store`](../../classes/Store.md)

The Store instance to read from.

## Returns

[`StoreGetters`](../../state/interfaces/StoreGetters.md)

The StoreGetters facade.
