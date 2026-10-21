[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateProjectSchema

```ts
function generateProjectSchema(project, slug, locale?, mediaSlug?): Record<string, unknown>[]
```

Defined in: core/utils/schema.ts:379

Complete project-page JSON-LD graph — the route base (Org + WebSite

- WebPage + breadcrumb) plus the project Article, a media ItemList
  whose entries deep-link to the emitted /portfolio/<p>/<media> URLs
  (Google's carousel surface), and one VideoObject per section video
  alongside the cover video the Article builder already emits. When a
  `mediaSlug` deep link is active the graph recenters on that media:
  the WebPage gets the media URL + label + its own asset, a third crumb
  level appears, and a dedicated ImageObject/VideoObject leads the
  graph — matching the static media pages the generator emits.

## Parameters

### project

`ProjectSchemaSource` \| `null`

Localized project translation node.

### slug

`string`

Canonical project slug.

### locale?

`string` = `LOCALES.EN`

Page locale (defaults to LOCALES.EN).

### mediaSlug?

`string`

Active media deep-link segment (params.slug).

## Returns

`Record`\<`string`, `unknown`\>[]

JSON-LD entities for updateJsonLd().
