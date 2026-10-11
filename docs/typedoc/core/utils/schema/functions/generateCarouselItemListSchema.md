[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generateCarouselItemListSchema

```ts
function generateCarouselItemListSchema(items?, baseUrl?): Record<string, unknown> | null;
```

Defined in: core/utils/schema.ts:74

Generates an ItemList matching Google Carousel rich results guidelines —
`position` is 1-based per the spec, and `image` is only emitted when the
item carries a src (an absent property beats an empty one for parsers).

## Parameters

### items?

`CarouselSchemaItem`[] = `[]`

### baseUrl?

`string` = `NET_STRINGS.SITE_URL`

## Returns

`Record`\<`string`, `unknown`\> \| `null`

ItemList entity, or null when there is nothing to list.
