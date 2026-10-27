[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/share-gallery](../README.md) / syncStarShare

```ts
function syncStarShare(to, canonicalUrl, baseGraphOf): Promise<void>
```

Defined in: core/utils/share-gallery.ts:217

Star Field share sync — binds the generic rotation to the star set's
manifest.

## Parameters

### to

[`RouteDescriptor`](../../../router/types/interfaces/RouteDescriptor.md)

resolved route descriptor

### canonicalUrl

`string`

canonical page URL

### baseGraphOf

(`image`) => `Record`\<`string`, `unknown`\>[]

route-graph builder

## Returns

`Promise`\<`void`\>
