[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/data](../README.md) / loadAboutData

```ts
function loadAboutData(host): Promise<void>
```

Defined in: cms/about/data.ts:19

Reads the locale's `pages/about` node into `aboutData` — the Gravatar
`?s=` size param is reverse-parsed out of the stored URL so the
preset buttons highlight the saved size instead of the default.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData`/`gravatarSize`

## Returns

`Promise`\<`void`\>
