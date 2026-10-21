[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/deploy-info/render](../README.md) / fmtBytes

```ts
function fmtBytes(value): string
```

Defined in: cms/deploy-info/render.tsx:244

Formats a byte count as a compact human size (B/KB/MB/GB, one
decimal past the byte unit); non-numbers render an em-dash.

## Parameters

### value

`unknown`

Byte count from the bundle-stats report.

## Returns

`string`

The formatted size.
