[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/locale/fallback](../README.md) / FALLBACK

```ts
const FALLBACK: Readonly<FallbackSnapshot>;
```

Defined in: core/locale/fallback.ts:45

English UI copy snapshotted from database.json at build time.
Components read live translations from the store first and fall back to
this snapshot, so no user-visible string lives in JavaScript source.
