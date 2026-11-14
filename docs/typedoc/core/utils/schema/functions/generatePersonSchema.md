[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/schema](../README.md) / generatePersonSchema

```ts
function generatePersonSchema(): Record<string, unknown>
```

Defined in: core/utils/schema.ts:169

Person entity — the site's sole author. Every page's graph carries it
so Google consolidates `author`/`publisher`/`creator`/`uploader`
references (all `{'@id': '#person'}`) onto one stable identity; the
sameAs fan-out mirrors the Organization's and feeds entity
reconciliation for a possible knowledge panel.

## Returns

`Record`\<`string`, `unknown`\>

Person JSON-LD entity
