[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/data](../README.md) / saveAboutData

```ts
function saveAboutData(host): Promise<void>
```

Defined in: cms/about/data.ts:52

Writes the whole `aboutData` model back to `pages/about` — the editor
owns the complete node shape so a single `set` replaces it atomically.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData`/`selectedLang`

## Returns

`Promise`\<`void`\>
