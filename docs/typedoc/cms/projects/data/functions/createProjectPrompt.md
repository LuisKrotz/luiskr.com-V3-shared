[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/data](../README.md) / createProjectPrompt

```ts
function createProjectPrompt(host): void
```

Defined in: cms/projects/data.ts:94

Creates a new project locally (not yet persisted) — prompts for the
slug, sanitizes it to `[a-z0-9_-]`, seeds the model with a title,
folder prefix, default cover, and empty sections, then selects it.
The record lands in Firebase only on Save.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `projectKeys`/`currentProject`

## Returns

`void`
