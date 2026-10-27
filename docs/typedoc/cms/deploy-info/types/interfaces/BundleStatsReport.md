[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / BundleStatsReport

Defined in: cms/deploy-info/types.ts:153

Shape of the bundle-stats report — the post-build dist/ inventory:
file-type totals (js/css/html/wasm/assets) with minified vs
unminified vs compressed bytes, per-tier rows, the per-crate wasm
table, prerendered-HTML grouped by top-level directory, and the
heaviest emitted chunks overall.

## Properties

### generatedAt?

```ts
optional generatedAt?: string;
```

Defined in: cms/deploy-info/types.ts:154

---

### totals?

```ts
optional totals?: object;
```

Defined in: cms/deploy-info/types.ts:155

#### js?

```ts
optional js?: BundleBucket;
```

#### css?

```ts
optional css?: BundleBucket;
```

#### html?

```ts
optional html?: BundleBucket;
```

#### wasm?

```ts
optional wasm?: BundleBucket;
```

#### assets?

```ts
optional assets?: BundleBucket;
```

---

### tiers?

```ts
optional tiers?: BundleTier[];
```

Defined in: cms/deploy-info/types.ts:162

---

### wasm?

```ts
optional wasm?: WasmCrateStats[];
```

Defined in: cms/deploy-info/types.ts:163

---

### html?

```ts
optional html?: BundleBucket & object;
```

Defined in: cms/deploy-info/types.ts:164

#### Type Declaration

##### byDir?

```ts
optional byDir?: object[];
```

---

### largest?

```ts
optional largest?: object[];
```

Defined in: cms/deploy-info/types.ts:165

#### file?

```ts
optional file?: string;
```

#### bytes?

```ts
optional bytes?: number;
```
