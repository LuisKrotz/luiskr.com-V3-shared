[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / coverRungs

```ts
function coverRungs(stemJpg): CoverRung[]
```

Defined in: core/utils/media/manifest.ts:219

Builds the ascending upgrade ladder for one `covers/<stem>.jpg` URL —
every derivative rung is `mediaKeyExists`-proven so a swapped-in src
can never 404; the original row ('' suffix) is always trusted because
it IS the URL the database points at. Non-.jpg input keeps its stem
whole and resolves to just the passthrough original rung.

## Parameters

### stemJpg

`string`

Emission-encoded media URL ending in .jpg (original).

## Returns

[`CoverRung`](../interfaces/CoverRung.md)[]

Ascending rungs — lowest quality first, highest last.
