[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/share-gallery](../README.md) / resetShareGallery

```ts
function resetShareGallery(): void
```

Defined in: core/utils/share-gallery.ts:244

Test/state reset — clears the manifest caches, pick state and sequence
guard so suites exercise loadShareImages branches in isolation without
jest.resetModules (which would discard recorded istanbul hits).

## Returns

`void`
