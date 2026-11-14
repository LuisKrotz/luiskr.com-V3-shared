[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/css/field](../README.md) / FIELD\_CSS\_PROPS

```ts
const FIELD_CSS_PROPS: Readonly<{
  CREAM: '--field-cream'
  SAND: '--field-sand'
  BONE: '--field-bone'
  PARCHMENT: '--field-parchment'
  OCHRE: '--field-ochre'
  CANVAS: '--field-canvas'
  UMBER: '--field-umber'
  INK: '--field-ink'
  SPECULAR: '--color-white-raw'
}>
```

Defined in: core/tokens/css/field.ts:16

Field palette CSS custom-property names. Sole declaration site —
consumers (the WebGL page backdrop's theme sampler) import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule). Order matters: `FIELD_CSS_PROP_LIST` is the
shader's `u_col[i]` index order.
