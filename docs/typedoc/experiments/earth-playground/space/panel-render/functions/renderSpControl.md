[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/space/panel-render](../README.md) / renderSpControl

```ts
function renderSpControl(
   ctrl, 
   t, 
   savedVal
): Element;
```

Defined in: experiments/earth-playground/space/panel-render.tsx:22

One control row. Checkboxes render a WebGL check canvas + SVG check icon;
ranges render a slider with the range-fill CSS var + a value readout.
`savedVal` (persisted user value) wins over the control's shipped default.

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
