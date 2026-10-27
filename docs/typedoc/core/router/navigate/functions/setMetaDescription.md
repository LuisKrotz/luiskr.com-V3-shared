[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/navigate](../README.md) / setMetaDescription

```ts
function setMetaDescription(text): void
```

Defined in: core/router/navigate.ts:65

Pushes a resolved description into every description-bearing head meta —
description, og:description, twitter:description, DC.Description and
og:image:alt (the share card's alt text mirrors the snippet). Views call
this after their localized content node resolves, since route parsing
runs before the per-locale data chunks land.

## Parameters

### text

`string`

## Returns

`void`
