[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/data](../README.md) / applyPictureToAllLangs

```ts
function applyPictureToAllLangs(host): Promise<void>
```

Defined in: cms/about/data.ts:73

Propagates just the `profilePicture` URL (already carrying the chosen
`?s=` size) to every other locale's about node — the narrow sync for
"same face everywhere" without touching localized bio text.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData.profilePicture`

## Returns

`Promise`\<`void`\>
