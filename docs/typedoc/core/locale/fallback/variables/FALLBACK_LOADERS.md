[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/locale/fallback](../README.md) / FALLBACK\_LOADERS

```ts
const FALLBACK_LOADERS: Record<string, LoaderCopy> = FALLBACK.loaderLocales;
```

Defined in: core/locale/fallback.ts:58

Boot-loader copy keyed by locale — every language is inlined so the
intro loader can localize its stage messages at boot time, before the
async per-locale i18n chunks land.
