[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/deploy-info/types](../README.md) / BundleTier

Defined in: cms/deploy-info/types.ts:96

One ES-target tier row — the js/css/misc buckets emitted under
dist/v/<tier>/ plus that tier's ten heaviest chunks.

## Properties

### name?

```ts
optional name?: string;
```

Defined in: cms/deploy-info/types.ts:97

---

### js?

```ts
optional js?: BundleBucket;
```

Defined in: cms/deploy-info/types.ts:98

---

### css?

```ts
optional css?: BundleBucket;
```

Defined in: cms/deploy-info/types.ts:99

---

### misc?

```ts
optional misc?: BundleBucket;
```

Defined in: cms/deploy-info/types.ts:100

---

### largest?

```ts
optional largest?: object[];
```

Defined in: cms/deploy-info/types.ts:101

#### file?

```ts
optional file?: string;
```

#### bytes?

```ts
optional bytes?: number;
```
