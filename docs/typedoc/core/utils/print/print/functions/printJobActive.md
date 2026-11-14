[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/print](../README.md) / printJobActive

```ts
function printJobActive(): boolean
```

Defined in: core/utils/print/print.ts:3210

True while a print job owns the document — set at prepPrint's stamp
and held through exit's restore. Screen-time DOM publishers (figure
ladder publishes, deferred layer mounts) must freeze inside this
window: a clone landing mid-snapshot stomps the print-upgraded src
with a cold screen rung and the page prints a blank frame where the
media should be.

## Returns

`boolean`

Whether the print DOM is currently being prepped/committed.
