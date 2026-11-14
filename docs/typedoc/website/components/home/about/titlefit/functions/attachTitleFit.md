[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/titlefit](../README.md) / attachTitleFit

```ts
function attachTitleFit(host): void
```

Defined in: website/components/home/about/titlefit.ts:115

Arms the fit session: seeds the parked session, (re)targets the h2
observer — the node is re-created on every render — and wires the
one-shot fonts-ready re-sync, then runs a synchronous measure so the
portrait's first paint already carries the title-matched width.
Idempotent — safe to call from every render pass.

## Parameters

### host

[`AboutSection`](../../../AboutSection/classes/AboutSection.md)

The <about-section> component the session parks on.

## Returns

`void`
