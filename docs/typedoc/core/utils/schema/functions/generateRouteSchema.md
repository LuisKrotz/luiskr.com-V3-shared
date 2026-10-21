[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateRouteSchema

```ts
function generateRouteSchema(options): Record<string, unknown>[]
```

Defined in: core/utils/schema.ts:332

Base per-route JSON-LD graph — Organization + WebSite (localized
inLanguage) + WebPage + optional BreadcrumbList. Emitted on every
navigation so crawlers never see a stale homepage graph on deep
links; views that own richer entities (project Article, docs
TechArticle) replace or extend this graph once their data resolves.

## Parameters

### options

`RouteSchemaOptions`

Route URL/name/description/locale/image/breadcrumb.

## Returns

`Record`\<`string`, `unknown`\>[]

JSON-LD entities for updateJsonLd().
