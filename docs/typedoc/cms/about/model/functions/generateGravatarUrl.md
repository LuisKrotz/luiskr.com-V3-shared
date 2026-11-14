[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/model](../README.md) / generateGravatarUrl

```ts
function generateGravatarUrl(host): Promise<void>
```

Defined in: cms/about/model.ts:28

Builds a Gravatar URL from the email field — SHA-256 hashes the
trimmed/lowercased address (Gravatar's lookup key) and composes it
with the current size so the preview matches what the site serves.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `emailInput`/`gravatarSize`

## Returns

`Promise`\<`void`\>
