[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/dom-font](../README.md) / applyFontExtras

```ts
function applyFontExtras(ctx, st): void;
```

Defined in: core/utils/canvas/dom-font.ts:29

Pushes the font axes the `ctx.font` shorthand cannot express — stretch,
variant caps (small-caps), kerning, letter-spacing, OpenType feature and
variable-font variation settings — onto the context where the 2D API
exposes them. Each assignment is guarded: engines that haven't shipped
the property keep their default rather than throwing.

## Parameters

### ctx

`CanvasRenderingContext2D`

Canvas 2D context being configured.

### st

`CSSStyleDeclaration`

Computed style of the source text element.

## Returns

`void`
