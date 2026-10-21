[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateProjectArticleSchema

```ts
function generateProjectArticleSchema(project, slug, locale?): Record<string, unknown>[]
```

Defined in: core/utils/schema.ts:233

Generates an Article and cover VideoObject graph for a project detail
page. The Article `image` carries the real CDN asset — the full
uncompressed mozjpg for image covers, the video poster for video
covers — since the hypothetical aspect-ratio variants (-16x9/-4x3/
-1x1) never existed on the bucket and 404'd for crawlers.

## Parameters

### project

`ProjectSchemaSource` \| `null`

Project translation data

### slug

`string`

Project URL slug

### locale?

`string` = `LOCALES.EN`

Page locale (defaults to LOCALES.EN)

## Returns

`Record`\<`string`, `unknown`\>[]

Array of Schema.org entities
