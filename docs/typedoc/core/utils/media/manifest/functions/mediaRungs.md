[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / mediaRungs

```ts
function mediaRungs(stem): CoverRung[]
```

Defined in: core/utils/media/manifest.ts:240

Fully manifest-gated quality ladder for an extensionless media stem
(`folder/pic` — the figure/video grammar where derived files are
`stem-mozjpg-<quality>.jpg`). Unlike coverRungs even the raw
`{stem}.jpg` is proven by mediaKeyExists — the pipeline emits only
suffixed tiers, so an untrusted passthrough could 404. Returns [] when
the manifest is absent or proves nothing; callers then fall back to
the historic "the request IS the check" probe.

## Parameters

### stem

`string`

Emission-encoded media URL without an extension.

## Returns

[`CoverRung`](../interfaces/CoverRung.md)[]

Ascending proven rungs — lowest quality first, highest last.
