[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/jsx/props](../README.md) / JSX\_METADATA\_PROPS

```ts
const JSX_METADATA_PROPS: Readonly<Set<string>>;
```

Defined in: core/tokens/jsx/props.ts:61

Compiler-only JSX metadata. OXC/Babel may inject these in development
transforms; they describe source locations/runtime ownership and must never
leak into rendered HTML as `"[object Object]"` attributes.
