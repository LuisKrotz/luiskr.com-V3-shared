[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/data](../README.md) / loadProjectData

```ts
function loadProjectData(host): Promise<void>
```

Defined in: cms/projects/data.ts:49

Reads one project's full record — normalizes `sections` (array or
keyed map) through `normalizeSection` into the `[texts, media]` tuple
shape the renderer and event writers both index into. Missing
`cover`/`seo` nodes get token defaults so the form never reads holes.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `selectedProjectKey`

## Returns

`Promise`\<`void`\>
