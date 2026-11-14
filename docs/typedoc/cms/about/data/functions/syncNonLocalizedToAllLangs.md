[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/data](../README.md) / syncNonLocalizedToAllLangs

```ts
function syncNonLocalizedToAllLangs(host): Promise<void>
```

Defined in: cms/about/data.ts:106

Propagates the non-localized fields (profile picture, mentions title,
mention items) to every other locale — each target's node is read
first so localized `title`/`col1`/`col2` survive the merge.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding the source `aboutData`

## Returns

`Promise`\<`void`\>
