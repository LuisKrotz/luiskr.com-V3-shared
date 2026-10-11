[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/types](../README.md) / SFDossierMeta

Defined in: experiments/star-field/engine/types.ts:189

Provenance signature — when the dossier's source data was acquired
and when this locale's translation was produced (ISO dates), plus
the reference URLs the facts were paraphrased from.

## Properties

### acquired

```ts
acquired: string;
```

Defined in: experiments/star-field/engine/types.ts:191

ISO date the source data/media was downloaded.

***

### translated

```ts
translated: string;
```

Defined in: experiments/star-field/engine/types.ts:193

ISO date this locale's text was translated/written.

***

### locale

```ts
locale: string;
```

Defined in: experiments/star-field/engine/types.ts:195

The locale this file serves (`en` for the canonical file).

***

### refs?

```ts
optional refs?: string[];
```

Defined in: experiments/star-field/engine/types.ts:197

Reference URLs the dossier paraphrases (NASA/JPL/Trek/SVS/ESO).
