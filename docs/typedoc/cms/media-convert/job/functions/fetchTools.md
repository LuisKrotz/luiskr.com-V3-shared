[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/job](../README.md) / fetchTools

```ts
function fetchTools(host): Promise<void>;
```

Defined in: cms/media-convert/job.ts:216

GETs the dev server's toolchain report (detected ffmpeg/ImageMagick/
cjpeg + the per-platform install plan) and stores it on the host — the
render layer turns it into the guided-setup panel. A missing/failed
endpoint just hides the panel (older dev server, preview off).

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

The CmsMediaConverter element.

## Returns

`Promise`\<`void`\>
