[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/dossier](../README.md) / fetchDossier

```ts
function fetchDossier(
   id, 
   locale?, 
   labels?
): Promise<SFDossier | null>;
```

Defined in: experiments/star-field/star/dossier.ts:166

Fetches one locale dossier JSON — `data/<locale>/<id>.json`, with the
canonical English file as fallback so a not-yet-translated body still
shows real data instead of an empty panel. Registry ids skip the JSON
path entirely: their record comes from the sharded catalogue index
and the panel is synthesized with the locale's field labels.

## Parameters

### id

`string`

Body id matching `public/data/<locale>/<id>.json`, or a
  registry id (`star-NNNNNN`, `exoplanet-NNNNNN`, `dso-NNNNNN`).

### locale?

`string` \| `null`

Active locale code — defaults to the store's current.

### labels?

`Record`\<`string`, `unknown`\> \| `null`

Optional label map for registry synthesis (component's
  merged translations); the English snapshot fills any gaps.

## Returns

`Promise`\<[`SFDossier`](../../../engine/types/interfaces/SFDossier.md) \| `null`\>

The parsed dossier or null on fetch/parse failure.
