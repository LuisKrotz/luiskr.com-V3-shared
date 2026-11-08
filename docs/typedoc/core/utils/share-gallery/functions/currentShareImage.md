[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/share-gallery](../README.md) / currentShareImage

```ts
function currentShareImage(): string | null
```

Defined in: core/utils/share-gallery.ts:258

Currently bound share capture — the og:image pick the last rotation
applied (null when no rotation is active). Rich-route emitters read
it so their own JSON-LD `screenshot` matches the card metas.

## Returns

`string` \| `null`

the applied capture URL, or null
