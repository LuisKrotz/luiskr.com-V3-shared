[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateStarBodySchema

```ts
function generateStarBodySchema(options): Record<string, unknown>[]
```

Defined in: core/utils/schema.ts:739

Star-field body JSON-LD graph — the route base (with a Home →
Star Field → body crumb) plus an Article whose `about` Thing carries
the dossier's technical facts as PropertyValue pairs. The credited
image/video gallery is emitted as media entities and the first image
anchors the WebPage and Article. Mirrors the build-time body entity so
hydrated dossier deep links keep the same graph the static page serves.

## Parameters

### options

`StarBodySchemaOptions`

Body/index URLs, names, tagline, facts, media, locale.

## Returns

`Record`\<`string`, `unknown`\>[]

JSON-LD entities for updateJsonLd().
