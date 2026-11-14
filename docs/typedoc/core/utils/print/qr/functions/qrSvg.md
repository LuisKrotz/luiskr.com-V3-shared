[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/qr](../README.md) / qrSvg

```ts
function qrSvg(text): SVGSVGElement | null
```

Defined in: core/utils/print/qr.ts:681

Print-time QR element — a <svg><path></svg> pair drawn in currentColor so
the code inherits the document ink on paper. Adjacent dark modules on a
row merge into single h-runs so the path stays short for v30+ symbols.

## Parameters

### text

`string`

payload — returns null when it outgrows v40-M

## Returns

`SVGSVGElement` \| `null`

aria-hidden svg element (the wrapper link carries the semantics)
