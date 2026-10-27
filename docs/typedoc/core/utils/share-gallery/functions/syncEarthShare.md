[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/share-gallery](../README.md) / syncEarthShare

```ts
function syncEarthShare(to, canonicalUrl, baseGraphOf): Promise<void>
```

Defined in: core/utils/share-gallery.ts:204

Earth Playground share sync — binds the generic rotation to the earth
set's manifest.

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
