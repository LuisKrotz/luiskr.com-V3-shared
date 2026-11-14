[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/media-convert/CmsMediaConverter](../README.md) / IS\_LOCALHOST

```ts
const IS_LOCALHOST: boolean
```

Defined in: cms/media-convert/CmsMediaConverter.tsx:55

Dev-server gate — the `/api/media-convert` routes only exist on vite's
dev/preview server, so on the deployed site this regex fails and the
component renders its "localhost only" notice instead of the tool.
