[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/print](../README.md) / bindPrintDossiers

```ts
function bindPrintDossiers(host): () => void
```

Defined in: experiments/star-field/star/print.tsx:514

Binds the chart's print composition — a `printprepare` listener that
prints the whole catalog as a book (contents leaf, one section cover
per region group, a dossier sheet per body, the deep-catalog part's
cover + index), or the selected body as a one-sheet excerpt under
its group's cover. Returns the unbinder for the view's teardown.

## Parameters

### host

[`StarField`](../../../StarField/classes/StarField.md)

The live StarField component.

## Returns

Cleanup that removes the listener.

() => `void`
