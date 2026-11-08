[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/mosaic/layout](../README.md) / relayout

```ts
function relayout(host): void
```

Defined in: website/components/media/mosaic/layout.ts:46

Single layout pass: repacks when the wall width changed (or tiles were
never packed — e.g. first configure before the wall existed) and applies
tile positions + wall height imperatively. Skipped on the compact
carousel path and on empty data. Reads (clientWidth) happen before any
style writes in the same pass — no write→read reflow.

## Parameters

### host

[`MediaMosaic`](../../../MediaMosaic/classes/MediaMosaic.md)

The MediaMosaic element.

## Returns

`void`
