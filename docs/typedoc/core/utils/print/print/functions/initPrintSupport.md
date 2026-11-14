[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/print](../README.md) / initPrintSupport

```ts
function initPrintSupport(): void
```

Defined in: core/utils/print/print.ts:3224

Installs the print hooks once: the native before/afterprint pair plus the
matchMedia('print') change channel — some engines skip the events but
always flip the media query, so both paths feed the same enter/exit.
A capture-phase `load` listener rides every img that resolves on screen
(load doesn't bubble — capture reaches it) and marks its resolved URL
in `warmReady`, so the beforeprint swap gate can prove a rung's bytes
already sit in cache instead of gambling on a cold multi-megabyte pull
at snapshot time. Marks only — the warm pass never summons a fetch the
screen didn't already need; lazy/late-mounted layers are covered the
moment their own load lands — no polling, no observer.

## Returns

`void`
