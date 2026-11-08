[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/routes/search](../README.md) / ROUTE\_SEARCH\_LIMITS

```ts
const ROUTE_SEARCH_LIMITS: Readonly<{
  MAX_HITS: 50
}>
```

Defined in: core/tokens/routes/search.ts:36

Frozen route-search limits — `MAX_HITS` is the page size: how many
ranked rows the listbox renders per results page. The catalog holds
thousands of entries; a one-letter query matched ~6.7k rows, and
patching them all into the DOM per keystroke cost ≈600ms first paint —
the pager walks the full hit list one slice at a time instead.
