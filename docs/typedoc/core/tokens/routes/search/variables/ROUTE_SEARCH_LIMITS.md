[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/routes/search](../README.md) / ROUTE\_SEARCH\_LIMITS

```ts
const ROUTE_SEARCH_LIMITS: Readonly<{
  MAX_HITS: 50
}>
```

Defined in: core/tokens/routes/search.ts:34

Frozen route-search limits — `MAX_HITS` caps how many ranked rows the
listbox renders per query. The catalog holds thousands of entries; a
one-letter query matched ~6.7k rows, all patched into the DOM each
keystroke (≈600ms first paint, multi-hundred-ms long tasks). Ranking
already puts the best matches first, so the tail is never browsed.
