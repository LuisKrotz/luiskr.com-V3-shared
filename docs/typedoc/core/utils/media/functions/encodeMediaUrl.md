[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/media](../README.md) / encodeMediaUrl

```ts
function encodeMediaUrl(url): string
```

Defined in: core/utils/media.ts:116

Percent-encodes a media URL for attribute/markup emission — bucket keys
can carry literal spaces ('brazilian leather/…', '…PARIS FASHION-WEEK…')
and non-ASCII ('garçonne'), which the bucket serves fine but which break
<source srcset> candidates (its grammar splits on whitespace) and
RFC-3986-strict contexts (sitemap locs, JSON-LD image/contentUrl).
Idempotent: already-encoded input decodes first, so a %20 never
becomes %2520 (encodeURI escapes '%' itself). Malformed escapes make
decodeURI throw — the catch emits the input with bare '%' → %25.

## Parameters

### url

`string`

Raw or encoded media URL (may contain spaces/non-ASCII).

## Returns

`string`

The emission-safe URL ('' stays '').
