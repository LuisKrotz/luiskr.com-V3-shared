[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/qr](../README.md) / encodeQr

```ts
function encodeQr(text): {
  size: number
  modules: Uint8Array
} | null
```

Defined in: core/utils/print/qr.ts:641

Full encode — UTF-8 byte segment → smallest fitting version → data +
interleaved ECC → function layer → best of the 8 masks by penalty score.

## Parameters

### text

`string`

payload (URLs in practice)

## Returns

\| \{
`size`: `number`;
`modules`: `Uint8Array`;
\}
\| `null`

dark-module matrix + side, or null past the v40-M capacity
