[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/print](../README.md) / restorePrint

```ts
function restorePrint(host): void
```

Defined in: website/components/home/about/print.ts:81

Tears the printable form down: every injected `.print-fill` leaves the
shadow DOM. Idempotent — both restore channels (native afterprint and
the matchMedia false edge) may fire for one job.

## Parameters

### host

[`AboutSection`](../../../AboutSection/classes/AboutSection.md)

The AboutSection element.

## Returns

`void`
