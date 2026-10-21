[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/bootstrap](../README.md) / catalogTextureUrls

```ts
function catalogTextureUrls(defs): Set<string>
```

Defined in: experiments/star-field/engine/bootstrap.ts:38

Collects every texture URL a catalog slice + the skybox needs — all
six body texture slots plus each companion satellite's own photo
(`sat.texture`), so an authored companion map preloads with its
host's and `makeSatellites` never lands the not-in-map fallback for
a real file. Exported so the satellite arm is unit-testable on a
fixture slice — the live catalog's own scan happens inside
`bootstrapStarField` where no fixture can inject a textured sat.

## Parameters

### defs

readonly [`SFBodyDef`](../../types/interfaces/SFBodyDef.md)[]

Catalog entries to scan.

## Returns

`Set`\<`string`\>

The deduplicated URL set (skybox included).
