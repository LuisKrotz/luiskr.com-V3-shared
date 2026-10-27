[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/schema](../README.md) / emitStarBodyJsonLd

```ts
function emitStarBodyJsonLd(c, id, dossier): void
```

Defined in: experiments/star-field/star/schema.ts:162

Emits the body dossier graph — route base + Article/Thing — once the
dossier JSON has resolved for the selected body. The canonical URL
always carries the raw catalog id (the emitted static page), never
the localized slug the address bar may show.

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The view.

### id

`string`

The selected catalog/registry id.

### dossier

[`SFDossier`](../../../engine/types/interfaces/SFDossier.md) \| `null`

The resolved dossier payload (may be null on failure).

## Returns

`void`
