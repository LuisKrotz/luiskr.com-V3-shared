[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/print](../README.md) / initPrintSupport

```ts
function initPrintSupport(): void
```

Defined in: core/utils/print/print.ts:262

Installs the print hooks once: the native before/afterprint pair plus the
matchMedia('print') change channel — some engines skip the events but
always flip the media query, so both paths feed the same enter/exit.

## Returns

`void`
