[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/routes/aliases](../README.md) / MEDIA\_SLUG\_MAX\_LENGTH

```ts
const MEDIA_SLUG_MAX_LENGTH: 80 = 80
```

Defined in: core/tokens/routes/aliases.ts:25

Cap on the media deep-link slug (`/portfolio/<project>/<media>`) so
prerendered dist paths keep wide headroom under the Windows MAX_PATH
(260) bound even inside deep clone prefixes — truncation lands on a
hyphen boundary, never mid-word.
