[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-search](../README.md) / RouteSearchItem

Defined in: core/utils/wasm/wasm-search.ts:18

A scorable catalog row — the fields the matcher reads.

## Properties

### title

```ts
title: string
```

Defined in: core/utils/wasm/wasm-search.ts:20

Display title (strongest match field).

---

### path

```ts
path: string
```

Defined in: core/utils/wasm/wasm-search.ts:22

URL path — matched so typing "/port" filters to the portfolio.

---

### preview

```ts
preview: string
```

Defined in: core/utils/wasm/wasm-search.ts:24

Preview/description text (weakest field).

---

### keywords

```ts
keywords: string[];
```

Defined in: core/utils/wasm/wasm-search.ts:26

Search keywords (the DB searchThemes lists).
