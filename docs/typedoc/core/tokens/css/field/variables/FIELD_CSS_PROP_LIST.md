[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/css/field](../README.md) / FIELD\_CSS\_PROP\_LIST

```ts
const FIELD_CSS_PROP_LIST: readonly (
  | '--field-cream'
  | '--field-sand'
  | '--field-bone'
  | '--field-parchment'
  | '--field-ochre'
  | '--field-canvas'
  | '--field-umber'
)[]
```

Defined in: core/tokens/css/field.ts:41

Shader colour-slot order — index `i` of this list is `u_col[i]` in the
page-backdrop fragment shader, so the GLSL lobe table and the JS
sampler can never disagree on which material a slot holds.
