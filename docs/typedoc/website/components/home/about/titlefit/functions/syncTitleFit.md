[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/about/titlefit](../README.md) / syncTitleFit

```ts
function syncTitleFit(host): void
```

Defined in: website/components/home/about/titlefit.ts:59

Measures the title's rendered text width and writes it to the portrait
wrapper's --about-picture-w. Reads the h2's first element child — the
inline <draw-text> host whose border box IS the text line — and skips
degenerate reads (no nodes yet, zero-width layout in tests). The write
is dirty-checked so repeat syncs never churn inline style.

## Parameters

### host

[`AboutSection`](../../../AboutSection/classes/AboutSection.md)

The <about-section> component the session parks on.

## Returns

`void`
