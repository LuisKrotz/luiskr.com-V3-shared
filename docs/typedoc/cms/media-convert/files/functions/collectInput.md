[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/media-convert/files](../README.md) / collectInput

```ts
function collectInput(host, input): void
```

Defined in: cms/media-convert/files.ts:81

Collects a `<input type=file>` selection — `webkitRelativePath`
preserves subfolder structure when the picker was given a directory;
otherwise the bare filename is the rel path. Same `isMediaPath` filter.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

— the host component whose `queue` receives the items

### input

`HTMLInputElement`

— the file input element that fired change

## Returns

`void`
