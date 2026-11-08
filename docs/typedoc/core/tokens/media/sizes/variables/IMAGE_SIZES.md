[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/media/sizes](../README.md) / IMAGE\_SIZES

```ts
const IMAGE_SIZES: Readonly<{
  HOME_MOSAIC: '(max-width: 540px) 100vw, (max-width: 960px) 50vw, (max-width: 1440px) 33vw, 25vw'
  CARD_STACK: '(max-width: 768px) 96vw, (max-width: 1280px) 52vw, 36vw'
  RELATED_LIST: '(max-width: 768px) 140px, (max-width: 1024px) 260px, 320px'
  PROFILE_PICTURE: '200px'
}>
```

Defined in: core/tokens/media/sizes.ts:11

Responsive `sizes` attribute strings per media surface. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
