[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/render](../README.md) / renderArrowButton

```ts
function renderArrowButton(
   direction, 
   lang, 
   circumference
): Element;
```

Defined in: website/components/carousel/custom-carousel/render.tsx:102

One prev/next control button: a WebGL arrow canvas behind an SVG
autoplay progress ring (stroke-dashoffset driven by the carousel's
_updateRingDom) plus a text glyph fallback. `direction` selects the
modifier class, aria-label and glyph (ARROW_TYPES.PREV/NEXT). The ring
starts at dashoffset=circumference (empty) — autoplay shrinks it.

## Parameters

### direction

`string`

ARROW_TYPES.PREV | ARROW_TYPES.NEXT.

### lang

[`CarouselLang`](../interfaces/CarouselLang.md)

Localized control labels.

### circumference

`number`

Ring circle's 2πr — shared with the dashoffset math.

## Returns

[`Element`](../../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
