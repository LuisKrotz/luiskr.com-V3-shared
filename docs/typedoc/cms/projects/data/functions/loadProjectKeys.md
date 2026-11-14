[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/data](../README.md) / loadProjectKeys

```ts
function loadProjectKeys(host): Promise<void>
```

Defined in: cms/projects/data.ts:20

Reads the locale's `projects/` node, sorts the key list, and auto-
selects the first project when none is chosen — then chains into
`loadProjectData` so the editor opens populated. Empty nodes clear
the selection and render the "no projects" state.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `projectKeys`/`currentProject`

## Returns

`Promise`\<`void`\>
