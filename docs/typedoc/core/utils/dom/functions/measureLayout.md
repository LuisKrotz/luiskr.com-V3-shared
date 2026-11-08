[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / measureLayout

```ts
function measureLayout<T>(read): T
```

Defined in: core/utils/dom.ts:288

Deliberate layout measurement inside the sanctioned flush window —
the general form of flushLayout for reads that MUST see post-write
layout (measure-then-mutate). One wrapped read still forces layout,
but the reflow gate recognizes it as deliberate rather than
accidental thrash.

## Type Parameters

### T

`T`

## Parameters

### read

() => `T`

The layout read to run inside the flush window.

## Returns

`T`

whatever `read` returns.
