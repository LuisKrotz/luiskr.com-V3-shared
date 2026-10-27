[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / setRobotsMeta

```ts
function setRobotsMeta(noindex): void
```

Defined in: core/utils/schema.ts:853

Single authority for the document's `<meta name="robots">` — sets
`noindex, nofollow` when `noindex` is true and the index-rich directive
(`index, follow, max-image-preview:large, max-snippet:-1,
max-video-preview:-1`) when false. Indexable routes keep an explicit
meta instead of none because `max-image-preview:large` is the opt-in
Google/Bing require for large image cards and Discover previews —
the absent-meta default only grants standard-size image previews.
Every surface that can resolve to a non-indexable state must route
through this: the not-found route, missing project snapshots, media
deep-link slugs that fail to resolve in the active locale, and draft
projects (data.noindex). A route that serves content MUST be a 200
whose canonical points at itself; anything else is a soft-404 and must
noindex rather than compete with the real page.

## Parameters

### noindex

`boolean`

Whether the current route must be excluded from indexes.

## Returns

`void`
