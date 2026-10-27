[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/router/navigate](../README.md) / syncDocumentHead

```ts
function syncDocumentHead(to): void
```

Defined in: core/router/navigate.ts:87

document.title + canonical <link> sync for the resolved route — extended
to the social/url mirrors (og:title, twitter:title, DC.Title, og:url,
twitter:url) so every head tag agrees with the active route instead of
keeping the homepage values the shell booted with. `meta.canonical`
normalizes alias URLs (e.g. /portfolio/brazilian-leather → /portfolio/cicb);
`meta.description` feeds the description metas via setMetaDescription.

## Parameters

### to

[`RouteDescriptor`](../../types/interfaces/RouteDescriptor.md)

## Returns

`void`
