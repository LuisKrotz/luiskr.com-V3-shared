[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateStarBodySchema

```ts
function generateStarBodySchema(options): Record<string, unknown>[]
```

Defined in: core/utils/schema.ts:539

Star-field body JSON-LD graph — the route base (with a Home →
Star Field → body crumb) plus an Article whose `about` Thing carries
the dossier's technical facts as PropertyValue pairs. Mirrors the
build-time body entity so hydrated dossier deep links keep the same
structured data the static dossier pages serve.

## Parameters

### options

`StarBodySchemaOptions`

Body/index URLs, names, tagline, facts, locale.

## Returns

`Record`\<`string`, `unknown`\>[]

JSON-LD entities for updateJsonLd().
