[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/selectors/loader](../README.md) / LOADER\_SELECTORS

```ts
const LOADER_SELECTORS: Readonly<{
  INTRO_LOADER: '.intro-loader'
  PERCENT: '.intro-loader-percent'
  MSG: '.intro-loader-msg'
  BAR: '.intro-loader-bar'
}>
```

Defined in: core/tokens/selectors/loader.ts:15

Frozen loader selector map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
