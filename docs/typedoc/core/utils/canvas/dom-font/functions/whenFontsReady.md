[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/dom-font](../README.md) / whenFontsReady

```ts
function whenFontsReady(onReady): void;
```

Defined in: core/utils/canvas/dom-font.ts:104

Resolves once the document's webfonts have settled (`document.fonts.ready`)
— canvas rasterizes with whatever font is loaded AT draw time, so a
snapshot taken before the face arrives silently bakes in the fallback
family/metrics. `onReady` runs immediately when FontFaceSet is absent.

## Parameters

### onReady

() => `void`

Callback fired once fonts are usable.

## Returns

`void`
