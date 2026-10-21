[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/dossier](../README.md) / fetchBodyNames

```ts
function fetchBodyNames(locale?): Promise<SFBodyNames | null>
```

Defined in: experiments/star-field/star/dossier.ts:146

Fetches the locale's body-name table — `data/<locale>/names.json`,
with the canonical English file as fallback. One ~6 KB document per
locale, cached per locale code: the navigator renders localized rows
and the router reads/writes translated body segments without pulling
all 143 dossier files.

## Parameters

### locale?

`string` \| `null`

Active locale code — defaults to the store's current.

## Returns

`Promise`\<[`SFBodyNames`](../interfaces/SFBodyNames.md) \| `null`\>

The names table, or null when both fetches fail.
