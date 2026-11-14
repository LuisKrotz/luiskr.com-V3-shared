[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/print](../README.md) / bindSpacePrint

```ts
function bindSpacePrint(host): () => void
```

Defined in: experiments/earth-playground/space/print.tsx:99

Binds the playground's print composition — a `printprepare` listener
that seats the info plate. Returns the unbinder for the view's
teardown.

## Parameters

### host

[`SpacePlayground`](../../../SpacePlayground/classes/SpacePlayground.md)

The live SpacePlayground component.

## Returns

Cleanup that removes the listener.

() => `void`
