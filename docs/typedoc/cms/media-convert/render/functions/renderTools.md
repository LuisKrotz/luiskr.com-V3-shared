[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [cms/media-convert/render](../README.md) / renderTools

```ts
function renderTools(host): 
  | Element
  | null;
```

Defined in: cms/media-convert/render.tsx:214

Renders the guided toolchain-setup panel — hidden while the report is
unfetched or every tool is present. Required tools (ffmpeg/ffprobe)
block conversion; optional ones (ImageMagick, cjpeg) fall back to
ffmpeg encoders, so their state badge reads optional rather than ✗.
The install plan shows the detected manager's copyable commands; the
Install button only appears when the plan can run without a root shell
(brew/winget/choco) — sudo managers get manual commands instead.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

— the host component

## Returns

  \| [`Element`](../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
  \| `null`
