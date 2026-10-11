[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/jsx/props](../README.md) / BOOL\_PROPS

```ts
const BOOL_PROPS: Readonly<Set<string>>;
```

Defined in: core/tokens/jsx/props.ts:13

Boolean attributes — presence means `true`, absence means `false`
(`muted`, `disabled`, `hidden`, `checked`, …). `h()` maps
`prop={true}` → bare attribute + property assignment.
