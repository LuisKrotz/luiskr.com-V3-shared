[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/share-gallery](../README.md) / cancelShare

```ts
function cancelShare(): void
```

Defined in: core/utils/share-gallery.ts:229

Cancels the share surface — bumps the sync sequence so an in-flight
manifest fetch can never land on a newer route, and restores the
default card image only when a rotation actually applied one (a direct
landing on a media page keeps its emitted og:image).

## Returns

`void`
