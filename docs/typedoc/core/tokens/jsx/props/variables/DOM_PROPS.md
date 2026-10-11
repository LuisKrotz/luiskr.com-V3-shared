[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/jsx/props](../README.md) / DOM\_PROPS

```ts
const DOM_PROPS: Readonly<Set<string>>;
```

Defined in: core/tokens/jsx/props.ts:54

Properties that must be set via the DOM property (el[key] = val)
rather than el.setAttribute(key, val) so the browser reflects
the live state (e.g. slider thumb position, input text).
