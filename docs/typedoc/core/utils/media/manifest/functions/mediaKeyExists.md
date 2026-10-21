[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/manifest](../README.md) / mediaKeyExists

```ts
function mediaKeyExists(url): boolean
```

Defined in: core/utils/media/manifest.ts:62

Whether the manifest lists the CDN object behind `url`. Absolute URLs
get the CDN_BASE prefix stripped to their bucket key; non-CDN URLs
(gravatars, data URIs) always report false — they have no siblings.

## Parameters

### url

`string`

Full media URL or a raw bucket key.

## Returns

`boolean`
