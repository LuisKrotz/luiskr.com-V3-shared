[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/tree-icon](../README.md) / hashName

```ts
function hashName(name): number
```

Defined in: experiments/docs/tree-icon.tsx:49

Deterministic 32-bit-ish name hash — walks the string with a rolling
multiply-add; the modulus lives in DOCS_UNITS so the spread stays
tuned. Seeds every per-node art variance (paper fan, SMIL phase).

## Parameters

### name

`string`

## Returns

`number`
