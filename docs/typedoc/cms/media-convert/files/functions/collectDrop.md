[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/media-convert/files](../README.md) / collectDrop

```ts
function collectDrop(host, dataTransfer): Promise<void>
```

Defined in: cms/media-convert/files.ts:48

Collects a drag-drop payload into the queue — prefers the
`webkitGetAsEntry` path so a dropped folder recursively yields
`{file, rel}` per descendant (preserving the tree the server rebuilds
inside the ZIP); falls back to flat `dataTransfer.files` when entries
aren't available. `isMediaPath` filters out non-media files.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

### dataTransfer

`DataTransfer`

## Returns

`Promise`\<`void`\>
