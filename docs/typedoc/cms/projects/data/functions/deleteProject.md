[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/data](../README.md) / deleteProject

```ts
function deleteProject(host): Promise<void>
```

Defined in: cms/projects/data.ts:125

Deletes the selected project across every locale — loops languages
removing `projects/<key>` nodes (the slug is structural, so a partial
delete would orphan other languages' copies), then reloads the key
list so the selector lands on a valid entry.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `selectedProjectKey`

## Returns

`Promise`\<`void`\>
