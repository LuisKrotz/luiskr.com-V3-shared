# `core/utils/canvas/dom-font.ts`

DOM-faithful canvas font helpers shared by every effect that

| | |
|---|---|
| **Source** | `src/core/utils/canvas/dom-font.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `applyFontExtras`

Pushes the font axes the `ctx.font` shorthand cannot express — stretch,
variant caps (small-caps), kerning, letter-spacing, OpenType feature and
variable-font variation settings — onto the context where the 2D API
exposes them. Each assignment is guarded: engines that haven't shipped
the property keep their default rather than throwing.
- `@param` ctx Canvas 2D context being configured.
- `@param` st Computed style of the source text element.

### `syncCanvasFont`

Configures a 2D context so `fillText`/`measureText` reproduce the DOM
element's typography exactly: shorthand font (style/weight/size/family)
plus every extra axis via {@link applyFontExtras}, and the element's
resolved ink color. Callers still pick `textBaseline`/`textAlign`.
- `@param` ctx Canvas 2D context being configured.
- `@param` st Computed style of the source text element.

### `canvasTransformText`

Applies a computed `text-transform` to raw text content. Canvas
`fillText` draws strings verbatim — a title styled
`text-transform: uppercase` would rasterize in its source casing.
`capitalize` uppercases the first letter after each word boundary.
- `@param` text Raw textContent.
- `@param` transform The computed text-transform keyword.
- `@returns` The text as the DOM actually renders it.

### `whenFontsReady`

Resolves once the document's webfonts have settled (`document.fonts.ready`)
— canvas rasterizes with whatever font is loaded AT draw time, so a
snapshot taken before the face arrives silently bakes in the fallback
family/metrics. `onReady` runs immediately when FontFaceSet is absent.
- `@param` onReady Callback fired once fonts are usable.

### `CANVAS_EMPTY_TEXT`

Re-export so callers never re-declare the literal (zero-hardcoding).
