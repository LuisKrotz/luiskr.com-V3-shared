[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateStarIndexSchema

```ts
function generateStarIndexSchema(options): Record<string, unknown>[]
```

Defined in: core/utils/schema.ts:463

Star-field index JSON-LD graph — the route base plus an ItemList that
enumerates every authored body deep link and a DataCatalog whose
Datasets point at the registry manifest, shard JSONs and the packed
binary, so the canvas star cloud's underlying 139,563-record catalog
is enumerable without WebGL. Mirrors the build-time entities emitted
by build-locale-pages.mjs for post-hydration parity.

## Parameters

### options

`StarIndexSchemaOptions`

Index URL/name/locale, body items, prepared datasets.

## Returns

`Record`\<`string`, `unknown`\>[]

JSON-LD entities for updateJsonLd().
