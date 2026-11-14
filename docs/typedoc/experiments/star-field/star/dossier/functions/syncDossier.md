[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/dossier](../README.md) / syncDossier

```ts
function syncDossier(c, id): SFDossier | null
```

Defined in: experiments/star-field/star/dossier.ts:371

Synchronous read of the dossier cache — the promise bag `_cache` maps
to resolved values only through `.then`, which is too late for the
synchronous beforeprint walk. `loadDossier`'s own resolved value is
mirrored here so a print fired while a body is selected can compose
its plate without a fetch at all.

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

### id

`string`

Body id to look up.

## Returns

[`SFDossier`](../../../engine/types/interfaces/SFDossier.md) \| `null`

The resolved dossier, or null when nothing is loaded for it.
