[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/tokens/primitives](../README.md) / MEDIA\_QUERIES

```ts
const MEDIA_QUERIES: Readonly<{
  POINTER_FINE: '(pointer: fine)'
  POINTER_COARSE: '(pointer: coarse)'
  MAX_WIDTH_768: '(max-width: 768px)'
  MIN_WIDTH_1025: '(min-width: 1025px)'
  PREFERS_COLOR_DARK: '(prefers-color-scheme: dark)'
  PREFERS_REDUCED_MOTION: '(prefers-reduced-motion: reduce)'
  FORCED_COLORS: '(forced-colors: active)'
  PREFERS_CONTRAST: '(prefers-contrast: more)'
  PRINT: 'print'
}>
```

Defined in: core/tokens/primitives.ts:33

Frozen media media-query map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.
