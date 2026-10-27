[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / CoverageReport

Defined in: cms/deploy-info/types.ts:32

Shape of the Jest coverage summary consumed by the Build tab —
`total` holds per-metric {covered,total,pct} aggregates (statements, branches,
functions, lines); `modules` carries the same per-metric shape keyed by
module workspace name so the tab can show each module's coverage.

## Properties

### total?

```ts
optional total?: Record<string, {
  covered?: number;
  total?: number;
  pct?: number;
}>;
```

Defined in: cms/deploy-info/types.ts:33

---

### modules?

```ts
optional modules?: Record<string, Record<string, {
  covered?: number;
  total?: number;
  pct?: number;
}>>;
```

Defined in: cms/deploy-info/types.ts:34
