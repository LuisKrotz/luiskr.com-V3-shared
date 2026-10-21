[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/safari/patches/carousel-media](../README.md) / eagerizeCarouselFigure

```ts
function eagerizeCarouselFigure(el): void
```

Defined in: core/safari/patches/carousel-media.ts:55

Eager image path for carousel-hosted figures: flip the thumbnail to
loading="eager" (lazy never fires for iOS WebKit inside the scrolled
track) and kick the Q50 high-res swap immediately instead of waiting
on the IntersectionObserver Safari silently drops. The `$` call is
optional-chained because the retroactive pass can encounter
not-yet-upgraded media-figure elements.

## Parameters

### el

[`SafariPatchableEl`](../../../types/interfaces/SafariPatchableEl.md)

The carousel-hosted media-figure.

## Returns

`void`
