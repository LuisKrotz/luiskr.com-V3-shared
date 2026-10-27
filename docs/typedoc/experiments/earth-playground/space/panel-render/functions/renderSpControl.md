[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/panel-render](../README.md) / renderSpControl

```ts
function renderSpControl(ctrl, t, savedVal): Element
```

Defined in: experiments/earth-playground/space/panel-render.tsx:47

One control row. Checkboxes render a WebGL check canvas + SVG check icon;
ranges render a slider with the range-fill CSS var + a value readout.
`savedVal` (persisted user value) wins over the control's shipped default.
Each row is preceded by a sr-only h4 — every control is a heading so AT
heading-jump can list and reach every option; the input carries an
aria-describedby technical line (param id + bounds).

## Parameters

### ctrl

[`SpControl`](../../controls/interfaces/SpControl.md)

### t

`Record`\<`string`, `unknown`\>

### savedVal

\| [`SpParamValue`](../../controls/type-aliases/SpParamValue.md)
\| `undefined`

## Returns

[`Element`](../../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
