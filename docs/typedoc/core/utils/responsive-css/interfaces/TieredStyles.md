[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/responsive-css](../README.md) / TieredStyles

Defined in: core/utils/responsive-css.ts:33

The `?tiers` module shape: embedded base text plus cumulative tier
loaders keyed by the highest class they cover (sparse — the runtime
resolves the viewport class to the highest defined tier ≤ it). `print`
carries the sheet's `@media print`/`@page` blocks behind the same lazy
loader contract — adopted onto the shadow root during idle, inert on
screen, live for paper output only.

## Properties

### base

```ts
base: string
```

Defined in: core/utils/responsive-css.ts:34

---

### tiers

```ts
tiers: Partial<Record<WidthClass, TierLoader>>
```

Defined in: core/utils/responsive-css.ts:35

---

### print?

```ts
optional print?: TierLoader;
```

Defined in: core/utils/responsive-css.ts:36
