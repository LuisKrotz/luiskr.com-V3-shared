[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/css/route-search](../README.md) / RS\_CSS\_PROPS

```ts
const RS_CSS_PROPS: Readonly<{
  RS_LIST_GAP: '--rs-list-gap'
  RS_LIST_AVAIL: '--rs-list-avail'
}>
```

Defined in: core/tokens/css/route-search.ts:14

Route-search CSS custom-property names. Sole declaration site —
consumers import members rather than re-declaring the literals
(zero-hardcoding rule). `RS_LIST_GAP` is authored in SCSS tokens and
read back by the component's viewport-fit measurement; `RS_LIST_AVAIL`
is the measured value the stylesheet min()es into the listbox cap.
