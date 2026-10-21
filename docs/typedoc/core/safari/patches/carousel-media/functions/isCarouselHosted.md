[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/safari/patches/carousel-media](../README.md) / isCarouselHosted

```ts
function isCarouselHosted(el): boolean
```

Defined in: core/safari/patches/carousel-media.ts:34

Whether a media-figure is hosted inside a carousel — the figure's
shadow root is owned by the slide, so the _element's_ root node is the
carousel's own shadow tree and `host` is the carousel element.

## Parameters

### el

[`SafariPatchableEl`](../../../types/interfaces/SafariPatchableEl.md)

The media-figure element being mounted.

## Returns

`boolean`

true when the figure lives inside <custom-carousel> or
<awards-carousel>.
