[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/navigate](../README.md) / buildRouteJsonLd

```ts
function buildRouteJsonLd(to, canonicalOverride?, description?): Record<string, unknown>[]
```

Defined in: core/router/navigate.ts:137

Base JSON-LD entities for a resolved route — exported so views whose
localized descriptions resolve post-navigation (home/about) can
re-emit the graph with the real description instead of the parse-time
fallback, and so rich views can append entities to the same base.
`canonicalOverride` lets syncDocumentHead pass the URL it already
computed for the <link canonical> so both stay identical.

## Parameters

### to

[`RouteDescriptor`](../../types/interfaces/RouteDescriptor.md)

Resolved route descriptor.

### canonicalOverride?

`string`

Canonical URL; recomputed from `to` when absent.

### description?

`string`

Description override (post-fetch localized text).

## Returns

`Record`\<`string`, `unknown`\>[]

JSON-LD entity array for updateJsonLd().
