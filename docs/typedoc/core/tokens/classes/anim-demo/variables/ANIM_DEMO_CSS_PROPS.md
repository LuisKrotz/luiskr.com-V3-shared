[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/classes/anim-demo](../README.md) / ANIM\_DEMO\_CSS\_PROPS

```ts
const ANIM_DEMO_CSS_PROPS: Readonly<{
  LIFT: '--anim-demo-lift'
}>
```

Defined in: core/tokens/classes/anim-demo.ts:246

Frozen anim-demo CSS custom-property names — the mosaic-tile spring
displacement writes `--anim-demo-lift` (px length), read by the tile's
transform. Sole declaration site — consumers import the token, never
retype the literal (zero-hardcoding rule).
