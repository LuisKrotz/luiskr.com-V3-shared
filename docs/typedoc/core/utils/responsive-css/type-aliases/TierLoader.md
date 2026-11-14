[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/responsive-css](../README.md) / TierLoader

```ts
type TierLoader = () => Promise<
  | {
      default: string
    }
  | string
>
```

Defined in: core/utils/responsive-css.ts:23

A lazily-imported tier module — resolves to the tier's css text.

## Returns

`Promise`\<
\| \{
`default`: `string`;
\}
\| `string`\>
