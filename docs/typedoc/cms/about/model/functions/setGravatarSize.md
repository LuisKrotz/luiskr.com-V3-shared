[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/model](../README.md) / setGravatarSize

```ts
function setGravatarSize(host, size): void
```

Defined in: cms/about/model.ts:15

Applies a Gravatar size — strips any existing `?s=`/`&s=` param from
the stored URL (and a bare trailing `?` it would leave behind), then
re-appends the new size so the stored URL always carries exactly one.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData.profilePicture`

### size

`number`

— pixel edge Gravatar should return (drives `?s=N`)

## Returns

`void`
