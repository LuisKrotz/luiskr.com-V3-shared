[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/playground/share](../README.md) / EARTH\_SHARE

```ts
const EARTH_SHARE: Readonly<{
  PREFIX: 'experiments/earth-playground/share/'
  MANIFEST_URL: '/meta/earth-playground-share.json'
  IMAGE_EXTS: readonly string[]
}>
```

Defined in: core/tokens/playground/share.ts:20

Earth Playground share-capture tokens. Sole declaration site — consumers
(build generators, runtime share rotation) import members from this
frozen map rather than re-declaring the literals (zero-hardcoding rule).
