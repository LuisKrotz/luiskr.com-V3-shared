[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/data](../README.md) / saveProjectData

```ts
function saveProjectData(host): Promise<void>
```

Defined in: cms/projects/data.ts:158

Writes the current project back to its locale node — the whole record
(title/folder/seo/cover/sections + the publication stamps) is replaced
atomically since the editor owns the complete shape. `date` passes
through untouched (it is the git-derived publication stamp, not an
editable field) — a record that lacks one (CMS-created project, never
committed to git) gets its first save stamped as the publication
moment; `modified` is stamped fresh on every save so
dateModified/<lastmod> consumers always see the last real edit.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `currentProject`

## Returns

`Promise`\<`void`\>
