[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/dom-font](../README.md) / syncCanvasFont

```ts
function syncCanvasFont(ctx, st): void;
```

Defined in: core/utils/canvas/dom-font.ts:67

Configures a 2D context so `fillText`/`measureText` reproduce the DOM
element's typography exactly: shorthand font (style/weight/size/family)
plus every extra axis via [applyFontExtras](applyFontExtras.md), and the element's
resolved ink color. Callers still pick `textBaseline`/`textAlign`.

## Parameters

### ctx

`CanvasRenderingContext2D`

Canvas 2D context being configured.

### st

`CSSStyleDeclaration`

Computed style of the source text element.

## Returns

`void`
