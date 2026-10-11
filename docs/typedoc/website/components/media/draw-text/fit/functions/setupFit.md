[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/fit](../README.md) / setupFit

```ts
function setupFit(host): void;
```

Defined in: website/components/media/draw-text/fit.ts:116

Installs the fit pipeline for a fitted host: immediate measure, a
ResizeObserver on the parent (the sizing constraint) for breakpoint /
orientation changes, and a one-shot refit once webfonts finish loading
(late font swaps can widen the same word by several percent).

## Parameters

### host

[`DrawText`](../../../DrawText/classes/DrawText.md)

— the draw-text element

## Returns

`void`
