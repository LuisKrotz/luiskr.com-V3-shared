[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateEarthPlaygroundSchema

```ts
function generateEarthPlaygroundSchema(options): Record<string, unknown>[]
```

Defined in: core/utils/schema.ts:392

Earth Playground JSON-LD graph — the route base plus a WebApplication
entity whose `featureList` enumerates the whole localized control
surface (the panel is a WebGL canvas at runtime, so the schema is the
crawler-legible form of it). Mirrors the build-time entity emitted by
build-locale-pages.mjs so the post-hydration graph keeps parity with
the served document.

## Parameters

### options

`EarthPlaygroundSchemaOptions`

Route URL/name/description/locale + localized feature labels.

## Returns

`Record`\<`string`, `unknown`\>[]

JSON-LD entities for updateJsonLd().
