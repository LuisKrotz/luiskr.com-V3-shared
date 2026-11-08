[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/media-mosaic](../README.md) / MEDIA\_MOSAIC\_CLASSES

```ts
const MEDIA_MOSAIC_CLASSES: Readonly<{
  MEDIA_MOSAIC: 'media-mosaic'
  MEDIA_MOSAIC_ITEM: 'media-mosaic-item'
  MEDIA_MOSAIC_ITEM_FIGURE: 'media-mosaic-item-figure'
}>
```

Defined in: core/tokens/classes/media-mosaic.ts:13

Frozen media-mosaic class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
