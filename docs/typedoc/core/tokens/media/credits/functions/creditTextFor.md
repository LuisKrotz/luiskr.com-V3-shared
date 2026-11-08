[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/credits](../README.md) / creditTextFor

```ts
function creditTextFor(credit, subject): string
```

Defined in: core/tokens/media/credits.ts:82

Expands a registry credit into structured creditText — source, original
host, licence and current usage (the dossier page it appears on). Credits
without a source record pass through verbatim so new data never loses its
credit while the map is being extended.

## Parameters

### credit

`string`

Raw registry credit string (e.g. 'NASA').

### subject

`string`

Display name of the body the asset illustrates.

## Returns

`string`

Structured creditText, or the raw credit when no source record exists.
