[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/string](../README.md) / toMetaDescription

```ts
function toMetaDescription(str, max?): string
```

Defined in: core/utils/string.ts:86

Compacts markup-bearing CMS text into a meta-description string:
`<br>` collapses to a space (it is a line break, not a word boundary),
remaining tags strip via the iterated sanitizer, named/numeric entities
decode so `&nbsp;` doesn't survive into the content attribute, runs of
whitespace collapse to one space, and overlong text cuts at the last
word boundary inside `max` — never mid-word.
Pure ESM utility function, tree-shakeable.

## Parameters

### str

`string`

Raw CMS text (may contain tags/entities).

### max?

`number` = `META_DESCRIPTION_MAX`

Character budget — defaults to the SERP limit.

## Returns

`string`

Plain-text description ≤ max chars.
