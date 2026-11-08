[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/mosaic/layout](../README.md) / estimateWallWidth

```ts
function estimateWallWidth(): number
```

Defined in: website/components/media/mosaic/layout.ts:22

Predicted wall width before the element is measured: viewport minus the
grid gutters the %MAXAREA host padding applies — the same contract the
project view uses for its pre-render height estimate.

## Returns

`number`

Estimated wall content width in px (0 without a viewport).
